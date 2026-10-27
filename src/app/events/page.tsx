import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHeader } from "@/components/page-header";
import {
  EventsDirectory,
  EventsDirectoryStatic,
} from "@/components/directory/events-directory";
import { TodoChip } from "@/components/primitives/todo-chip";
import { events } from "@/content/events";
import { site } from "@/content/site";
import { splitEvents } from "@/lib/dates";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Upcoming and past SGA Rockville events: open meetings, Club Rush, cultural nights, Student Advocacy Day, and more. Export any event to your calendar.",
};

// Upcoming/past is computed from the current date at render time; refresh hourly.
export const revalidate = 3600;

export default function EventsPage() {
  const now = new Date();
  const { upcoming, past } = splitEvents(events, now);

  return (
    <>
      <PageHeader
        compact
        eyebrow="Events"
        title="What’s happening on campus."
        description={`SGA open meetings are every other ${site.meeting.day} at ${site.meeting.time.split("–")[0]} PM in ${site.meeting.location}. Everything else SGA and SAB run is listed here.`}
      >
        <p className="mt-4 text-xs text-ink-muted">
          Dates marked “TBD” are approximate.{" "}
          <TodoChip note="Add Fall 2026 events from Instagram with dates and covers" />
        </p>
      </PageHeader>
      <Suspense
        fallback={
          <EventsDirectoryStatic
            upcoming={upcoming}
            past={past}
            now={now.toISOString()}
          />
        }
      >
        <EventsDirectory upcoming={upcoming} past={past} now={now.toISOString()} />
      </Suspense>
    </>
  );
}
