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
    "What the Montgomery College Rockville SGA is, what it is responsible for, and how it fits into College governance.",
};

const responsibilities = [
  {
    title: "Represent the student body",
    body: "SGA represents students to the College administration. When leadership needs to know what students think, SGA is who they ask.",
  },
  {
    title: "Recommend student activity spending",
    body: "SGA recommends the financial expenditures for student activities. The Budget Panel reviews club funding requests against one test: does this reach students?",
  },
  {
    title: "Gather student opinion",
    body: "SGA secures and invites student opinions on official policies and priorities, then carries them into the rooms where decisions are made.",
  },
  {
    title: "Build campus life",
    body: "SGA develops activities and events that enhance students’ academic and social experiences on campus, alongside the Student Activities Board.",
  },
];

const glance = [
  ["Campus", "Rockville, the largest of MC’s three"],
  ["Students represented", "About 15,000 per semester"],
  ["Elected members", `${elected.length} officers and senators`],
  [
    "Committees",
    `${committees.length}, ${committees.filter((c) => c.openTo === "all-students").length} open to any student`,
  ],
  ["Open meetings", `${site.meeting.day}s, ${site.meeting.time}`],
  ["Office", `${site.office.room}, ${site.office.within}`],
  ["Advising office", `${site.studentLife.name}, ${site.studentLife.room}`],
  ["Term", site.term],
];

const structure = [
  {
    level: "01",
    name: "Montgomery College leadership",
    note: "Campus and College administration",
  },
  {
    level: "02",
    name: "Office of Student Life",
    note: `Advises SGA · Director ${site.studentLife.director}`,
  },
  {
    level: "03",
    name: "Student Government Association",
    note: "Elected officers and senators-at-large",
  },
  {
    level: "04",
    name: "Committees and the Student Activities Board",
    note: "Where the work gets done",
  },
  { level: "05", name: "130+ clubs and 15,000 students", note: "Who all of it is for" },
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

function CornerMarks() {
  const c = "absolute size-3 border-ink/35";
  return (
    <>
      <span aria-hidden className={`${c} -top-px -left-px border-t border-l`} />
      <span aria-hidden className={`${c} -top-px -right-px border-t border-r`} />
      <span aria-hidden className={`${c} -bottom-px -left-px border-b border-l`} />
      <span aria-hidden className={`${c} -right-px -bottom-px border-r border-b`} />
    </>
  );
}

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <p className="font-mono text-[11px] tracking-[0.14em] text-ink-muted uppercase">
    {children}
  </p>
);

