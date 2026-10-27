import Link from "next/link";
import { events } from "@/content/events";
import { fmtEventWhen, splitEvents } from "@/lib/dates";
import { eventTypes } from "@/content/events";
import { Todo } from "@/components/primitives/todo-chip";
import { AddToCalendar } from "@/components/add-to-calendar";

export function NextEvents() {
  const { upcoming } = splitEvents(events);
  const seen = new Set<string>();
  const next = upcoming
    .filter((e) => {
      const key = e.recurring ? e.title : e.slug;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, 4);

  return (
    <section className="bg-surface">
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-[11px] tracking-[0.14em] text-ink-muted uppercase">
              Up next
            </p>
            <h2 className="serif-display mt-5 text-[40px] md:text-[56px]">
              On campus soon.
            </h2>
          </div>
          <Link
            href="/events"
            className="mono-button border border-line-strong text-ink hover:border-ink"
          >
            All events
          </Link>
        </div>
        <ul className="mt-14 grid gap-px border border-line bg-line md:grid-cols-4">
          {next.map((e) => (
            <li key={e.slug} className="flex flex-col bg-surface p-6">
              <p className="font-mono text-[11px] tracking-[0.1em] text-ink-muted uppercase">
                {eventTypes[e.type]}
              </p>
              <h3 className="mt-5 font-serif text-[26px] leading-[1.05] tracking-[-0.01em] text-ink">
                <Link
                  href={`/events#${e.slug}`}
                  className="hover:underline hover:underline-offset-4"
                >
                  {e.title}
                </Link>
              </h3>
              <p className="mt-3 text-[14px] text-ink-muted">
                <Todo value={e.location} fallback="Venue to be announced" />
              </p>
              <div className="mt-auto flex items-center justify-between gap-3 pt-8">
                <p className="font-mono text-[11px] tracking-[0.04em] text-ink">
                  {fmtEventWhen(e)}
                </p>
                <AddToCalendar event={e} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
