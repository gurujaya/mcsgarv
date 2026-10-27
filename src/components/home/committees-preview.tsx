import { Container } from "@/components/primitives/container";
import { SectionHeading } from "@/components/primitives/section-heading";
import { Pill } from "@/components/primitives/pill";
import { DirectoryRow } from "@/components/directory/directory-row";
import { CommitteeTile } from "@/components/committee-icon";
import { committees } from "@/content/committees";
import { Reveal } from "@/components/primitives/reveal";

export function CommitteesPreview() {
  return (
    <section className="border-y border-line bg-surface/50 py-20 md:py-28">
      <Container>
        <SectionHeading
          eyebrow="Committees"
          title={`${committees.length} committees. Most are open to you.`}
          description="Each committee owns a slice of campus life. Pick the one that matches what you care about and show up to a meeting."
          action={{ label: "Browse all committees", href: "/committees" }}
        />
        <Reveal as="ul" className="flex flex-col gap-2">
          {committees.map((c) => (
            <DirectoryRow
              key={c.slug}
              animate="reveal"
              href={`/committees/${c.slug}`}
              leading={<CommitteeTile committee={c} />}
              title={c.shortName ? `${c.name} (${c.shortName})` : c.name}
              description={c.tagline}
              pills={c.pills.map((p) => (
                <Pill
                  key={p}
                  tone={
                    p === "Open to all"
                      ? "green"
                      : p === "Rolling applications"
                        ? "orange"
                        : c.color
                  }
                >
                  {p}
                </Pill>
              ))}
            />
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
