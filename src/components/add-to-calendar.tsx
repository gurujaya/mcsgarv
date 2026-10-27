"use client";

import { CalendarPlus } from "lucide-react";
import type { Event } from "@/content/types";
import { buildIcs } from "@/lib/ics";

/** Downloads a one-event .ics file generated in the browser. */
export function AddToCalendar({
  event,
  className,
}: {
  event: Event;
  className?: string;
}) {
  const onClick = () => {
    const blob = new Blob([buildIcs(event)], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${event.slug}.ics`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        className ??
        "relative z-10 inline-flex h-[22px] items-center gap-1 rounded-[4px] border border-line bg-surface px-1.5 font-mono text-[11px] text-ink-muted transition-colors hover:border-line-strong hover:text-ink"
      }
    >
      <CalendarPlus className="size-3.5" aria-hidden />
      .ics
      <span className="sr-only">, add {event.title} to your calendar</span>
    </button>
  );
}
