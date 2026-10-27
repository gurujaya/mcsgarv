import Link from "next/link";
import { Container } from "@/components/primitives/container";
import { SectionHeading } from "@/components/primitives/section-heading";
import { Avatar } from "@/components/primitives/avatar";
import { officers, elected } from "@/content/people";
import { site } from "@/content/site";
import { Reveal, RevealItem } from "@/components/primitives/reveal";

export function MeetSenators() {
  return (
    <section className="border-b border-line">
      <Container className="pt-20 md:pt-28">
        <SectionHeading
          eyebrow="04 — Your representatives"
          title="Meet your senators"
          description={`${elected.length} students elected to speak for the Rockville Campus in ${site.term}. This is the Executive Board.`}
          action={{ label: `See all ${elected.length}`, href: "/senators" }}
        />
      </Container>
      <Reveal as="ul" className="grid border-t border-line sm:grid-cols-2 lg:grid-cols-4">
        {officers.map((p, i) => (
          <RevealItem
            key={p.slug}
            as="li"
            className={`${i > 0 ? "border-t border-line sm:border-t-0" : ""} ${i % 2 === 1 ? "sm:border-l sm:border-line" : ""} ${i >= 2 ? "sm:border-t lg:border-t-0" : ""} ${i > 0 ? "lg:border-l lg:border-line" : ""}`}
          >
            <Link
              href={`/senators?role=${encodeURIComponent(p.role)}`}
              className="group flex h-full flex-col gap-6 px-6 py-8 transition-colors hover:bg-ink/[0.025] md:px-10 md:py-10"
            >
              <Avatar name={p.name} photo={p.photo} size="lg" />
              <div>
                <p className="font-mono text-[11px] tracking-[0.08em] text-ink-muted uppercase">
                  {p.role}
                </p>
                <h3 className="mt-1.5 text-[17px] font-medium tracking-[-0.01em] text-ink">
                  {p.name}
                </h3>
              </div>
            </Link>
          </RevealItem>
        ))}
      </Reveal>
    </section>
  );
}
