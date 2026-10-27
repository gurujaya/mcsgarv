import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Check, ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Container } from "@/components/primitives/container";
import { SectionHeading } from "@/components/primitives/section-heading";
import { CTA } from "@/components/primitives/cta";
import { Pill } from "@/components/primitives/pill";
import { Todo, TodoChip } from "@/components/primitives/todo-chip";
import { CommitteeTile } from "@/components/committee-icon";
import { ContactForm } from "@/components/forms/contact-form";
import { committees } from "@/content/committees";
import { site } from "@/content/site";
import { isTodo } from "@/lib/todo";

export const metadata: Metadata = {
  title: "Get Involved",
  description:
    "How to become a Senator-at-Large, join the Student Activities Board, join an open committee, or just attend a Monday open meeting.",
};

const steps = [
  {
    title: "Check eligibility",
    body: "Good standing with the College, no Code of Conduct violations (minor infractions at the Dean of Student Affairs’ discretion), and a cumulative GPA of 2.0 or higher, maintained every semester you serve.",
  },
  {
    title: "Submit the application",
    body: "Turn in a completed application to the Office of Student Life (SV 104). Ask for the SGA application at the front desk or download it below.",
  },
  {
    title: "Interview",
    body: "Candidates interview with current SGA members. It is a conversation about why you want to serve and what you would work on, not a test.",
  },
  {
    title: "Election and swearing-in",
    body: "Senator-at-Large is an elected position. Once elected, you are sworn in at a Monday meeting and assigned to a committee.",
  },
];

