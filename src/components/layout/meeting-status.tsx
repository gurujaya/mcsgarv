"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "cn";
import { nextMeeting } from "@/lib/next-meeting";
import { TZ } from "@/lib/dates";
import { site } from "@/content/site";

const dayKey = (d: Date) =>
  new Intl.DateTimeFormat("en-CA", { timeZone: TZ, dateStyle: "short" }).format(d);

/**
 * One plain sentence in the nav about the next open meeting, in the body
 * face. Rendered as a fallback on the server and filled on the client so the
 * wording never mismatches between the two.
 */
export function MeetingStatus({ className }: { className?: string }) {
  const [state, setState] = React.useState<{ label: string; live: boolean } | null>(null);

  React.useEffect(() => {
    const tick = () => {
      const now = new Date();
      const m = nextMeeting(now);
      if (m.kind === "live") {
        setState({ label: `Open meeting in session now, ${site.office.room}`, live: true });
        return;
      }
      const start = m.startsAt;
      const time = new Intl.DateTimeFormat("en-US", {
        timeZone: TZ,
        hour: "numeric",
        minute: start.getMinutes() ? "2-digit" : undefined,
      }).format(start);
      const today = dayKey(now);
      const tomorrow = dayKey(new Date(now.getTime() + 86_400_000));
      const sd = dayKey(start);
      const label =
        sd === today
          ? `Open meeting today at ${time}`
          : sd === tomorrow
            ? `Open meeting tomorrow at ${time}`
            : `Next open meeting ${new Intl.DateTimeFormat("en-US", {
                timeZone: TZ,
                weekday: "short",
                month: "short",
                day: "numeric",
              }).format(start)}`;
      setState({ label, live: false });
    };
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <Link
      href="/events?type=meeting"
      className={cn("inline-flex items-center gap-2.5", className)}
    >
      <span
        aria-hidden
        className={cn(
          "relative inline-flex size-[7px] shrink-0 rounded-full",
          state?.live ? "bg-mc-green" : "bg-mc-purple",
        )}
      >
        {state?.live ? (
          <span className="absolute inset-0 animate-ping rounded-full bg-mc-green opacity-70" />
        ) : null}
      </span>
      <span className="whitespace-nowrap" suppressHydrationWarning>
        {state ? state.label : `Open meetings ${site.meeting.short.replace("Every", "every")}`}
      </span>
    </Link>
  );
}