export default function AboutPage() {
  return (
    <>
      {/* Header: statement + framed photo with mono metadata */}
      <section className="border-b border-line bg-bg">
        <div className="mx-auto grid max-w-[1400px] gap-14 px-6 pt-32 pb-20 md:px-10 md:pt-40 md:pb-28 lg:grid-cols-12 lg:gap-10">
          <div className="flex flex-col justify-end lg:col-span-7">
            <Eyebrow>About SGA</Eyebrow>
            <h1 className="serif-display mt-6 max-w-[14ch] text-[48px] md:text-[88px]">
              Students, elected by students, for students.
            </h1>
            <p className="mt-8 max-w-[52ch] text-[17px] leading-[1.55] text-ink-muted md:text-[19px]">
              The Student Government Association is the official representative body for
              all students on the Montgomery College Rockville Campus. It represents
              student interests, works closely with College leadership, and advocates for
              a positive campus experience.
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

      {/* Mission: serif statement, two-column body */}
      <section className="bg-surface">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-6 py-24 md:px-10 md:py-32 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow>Mission</Eyebrow>
            <h2 className="serif-display mt-5 text-[36px] md:text-[52px]">
              The conduit between students and the people who run the College.
            </h2>
          </div>
          <div className="grid gap-8 text-[16px] leading-[1.65] text-ink-muted sm:grid-cols-2 lg:col-span-7 lg:pt-2">
            <p>
              SGA strives to act as the conduit through which students communicate openly
              with the administration, to facilitate events beneficial to the student
              body, and to provide a forum for the exchange of student ideas and opinions.
            </p>
            <p>
              Put simply: if you have an idea or a problem that affects students on this
              campus, SGA exists to make sure the people who can act on it hear it. Under
              the MC Club Handbook, it is also the formal channel through which recognized
              clubs propose recommendations and initiatives to the College.
            </p>
          </div>
        </div>
      </section>

      {/* Responsibilities: numbered hairline list */}
      <section className="border-y border-line bg-bg">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-6 py-24 md:px-10 md:py-32 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <Eyebrow>Responsibilities</Eyebrow>
              <h2 className="serif-display mt-5 text-[36px] md:text-[48px]">
                Four jobs define the role.
              </h2>
              <p className="mt-5 max-w-[34ch] text-[15px] leading-[1.6] text-ink-muted">
                Everything else SGA does is in service of these.
              </p>
            </div>
          </div>
          <Reveal as="ol" className="border-t border-line lg:col-span-8">
            {responsibilities.map((r, i) => (
              <RevealItem
                key={r.title}
                as="li"
                className="grid grid-cols-[3rem_1fr] gap-4 border-b border-line py-7 md:grid-cols-[5rem_1fr] md:py-9"
              >
                <span className="font-mono text-[12px] text-ink-faint">0{i + 1}</span>
                <div>
                  <h3 className="font-serif text-[26px] leading-none tracking-[-0.01em] text-ink md:text-[32px]">
                    {r.title}
                  </h3>
                  <p className="mt-3 max-w-[58ch] text-[15px] leading-[1.65] text-ink-muted">
                    {r.body}
                  </p>
                </div>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </section>

      {/* At a glance + where SGA sits: two tables */}
      <section className="bg-surface">
        <div className="mx-auto grid max-w-[1400px] gap-16 px-6 py-24 md:px-10 md:py-32 lg:grid-cols-2 lg:gap-12">
          <div>
            <Eyebrow>At a glance</Eyebrow>
            <h2 className="serif-display mt-5 text-[36px] md:text-[44px]">The facts.</h2>
            <dl className="mt-10 border-t border-line">
              {glance.map(([k, v]) => (
                <div
                  key={k}
                  className="grid grid-cols-[1fr_1.4fr] gap-6 border-b border-line py-4"
                >
                  <dt className="font-mono text-[11px] tracking-[0.06em] text-ink-muted uppercase">
                    {k}
                  </dt>
                  <dd className="text-[15px] text-ink">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <Eyebrow>Governance</Eyebrow>
            <h2 className="serif-display mt-5 text-[36px] md:text-[44px]">
              Where SGA sits.
            </h2>
            <ol className="mt-10 border-t border-line">
              {structure.map((s, i) => (
                <li
                  key={s.level}
                  className={`grid grid-cols-[3rem_1fr] gap-4 border-b border-line py-4 ${i === 2 ? "bg-bg" : ""}`}
                >
                  <span className="pl-1 font-mono text-[11px] text-ink-faint">
                    {s.level}
                  </span>
                  <div className="pr-2">
                    <p
                      className={`text-[15px] ${i === 2 ? "font-medium text-ink" : "text-ink"}`}
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
            <p className="mt-6 max-w-[48ch] text-[14px] leading-[1.6] text-ink-muted">
              SGA is run by students and elected by students. It is not part of the
              administration, but it is the formal channel between students and the people
              who run the College. Each of MC’s three campuses has its own SGA; Rockville
              is the largest. Once a year, Rockville students join peers from all 16
              Maryland community colleges at{" "}
              <Link
                href="/events?type=advocacy"
                className="text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink"
              >
                Student Advocacy Day
              </Link>{" "}
              in Annapolis.
            </p>
          </div>
        </div>
      </section>

      {/* Values: numbered cells */}
      <section className="border-y border-line bg-bg">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32">
          <div className="grid gap-8 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <Eyebrow>Values</Eyebrow>
              <h2 className="serif-display mt-5 text-[36px] md:text-[52px]">
                We run on MC’s core values.
              </h2>
            </div>
            <p className="max-w-[40ch] text-[15px] leading-[1.6] text-ink-muted md:col-span-5">
              Every SGA decision, event, and campaign should be defensible against these
              seven.
            </p>
          </div>
          <ul className="mt-12 grid border-t border-l border-line bg-surface sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <li
                key={v}
                className="flex flex-col gap-6 border-r border-b border-line p-6"
              >
                <span className="font-mono text-[11px] text-ink-faint">0{i + 1}</span>
                <span className="font-serif text-[24px] leading-none tracking-[-0.01em] text-ink">
                  {v}
                </span>
              </li>
            ))}
            <li className="flex flex-col justify-between gap-6 border-r border-b border-line bg-bg p-6">
              <span className="font-mono text-[11px] text-ink-faint">Source</span>
              <a
                href="https://www.montgomerycollege.edu/about-mc/index.html"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-mono text-[11px] tracking-[0.08em] text-ink uppercase"
              >
                MC core values <ArrowUpRight className="size-3.5" aria-hidden />
              </a>
            </li>
          </ul>
        </div>
      </section>

      {/* Closing dark band */}
      <section className="bg-ink text-white">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-10 px-6 py-24 md:flex-row md:items-end md:justify-between md:px-10 md:py-32">
          <div>
            <p className="font-mono text-[11px] tracking-[0.14em] text-white/60 uppercase">
              History
            </p>
            <h2 className="serif-display mt-5 max-w-[18ch] text-[40px] text-white md:text-[64px]">
              The record is still being written. Help write the {site.term} chapter.
            </h2>
          </div>
          <div className="flex flex-col gap-4 md:items-end">
            <p className="max-w-[40ch] text-[15px] leading-[1.6] text-white/70 md:text-right">
              SGA Rockville is rebuilding its public record. If you served in a past SGA
              and have photos, minutes, or stories, we want them for this page.
            </p>
            <div className="flex gap-3">
              <Link
                href={site.applyUrl}
                className="mono-button bg-white text-ink hover:bg-white/90"
              >
                Apply to serve <ArrowRight className="size-3.5" aria-hidden />
              </Link>
              <Link
                href="/contact"
                className="mono-button border border-white/30 text-white hover:border-white/70"
              >
                Share SGA history
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
