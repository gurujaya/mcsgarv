import { Pill, categoryTone } from "@/components/primitives/pill";
import { eventTypes } from "@/content/events";
import type { Event } from "@/content/types";
import { isToday } from "@/lib/dates";

export function EventTypePill({ type }: { type: Event["type"] }) {
  return <Pill tone={categoryTone[type] ?? "neutral"}>{eventTypes[type]}</Pill>;
}

export function TodayBadge({ event, now }: { event: Event; now?: Date }) {
  if (event.approximate || !isToday(event.start, now)) return null;
  return <Pill tone="live">Today</Pill>;
}

/** Date tile used as the leading slot in event rows: "NOV / 20". */
export function DateTile({ iso, approximate }: { iso: string; approximate?: boolean }) {
  const d = new Date(iso);
  const month = new Intl.DateTimeFormat("en-US", {
    month: "short",
    timeZone: "America/New_York",
  }).format(d);
  const day = new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    timeZone: "America/New_York",
  }).format(d);
  return (
    <span
      aria-hidden
      className="flex size-12 flex-col items-center justify-center rounded-[10px] border border-line bg-surface leading-none"
    >
      <span className="text-[10px] font-medium tracking-wide text-mc-purple uppercase">
        {month}
      </span>
      <span className="mt-0.5 text-[18px] font-medium tracking-[-0.01em] text-ink">
        {approximate ? "—" : day}
      </span>
    </span>
  );
}
