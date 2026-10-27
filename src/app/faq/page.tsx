import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { Container } from "@/components/primitives/container";
import { Todo } from "@/components/primitives/todo-chip";
import { CTA } from "@/components/primitives/cta";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faq, faqCategories } from "@/content/faq";
import type { FAQCategory } from "@/content/types";
import { isTodo } from "@/lib/todo";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to the questions students ask SGA Rockville most: meetings, joining, funding, and where to find us.",
};

const order: FAQCategory[] = ["general", "meetings", "joining", "funding"];

export default function FAQPage() {
  const answered = faq.filter((f) => !isTodo(f.a));
  return (
    <>
      <PageHeader
        compact
        eyebrow="FAQ"
        title="Questions students actually ask."
        description="Short answers, with links to the longer version. If yours is not here, ask at a Monday meeting or send it through the contact form."
      />
      <Container className="grid gap-12 pt-12 pb-24 md:pt-16 lg:grid-cols-12">
        <nav aria-label="FAQ sections" className="lg:col-span-3">
          <ul className="flex flex-wrap gap-2 lg:sticky lg:top-24 lg:flex-col lg:gap-1">
            {order.map((c) => (
              <li key={c}>
                <a
                  href={`#faq-${c}`}
                  className="block rounded-pill px-3 py-1.5 text-sm text-ink-muted hover:bg-surface hover:text-ink lg:rounded-md"
                >
                  {faqCategories[c]}{" "}
                  <span className="text-xs text-ink-muted/70">
                    {faq.filter((f) => f.category === c).length}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="space-y-12 lg:col-span-9">
          {order.map((c) => (
            <section key={c} id={`faq-${c}`} className="scroll-mt-24">
              <h2 className="eyebrow mb-3">{faqCategories[c]}</h2>
              <Accordion
                type="multiple"
                className="rounded-card border border-line bg-surface px-6"
              >
                {faq.map((f, i) =>
                  f.category === c ? (
                    <AccordionItem
                      key={f.q}
                      value={`q-${i}`}
                      id={`q-${i}`}
                      className="scroll-mt-24"
                    >
                      <AccordionTrigger className="text-left text-[15px] font-medium text-ink">
                        {f.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-[15px] leading-relaxed text-ink-muted">
                        {f.a.split(/\n\s*\n/).map((p, j) => (
                          <p key={j} className={j > 0 ? "mt-3" : undefined}>
                            <Todo value={p} fallback="Answer coming soon." />
                          </p>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  ) : null,
                )}
              </Accordion>
            </section>
          ))}
          <div className="rounded-card border border-line bg-surface p-6">
            <p className="text-sm text-ink">
              Still have a question? {answered.length} of {faq.length} answers above are
              confirmed.
            </p>
            <div className="mt-4 flex gap-2">
              <CTA href="/contact" size="sm">
                Ask SGA
              </CTA>
              <CTA href="/events?type=meeting" variant="ghost" size="sm">
                Come to a meeting
              </CTA>
            </div>
          </div>
        </div>
      </Container>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: answered.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />
    </>
  );
}
