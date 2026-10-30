import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Todo } from "@/components/primitives/todo-chip";
import { committees } from "@/content/committees";
import { elected } from "@/content/people";
import { site } from "@/content/site";
import { ConduitFig, GovernanceFig } from "@/components/diagrams/figures";
import { MandateScroller } from "@/components/diagrams/mandate-scroller";

export const metadata: Metadata = {
  title: "About",
  description:
    "Why the Montgomery College Rockville SGA exists, how student activity fees move through it, how a concern travels from a student to a decision, and who it answers to.",
};

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

const jobs = [
  {
    n: "1",
    fig: "represent" as const,
    verb: "Represent",
    claim: "Someone elected by students is in the room when decisions get made.",
    how: "SGA represents the student body to the College administration. When campus or College leadership needs to know what students think, SGA is who they ask, and SGA brings what it has heard at open meetings and in committees.",
    mechanisms: [
      { label: "Open meetings", href: "/events?type=meeting", note: "Where the position is decided" },
      { label: "Campus leadership meetings", note: "Where it is carried" },
      { label: "Office of Student Life", href: site.studentLife.url, note: "Advises SGA" },
      { label: "College-wide councils" },
    ],
  },
  {
    n: "2",
    fig: "fund" as const,
    verb: "Fund",
    claim: "Student activity fees are spent on students, by a panel of students.",
    how: "SGA recommends the financial expenditures for student activities. Recognized clubs request money through the Budget Panel, chaired by the Treasurer, which evaluates each request on whether it promotes student engagement and strengthens campus community.",
    mechanisms: [
      { label: "The Budget Panel", href: "/committees/budget-panel", note: "Chaired by the Treasurer" },
      { label: "How to request funding", href: "/funding", note: "For recognized clubs" },
      { label: "Office of Student Life", note: "Processes approved funds" },
    ],
  },
  {
    n: "3",
    fig: "listen" as const,
    verb: "Listen",
    claim: "Student opinion is collected on purpose, not by accident.",
    how: "SGA secures and invites student opinions regarding official policies and priorities: open floor at every meeting, the contact form, tabling at Club Rush, and committees like Food and WDCE that exist to gather feedback from specific groups.",
    mechanisms: [
      { label: "Open floor", href: "/events?type=meeting", note: "At every open meeting" },
      { label: "Contact form", href: "/contact", note: "Any time" },
      { label: "Food Committee", href: "/committees/food", note: "Campus dining" },
      { label: "WDCE Committee", href: "/committees/wdce", note: "WDCE students" },
      { label: "Tabling at Club Rush" },
    ],
  },
  {
    n: "4",
    fig: "build" as const,
    verb: "Build",
    claim: "A commuter campus gets the events that make it feel like one place.",
    how: "SGA develops activities and events that enhance students’ academic and social experiences, and the Student Activities Board plans the social, cultural, and recreational calendar: the talent show, cultural nights, Club Rush, the International Ball.",
    mechanisms: [
      { label: "Student Activities Board", href: "/committees/sab", note: "Open to every student" },
      { label: "Public Outreach", href: "/committees/public-outreach", note: "Gets the word out" },
      { label: "Events calendar", href: "/events", note: "What is coming up" },
    ],
  },
];

const moneyFlow = [
  { label: "Every enrolled student", detail: "pays a student activity fee with tuition." },
  { label: "A recognized club", detail: "proposes an event and a line-item budget." },
  {
    label: "The SGA Budget Panel",
    detail: "The Treasurer and senators test it: does this reach students?",
    highlight: true,
  },
  {
    label: "The Office of Student Life",
    detail: "processes approved funds, purchasing, and reimbursements.",
  },
  { label: "An event on campus", detail: "open to the students who paid for it." },
];

const concernPath = [
  { who: "You", what: "Raise it at open floor, through the contact form, or to any senator." },
  {
    who: "The Secretary",
    what: "Logs it and routes it to the senator or committee that owns the topic.",
  },
  { who: "A committee", what: "Gathers facts, talks to the office involved, drafts a position." },
  { who: "The SGA vote", what: "The full body decides what to ask for and who carries it." },
  {
    who: "College leadership",
    what: "Hears the ask from elected students, with the evidence behind it.",
  },
  { who: "Back to you", what: "The answer is reported at the next open meeting, in public." },
];

