import { ArrowRight } from "lucide-react";
import { Container } from "@/components/primitives/container";
import { SectionHeading } from "@/components/primitives/section-heading";
import { CTA } from "@/components/primitives/cta";
import { Reveal, RevealItem } from "@/components/primitives/reveal";
import { site } from "@/content/site";

export const paths = [
  {
    id: "senator",
    title: "Senator-at-Large",
    tagline: "Vote, serve on committees, represent students to the College.",
    requirements: [
      "In good standing with the College and free from Code of Conduct violations",
      "Cumulative GPA of 2.0 or higher each semester while in office",
      "Attend SGA meetings weekly (Mondays, 4–6 PM)",
      "Complete an application and interview with current SGA members",
    ],
    cta: { label: "How to apply", href: "/get-involved#senator" },
    accent: true,
  },
  {
    id: "sab",
    title: "Student Activities Board",
    tagline: "Plan the parties, trivia nights, and cultural events on campus.",
    requirements: [
      "Any enrolled Rockville student",
      "Applications accepted on a rolling basis",
      "Email RVSAB@montgomerycollege.edu or submit the form",
      "Join the SAB WhatsApp group once accepted",
    ],
    cta: { label: "Join SAB", href: "/get-involved#sab" },
    accent: false,
  },
  {
    id: "committee",
    title: "Open committees",
    tagline: "Community Service, Food, Public Outreach: no election needed.",
    requirements: [
      "Any enrolled Rockville student",
      "Show up to a Monday open meeting and ask for the committee",
      "Commit to the committee’s meeting schedule",
      "No GPA requirement to participate",
    ],
    cta: { label: "Find a committee", href: "/get-involved#committees" },
    accent: false,
  },
] as const;

export function GetInvolvedPaths() {
  return (
    <section>
      <Container className="pt-20 md:pt-28">
        <SectionHeading
          eyebrow="05 — Get involved"
          title="Three ways in."
          description="You do not have to run for office to shape campus. Pick the level of commitment that fits your semester."
          action={{ label: "All the details", href: "/get-involved" }}
        />
      </Container>
      <Reveal className="grid border-y border-line lg:grid-cols-3">
        {paths.map((p, i) => (
          <RevealItem
            key={p.id}
            as="article"
            className={`flex flex-col px-6 py-8 md:px-10 md:py-10 ${i > 0 ? "border-t border-line lg:border-t-0 lg:border-l" : ""}`}
          >
            <p className="font-mono text-[11px] tracking-[0.08em] text-ink-muted uppercase">
              Path {i + 1}
            </p>
            <h3 className="mt-3 text-[22px] font-medium tracking-[-0.02em] text-ink">
              {p.title}
            </h3>
            <p className="mt-1.5 text-[14px] text-ink-muted">{p.tagline}</p>
            <ul className="mt-6 flex-1 divide-y divide-line border-y border-line">
              {p.requirements.map((r) => (
                <li key={r} className="py-2.5 text-[14px] leading-snug text-ink-muted">
                  {r}
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <CTA href={p.cta.href} variant={p.accent ? "primary" : "ghost"} size="sm">
                {p.cta.label}
                <ArrowRight className="size-3.5" aria-hidden />
              </CTA>
            </div>
          </RevealItem>
        ))}
      </Reveal>
      <Container className="py-6">
        <p className="font-mono text-[11px] tracking-[0.04em] text-ink-muted uppercase">
          Not sure? Just come to a meeting · {site.meeting.day}s {site.meeting.time} ·{" "}
          {site.meeting.location}
        </p>
      </Container>
    </section>
  );
}
