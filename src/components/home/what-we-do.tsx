import { Megaphone, Wallet, PartyPopper, Link2, type LucideIcon } from "lucide-react";
import { Reveal, RevealItem } from "@/components/primitives/reveal";
import { SectionHeading } from "@/components/primitives/section-heading";
import { Container } from "@/components/primitives/container";

const cards: { title: string; body: string; icon: LucideIcon; tone: string }[] = [
  {
    title: "Advocate",
    body: "We sit in the rooms where campus decisions get made and bring your concerns with us: dining, safety, facilities, tuition, accessibility.",
    icon: Megaphone,
    tone: "bg-mc-purple/8 text-mc-purple",
  },
  {
    title: "Fund",
    body: "Student activity fees are your money. The Budget Panel reviews every club request so it goes toward events that actually reach students.",
    icon: Wallet,
    tone: "bg-mc-green/10 text-mc-green-ink",
  },
  {
    title: "Program",
    body: "From the talent show to Club Rush, SGA and SAB plan the events that turn a commuter campus into a community.",
    icon: PartyPopper,
    tone: "bg-mc-blue/10 text-mc-blue-ink",
  },
  {
    title: "Connect",
    body: "We’re the bridge between 15,000 students, 130+ clubs, Student Life, and College leadership. If you don’t know who to ask, ask us.",
    icon: Link2,
    tone: "bg-mc-orange/10 text-mc-orange-ink",
  },
];

export function WhatWeDo() {
  return (
    <Container as="section" className="scroll-mt-24 py-20 md:py-28">
      <div id="what-we-do" className="scroll-mt-28" />
      <SectionHeading
        eyebrow="What SGA does"
        title="Four jobs. One campus."
        description="Everything SGA does falls under one of these. If it affects students on the Rockville Campus, it is our business."
        action={{ label: "More about SGA", href: "/about" }}
      />
      <Reveal className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <RevealItem
            key={c.title}
            as="article"
            className="group rounded-card border border-line bg-surface p-6 transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-sm"
          >
            <span
              className={`flex size-11 items-center justify-center rounded-[10px] ${c.tone}`}
            >
              <c.icon className="size-5" aria-hidden />
            </span>
            <h3 className="mt-5 font-serif text-2xl font-semibold text-ink">{c.title}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-ink-muted">{c.body}</p>
          </RevealItem>
        ))}
      </Reveal>
    </Container>
  );
}
