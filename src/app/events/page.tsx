import type { Metadata } from "next";
import { Suspense } from "react";
import Image from "next/image";
import {
  EventsDirectory,
  EventsDirectoryStatic,
} from "@/components/directory/events-directory";
import { Todo, TodoChip } from "@/components/primitives/todo-chip";
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
      <header className="border-b border-line bg-bg">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-6 pt-28 pb-12 md:px-10 md:pt-32 md:pb-16 lg:grid-cols-12 lg:gap-10">
          <div className="flex flex-col justify-end lg:col-span-7">
            <p className="eyebrow">Events</p>
            <h1 className="serif-display mt-5 max-w-[14ch] text-[44px] md:text-[72px]">
              What’s happening on campus.
            </h1>
            <p className="lede mt-6 max-w-[56ch]">
              {`SGA open meetings are every other ${site.meeting.day} at ${site.meeting.time.split("–")[0]} PM in ${site.meeting.location}. Everything else SGA and SAB run is listed here.`}
            </p>
            <p className="mt-4 text-xs text-ink-muted">
              Dates marked “TBD” are approximate.{" "}
              <TodoChip note="Add Fall 2026 events from Instagram with dates and covers" />
            </p>
          </div>
          <figure className="lg:col-span-5">
            <div className="flex items-center justify-between border-t border-line pt-3 font-mono text-[11px] tracking-[0.08em] text-ink-muted uppercase">
              <span>Fall on the Quad</span>
              <span>Fig. 01</span>
            </div>
            <div className="relative mt-4 aspect-[3/2] overflow-hidden border border-line bg-surface">
              <Image
                src="/images/fall-on-the-quad.jpg"
                alt="Students in costume laughing together on the Quad, one holding a pumpkin and an ‘Oh My Gourd’ sign"
                fill
                priority
                sizes="(min-width: 1024px) 520px, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3 font-mono text-[11px] tracking-[0.04em] text-ink-muted uppercase">
              <Todo
                value="TODO: name this event and add the date"
                fallback="On the Rockville Quad"
              />
            </figcaption>
          </figure>
        </div>
      </header>
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
