import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { Suspense } from "react";
import { TodoChip } from "@/components/primitives/todo-chip";
import {
  SenateGrid,
  SenateGridStatic,
  type SenateFilter,
  type SenateMember,
} from "@/components/senate-grid";
import { committees, getCommittee } from "@/content/committees";
import { advisors, elected, initials, officers, senators } from "@/content/people";
import type { Person } from "@/content/types";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Senators & Officers",
  description: `The ${elected.length} elected officers and senators-at-large representing Rockville Campus students in ${site.term}.`,
};

const lastName = (p: Person) =>
  p.name
    .replace(/\(.*?\)/g, "")
    .trim()
    .split(/\s+/)
    .slice(-1)[0] ?? "";
const senateSorted = [...senators].sort((a, b) => lastName(a).localeCompare(lastName(b)));

const senateMembers: SenateMember[] = senateSorted.map((p) => ({
  slug: p.slug,
  name: p.name,
  photo: p.photo,
  email: p.email,
  unconfirmed: p.unconfirmed,
  seats: p.committees
    .map((slug) => getCommittee(slug))
    .filter((c): c is NonNullable<typeof c> => !!c)
    .map((c) => ({
      slug: c.slug,
      label: c.shortName ?? c.name,
      tag:
        c.chair === p.name
          ? ("Chair" as const)
          : c.coChair === p.name
            ? ("Co-chair" as const)
            : undefined,
    })),
}));

const senateFilters: SenateFilter[] = committees
  .map((c) => ({
    slug: c.slug,
    label: c.shortName ?? c.name,
    count: senateMembers.filter((m) => m.seats.some((s) => s.slug === c.slug)).length,
  }))
  .filter((f) => f.count > 0);

function Portrait({ p, className = "" }: { p: Person; className?: string }) {
  return p.photo ? (
    <Image
      src={p.photo}
      alt={p.name}
      fill
      sizes="(min-width: 1024px) 340px, 50vw"
      className={`object-cover object-top transition-[filter,transform] duration-500 ${className}`}
    />
  ) : (
    <div className="flex size-full items-center justify-center font-mono text-[22px] tracking-[0.06em] text-ink-faint">
      {initials(p.name)}
    </div>
  );
}

function Committees({ p }: { p: Person }) {
  const list = p.committees.map((c) => getCommittee(c)).filter(Boolean);
  if (!list.length) return null;
  return (
    <p className="mt-1 font-mono text-[10px] tracking-[0.06em] text-ink-muted uppercase">
      {list
        .map((c) => {
          const label = c!.shortName ?? c!.name;
          if (c!.chair === p.name) return `${label} · Chair`;
          if (c!.coChair === p.name) return `${label} · Co-chair`;
          return label;
        })
        .join(" · ")}
    </p>
  );
}

