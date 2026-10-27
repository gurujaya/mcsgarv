import type { Metadata } from "next";
import Link from "next/link";
import { Mail } from "lucide-react";
import { Avatar } from "@/components/primitives/avatar";
import { TodoChip } from "@/components/primitives/todo-chip";
import { getCommittee } from "@/content/committees";
import { advisors, elected, officers, senators } from "@/content/people";
import type { Person } from "@/content/types";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Senators & Officers",
  description: `The ${elected.length} elected officers and senators-at-large representing Rockville Campus students in ${site.term}.`,
};

function PersonCard({ p, large }: { p: Person; large?: boolean }) {
  const coms = p.committees.map((c) => getCommittee(c)).filter(Boolean);
  return (
    <li id={p.slug} className="flex flex-col bg-surface p-6 md:p-7">
      <Avatar name={p.name} photo={p.photo} size={large ? "xl" : "lg"} />
      <p className="mt-6 font-mono text-[11px] tracking-[0.1em] text-ink-muted uppercase">
        {p.role}
      </p>
      <h3
        className={
          large
            ? "mt-2 font-serif text-[30px] leading-[1.05] text-ink"
            : "mt-1.5 text-[17px] font-medium tracking-[-0.01em] text-ink"
        }
      >
        {p.name}
      </h3>
      {p.bio ? <p className="mt-2 text-[14px] text-ink-muted">{p.bio}</p> : null}
      {coms.length ? (
        <p className="mt-2 text-[13px] text-ink-muted">
          {coms.map((c, i) => (
            <span key={c!.slug}>
              {i > 0 ? " · " : ""}
              <Link
                href={`/committees/${c!.slug}`}
                className="underline decoration-line-strong underline-offset-4 hover:decoration-ink"
              >
                {c!.shortName ?? c!.name}
              </Link>
            </span>
          ))}
        </p>
      ) : null}
      <div className="mt-auto flex items-center gap-2 pt-6">
        {p.email ? (
          <a
            href={`mailto:${p.email}`}
            className="inline-flex size-8 items-center justify-center rounded-[5px] border border-line text-ink-muted hover:border-line-strong hover:text-ink"
            aria-label={`Email ${p.name}`}
          >
            <Mail className="size-3.5" />
          </a>
        ) : null}
        {p.unconfirmed ? <TodoChip note="Confirm this person's role" /> : null}
      </div>
    </li>
  );
}

function Group({
  eyebrow,
  title,
  people,
  cols,
  large,
}: {
  eyebrow: string;
  title: string;
  people: Person[];
  cols: string;
  large?: boolean;
}) {
  if (!people.length) return null;
  return (
    <section className="border-t border-line py-16 md:py-24">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="font-mono text-[11px] tracking-[0.14em] text-ink-muted uppercase">
              {eyebrow}
            </p>
            <h2 className="serif-display mt-4 text-[36px] md:text-[48px]">{title}</h2>
          </div>
          <p className="font-mono text-[12px] text-ink-muted">{people.length}</p>
        </div>
        <ul className={`grid gap-px border border-line bg-line ${cols}`}>
          {people.map((p) => (
            <PersonCard key={p.slug} p={p} large={large} />
          ))}
        </ul>
      </div>
    </section>
  );
}

export default function SenatorsPage() {
  return (
    <>
      <header className="mx-auto max-w-[1400px] px-6 pt-32 pb-16 md:px-10 md:pt-40 md:pb-24">
        <p className="font-mono text-[11px] tracking-[0.14em] text-ink-muted uppercase">
          {site.term} · Rockville Campus
        </p>
        <h1 className="serif-display mt-6 max-w-[14ch] text-[52px] md:text-[96px]">
          The people you elected.
        </h1>
        <p className="mt-8 max-w-[52ch] text-[17px] leading-[1.55] text-ink-muted">
          {officers.length} Executive Board officers and {senators.length}{" "}
          Senators-at-Large. Every one of them is at the Monday open meeting,{" "}
          {site.meeting.time}, so the fastest way to reach them is to show up.
        </p>
        <p className="mt-6 text-[12px] text-ink-muted">
          Roster from montgomerycollege.edu and the SGA group.{" "}
          <TodoChip note="Confirm roles marked unconfirmed in people.ts; add photos to /public/people" />
        </p>
      </header>

      <Group
        eyebrow="Executive Board"
        title="Officers"
        people={officers}
        cols="sm:grid-cols-2 lg:grid-cols-4"
        large
      />
      <Group
        eyebrow="Senate"
        title="Senators-at-Large"
        people={senators}
        cols="sm:grid-cols-2 lg:grid-cols-4"
      />
      <Group
        eyebrow="Office of Student Life"
        title="Advisors"
        people={advisors}
        cols="sm:grid-cols-2 lg:grid-cols-4"
      />

      <section className="border-t border-line">
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
            className="mono-button bg-ink text-white hover:bg-mc-purple"
          >
            How to apply
          </Link>
        </div>
      </section>
    </>
  );
}
