import Link from "next/link";
import { Container } from "@/components/primitives/container";
import { SectionHeading } from "@/components/primitives/section-heading";
import { Avatar } from "@/components/primitives/avatar";
import { Pill } from "@/components/primitives/pill";
import { officers, people } from "@/content/people";
import { Reveal, RevealItem } from "@/components/primitives/reveal";

export function MeetSenators() {
  return (
    <section className="border-y border-line bg-surface/50 py-20 md:py-28">
      <Container>
        <SectionHeading
          eyebrow="Your representatives"
          title="Meet your senators"
          description={`${people.length} students elected to speak for the Rockville Campus in ${new Date().getFullYear()}–${new Date().getFullYear() + 1}. Here is the Executive Board.`}
          action={{ label: `See all ${people.length}`, href: "/senators" }}
        />
        <Reveal as="ul" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {officers.map((p) => (
            <RevealItem key={p.slug} as="li">
              <Link
                href={`/senators?role=${encodeURIComponent(p.role)}`}
                className="group flex h-full flex-col items-start gap-4 rounded-card border border-line bg-surface p-6 transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:border-mc-purple/30 hover:shadow-sm"
              >
                <Avatar name={p.name} photo={p.photo} size="lg" />
                <div>
                  <h3 className="text-[15px] font-medium text-ink group-hover:text-mc-purple">
                    {p.name}
                  </h3>
                  <Pill tone="purple" className="mt-2">
                    {p.role}
                  </Pill>
                </div>
              </Link>
            </RevealItem>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