export default function SenatorsPage() {
  return (
    <>
      {/* Header: statement + facts cells */}
      <header className="border-b border-line bg-bg">
        <div className="mx-auto grid max-w-[1400px] gap-10 px-6 pt-28 pb-12 md:px-10 md:pt-32 md:pb-16 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="font-mono text-[11px] tracking-[0.14em] text-ink-muted uppercase">
              {site.term} · Rockville Campus
            </p>
            <h1 className="serif-display mt-5 max-w-[12ch] text-[48px] md:text-[80px]">
              The people you elected.
            </h1>
            <p className="mt-6 max-w-[50ch] text-[16px] leading-[1.55] text-ink-muted">
              Thirty students chosen by students. Every one of them is at the open meeting
              every other Monday, so the fastest way to reach any of them is to show up.
            </p>
          </div>
          <dl className="grid grid-cols-2 border border-line bg-surface sm:grid-cols-4 lg:col-span-5">
            {[
              [String(elected.length), "Elected"],
              [String(officers.length), "Officers"],
              [String(senators.length), "Senators"],
              [String(committees.length), "Committees"],
            ].map(([v, k], i) => (
              <div
                key={k}
                className={`px-4 py-4 ${i % 2 === 1 ? "border-l border-line" : ""} ${i >= 2 ? "border-t border-line sm:border-t-0 sm:border-l" : ""}`}
              >
                <dd className="font-serif text-[36px] leading-none text-ink">{v}</dd>
                <dt className="mt-2 font-mono text-[10px] tracking-[0.1em] text-ink-muted uppercase">
                  {k}
                </dt>
              </div>
            ))}
          </dl>
        </div>
      </header>

      {/* Executive Board */}
      <section className="bg-surface">
        <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-10 md:py-24">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="font-mono text-[11px] tracking-[0.14em] text-ink-muted uppercase">
                Executive Board
              </p>
              <h2 className="serif-display mt-4 text-[34px] md:text-[48px]">Officers</h2>
            </div>
            <p className="font-mono text-[11px] tracking-[0.08em] text-ink-muted uppercase">
              Elected campus-wide
            </p>
          </div>
          <ol className="mt-10 grid grid-cols-2 gap-px border border-line bg-line lg:grid-cols-4">
            {officers.map((p) => (
              <li
                key={p.slug}
                id={p.slug}
                className="group flex flex-col bg-surface p-3 md:p-4"
              >
                <div className="relative aspect-[4/5] overflow-hidden border border-line bg-bg">
                  <span
                    aria-hidden
                    className="absolute top-0 left-0 z-10 size-3 border-t border-l border-ink/40"
                  />
                  <span
                    aria-hidden
                    className="absolute top-0 right-0 z-10 size-3 border-t border-r border-ink/40"
                  />
                  <span
                    aria-hidden
                    className="absolute bottom-0 left-0 z-10 size-3 border-b border-l border-ink/40"
                  />
                  <span
                    aria-hidden
                    className="absolute right-0 bottom-0 z-10 size-3 border-r border-b border-ink/40"
                  />
                  <Portrait p={p} />
                  <span className="absolute top-3 left-3 z-10 bg-ink px-2 py-1 font-mono text-[10px] tracking-[0.1em] text-white uppercase">
                    {p.role}
                  </span>
                </div>
                <div className="flex flex-1 flex-col px-1 pt-4 pb-2">
                  <h3 className="font-serif text-[22px] leading-none tracking-[-0.01em] text-ink md:text-[28px]">
                    {p.name}
                  </h3>
                  <Committees p={p} />
                  <div className="mt-auto flex items-center gap-2 pt-4">
                    {p.email ? (
                      <a
                        href={`mailto:${p.email}`}
                        aria-label={`Email ${p.name}`}
                        className="inline-flex size-8 items-center justify-center border border-line text-ink-muted hover:border-ink hover:text-ink"
                      >
                        <Mail className="size-3.5" />
                      </a>
                    ) : null}
                    {p.unconfirmed ? (
                      <TodoChip note="Confirm this person's role" />
                    ) : null}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Senate: dense numbered grid, alphabetical */}
      <section className="border-y border-line bg-bg">
        <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-10 md:py-24">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="font-mono text-[11px] tracking-[0.14em] text-ink-muted uppercase">
                Senate
              </p>
              <h2 className="serif-display mt-4 text-[34px] md:text-[48px]">
                Senators-at-Large
              </h2>
            </div>
            <p className="font-mono text-[11px] tracking-[0.08em] text-ink-muted uppercase">
              A–Z by last name
            </p>
          </div>
          <div className="mt-8">
            <Suspense
              fallback={
                <SenateGridStatic members={senateMembers} filters={senateFilters} />
              }
            >
              <SenateGrid members={senateMembers} filters={senateFilters} />
            </Suspense>
          </div>
          {advisors.map((p) => (
            <div
              key={p.slug}
              id={p.slug}
              className="mt-px flex flex-col gap-3 border border-line bg-surface px-5 py-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-mono text-[10px] tracking-[0.12em] text-ink-muted uppercase">
                  Advisor · Office of Student Life
                </p>
                <p className="mt-1.5 text-[16px] font-medium text-ink">
                  {p.name}
                  {p.bio ? (
                    <span className="font-normal text-ink-muted"> · {p.bio}</span>
                  ) : null}
                </p>
              </div>
              <div className="flex items-center gap-3">
                {p.email ? (
                  <a
                    href={`mailto:${p.email}`}
                    className="font-mono text-[11px] tracking-[0.06em] text-ink underline underline-offset-4"
                  >
                    {p.email}
                  </a>
                ) : null}
                {p.unconfirmed ? <TodoChip note="Confirm the advisor title" /> : null}
              </div>
            </div>
          ))}
          <p className="mt-4 font-mono text-[11px] tracking-[0.04em] text-ink-muted uppercase">
            Roster from montgomerycollege.edu and the SGA group · photos from the Senator
            Headshots album{" "}
            <TodoChip note="Headshots still needed: Kivembele, Amin, Salerno" />
          </p>
        </div>
      </section>

      <section className="bg-surface">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-6 px-6 py-16 md:flex-row md:items-center md:justify-between md:px-10 md:py-20">
          <div>
            <h2 className="serif-display text-[32px] md:text-[44px]">
              Want your name here?
            </h2>
            <p className="mt-3 max-w-[48ch] text-[15px] text-ink-muted">
              Senator-at-Large positions are elected. Applications go to the Office of
              Student Life.
            </p>
          </div>
          <Link
            href={site.applyUrl}
            className="mono-button bg-mc-purple text-white hover:bg-[#45186f]"
          >
            How to apply <ArrowRight className="size-3.5" aria-hidden />
          </Link>
        </div>
      </section>
    </>
  );
}
