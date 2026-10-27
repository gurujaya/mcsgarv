import { Container } from "@/components/primitives/container";
import { SectionHeading } from "@/components/primitives/section-heading";
import { Pill, categoryTone } from "@/components/primitives/pill";
import { DirectoryRow } from "@/components/directory/directory-row";
import { CommitteeTile } from "@/components/committee-icon";
import { committees } from "@/content/committees";
import { Reveal } from "@/components/primitives/reveal";

export function CommitteesPreview() {
  return (
    <section className="border-b border-line">
      <Container className="pt-20 md:pt-28">
        <SectionHeading
          eyebrow="02 — Committees"
          title={`${committees.length} committees. Most are open to you.`}
          description="Each committee owns a slice of campus life. Pick the one that matches what you care about and show up to a meeting."
          action={{ label: "Browse all committees", href: "/committees" }}
        />
      </Container>
      <Reveal as="ul" className="flex flex-col border-t border-line">
        {committees.map((c) => (
          <DirectoryRow
            key={c.slug}
            animate="reveal"
            href={`/committees/${c.slug}`}
            className="px-6 md:px-10"
            leading={<CommitteeTile committee={c} />}
            title={c.shortName ? `${c.name} (${c.shortName})` : c.name}
            description={c.tagline}
            pills={c.pills.map((p) => (
              <Pill
                key={p}
                tone={p === "Open to all" ? "green" : categoryTone[c.category]}
              >
                {p}
              </Pill>
            ))}
          />
        ))}
      </Reveal>
    </section>
  );
}
