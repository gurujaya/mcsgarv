import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Reveal, RevealItem } from "@/components/primitives/reveal";
import { Todo } from "@/components/primitives/todo-chip";
import { committees } from "@/content/committees";
import { elected } from "@/content/people";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Why the Montgomery College Rockville SGA exists, how student activity fees move through it, how a concern travels from a student to a decision, and who it answers to.",
};

const Eyebrow = ({ children, light }: { children: React.ReactNode; light?: boolean }) => (
  <p
    className={`font-mono text-[11px] tracking-[0.14em] uppercase ${light ? "text-white/60" : "text-ink-muted"}`}
  >
    {children}
  </p>
);

function CornerMarks({ light }: { light?: boolean }) {
  const c = `absolute size-3 ${light ? "border-white/40" : "border-ink/35"}`;
  return (
    <>
      <span aria-hidden className={`${c} -top-px -left-px border-t border-l`} />
      <span aria-hidden className={`${c} -top-px -right-px border-t border-r`} />
      <span aria-hidden className={`${c} -bottom-px -left-px border-b border-l`} />
      <span aria-hidden className={`${c} -right-px -bottom-px border-r border-b`} />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

const jobs = [
  {
    n: "01",
    verb: "Represent",
    claim: "Someone elected by students is in the room when decisions get made.",
    how: "SGA represents the student body to the College administration. When campus or College leadership needs to know what students think, SGA is who they ask, and SGA brings what it has heard at open meetings and in committees.",
    where: "Campus leadership meetings · Office of Student Life · College-wide councils",
  },
  {
    n: "02",
    verb: "Fund",
    claim: "Student activity fees are spent on students, by a panel of students.",
    how: "SGA recommends the financial expenditures for student activities. Recognized clubs request money through the Budget Panel, chaired by the Treasurer, which evaluates each request on whether it promotes student engagement and strengthens campus community.",
    where: "Budget Panel · Office of Student Life processing",
  },
  {
    n: "03",
    verb: "Listen",
    claim: "Student opinion is collected on purpose, not by accident.",
    how: "SGA secures and invites student opinions regarding official policies and priorities: open floor at every meeting, the contact form, tabling at Club Rush, and committees like Food and WDCE that exist to gather feedback from specific groups.",
    where: "Open meetings · Committees · Tabling · This site",
  },
  {
    n: "04",
    verb: "Build",
    claim: "A commuter campus gets the events that make it feel like one place.",
    how: "SGA develops activities and events that enhance students’ academic and social experiences, and the Student Activities Board plans the social, cultural, and recreational calendar: the talent show, cultural nights, Club Rush, the International Ball.",
    where: "SAB · Public Outreach · Partner offices",
  },
];

const moneyFlow = [
  {
    n: "01",
    label: "Every enrolled student",
    detail: "pays a student activity fee with tuition",
  },
  {
    n: "02",
    label: "Recognized club",
    detail: "proposes an event and a line-item budget",
  },
  {
    n: "03",
    label: "SGA Budget Panel",
    detail: "Treasurer and senators test it: does this reach students?",
  },
  {
    n: "04",
    label: "Office of Student Life",
    detail: "processes approved funds, purchasing, reimbursements",
  },
  {
    n: "05",
    label: "An event on campus",
    detail: "open to the students who paid for it",
  },
];

const concernPath = [
  {
    n: "01",
    who: "You",
    what: "Raise it at open floor, through the contact form, or to any senator.",
  },
  {
    n: "02",
    who: "Secretary",
    what: "Logs it and routes it to the senator or committee that owns the topic.",
  },
  {
    n: "03",
    who: "Committee",
    what: "Gathers facts, talks to the office involved, drafts a position.",
  },
  {
    n: "04",
    who: "SGA vote",
    what: "The full body decides what to ask for and who carries it.",
  },
  {
    n: "05",
    who: "College leadership",
    what: "Hears the ask from elected students, with the evidence behind it.",
  },
  {
    n: "06",
    who: "Back to you",
    what: "The answer is reported at the next open meeting, in public.",
  },
];

const advocacyAsks = [
  "Keep tuition affordable across Maryland’s community colleges",
  "Fund a student services center for the Germantown Campus",
  "Renovate the Rockville Campus library",
];

const structure = [
  {
    level: "01",
    name: "Montgomery College leadership",
    note: "College and campus administration",
  },
  {
    level: "02",
    name: "Office of Student Life",
    note: `Advises SGA · Director ${site.studentLife.director}`,
  },
  {
    level: "03",
    name: "Student Government Association",
    note: `${elected.length} elected officers and senators`,
    me: true,
  },
  {
    level: "04",
    name: `${committees.length} committees and the Student Activities Board`,
    note: "Where the work gets done",
  },
  { level: "05", name: "130+ clubs · 15,000 students", note: "Who all of it answers to" },
];

const glance = [
  ["Campus", "Rockville, the largest of MC’s three"],
  ["Students represented", "About 15,000 per semester"],
  ["Elected members", `${elected.length}`],
  ["Open meetings", site.meeting.short],
  ["Office", `${site.office.room}, ${site.office.within}`],
  ["Term", site.term],
];

const values = [
  "Equity and inclusion",
  "Excellence",
  "Integrity",
  "Innovation",
  "Adaptability",
  "Sustainability",
  "Respect",
];

/* ------------------------------------------------------------------ */

export default function AboutPage() {
  return (
    <>
      {/* 1 · The thesis */}
      <section className="border-b border-line bg-bg">
        <div className="mx-auto grid max-w-[1400px] gap-14 px-6 pt-32 pb-20 md:px-10 md:pt-40 md:pb-28 lg:grid-cols-12 lg:gap-10">
          <div className="flex flex-col justify-end lg:col-span-7">
            <Eyebrow>About SGA</Eyebrow>
            <h1 className="serif-display mt-6 max-w-[15ch] text-[48px] md:text-[84px]">
              Fifteen thousand students. One body whose only job is to speak for them.
            </h1>
            <p className="mt-8 max-w-[54ch] text-[17px] leading-[1.55] text-ink-muted md:text-[19px]">
              The Student Government Association is the official representative body for
              all students on the Montgomery College Rockville Campus. It represents
              student interests, works closely with College leadership, and advocates for
              a positive campus experience. That is the official definition. The rest of
              this page is what it means.
            </p>
          </div>
          <figure className="lg:col-span-5">
            <div className="flex items-center justify-between border-t border-line pt-3 font-mono text-[11px] tracking-[0.08em] text-ink-muted uppercase">
              <span>Rockville SGA / {site.term}</span>
              <span>Fig. 01</span>
            </div>
            <div className="relative mt-4 aspect-[4/5] border border-line bg-surface p-3">
              <CornerMarks />
              <div className="relative size-full overflow-hidden">
                <Image
                  src="/images/sga-group.jpg"
                  alt="Rockville SGA senators and officers on a staircase before an advocacy event"
                  fill
                  sizes="(min-width: 1024px) 520px, 100vw"
                  className="object-cover grayscale-[20%]"
                />
              </div>
            </div>
            <figcaption className="mt-3 font-mono text-[11px] tracking-[0.04em] text-ink-muted uppercase">
              <Todo
                value="TODO: add where and when this photo was taken"
                fallback="Senators and officers of the Rockville SGA"
              />
            </figcaption>
          </figure>
        </div>
      </section>

      {/* 2 · The problem SGA exists to solve */}
      <section className="bg-surface">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-6 py-24 md:px-10 md:py-32 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow>Why it exists</Eyebrow>
            <h2 className="serif-display mt-5 text-[36px] md:text-[56px]">
              A commuter campus has no built-in voice.
            </h2>
          </div>
          <div className="lg:col-span-7 lg:pt-2">
            <div className="grid gap-8 text-[16px] leading-[1.65] text-ink-muted sm:grid-cols-2">
              <p>
                Rockville is the largest of Montgomery College’s three campuses. Most of
                its students arrive for class and leave for work, family, or the next
                campus. There are no dorms, no residence halls, no evening quad. The
                things that give a university its student voice by default do not exist
                here.
              </p>
              <p>
                Decisions still get made: what the dining hall serves and when, how safe
                the parking lots are, which buildings get renovated, what tuition costs
                next year, and how the student activity fee every enrolled student pays is
                actually spent. Those decisions happen whether or not a student is in the
                room.
              </p>
            </div>
            <p className="mt-10 max-w-[46ch] font-serif text-[26px] leading-[1.2] tracking-[-0.01em] text-ink md:text-[32px]">
              SGA exists so that someone elected by students is always in the room, and so
              students have a forum to decide what that person should say.
            </p>
            <p className="mt-6 max-w-[60ch] text-[15px] leading-[1.65] text-ink-muted">
              In MC’s own words, SGA acts as the conduit through which students
              communicate openly with the administration, facilitates events beneficial to
              the student body, and provides a forum for the exchange of student ideas and
              opinions. Under the Club Handbook it is also the formal channel through
              which recognized clubs propose recommendations and initiatives to the
              College.
            </p>
          </div>
        </div>
      </section>

      {/* 3 · The four jobs, as claims with mechanisms */}
      <section className="border-y border-line bg-bg">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32">
          <div className="grid gap-8 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <Eyebrow>The mandate</Eyebrow>
              <h2 className="serif-display mt-5 text-[36px] md:text-[56px]">
                Four jobs. Each one has a mechanism.
              </h2>
            </div>
            <p className="max-w-[40ch] text-[15px] leading-[1.6] text-ink-muted md:col-span-5">
              These are SGA’s four responsibilities as the College defines them. A
              responsibility without a mechanism is a slogan, so each one comes with how
              it actually happens.
            </p>
          </div>
          <Reveal as="ol" className="mt-14 border-t border-line md:mt-20">
            {jobs.map((j) => (
              <RevealItem
                key={j.n}
                as="li"
                className="grid gap-5 border-b border-line py-8 md:grid-cols-12 md:gap-8 md:py-10"
              >
                <div className="flex items-baseline gap-4 md:col-span-3">
                  <span className="font-mono text-[12px] text-ink-faint">{j.n}</span>
                  <h3 className="font-serif text-[34px] leading-none tracking-[-0.01em] text-ink md:text-[44px]">
                    {j.verb}
                  </h3>
                </div>
                <div className="md:col-span-5">
                  <p className="text-[18px] leading-[1.35] font-medium tracking-[-0.01em] text-ink">
                    {j.claim}
                  </p>
                  <p className="mt-3 text-[15px] leading-[1.65] text-ink-muted">
                    {j.how}
                  </p>
                </div>
                <div className="md:col-span-4 md:border-l md:border-line md:pl-8">
                  <p className="font-mono text-[11px] tracking-[0.1em] text-ink-faint uppercase">
                    Where it happens
                  </p>
                  <p className="mt-2 text-[14px] leading-[1.6] text-ink-muted">
                    {j.where}
                  </p>
                </div>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </section>

      {/* 4 · Follow the money */}
      <section className="bg-surface">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32">
          <div className="grid gap-8 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <Eyebrow>Follow the money</Eyebrow>
              <h2 className="serif-display mt-5 text-[36px] md:text-[56px]">
                Your fee, from your tuition bill to an event on the Quad.
              </h2>
            </div>
            <p className="max-w-[40ch] text-[15px] leading-[1.6] text-ink-muted md:col-span-5">
              Every enrolled student pays a student activity fee. SGA does not hold the
              money; it recommends how it is spent, and the recommendation is made by
              students.{" "}
              <Todo
                value="TODO: confirm the per-semester fee amount and add it here"
                fallback=""
              />
            </p>
          </div>
          <ol className="mt-14 grid border-t border-l border-line md:mt-20 md:grid-cols-5">
            {moneyFlow.map((s, i) => (
              <li
                key={s.n}
                className="relative border-r border-b border-line p-6 md:min-h-[220px]"
              >
                <div className="flex items-center justify-between font-mono text-[11px] text-ink-faint">
                  <span>{s.n}</span>
                  {i < moneyFlow.length - 1 ? (
                    <span aria-hidden className="hidden md:inline">
                      →
                    </span>
                  ) : null}
                </div>
                <p
                  className={`mt-8 text-[17px] leading-[1.3] tracking-[-0.01em] ${i === 2 ? "font-medium text-mc-purple" : "text-ink"}`}
                >
                  {s.label}
                </p>
                <p className="mt-2 text-[13px] leading-[1.55] text-ink-muted">
                  {s.detail}
                </p>
              </li>
            ))}
          </ol>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 font-mono text-[11px] tracking-[0.06em] text-ink-muted uppercase">
            <span>
              Test applied at step 03: engagement · community · benefit to the student
              body
            </span>
            <Link
              href="/funding"
              className="inline-flex items-center gap-1 text-ink hover:underline"
            >
              How to request funding <ArrowRight className="size-3.5" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* 5 · How a concern moves */}
      <section className="border-y border-line bg-bg">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-6 py-24 md:px-10 md:py-32 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Eyebrow>The conduit</Eyebrow>
              <h2 className="serif-display mt-5 text-[36px] md:text-[56px]">
                How a concern becomes a decision.
              </h2>
              <p className="mt-5 max-w-[40ch] text-[15px] leading-[1.6] text-ink-muted">
                This is the part most students never see. A complaint about dining hours
                or a broken door does not disappear into an inbox. It moves through people
                whose names you can look up, and it comes back to you in public.
              </p>
              <figure className="mt-10">
                <div className="flex items-center justify-between border-t border-line pt-3 font-mono text-[11px] tracking-[0.08em] text-ink-muted uppercase">
                  <span>Open meeting · {site.office.room}</span>
                  <span>Fig. 02</span>
                </div>
                <div className="relative mt-4 aspect-[3/2] overflow-hidden border border-line bg-surface">
                  <Image
                    src="/images/open-meeting.jpg"
                    alt="Students seated around tables in the Student Life room listening to a presenter at an open meeting"
                    fill
                    sizes="(min-width: 1024px) 560px, 100vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-3 font-mono text-[11px] tracking-[0.04em] text-ink-muted uppercase">
                  <Todo
                    value="TODO: add the date of this meeting"
                    fallback="Open floor is where step 01 usually starts"
                  />
                </figcaption>
              </figure>
            </div>
          </div>
          <ol className="border-t border-line lg:col-span-7">
            {concernPath.map((s) => (
              <li
                key={s.n}
                className="grid grid-cols-[3rem_1fr] gap-4 border-b border-line py-6 md:grid-cols-[4rem_12rem_1fr] md:py-7"
              >
                <span className="font-mono text-[12px] text-ink-faint">{s.n}</span>
                <p className="font-serif text-[24px] leading-none tracking-[-0.01em] text-ink md:text-[28px]">
                  {s.who}
                </p>
                <p className="col-span-2 text-[15px] leading-[1.6] text-ink-muted md:col-span-1">
                  {s.what}
                </p>
              </li>
            ))}
            <li className="flex flex-wrap items-center justify-between gap-4 py-6">
              <p className="font-mono text-[11px] tracking-[0.06em] text-ink-muted uppercase">
                Start at step 01 · {site.meeting.short}
              </p>
              <div className="flex gap-3">
                <Link
                  href="/contact"
                  className="mono-button h-9 border border-line-strong text-ink hover:border-ink"
                >
                  Raise a concern
                </Link>
                <Link
                  href="/events?type=meeting"
                  className="mono-button h-9 bg-ink text-white hover:bg-mc-purple"
                >
                  Next meeting <ArrowRight className="size-3.5" aria-hidden />
                </Link>
              </div>
            </li>
          </ol>
        </div>
      </section>

      {/* 6 · Proof beyond campus */}
      <section className="bg-ink text-white">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-6 py-24 md:px-10 md:py-32 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Eyebrow light>Beyond campus · every February</Eyebrow>
            <h2 className="serif-display mt-5 text-[36px] text-white md:text-[56px]">
              The voice does not stop at Mannakee Street.
            </h2>
            <p className="mt-6 max-w-[48ch] text-[16px] leading-[1.65] text-white/70">
              Once a year, students from all 16 Maryland community colleges travel to
              Annapolis for Student Advocacy Day and meet the legislators who set the
              state’s share of their tuition. Rockville SGA organizes MC’s delegation. The
              asks are specific, written down, and carried by students.
            </p>
            <Link
              href="/events?type=advocacy"
              className="mono-button mt-8 border border-white/30 text-white hover:border-white/70"
            >
              Advocacy Day <ArrowUpRight className="size-3.5" aria-hidden />
            </Link>
          </div>
          <div className="lg:col-span-6">
            <div className="relative border border-white/20 p-6 md:p-8">
              <CornerMarks light />
              <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.1em] text-white/60 uppercase">
                <span>MC asks · Annapolis 2024</span>
                <span>Record</span>
              </div>
              <ol className="mt-6 divide-y divide-white/15 border-y border-white/15">
                {advocacyAsks.map((a, i) => (
                  <li key={a} className="grid grid-cols-[3rem_1fr] gap-4 py-5">
                    <span className="font-mono text-[12px] text-white/50">0{i + 1}</span>
                    <p className="font-serif text-[22px] leading-[1.15] tracking-[-0.01em] text-white md:text-[26px]">
                      {a}
                    </p>
                  </li>
                ))}
              </ol>
              <p className="mt-5 font-mono text-[11px] tracking-[0.06em] text-white/50 uppercase">
                <Todo
                  value="TODO: add the 2025 and 2026 asks and any outcomes"
                  fallback="Source: Montgomery College"
                />
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7 · Who SGA answers to + facts */}
      <section className="bg-surface">
        <div className="mx-auto grid max-w-[1400px] gap-16 px-6 py-24 md:px-10 md:py-32 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <Eyebrow>Governance</Eyebrow>
            <h2 className="serif-display mt-5 text-[36px] md:text-[48px]">
              Not the administration. Elected to face it.
            </h2>
            <p className="mt-5 max-w-[56ch] text-[15px] leading-[1.65] text-ink-muted">
              SGA is run by students and chosen by students. It works every week with the
              Office of Student Life, which advises it and processes what it approves, and
              it sits below College leadership in the org chart. But its authority comes
              from the bottom of this list, not the top. Each of MC’s three campuses has
              its own SGA; Rockville’s is the largest.
            </p>
            <ol className="mt-10 border-t border-line">
              {structure.map((s) => (
                <li
                  key={s.level}
                  className={`grid grid-cols-[3rem_1fr] gap-4 border-b border-line py-4 ${s.me ? "bg-bg" : ""}`}
                >
                  <span className="pl-1 font-mono text-[11px] text-ink-faint">
                    {s.level}
                  </span>
                  <div className="pr-2">
                    <p
                      className={`text-[15px] ${s.me ? "font-medium text-mc-purple" : "text-ink"}`}
                    >
                      {s.name}
                    </p>
                    <p className="mt-0.5 font-mono text-[11px] tracking-[0.04em] text-ink-muted uppercase">
                      {s.note}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="lg:col-span-5">
            <Eyebrow>At a glance</Eyebrow>
            <dl className="mt-5 border-t border-line">
              {glance.map(([k, v]) => (
                <div
                  key={k}
                  className="grid grid-cols-[1fr_1.3fr] gap-6 border-b border-line py-4"
                >
                  <dt className="font-mono text-[11px] tracking-[0.06em] text-ink-muted uppercase">
                    {k}
                  </dt>
                  <dd className="text-[15px] text-ink">{v}</dd>
                </div>
              ))}
            </dl>
            <Eyebrow>Values we are held to</Eyebrow>
            <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
              {values.map((v, i) => (
                <li key={v} className="flex items-baseline gap-2 text-[14px] text-ink">
                  <span className="font-mono text-[10px] text-ink-faint">0{i + 1}</span>
                  {v}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[13px] leading-[1.6] text-ink-muted">
              Montgomery College’s core values. Every SGA decision should be defensible
              against them.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/constitution"
                className="mono-button h-9 border border-line-strong text-ink hover:border-ink"
              >
                Constitution
              </Link>
              <Link
                href="/senators"
                className="mono-button h-9 border border-line-strong text-ink hover:border-ink"
              >
                The people
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 8 · Close */}
      <section className="border-t border-line bg-bg">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-10 px-6 py-24 md:flex-row md:items-end md:justify-between md:px-10 md:py-32">
          <div>
            <Eyebrow>The point</Eyebrow>
            <h2 className="serif-display mt-5 max-w-[16ch] text-[40px] md:text-[64px]">
              If you’re enrolled at Rockville, you’re already a constituent.
            </h2>
          </div>
          <div className="flex flex-col gap-4 md:items-end">
            <p className="max-w-[40ch] text-[15px] leading-[1.6] text-ink-muted md:text-right">
              The only question is whether you use it. Come to a meeting, bring a concern,
              or run for a seat and carry someone else’s.
            </p>
            <div className="flex gap-3">
              <Link
                href={site.applyUrl}
                className="mono-button bg-mc-purple text-white hover:bg-[#45186f]"
              >
                Apply to serve <ArrowRight className="size-3.5" aria-hidden />
              </Link>
              <Link
                href="/events?type=meeting"
                className="mono-button border border-line-strong text-ink hover:border-ink"
              >
                Next open meeting
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