const advocacyAsks = [
  "Keep tuition affordable across Maryland’s community colleges",
  "Fund a student services center for the Germantown Campus",
  "Renovate the Rockville Campus library",
];

const ladder = [
  { name: "Montgomery College leadership", note: "College and campus administration" },
  {
    name: "Office of Student Life",
    note: `Advises SGA. Director: ${site.studentLife.director}`,
  },
  {
    name: "Student Government Association",
    note: `${elected.length} elected officers and senators`,
    me: true,
  },
  {
    name: `${committees.length} committees, including the Student Activities Board`,
    note: "Where the work gets done",
  },
  { name: "130+ clubs and about 15,000 students", note: "Who all of it answers to" },
];

const glance = [
  ["Campus", "Rockville, the largest of MC’s three"],
  ["Students represented", "About 15,000 per semester"],
  ["Elected members", `${elected.length}`],
  ["Open meetings", site.meeting.short],
  ["Office", `${site.office.room}, ${site.office.within}`],
  ["Term", site.term],
];

/* ------------------------------------------------------------------ */

const h2 = "serif-display text-[36px] md:text-[54px]";
const caption = "mt-3 text-[13px] leading-[1.5] text-ink-muted";

export default function AboutPage() {
  return (
    <>
      {/* 1. The thesis */}
      <section className="bg-bg">
        <div className="mx-auto grid max-w-[1400px] gap-14 px-6 pt-32 pb-20 md:px-10 md:pt-40 md:pb-28 lg:grid-cols-12 lg:gap-10">
          <div className="flex flex-col justify-end lg:col-span-7">
            <h1 className="serif-display max-w-[15ch] text-[48px] md:text-[84px]">
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
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/images/sga-group.jpg"
                alt="Rockville SGA senators and officers on a staircase before an advocacy event"
                fill
                priority
                sizes="(min-width: 1024px) 520px, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className={caption}>
              <Todo
                value="TODO: add where and when this photo was taken"
                fallback={`Senators and officers of the Rockville SGA, ${site.term}.`}
              />
            </figcaption>
          </figure>
        </div>
      </section>

      {/* 2. The problem SGA exists to solve */}
      <section className="border-t border-line bg-surface">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-6 py-24 md:px-10 md:py-32 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className={h2}>A commuter campus has no built-in voice.</h2>
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

      {/* 3. The mandate, as a scroll-driven sequence */}
      <section className="bg-ink text-white">
        <div className="mx-auto max-w-[1400px] px-6 pt-24 md:px-10 md:pt-32">
          <div className="grid gap-8 md:grid-cols-12 md:items-end">
            <h2 className={`${h2} text-white md:col-span-7`}>
              Four jobs. Each one has a mechanism.
            </h2>
            <p className="max-w-[40ch] text-[15px] leading-[1.6] text-white/60 md:col-span-5">
              The College gives SGA four responsibilities. A responsibility without a
              mechanism is a slogan, so each one here comes with the room, panel, form, or
              board where it actually happens, and a link to it.
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-[1400px] px-6 pb-16 md:px-10 md:pb-24">
          <MandateScroller chapters={jobs} />
        </div>
      </section>

      {/* 4. Follow the money */}
      <section className="bg-surface">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32">
          <div className="grid gap-8 md:grid-cols-12 md:items-end">
            <h2 className={`${h2} md:col-span-7`}>
              Your fee, from your tuition bill to an event on the Quad.
            </h2>
            <p className="max-w-[40ch] text-[15px] leading-[1.6] text-ink-muted md:col-span-5">
              Every enrolled student pays a student activity fee. SGA does not hold the
              money. It recommends how the money is spent, and the recommendation is made
              by students.{" "}
              <Todo
                value="TODO: confirm the per-semester fee amount and add it here"
                fallback=""
              />
            </p>
          </div>

          {/* Five stations on one line */}
          <ol className="mt-16 grid gap-10 border-t border-line-strong md:mt-20 md:grid-cols-5 md:gap-8">
            {moneyFlow.map((s, i) => (
              <li key={s.label} className="relative pt-6 md:pr-6">
                <span
                  aria-hidden
                  className={`absolute -top-px left-0 h-[7px] w-px ${s.highlight ? "bg-mc-purple" : "bg-ink"}`}
                />
                <span className="font-serif text-[15px] text-ink-faint">{i + 1}</span>
                <p
                  className={`mt-3 font-serif text-[24px] leading-[1.1] tracking-[-0.01em] ${s.highlight ? "text-mc-purple" : "text-ink"}`}
                >
                  {s.label}
                </p>
                <p className="mt-2 max-w-[26ch] text-[14px] leading-[1.55] text-ink-muted">
                  {s.detail}
                </p>
              </li>
            ))}
          </ol>
          <p className="mt-14 max-w-[60ch] text-[15px] leading-[1.6] text-ink-muted">
            The Budget Panel applies one test at step three: does this promote student
            engagement and strengthen campus community?{" "}
            <Link href="/funding" className="text-link">
              How to request funding
            </Link>
          </p>
        </div>
      </section>

      {/* 5. How a concern moves */}
      <section className="border-y border-line bg-bg">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-6 py-24 md:px-10 md:py-32 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-24">
              <h2 className={h2}>How a concern becomes a decision.</h2>
              <p className="mt-5 max-w-[40ch] text-[15px] leading-[1.6] text-ink-muted">
                This is the part most students never see. A complaint about dining hours
                or a broken door does not disappear into an inbox. It moves through people
                whose names you can look up, and it comes back to you in public.
              </p>
              <figure className="mt-12">
                <ConduitFig className="h-[280px] w-full" />
                <figcaption className={caption}>
                  The loop, numbered as in the list: you, the Secretary, a committee, the
                  SGA vote, College leadership, and back to you.
                </figcaption>
              </figure>
              <figure className="mt-12">
                <div className="relative aspect-[3/2] overflow-hidden">
                  <Image
                    src="/images/open-meeting.jpg"
                    alt="Students seated around tables in the Student Life room listening to a presenter at an open meeting"
                    fill
                    sizes="(min-width: 1024px) 560px, 100vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className={caption}>
                  <Todo
                    value="TODO: add the date of this meeting"
                    fallback={`An open meeting in ${site.office.room}. Open floor is where step one usually starts.`}
                  />
                </figcaption>
              </figure>
            </div>
          </div>
          <ol className="border-t border-line lg:col-span-7">
            {concernPath.map((s, i) => (
              <li
                key={s.who}
                className="grid grid-cols-[2.5rem_1fr] gap-4 border-b border-line py-6 md:grid-cols-[3rem_13rem_1fr] md:py-7"
              >
                <span className="font-serif text-[22px] leading-none text-ink-faint">
                  {i + 1}
                </span>
                <p className="font-serif text-[24px] leading-none tracking-[-0.01em] text-ink md:text-[28px]">
                  {s.who}
                </p>
                <p className="col-span-2 text-[15px] leading-[1.6] text-ink-muted md:col-span-1">
                  {s.what}
                </p>
              </li>
            ))}
            <li className="flex flex-wrap items-center justify-between gap-5 py-7">
              <p className="text-[15px] text-ink-muted">
                Step one starts at any open meeting, {site.meeting.short.replace("Every", "every")}.
              </p>
              <div className="flex gap-3">
                <Link href="/contact" className="button-secondary">
                  Raise a concern
                </Link>
                <Link href="/events?type=meeting" className="button-primary">
                  Next open meeting
                </Link>
              </div>
            </li>
          </ol>
        </div>
      </section>

      {/* 6. Proof beyond campus */}
      <section className="bg-surface">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-6 py-24 md:px-10 md:py-32 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <h2 className={h2}>The voice does not stop at Mannakee Street.</h2>
            <p className="mt-6 max-w-[48ch] text-[16px] leading-[1.65] text-ink-muted">
              Every February, students from all 16 Maryland community colleges travel to
              Annapolis for Student Advocacy Day and meet the legislators who set the
              state’s share of their tuition. Rockville SGA organizes MC’s delegation. The
              asks are specific, written down, and carried by students.
            </p>
            <Link href="/events?type=advocacy" className="text-link mt-6 inline-block text-[15px]">
              Advocacy Day on the events calendar
            </Link>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <p className="text-[15px] text-ink-muted">What MC’s delegation asked for in 2024</p>
            <ol className="mt-4 border-t border-line">
              {advocacyAsks.map((a) => (
                <li key={a} className="border-b border-line py-5">
                  <p className="font-serif text-[22px] leading-[1.15] tracking-[-0.01em] text-ink md:text-[26px]">
                    {a}
                  </p>
                </li>
              ))}
            </ol>
            <p className="mt-4 text-[13px] leading-[1.5] text-ink-muted">
              <Todo
                value="TODO: add the 2025 and 2026 asks and any outcomes"
                fallback="Source: Montgomery College."
              />
            </p>
          </div>
        </div>
      </section>

      {/* 7. Who SGA answers to, plus the facts */}
      <section className="border-t border-line bg-bg">
        <div className="mx-auto grid max-w-[1400px] gap-16 px-6 py-24 md:px-10 md:py-32 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <h2 className={h2}>Not the administration. Elected to face it.</h2>
            <p className="mt-5 max-w-[56ch] text-[15px] leading-[1.65] text-ink-muted">
              SGA is run by students and chosen by students. It works every week with the
              Office of Student Life, which advises it and processes what it approves, and
              it sits below College leadership in the org chart. But its authority comes
              from the bottom of this ladder, not the top. Each of MC’s three campuses has
              its own SGA. Rockville’s is the largest.
            </p>
            {/* The ladder: each rung steps in, SGA is the one in colour */}
            <ol className="mt-12">
              {ladder.map((s, i) => (
                <li
                  key={s.name}
                  className="border-t border-line py-5 last:border-b"
                  style={{ paddingLeft: `${i * 1.75}rem` }}
                >
                  <p
                    className={`font-serif text-[22px] leading-[1.1] tracking-[-0.01em] md:text-[26px] ${s.me ? "text-mc-purple" : "text-ink"}`}
                  >
                    {s.name}
                  </p>
                  <p className="mt-1.5 text-[14px] text-ink-muted">{s.note}</p>
                </li>
              ))}
            </ol>
            <p className="mt-8 max-w-[60ch] text-[15px] leading-[1.65] text-ink-muted">
              Montgomery College holds every SGA decision to its core values: equity and
              inclusion, excellence, integrity, innovation, adaptability, sustainability,
              and respect.
            </p>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-[15px]">
              <Link href="/constitution" className="text-link">
                Read the constitution
              </Link>
              <Link href="/senators" className="text-link">
                Meet the senators
              </Link>
            </div>
          </div>
          <div className="lg:col-span-5">
            <figure>
              <GovernanceFig className="h-[300px] w-full" />
              <figcaption className={caption}>
                Authority flows up. The students are the bottom layer and the SGA is the
                one in colour.
              </figcaption>
            </figure>
            {/* At a glance, set like an agenda: dot leaders between term and value */}
            <dl className="mt-12">
              {glance.map(([k, v]) => (
                <div key={k} className="flex items-baseline gap-3 py-2.5 text-[15px]">
                  <dt className="shrink-0 text-ink-muted">{k}</dt>
                  <span
                    aria-hidden
                    className="min-w-6 flex-1 translate-y-[-3px] border-b border-dotted border-line-strong"
                  />
                  <dd className="shrink-0 text-right text-ink">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* 8. Close */}
      <section className="border-t border-line bg-surface">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-10 px-6 py-24 md:flex-row md:items-end md:justify-between md:px-10 md:py-32">
          <h2 className="serif-display max-w-[16ch] text-[40px] md:text-[64px]">
            If you’re enrolled at Rockville, you’re already a constituent.
          </h2>
          <div className="flex flex-col gap-5 md:items-end">
            <p className="max-w-[40ch] text-[15px] leading-[1.6] text-ink-muted md:text-right">
              The only question is whether you use it. Come to a meeting, bring a concern,
              or run for a seat and carry someone else’s.
            </p>
            <div className="flex gap-3">
              <Link href={site.applyUrl} className="button-primary">
                Become a senator
              </Link>
              <Link href="/events?type=meeting" className="button-secondary">
                Next open meeting
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
