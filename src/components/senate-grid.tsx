"use client";

import * as React from "react";
import Image from "next/image";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { parseAsString, useQueryState } from "nuqs";
import { Mail } from "lucide-react";
import { cn } from "cn";
import { initials } from "@/content/people";

export type SenateMember = {
  slug: string;
  name: string;
  photo?: string;
  email?: string;
  seats: { slug: string; label: string; tag?: "Chair" | "Co-chair" }[];
  unconfirmed?: boolean;
};
export type SenateFilter = { slug: string; label: string; count: number };

const spring = { type: "spring", stiffness: 420, damping: 38, mass: 0.8 } as const;

function Grid({
  members,
  filters,
  active,
  onChange,
}: {
  members: SenateMember[];
  filters: SenateFilter[];
  active: string;
  onChange: (v: string) => void;
}) {
  const shown = active
    ? members.filter((m) => m.seats.some((s) => s.slug === active))
    : members;

  return (
    <div>
      {/* Filter rail */}
      <div className="flex flex-wrap items-center gap-x-1 gap-y-2 border-y border-line py-3">
        <span className="mr-3 font-mono text-[11px] tracking-[0.12em] text-ink-muted uppercase">
          Show
        </span>
        {[{ slug: "", label: "Everyone", count: members.length }, ...filters].map((f) => {
          const on = active === f.slug;
          return (
            <button
              key={f.slug || "all"}
              type="button"
              onClick={() => onChange(f.slug)}
              aria-pressed={on}
              className={cn(
                "relative inline-flex h-8 items-center gap-2 px-3 font-mono text-[11px] tracking-[0.08em] uppercase transition-colors",
                on ? "text-ink" : "text-ink-muted hover:text-ink",
              )}
            >
              {on ? (
                <motion.span
                  layoutId="senate-filter"
                  className="absolute inset-0 border border-ink"
                  transition={spring}
                />
              ) : null}
              <span className="relative">{f.label}</span>
              <span
                className={cn(
                  "relative text-[10px]",
                  on ? "text-ink-muted" : "text-ink-faint",
                )}
              >
                {f.count}
              </span>
            </button>
          );
        })}
      </div>

      <p
        className="mt-4 font-mono text-[11px] tracking-[0.06em] text-ink-muted uppercase"
        aria-live="polite"
      >
        {shown.length} {shown.length === 1 ? "senator" : "senators"}
        {active
          ? ` on ${filters.find((f) => f.slug === active)?.label ?? ""}`
          : " · A–Z by last name"}
      </p>

      <LayoutGroup>
        <motion.ol
          layout
          className="mt-4 grid grid-cols-2 border-t border-l border-line sm:grid-cols-3 lg:grid-cols-5"
        >
          <AnimatePresence initial={false} mode="popLayout">
            {shown.map((m, i) => {
              const seatOn = active ? m.seats.find((s) => s.slug === active) : undefined;
              return (
                <motion.li
                  key={m.slug}
                  id={m.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.15 } }}
                  transition={spring}
                  className="group relative flex flex-col border-r border-b border-line bg-surface"
                >
                  <div className="relative aspect-square overflow-hidden bg-bg">
                    {m.photo ? (
                      <Image
                        src={m.photo}
                        alt={m.name}
                        fill
                        sizes="(min-width: 1024px) 270px, (min-width: 640px) 33vw, 50vw"
                        className="object-cover object-top grayscale transition-[filter,transform] duration-500 group-hover:scale-[1.03] group-hover:grayscale-0"
                      />
                    ) : (
                      <div className="flex size-full items-center justify-center font-mono text-[22px] tracking-[0.06em] text-ink-faint">
                        {initials(m.name)}
                      </div>
                    )}
                    <span className="absolute top-2 left-2 font-mono text-[10px] tracking-[0.1em] text-ink/70 mix-blend-multiply">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {seatOn?.tag ? (
                      <span className="absolute top-2 right-2 bg-ink px-1.5 py-0.5 font-mono text-[10px] tracking-[0.1em] text-white uppercase">
                        {seatOn.tag}
                      </span>
                    ) : null}
                    {/* hover sheet: seats + mail */}
                    <div className="absolute inset-x-0 bottom-0 translate-y-full bg-ink/90 px-3 py-2.5 text-white transition-transform duration-300 group-focus-within:translate-y-0 group-hover:translate-y-0">
                      <p className="font-mono text-[10px] leading-[1.6] tracking-[0.06em] uppercase">
                        {m.seats.length
                          ? m.seats
                              .map((s) => (s.tag ? `${s.label} · ${s.tag}` : s.label))
                              .join(" / ")
                          : "No committee listed yet"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start justify-between gap-2 px-3 pt-3 pb-3.5">
                    <div>
                      <h3 className="text-[14px] leading-[1.2] font-medium tracking-[-0.01em] text-ink">
                        {m.name}
                      </h3>
                      {m.seats.length ? (
                        <p className="mt-1 font-mono text-[10px] tracking-[0.06em] text-ink-muted uppercase">
                          {m.seats.map((s) => s.label).join(" · ")}
                        </p>
                      ) : null}
                    </div>
                    {m.email ? (
                      <a
                        href={`mailto:${m.email}`}
                        aria-label={`Email ${m.name}`}
                        className="inline-flex size-7 shrink-0 items-center justify-center border border-line text-ink-muted hover:border-ink hover:text-ink"
                      >
                        <Mail className="size-3" />
                      </a>
                    ) : null}
                  </div>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </motion.ol>
      </LayoutGroup>
    </div>
  );
}

/** URL-synced (?committee=slug) so a filtered view is shareable. */
export function SenateGrid(props: { members: SenateMember[]; filters: SenateFilter[] }) {
  const [active, setActive] = useQueryState(
    "committee",
    parseAsString
      .withDefault("")
      .withOptions({ history: "replace", clearOnDefault: true, shallow: true }),
  );
  return <Grid {...props} active={active} onChange={(v) => void setActive(v)} />;
}

/** Server-rendered fallback while the URL state hydrates. */
export function SenateGridStatic(props: {
  members: SenateMember[];
  filters: SenateFilter[];
}) {
  return <Grid {...props} active="" onChange={() => {}} />;
}
