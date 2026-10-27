import Link from "next/link";
import { Container } from "@/components/primitives/container";
import { SectionHeading } from "@/components/primitives/section-heading";
import { DirectoryRow } from "@/components/directory/directory-row";
import { DateTile, EventTypePill, TodayBadge } from "@/components/event-badges";
import { events } from "@/content/events";
import { fmtEventWhen, splitEvents } from "@/lib/dates";
import { Reveal } from "@/components/primitives/reveal";
import { Todo } from "@/components/primitives/todo-chip";

export function UpcomingEvents() {
  const { upcoming } = splitEvents(events);
  const seen = new Set<string>();
  const next4 = upcoming
    .filter((e) => {
      const base = e.recurring ? e.title : e.slug;
      if (seen.has(base)) return false;
      seen.add(base);
      return true;
    })
    .slice(0, 4);

  return (
    <section className="border-b border-line">
      <Container className="pt-20 md:pt-28">
        <SectionHeading
          eyebrow="03 — Events"
          title="Coming up on campus"
          description="Open meetings, cultural nights, Club Rush, Advocacy Day. If SGA or SAB is running it, it is here."
          action={{ label: "View all events", href: "/events" }}
        />
      </Container>
      <Reveal as="ul" className="flex flex-col border-t border-line">
        {next4.map((e) => (
          <DirectoryRow
            key={e.slug}
            animate="reveal"
            href={`/events#${e.slug}`}
            className="px-6 md:px-10"
            leading={<DateTile iso={e.start} approximate={e.approximate} />}
            title={e.title}
            description={<Todo value={e.location} fallback="Venue to be announced" />}
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
      <Container className="py-5">
        <p className="font-mono text-[11px] tracking-[0.04em] text-ink-muted uppercase">
          Want your club’s event listed?{" "}
          <Link href="/contact" className="text-ink underline underline-offset-4">
            Tell Public Outreach
          </Link>
        </p>
      </Container>
    </section>
  );
}
