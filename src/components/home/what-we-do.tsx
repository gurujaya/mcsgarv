import { Megaphone, Wallet, PartyPopper, Link2, type LucideIcon } from "lucide-react";
import { Reveal, RevealItem } from "@/components/primitives/reveal";
import { SectionHeading } from "@/components/primitives/section-heading";
import { Container } from "@/components/primitives/container";

const cards: { title: string; body: string; icon: LucideIcon }[] = [
  {
    title: "Advocate",
    body: "We sit in the rooms where campus decisions get made and bring your concerns with us: dining, safety, facilities, tuition, accessibility.",
    icon: Megaphone,
  },
  {
    title: "Fund",
    body: "Student activity fees are your money. The Budget Panel reviews every club request so it goes toward events that actually reach students.",
    icon: Wallet,
  },
  {
    title: "Program",
    body: "From the talent show to Club Rush, SGA and SAB plan the events that turn a commuter campus into a community.",
    icon: PartyPopper,
  },
  {
    title: "Connect",
    body: "We’re the bridge between 15,000 students, 130+ clubs, Student Life, and College leadership. If you don’t know who to ask, ask us.",
    icon: Link2,
  },
];

export function WhatWeDo() {
  return (
    <section id="what-we-do" className="scroll-mt-20 border-b border-line">
      <Container className="pt-20 md:pt-28">
        <SectionHeading
          eyebrow="01 — What SGA does"
          title="Four jobs. One campus."
          description="Everything SGA does falls under one of these. If it affects students on the Rockville Campus, it is our business."
          action={{ label: "More about SGA", href: "/about" }}
        />
      </Container>
      <Reveal className="grid border-t border-line sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c, i) => (
          <RevealItem
            key={c.title}
            as="article"
            className={`px-6 py-8 md:px-10 md:py-10 ${i > 0 ? "border-t border-line sm:border-t-0" : ""} ${i % 2 === 1 ? "sm:border-l sm:border-line" : ""} ${i >= 2 ? "sm:border-t lg:border-t-0" : ""} ${i > 0 ? "lg:border-l lg:border-line" : ""}`}
          >
            <c.icon className="size-5 stroke-[1.5] text-ink" aria-hidden />
            <h3 className="mt-8 text-[20px] font-medium tracking-[-0.02em] text-ink">
              {c.title}
            </h3>
            <p className="mt-2.5 text-[15px] leading-[1.6] text-ink-muted">{c.body}</p>
          </RevealItem>
        ))}
      </Reveal>
    </section>
  );
}
