import { Check } from "lucide-react";
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
    <Container as="section" className="py-20 md:py-28">
      <SectionHeading
        eyebrow="Get involved"
        title="Three ways in."
        description="You do not have to run for office to shape campus. Pick the level of commitment that fits your semester."
        action={{ label: "All the details", href: "/get-involved" }}
      />
      <Reveal className="grid gap-4 lg:grid-cols-3">
        {paths.map((p) => (
          <RevealItem
            key={p.id}
            as="article"
            className="flex flex-col rounded-card border border-line bg-surface p-6"
          >
            <h3 className="font-serif text-2xl font-semibold text-ink">{p.title}</h3>
            <p className="mt-1.5 text-sm text-ink-muted">{p.tagline}</p>
            <ul className="mt-5 flex-1 space-y-2.5">
              {p.requirements.map((r) => (
                <li key={r} className="flex gap-2.5 text-sm text-ink-muted">
                  <Check
                    className="mt-0.5 size-4 shrink-0 text-mc-green-ink"
                    aria-hidden
                  />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <CTA href={p.cta.href} variant={p.accent ? "accent" : "ghost"} size="sm">
                {p.cta.label}
              </CTA>
            </div>
          </RevealItem>
        ))}
      </Reveal>
      <p className="mt-8 text-sm text-ink-muted">
        Not sure? Just come to a meeting: {site.meeting.day}s, {site.meeting.time},{" "}
        {site.meeting.location}.
      </p>
    </Container>
  );
}
