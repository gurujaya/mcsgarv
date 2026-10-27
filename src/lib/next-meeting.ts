import { TZ } from "./dates";
import { site } from "@/content/site";

const MEETING_START = { h: 16, m: 0 };
const MEETING_END = { h: 18, m: 0 };
const CYCLE_DAYS = site.meeting.cadence === "biweekly" ? 14 : 7;

function parts(d: Date) {
  const f = new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    hourCycle: "h23",
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

/**
 * Next open meeting relative to `now`, or "live" while one is in session.
 * Meetings fall every CYCLE_DAYS from the anchor Monday in site.ts.
 */
export function nextMeeting(now = new Date()): MeetingStatus {
  const [ay, am, ad] = site.meeting.anchor.split("-").map(Number);
  const anchor = fromLocal(ay, am, ad, MEETING_START.h, MEETING_START.m);
  // Whole cycles elapsed since the anchor (may be negative before it).
  const elapsed = Math.floor(
    (now.getTime() - anchor.getTime()) / (CYCLE_DAYS * 86_400_000),
  );
  for (const k of [elapsed, elapsed + 1, elapsed + 2]) {
    const s = fromLocal(ay, am, ad + k * CYCLE_DAYS, MEETING_START.h, MEETING_START.m);
    const e = fromLocal(ay, am, ad + k * CYCLE_DAYS, MEETING_END.h, MEETING_END.m);
    if (now >= s && now < e) return { kind: "live", endsAt: e };
    if (now < s) {
      const ms = s.getTime() - now.getTime();
      return {
        kind: "upcoming",
        startsAt: s,
        days: Math.floor(ms / 86_400_000),
        hours: Math.floor((ms % 86_400_000) / 3_600_000),
        minutes: Math.floor((ms % 3_600_000) / 60_000),
      };
    }
  }
  // Unreachable in practice; fall back to one cycle out.
  const s2 = fromLocal(
    ay,
    am,
    ad + (elapsed + 3) * CYCLE_DAYS,
    MEETING_START.h,
    MEETING_START.m,
  );
  return { kind: "upcoming", startsAt: s2, days: CYCLE_DAYS, hours: 0, minutes: 0 };
}

export function localClock(now = new Date()): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    hour: "numeric",
    minute: "2-digit",
  }).format(now);
}
