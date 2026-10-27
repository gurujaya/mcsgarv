import Link from "next/link";
import { Container } from "@/components/primitives/container";
import { SectionHeading } from "@/components/primitives/section-heading";
import { DirectoryRow } from "@/components/directory/directory-row";
import { DateTile, EventTypePill, TodayBadge } from "@/components/event-badges";
import { events } from "@/content/events";
import { fmtEventWhen, splitEvents } from "@/lib/dates";
import { Reveal } from "@/components/primitives/reveal";

export function UpcomingEvents() {
  const { upcoming } = splitEvents(events);
  // Show at most one occurrence of each recurring event in the preview.
  const seen = new Set<string>();
  const next3 = upcoming
    .filter((e) => {
      const base = e.recurring ? e.title : e.slug;
      if (seen.has(base)) return false;
      seen.add(base);
      return true;
    })
    .slice(0, 3);

  return (
    <Container as="section" className="py-20 md:py-28">
      <SectionHeading
        eyebrow="Events"
        title="Coming up on campus"
        description="Open meetings, cultural nights, Club Rush, Advocacy Day. If SGA or SAB is running it, it is here."
        action={{ label: "View all events", href: "/events" }}
      />
      <Reveal as="ul" className="flex flex-col gap-2">
        {next3.map((e) => (
          <DirectoryRow
            key={e.slug}
            animate="reveal"
            href={`/events#${e.slug}`}
            leading={<DateTile iso={e.start} approximate={e.approximate} />}
            title={e.title}
            description={e.location}
            pills={
              <>
                <TodayBadge event={e} />
                <EventTypePill type={e.type} />
              </>
            }
            meta={fmtEventWhen(e)}
          />
        ))}
      </Reveal>
      <p className="mt-6 text-sm text-ink-muted">
        Want your club’s event listed?{" "}
        <Link
          href="/contact"
          className="text-mc-purple underline-offset-4 hover:underline"
        >
          Tell the Public Outreach committee.
        </Link>
      </p>
    </Container>
  );
}
