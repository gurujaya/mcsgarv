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

function addDays(iso: string, days: number): string {
  const d = new Date(iso);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString();
}

/**
 * Expand weekly recurring events into concrete occurrences from `now` forward.
 * Non-recurring events pass through unchanged.
 */
export function expandEvents(list: Event[], now = new Date()): Event[] {
  const out: Event[] = [];
  for (const e of list) {
    if (e.recurring !== "weekly") {
      out.push(e);
      continue;
    }
    const durationMs = e.end
      ? new Date(e.end).getTime() - new Date(e.start).getTime()
      : 0;
    let cursor = e.start;
    // Advance to the first occurrence that has not ended yet.
    while (new Date(cursor).getTime() + durationMs < now.getTime()) {
      cursor = addDays(cursor, 7);
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
      cursor = addDays(cursor, 7);
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
