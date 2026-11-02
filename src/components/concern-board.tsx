"use client";

import * as React from "react";
import Link from "next/link";
import { parseAsString, useQueryState } from "nuqs";
import { cn } from "cn";
import { concernCategories, concernStatuses, statusOrder } from "@/content/concerns";
import type { Concern, ConcernStatus } from "@/content/types";

export type BoardItem = Concern & {
  owner?: { label: string; href: string };
};

const dot: Record<ConcernStatus, string> = {
  received: "border border-ink-faint bg-transparent",
  "in-progress": "bg-mc-purple",
  resolved: "bg-mc-green",
  closed: "bg-line-strong",
};

/** "Oct 14, 2026" from a YYYY-MM-DD string, without time-zone drift. */
function fmtDay(ymd: string, year = true): string {
  const [y, m, d] = ymd.split("-").map(Number);
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "UTC",
    month: "short",
    day: "numeric",
    year: year ? "numeric" : undefined,
  }).format(new Date(Date.UTC(y, m - 1, d)));
}

export function ConcernBoard({ items }: { items: BoardItem[] }) {
  const [status, setStatus] = useQueryState("status", parseAsString.withDefault(""));
  const active = statusOrder.includes(status as ConcernStatus)
    ? (status as ConcernStatus)
    : "";
  const shown = active ? items.filter((c) => c.status === active) : items;
  const count = (s: ConcernStatus) => items.filter((c) => c.status === s).length;

  if (!items.length) {
    return (
      <p className="mt-8 max-w-[52ch] border-t border-line pt-6 text-[16px] leading-[1.6] text-ink-muted">
        Nothing has been logged this term yet. The first concern raised here or at an open
        meeting will appear on this page, with its status.
      </p>
    );
  }

  return (
    <div className="mt-8">
      <div
        role="group"
        aria-label="Filter by status"
        className="flex flex-wrap gap-x-6 gap-y-2 border-b border-line"
      >
        {[
          { key: "" as const, label: "All", n: items.length },
          ...statusOrder.map((s) => ({
            key: s,
            label: concernStatuses[s].label,
            n: count(s),
          })),
        ].map((f) => {
          const on = active === f.key;
          return (
            <button
              key={f.key || "all"}
              type="button"
              aria-pressed={on}
              onClick={() => setStatus(f.key || null)}
              className={cn(
                "-mb-px flex h-11 items-baseline gap-2 border-b text-[15px] transition-colors",
                on
                  ? "border-ink text-ink"
                  : "border-transparent text-ink-muted hover:text-ink",
              )}
            >
              {f.label}
              <span className="text-[13px] text-ink-faint">{f.n}</span>
            </button>
          );
        })}
      </div>

      {shown.length ? (
        <ol>
          {shown.map((c) => {
            const last = c.updates[c.updates.length - 1];
            return (
              <li
                key={c.id}
                id={`c-${c.id}`}
                className="grid scroll-mt-28 gap-x-10 gap-y-4 border-b border-line py-7 lg:grid-cols-[minmax(0,1fr)_10rem]"
              >
                <div className="min-w-0">
                  <h3 className="max-w-[40ch] font-serif text-[24px] leading-[1.12] tracking-[-0.01em] text-ink md:text-[28px]">
                    {c.title}
                  </h3>
                  <p className="mt-2.5 flex flex-wrap gap-x-5 gap-y-1 text-[14px] text-ink-muted">
                    <span>{concernCategories[c.category]}</span>
                    <span>Raised {fmtDay(c.raised)}</span>
                    {c.owner ? (
                      <Link
                        href={c.owner.href}
                        className="text-ink-muted underline decoration-line-strong underline-offset-4 hover:text-ink"
                      >
                        {c.owner.label}
                      </Link>
                    ) : null}
                  </p>
                  {c.updates.length ? (
                    <ol className="mt-5 max-w-[62ch]">
                      {c.updates.map((u, i) => (
                        <li
                          key={`${u.date}-${i}`}
                          className="grid grid-cols-[5.5rem_1fr] gap-4 py-1.5 text-[15px] leading-[1.55]"
                        >
                          <span className="text-ink-faint tabular-nums">
                            {fmtDay(u.date, false)}
                          </span>
                          <span className={u === last ? "text-ink" : "text-ink-muted"}>
                            {u.note}
                          </span>
                        </li>
                      ))}
                    </ol>
                  ) : null}
                </div>
                <p className="flex items-center gap-2.5 self-start text-[15px] text-ink lg:justify-end">
                  <span
                    aria-hidden
                    className={cn("size-[7px] shrink-0 rounded-full", dot[c.status])}
                  />
                  {concernStatuses[c.status].label}
                </p>
              </li>
            );
          })}
        </ol>
      ) : (
        <p className="pt-6 text-[15px] text-ink-muted">
          Nothing is {concernStatuses[active as ConcernStatus].label.toLowerCase()} right
          now.
        </p>
      )}
    </div>
  );
}
