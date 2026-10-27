"use client";

import * as React from "react";
import { DirectoryShell, DirectoryEmpty } from "./directory-shell";
import { DirectoryRow } from "./directory-row";
import { FilterGroup } from "./filter-group";
import {
  useDirectoryState,
  inertState,
  matches,
  type DirectoryState,
} from "./use-directory-state";
import { DateTile, EventTypePill, TodayBadge } from "@/components/event-badges";
import { AddToCalendar } from "@/components/add-to-calendar";
import { Pill } from "@/components/primitives/pill";
import { eventTypes } from "@/content/events";
import { getCommittee } from "@/content/committees";
import type { Event, EventType } from "@/content/types";
import { fmtEventWhen, monthKey, monthLabel } from "@/lib/dates";
import { cn } from "cn";

const KEYS = ["type", "month", "when"] as const;

type Props = {
  upcoming: Event[];
  past: Event[];
  now: string;
};

export function EventsDirectory(props: Props) {
  return <EventsDirectoryView s={useDirectoryState(KEYS)} {...props} />;
}

export function EventsDirectoryStatic(props: Props) {
  return <EventsDirectoryView s={inertState(KEYS)} {...props} />;
}

function EventsDirectoryView({
  s,
  upcoming,
  past,
  now,
}: { s: DirectoryState<(typeof KEYS)[number]> } & Props) {
  const nowDate = React.useMemo(() => new Date(now), [now]);
  // Default (nothing in the URL) shows upcoming only; the checkbox reflects that.
  const when = s.filters.when.length ? s.filters.when : ["upcoming"];
  const showPast = when.includes("past");
  const showUpcoming = when.includes("upcoming");

  const all = [...(showUpcoming ? upcoming : []), ...(showPast ? past : [])];

  const list = all.filter((e) => {
    if (s.filters.type.length && !s.filters.type.includes(e.type)) return false;
    if (s.filters.month.length && !s.filters.month.includes(monthKey(e.start)))
      return false;
    return matches(s.q, e.title, e.location, e.description, eventTypes[e.type], e.host);
  });

  const months = Array.from(new Set(all.map((e) => monthKey(e.start)))).sort();

  return (
    <DirectoryShell
      search={s.q}
      onSearch={s.setQ}
      searchPlaceholder="Search events…"
      activeCount={s.activeCount}
      onClear={s.clear}
      resultLabel={`${list.length} ${list.length === 1 ? "event" : "events"}`}
      filters={
        <>
          <FilterGroup
            id="when"
            title="When"
            selected={when}
            onChange={(v) => s.setFilter("when", v)}
            options={[
              { value: "upcoming", label: "Upcoming", count: upcoming.length },
              { value: "past", label: "Past", count: past.length },
            ]}
          />
          <FilterGroup
            id="type"
            title="Type"
            selected={s.filters.type}
            onChange={(v) => s.setFilter("type", v)}
            options={(Object.keys(eventTypes) as EventType[]).map((t) => ({
              value: t,
              label: eventTypes[t],
              count: all.filter((e) => e.type === t).length,
            }))}
          />
          <FilterGroup
            id="month"
            title="Month"
            selected={s.filters.month}
            onChange={(v) => s.setFilter("month", v)}
            defaultOpen={false}
            options={months.map((m) => ({
              value: m,
              label: monthLabel(m),
              count: all.filter((e) => monthKey(e.start) === m).length,
            }))}
          />
        </>
      }
      empty={
        list.length === 0 ? (
          <DirectoryEmpty onClear={s.clear}>
            No events match. Try including past events.
          </DirectoryEmpty>
        ) : null
      }
    >
      {list.map((e) => {
        const isPastEvent = past.includes(e);
        const com = e.committee ? getCommittee(e.committee) : undefined;
        return (
          <DirectoryRow
            key={e.slug}
            id={e.slug}
            href={e.rsvpUrl ?? `/events#${e.slug}`}
            external={!!e.rsvpUrl}
            className={cn(isPastEvent && "opacity-80")}
            leading={<DateTile iso={e.start} approximate={e.approximate} />}
            title={e.title}
            description={
              <>
                {e.location}
                {e.host ? (
                  <span className="text-ink-muted/80"> · Hosted by {e.host}</span>
                ) : null}
              </>
            }
            pills={
              <>
                <TodayBadge event={e} now={nowDate} />
                {isPastEvent ? <Pill tone="neutral">Past</Pill> : null}
                <EventTypePill type={e.type} />
                {com ? <Pill tone={com.color}>{com.shortName ?? com.name}</Pill> : null}
              </>
            }
            meta={
              <span className="flex items-center gap-2">
                <span>{fmtEventWhen(e)}</span>
                {!isPastEvent ? <AddToCalendar event={e} /> : null}
              </span>
            }
          />
        );
      })}
    </DirectoryShell>
  );
}
