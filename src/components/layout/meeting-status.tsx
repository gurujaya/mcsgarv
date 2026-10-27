"use client";

import * as React from "react";
import Link from "next/link";
import { nextMeeting, localClock } from "@/lib/next-meeting";

/**
 * Live readout in the nav: the campus clock and the countdown to the next open
 * meeting. Rendered empty on the server and filled on the client so there is
 * no hydration mismatch.
 */
export function MeetingStatus({ className }: { className?: string }) {
  const [text, setText] = React.useState<{
    clock: string;
    label: string;
    live: boolean;
  } | null>(null);

  React.useEffect(() => {
    const tick = () => {
      const now = new Date();
      const m = nextMeeting(now);
      const clock = localClock(now);
      if (m.kind === "live")
        setText({ clock, label: "Meeting in session · SV 104A", live: true });
      else {
        const when =
          m.days > 0
            ? `${m.days}d ${m.hours}h`
            : m.hours > 0
              ? `${m.hours}h ${m.minutes}m`
              : `${m.minutes}m`;
        setText({ clock, label: `Next meeting in ${when}`, live: false });
      }
    };
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <Link
      href="/events?type=meeting"
      className={className}
      aria-label={
        text ? `${text.label}. Rockville time ${text.clock}` : "Next open meeting"
      }
    >
      <span
        aria-hidden
        className={`relative inline-flex size-1.5 rounded-full ${text?.live ? "bg-mc-green" : "bg-mc-purple"}`}
      >
        {text?.live ? (
          <span className="absolute inset-0 animate-ping rounded-full bg-mc-green opacity-70" />
        ) : null}
      </span>
      <span className="whitespace-nowrap" suppressHydrationWarning>
        {text ? text.label : "Meetings · Mondays 4–6 PM"}
      </span>
      <span
        className="hidden whitespace-nowrap text-ink-faint 2xl:inline"
        suppressHydrationWarning
      >
        {text ? `· ${text.clock} ET` : ""}
      </span>
    </Link>
  );
}
