import { TZ } from "./dates";

const MEETING_WEEKDAY = 1; // Monday
const MEETING_START = { h: 16, m: 0 };
const MEETING_END = { h: 18, m: 0 };

function parts(d: Date) {
  const f = new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    hourCycle: "h23",
    weekday: "short",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).formatToParts(d);
  const get = (t: string) => f.find((x) => x.type === t)?.value ?? "";
  const wd = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  return {
    wd,
    y: +get("year"),
    mo: +get("month"),
    d: +get("day"),
    h: +get("hour"),
    mi: +get("minute"),
  };
}

/** Instant for a wall-clock time in the site time zone. */
function fromLocal(y: number, mo: number, d: number, h: number, mi: number): Date {
  let guess = Date.UTC(y, mo - 1, d, h, mi);
  for (let i = 0; i < 2; i++) {
    const p = parts(new Date(guess));
    const asUtc = Date.UTC(p.y, p.mo - 1, p.d, p.h, p.mi);
    guess += Date.UTC(y, mo - 1, d, h, mi) - asUtc;
  }
  return new Date(guess);
}

export type MeetingStatus =
  | { kind: "live"; endsAt: Date }
  | { kind: "upcoming"; startsAt: Date; days: number; hours: number; minutes: number };

/** Next Monday 4–6 PM Eastern relative to `now`, or "live" during the meeting. */
export function nextMeeting(now = new Date()): MeetingStatus {
  const p = parts(now);
  const daysAhead = (MEETING_WEEKDAY - p.wd + 7) % 7;
  const start = fromLocal(p.y, p.mo, p.d + daysAhead, MEETING_START.h, MEETING_START.m);
  const end = fromLocal(p.y, p.mo, p.d + daysAhead, MEETING_END.h, MEETING_END.m);
  if (now >= start && now < end) return { kind: "live", endsAt: end };
  const next =
    now >= end
      ? fromLocal(p.y, p.mo, p.d + daysAhead + 7, MEETING_START.h, MEETING_START.m)
      : start;
  const ms = next.getTime() - now.getTime();
  const days = Math.floor(ms / 86_400_000);
  const hours = Math.floor((ms % 86_400_000) / 3_600_000);
  const minutes = Math.floor((ms % 3_600_000) / 60_000);
  return { kind: "upcoming", startsAt: next, days, hours, minutes };
}

export function localClock(now = new Date()): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    hour: "numeric",
    minute: "2-digit",
  }).format(now);
}
