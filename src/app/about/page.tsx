import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { Container } from "@/components/primitives/container";
import { SectionHeading } from "@/components/primitives/section-heading";
import { Reveal, RevealItem } from "@/components/primitives/reveal";
import { CTA } from "@/components/primitives/cta";
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

const values = [
  "Equity and inclusion",
  "Excellence",
  "Integrity",
  "Innovation",
  "Adaptability",
  "Sustainability",
  "Respect",
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About SGA"
        title="Students, elected by students, for students."
        description="The Student Government Association is the official representative body for all students on the Montgomery College Rockville Campus. It represents student interests, works closely with College leadership, and advocates for a positive campus experience."
      />

      <Container className="grid gap-12 pt-12 md:pt-16 lg:grid-cols-12">
        <div className="prose-sga lg:col-span-7">
          <h2>Mission</h2>
          <p>
            SGA strives to act as the conduit through which students communicate openly
            with the administration, to facilitate events beneficial to the student body,
            and to provide a forum for the exchange of student ideas and opinions.
          </p>
          <p>
            Put simply: if you have an idea or a problem that affects students on this
            campus, SGA exists to make sure the people who can act on it hear it.
          </p>

          <h2>What we are responsible for</h2>
          <p>
            Four responsibilities define the job. Everything else is in service of these.
          </p>
        </div>
        <aside className="lg:col-span-5">
          <div className="sticky top-24 rounded-card border border-line bg-surface p-6">
            <h2 className="eyebrow">At a glance</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between gap-4 border-b border-line pb-3">
                <dt className="text-ink-muted">Campus</dt>
                <dd className="text-right text-ink">Rockville (largest of MC’s three)</dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-line pb-3">
                <dt className="text-ink-muted">Students represented</dt>
                <dd className="text-right text-ink">~15,000 per semester</dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-line pb-3">
                <dt className="text-ink-muted">Open meetings</dt>
                <dd className="text-right text-ink">
                  {site.meeting.day}s, {site.meeting.time}
                </dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-line pb-3">
                <dt className="text-ink-muted">Office</dt>
                <dd className="text-right text-ink">{site.office.room}, Student Life</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-ink-muted">Term</dt>
                <dd className="text-right text-ink">{site.term}</dd>
              </div>
            </dl>
            <div className="mt-6 flex flex-col gap-2">
              <CTA href="/senators" size="sm">
                Meet the senators
              </CTA>
              <CTA href="/constitution" variant="ghost" size="sm">
                Read the constitution
              </CTA>
            </div>
          </div>
        </aside>
      </Container>

      <Container className="mt-4">
        <Reveal as="ol" className="grid gap-4 md:grid-cols-2">
          {responsibilities.map((r, i) => (
            <RevealItem
              key={r.title}
              as="li"
              className="rounded-card border border-line bg-surface p-6"
            >
              <span className="font-mono text-[12px] tracking-[0.08em] text-ink-muted uppercase">
                0{i + 1}
              </span>
              <h3 className="mt-3 text-lg font-medium text-ink">{r.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-muted">{r.body}</p>
            </RevealItem>
          ))}
        </Reveal>
      </Container>

      <section className="mt-24 border-y border-line bg-surface/50 py-20">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Governance"
              title="Where SGA sits"
              description="SGA is student-run and student-elected. It is not part of the College administration, but it is the formal channel between students and the people who run the College."
              className="mb-0"
            />
          </div>
          <div className="prose-sga lg:col-span-7">
            <p>
              Montgomery College has three campuses: Germantown, Rockville, and Takoma
              Park/Silver Spring. Each has its own Student Government Association.
              Rockville is the largest campus, with about 15,000 students per semester,
              which makes this SGA the largest student body on the College’s three
              campuses.
            </p>
            <p>
              SGA works day to day with the{" "}
              <a href={site.studentLife.url} target="_blank" rel="noopener noreferrer">
                Office of Student Life
              </a>{" "}
              (SV 104, directed by {site.studentLife.director}), which advises SGA,
              processes approved club funding, and manages campus programming. Elected
              senators and officers meet weekly, serve on committees, and bring student
              concerns to campus and College leadership.
            </p>
            <p>
              Under the MC Club Handbook, SGA is also the formal channel through which
              recognized clubs propose recommendations and initiatives to the College. If
              your club wants something changed, SGA is how the request moves.
            </p>
            <p>
              Once a year, Rockville students join peers from all 16 Maryland community
              colleges at <Link href="/events?type=advocacy">Student Advocacy Day</Link>{" "}
              in Annapolis to meet state legislators about tuition and campus investment.
            </p>
          </div>
        </Container>
      </section>

      <Container className="py-20">
        <SectionHeading
          eyebrow="Values"
          title="We run on MC’s core values."
          description="Every SGA decision, event, and campaign should be defensible against these seven."
        />
        <ul className="flex flex-wrap gap-2.5">
          {values.map((v) => (
            <li
              key={v}
              className="rounded-md border border-line bg-surface px-3.5 py-2 text-[13px] text-ink"
            >
              {v}
            </li>
          ))}
        </ul>
      </Container>

      <Container className="pb-8">
        <div className="rounded-card bg-mc-purple px-8 py-12 text-white md:px-12">
          <h2 className="display max-w-[22ch] text-[30px] md:text-4xl md:text-[36px]">
            History is still being written. Help write the {site.term} chapter.
          </h2>
          <p className="mt-4 max-w-[55ch] text-white/80">
            SGA Rockville is rebuilding its public record. If you served in a past SGA and
            have photos, minutes, or stories, we want them for this page.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <CTA href={site.applyUrl} variant="accent">
              Apply to be a Senator
            </CTA>
            <CTA href="/contact" className="bg-white/10 text-white hover:bg-white/20">
              Share SGA history
            </CTA>
          </div>
        </div>
      </Container>
    </>
  );
}