export default function GetInvolvedPage() {
  const open = committees.filter((c) => c.openTo === "all-students" && c.slug !== "sab");
  const sab = committees.find((c) => c.slug === "sab");

  return (
    <>
      <PageHeader
        eyebrow="Get involved"
        title="Campus gets better when more people show up."
        description="There are three ways in, with different levels of commitment. All of them start with the same step: come to a Monday open meeting."
      >
        <div className="mt-8 flex flex-wrap gap-2">
          {[
            ["#senator", "Senator-at-Large"],
            ["#sab", "Student Activities Board"],
            ["#committees", "Open committees"],
            ["#meetings", "Open meetings"],
          ].map(([href, label]) => (
            <a
              key={href}
              href={href}
              className="rounded-md border border-line bg-surface px-3.5 py-2 text-[13px] text-ink transition-colors hover:border-line-strong hover:text-mc-purple"
            >
              {label}
            </a>
          ))}
        </div>
      </PageHeader>

      {/* Senator */}
      <section
        id="senator"
        className="scroll-mt-24 border-y border-line bg-surface/50 py-20"
      >
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Path 1"
              title="Become a Senator-at-Large"
              description="Senators vote on SGA decisions, serve on committees, and represent students to College leadership. It is the most involved role and the one that changes the most."
              className="mb-6"
            />
            <div className="rounded-card border border-line bg-surface p-6">
              <h3 className="eyebrow">Requirements</h3>
              <ul className="mt-4 space-y-3">
                {[
                  "In good standing with the College and free from Code of Conduct violations",
                  "Cumulative GPA of 2.0 or higher each semester while in office",
                  "Attend every SGA meeting (every other Monday, 4–6 PM)",
                  "Completed application turned in to the Office of Student Life",
                  "Interview with current SGA members",
                ].map((r) => (
                  <li key={r} className="flex gap-2.5 text-sm text-ink-muted">
                    <Check
                      className="mt-0.5 size-4 shrink-0 text-mc-green-ink"
                      aria-hidden
                    />
                    {r}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-xs text-ink-muted">
                Application cycle:{" "}
                <Todo
                  value="TODO: confirm Rockville's application window (TP/SS opens applications the first week of November for spring)."
                  fallback="Ask at Student Life for the current window."
                />
              </p>
              <div className="mt-6 flex flex-col gap-2">
                <CTA
                  href={`mailto:${site.senatorInquiriesEmail}?subject=Senator-at-Large%20application`}
                  variant="accent"
                  size="sm"
                  external
                >
                  Email about applying
                </CTA>
                <span className="inline-flex items-center gap-2 text-xs text-ink-muted">
                  Application PDF{" "}
                  <TodoChip note="Add the Senator-at-Large application link in resources.ts" />
                </span>
              </div>
            </div>
          </div>
          <ol className="space-y-4 lg:col-span-7">
            {steps.map((s, i) => (
              <li
                key={s.title}
                className="flex gap-5 rounded-card border border-line bg-surface p-6"
              >
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-line-strong font-mono text-[12px] text-ink">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-lg font-medium text-ink">{s.title}</h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-ink-muted">
                    {s.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* SAB */}
      <section id="sab" className="scroll-mt-24 py-20">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Path 2"
              title="Join the Student Activities Board"
              description="SAB is a student-run board that plans and promotes social, cultural, recreational, and educational programs for the diverse interests of the student body. No election. Rolling applications."
              className="mb-6"
            />
            <div className="flex flex-wrap gap-2">
              <Pill tone="green">Open to all</Pill>
              <Pill tone="orange">Rolling applications</Pill>
              <Pill tone="blue">Events</Pill>
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-card border border-line bg-surface p-6">
                <h3 className="eyebrow">What SAB has done</h3>
                <ul className="mt-3 space-y-1.5 text-sm text-ink-muted">
                  <li>Masquerade ball</li>
                  <li>Halloween Bash</li>
                  <li>Trivia nights</li>
                  <li>International Ball</li>
                </ul>
              </div>
              <div className="rounded-card border border-line bg-surface p-6">
                <h3 className="eyebrow">How to join</h3>
                <ol className="mt-3 list-decimal space-y-1.5 pl-4 text-sm text-ink-muted">
                  <li>
                    Email{" "}
                    <a
                      href={`mailto:${site.sab.email}`}
                      className="text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink"
                    >
                      {site.sab.email}
                    </a>{" "}
                    or submit the application form.
                  </li>
                  <li>Get added to the SAB WhatsApp group.</li>
                  <li>Show up to the next planning meeting.</li>
                </ol>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <CTA
                href={`mailto:${site.sab.email}?subject=Joining%20SAB`}
                variant="accent"
                size="sm"
                external
              >
                Email SAB
              </CTA>
              {isTodo(site.sab.applicationUrl) ? (
                <span className="inline-flex items-center gap-2 text-sm text-ink-muted">
                  Application form <TodoChip note="Add SAB application link in site.ts" />
                </span>
              ) : (
                <CTA href={site.sab.applicationUrl} variant="ghost" size="sm" external>
                  Application form
                </CTA>
              )}
              {sab ? (
                <Link
                  href={`/committees/${sab.slug}`}
                  className="inline-flex items-center gap-1 text-sm font-medium text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink"
                >
                  About SAB <ArrowRight className="size-4" />
                </Link>
              ) : null}
            </div>
          </div>
        </Container>
      </section>

      {/* Open committees */}
      <section
        id="committees"
        className="scroll-mt-24 border-y border-line bg-surface/50 py-20"
      >
        <Container>
          <SectionHeading
            eyebrow="Path 3"
            title="Join an open committee"
            description="These committees take any Rockville student. No GPA requirement, no election. Pick one and come to a meeting."
            action={{ label: "All committees", href: "/committees" }}
          />
          <ul className="grid gap-4 md:grid-cols-3">
            {open.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/committees/${c.slug}`}
                  className="group flex h-full flex-col gap-4 rounded-card border border-line bg-surface p-6 transition-colors hover:border-line-strong"
                >
                  <CommitteeTile committee={c} />
                  <div>
                    <h3 className="text-lg font-medium text-ink">{c.name}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink-muted">
                      {c.tagline}
                    </p>
                  </div>
                  <span className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-mc-purple">
                    Learn more{" "}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Meetings + interest form */}
      <section id="meetings" className="scroll-mt-24 py-20">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Path 0"
              title="Just come to a meeting."
              description={`Open meetings are every other ${site.meeting.day}, ${site.meeting.time}, in the ${site.meeting.location}. ${site.meeting.note} You can sit in the back, or you can speak during open floor.`}
              className="mb-6"
            />
            <CTA href="/events?type=meeting" variant="ghost" size="sm">
              See upcoming meetings
            </CTA>
            <figure className="mt-10">
              <div className="flex items-center justify-between border-t border-line pt-3 font-mono text-[11px] tracking-[0.08em] text-ink-muted uppercase">
                <span>Monday open meeting</span>
                <span>SV 104A</span>
              </div>
              <div className="relative mt-4 aspect-[3/2] overflow-hidden border border-line bg-surface">
                <Image
                  src="/images/open-meeting.jpg"
                  alt="Students seated around tables in the Student Life room listening to a presenter at a Monday open meeting"
                  fill
                  sizes="(min-width: 1024px) 520px, 100vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-3 font-mono text-[11px] tracking-[0.04em] text-ink-muted uppercase">
                <Todo
                  value="TODO: add the date of this meeting"
                  fallback="A Monday open meeting, Office of Student Life"
                />
              </figcaption>
            </figure>
          </div>
          <div className="rounded-card border border-line bg-surface p-6 md:p-8 lg:col-span-7">
            <h3 className="text-[22px] font-medium tracking-[-0.02em] text-ink">
              Tell us you’re interested
            </h3>
            <p className="mt-1 mb-6 text-sm text-ink-muted">
              Not ready to commit? Leave your name and a senator will reach out before the
              next meeting.
            </p>
            <ContactForm defaultTopic="join" compact />
          </div>
        </Container>
      </section>
    </>
  );
}
