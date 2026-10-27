import type { Event } from "@/content/types";

export const TZ = "America/New_York";

const WEEKS_TO_EXPAND = 8;

export function fmtDate(iso: string, opts: Intl.DateTimeFormatOptions = {}): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    month: "short",
    day: "numeric",
    year: "numeric",
    ...opts,
  }).format(new Date(iso));
}

export function fmtTime(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    hour: "numeric",
    minute: "2-digit",
  })
    .format(new Date(iso))
    .replace(":00", "");
}

export function fmtWeekday(iso: string): string {
  return new Intl.DateTimeFormat("en-US", { timeZone: TZ, weekday: "long" }).format(
    new Date(iso),
  );
}

export function fmtMonthYear(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}

/** "Nov 20, 2026 · 6–10 PM" or "November 2026 · Date TBD" */
export function fmtEventWhen(e: Event): string {
  if (e.approximate) return `${fmtMonthYear(e.start)} · Date TBD`;
  const sameDay = !e.end || toDayKey(e.start) === toDayKey(e.end);
  if (!sameDay) {
    return `${fmtDate(e.start, { year: undefined })} – ${fmtDate(e.end!)}`;
  }
  const time = e.end ? `${fmtTime(e.start)}–${fmtTime(e.end)}` : fmtTime(e.start);
  return `${fmtDate(e.start)} · ${time}`;
}

export function toDayKey(iso: string): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(iso));
}

export function isToday(iso: string, now = new Date()): boolean {
  return toDayKey(iso) === toDayKey(now.toISOString());
}

export function isPast(e: Event, now = new Date()): boolean {
  if (e.past) return true;
  const endIso = e.end ?? e.start;
  return new Date(endIso).getTime() < now.getTime();
}

/** Month bucket key used for the month filter: "2026-11". */
export function monthKey(iso: string): string {
  return toDayKey(iso).slice(0, 7);
}

export function monthLabel(key: string): string {
  const [y, m] = key.split("-").map(Number);
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(y, m - 1, 1)));
}

/** Local wall-clock parts of an instant in the site time zone. */
function localParts(d: Date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).formatToParts(d);
  const get = (t: string) => Number(parts.find((x) => x.type === t)?.value);
  return {
    y: get("year"),
    m: get("month"),
    d: get("day"),
    h: get("hour"),
    min: get("minute"),
  };
}

/** Instant for a wall-clock time in the site time zone (handles DST). */
function fromLocal(y: number, m: number, d: number, h: number, min: number): Date {
  // First guess as UTC, then correct by the zone offset at that instant (twice,
  // which is enough to converge across a DST boundary).
  let guess = Date.UTC(y, m - 1, d, h, min);
  for (let i = 0; i < 2; i++) {
    const lp = localParts(new Date(guess));
    const asUtc = Date.UTC(lp.y, lp.m - 1, lp.d, lp.h, lp.min);
    guess += Date.UTC(y, m - 1, d, h, min) - asUtc;
  }
  return new Date(guess);
}

/** Add whole days while keeping the same local wall-clock time across DST. */
function addDays(iso: string, days: number): string {
  const lp = localParts(new Date(iso));
  return fromLocal(lp.y, lp.m, lp.d + days, lp.h, lp.min).toISOString();
}

/**
 * Expand recurring events (weekly or every two weeks) into concrete occurrences
 * from `now` forward. `start` must be a real occurrence so biweekly cycles stay
 * in phase.
 * Non-recurring events pass through unchanged.
 */
export function expandEvents(list: Event[], now = new Date()): Event[] {
  const out: Event[] = [];
  for (const e of list) {
    if (!e.recurring) {
      out.push(e);
      continue;
    }
    const durationMs = e.end
      ? new Date(e.end).getTime() - new Date(e.start).getTime()
      : 0;
    let cursor = e.start;
    // Advance to the first occurrence that has not ended yet.
    const step = e.recurring === "biweekly" ? 14 : 7;
    while (new Date(cursor).getTime() + durationMs < now.getTime()) {
      cursor = addDays(cursor, step);
    }
    for (let i = 0; i < WEEKS_TO_EXPAND; i++) {
      const start = cursor;
      const end = durationMs
        ? new Date(new Date(start).getTime() + durationMs).toISOString()
        : undefined;
      out.push({
        ...e,
        slug: `${e.slug}-${toDayKey(start)}`,
        start,
        end,
      });
      cursor = addDays(cursor, step);
    }
  }
  return out;
}

export function sortByStart(list: Event[], dir: "asc" | "desc" = "asc"): Event[] {
  return [...list].sort((a, b) => {
    const d = new Date(a.start).getTime() - new Date(b.start).getTime();
    return dir === "asc" ? d : -d;
  });
}

export function splitEvents(list: Event[], now = new Date()) {
  const expanded = expandEvents(list, now);
  const upcoming = sortByStart(
    expanded.filter((e) => !isPast(e, now)),
    "asc",
  );
  const past = sortByStart(
    expanded.filter((e) => isPast(e, now)),
    "desc",
  );
  return { upcoming, past };
}
