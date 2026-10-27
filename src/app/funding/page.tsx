import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { Container } from "@/components/primitives/container";
import { SectionHeading } from "@/components/primitives/section-heading";
import { Todo, TodoChip } from "@/components/primitives/todo-chip";
import { FundingForm } from "@/components/forms/funding-form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faq } from "@/content/faq";
import { site } from "@/content/site";
import { people } from "@/content/people";

export const metadata: Metadata = {
  title: "Club Funding",
  description:
    "How recognized clubs request money from the SGA Rockville Budget Panel: what the panel looks for, the step-by-step process, and the request form.",
};

const steps = [
  {
    title: "Plan the event with your advisor",
    body: "Your club must be recognized through the Office of Student Life, and the event needs a date, a venue, an estimated attendance, and a budget with line items.",
  },
  {
    title: "Submit the request",
    body: "Use the form below (or the Student Life form, if your advisor prefers). Say exactly what the money pays for and how the event benefits students.",
  },
  {
    title: "Budget Panel review",
    body: "The Treasurer and senators on the Budget Panel evaluate the request on whether it promotes student engagement, strengthens campus community, and how it benefits the student body. You may be invited to present for five minutes.",
  },
  {
    title: "Decision and processing",
    body: "The panel recommends an amount to the SGA. Approved funds are processed through the Office of Student Life, which handles purchasing and reimbursements.",
  },
  {
    title: "After the event",
    body: "Send attendance numbers and a few photos. It helps the next club, and it helps SGA show the College where activity fees go.",
  },
];

const criteria = [
  {
    label: "Promotes student engagement",
    detail: "Does it get students participating, not just attending?",
  },
  {
    label: "Strengthens campus community",
    detail: "Is it open to all students, or only members of your club?",
  },
  {
    label: "Benefits the student body",
    detail: "What do students leave with: a skill, a connection, a tradition?",
  },
  {
    label: "Realistic budget",
    detail: "Line items, quotes where possible, and no padding.",
  },
];

export default function FundingPage() {
  const treasurer = people.find((p) => p.role === "Treasurer");
  const fundingFaq = faq.filter((f) => f.category === "funding");

  return (
    <>
      <PageHeader
        eyebrow="Funding"
        title="Student activity fees are your money. Here’s how to use them."
        description="Recognized clubs request funding for events through the SGA Budget Panel. The panel’s only question is whether the money reaches students."
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#request"
            className="inline-flex h-11 items-center rounded-pill bg-mc-orange px-5 text-sm font-medium text-ink transition hover:brightness-95"
          >
            Request funding
          </a>
          <Link
            href="/committees/budget-panel"
            className="inline-flex h-11 items-center rounded-pill border border-line bg-surface px-5 text-sm font-medium text-ink transition-colors hover:border-mc-purple/40 hover:text-mc-purple"
          >
            About the Budget Panel
          </Link>
        </div>
      </PageHeader>

      <Container className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <SectionHeading
            eyebrow="Process"
            title="Five steps, start to finish."
            className="mb-6"
          />
          <ol className="space-y-3">
            {steps.map((s, i) => (
              <li
                key={s.title}
                className="flex gap-5 rounded-card border border-line bg-surface p-6"
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-mc-purple font-serif text-lg font-semibold text-white">
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
          <p className="mt-4 text-xs text-ink-muted">
            Lead time:{" "}
            <Todo
              value="TODO: confirm how far in advance requests must be submitted and any semester deadlines."
              fallback="submit as early as you can; ask the Treasurer about deadlines."
            />
          </p>
        </div>

        <aside className="lg:col-span-5">
          <div className="sticky top-24 space-y-4">
            <div className="rounded-card border border-line bg-surface p-6">
              <h2 className="text-xs font-medium tracking-[0.14em] text-ink uppercase">
                What the panel looks for
              </h2>
              <ul className="mt-4 space-y-4">
                {criteria.map((c) => (
                  <li key={c.label}>
                    <p className="text-sm font-medium text-ink">{c.label}</p>
                    <p className="text-sm text-ink-muted">{c.detail}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-card bg-mc-purple p-6 text-white">
              <h2 className="text-xs font-medium tracking-[0.14em] uppercase opacity-80">
                Questions?
              </h2>
              <p className="mt-3 text-sm leading-relaxed">
                The Budget Panel is chaired by the SGA Treasurer
                {treasurer ? `, ${treasurer.name}` : ""}. Email{" "}
                <a
                  href={`mailto:${site.email}?subject=Club%20funding%20question`}
                  className="underline underline-offset-4"
                >
                  {site.email}
                </a>{" "}
                or come to the Monday open meeting.
              </p>
            </div>
          </div>
        </aside>
      </Container>

      <section
        id="request"
        className="mt-24 scroll-mt-24 border-y border-line bg-surface/50 py-20"
      >
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="Request form"
              title="Request funding"
              description="Fill this out once your advisor has signed off on the event. The Treasurer will confirm receipt by email."
              className="mb-4"
            />
            <p className="text-xs text-ink-muted">
              Submissions are forwarded to the SGA Treasurer.{" "}
              <TodoChip note="Set FORM_ENDPOINT in Vercel env; confirm whether Student Life requires its own form in addition" />
            </p>
          </div>
          <div className="rounded-card border border-line bg-surface p-6 md:p-8 lg:col-span-8">
            <FundingForm />
          </div>
        </Container>
      </section>

      <Container className="py-20">
        <SectionHeading
          eyebrow="FAQ"
          title="Funding questions"
          action={{ label: "All FAQs", href: "/faq" }}
        />
        <Accordion
          type="single"
          collapsible
          className="rounded-card border border-line bg-surface px-6"
        >
          {fundingFaq.map((f, i) => (
            <AccordionItem key={f.q} value={`f-${i}`}>
              <AccordionTrigger className="text-[15px] font-medium text-ink">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-[15px] leading-relaxed text-ink-muted">
                <Todo
                  value={f.a}
                  fallback="Answer coming soon. Email the Treasurer in the meantime."
                />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </>
  );
}
