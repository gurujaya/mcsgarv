import { Reveal, RevealItem } from "@/components/primitives/reveal";

const cells = [
  {
    n: "01",
    title: "Advocate",
    body: "We sit in the rooms where campus decisions get made and bring your concerns with us: dining, safety, facilities, tuition, accessibility.",
  },
  {
    n: "02",
    title: "Fund",
    body: "Student activity fees are your money. The Budget Panel reviews every club request so it goes toward events that actually reach students.",
  },
  {
    n: "03",
    title: "Program",
    body: "From the talent show to Club Rush, SGA and SAB plan the events that turn a commuter campus into a community.",
  },
  {
    n: "04",
    title: "Connect",
    body: "We’re the bridge between 15,000 students, 130+ clubs, Student Life, and College leadership. If you don’t know who to ask, ask us.",
  },
];

/** Warm band with hairline cells. */
export function WhatWeDo() {
  return (
    <section id="what-we-do" className="scroll-mt-16 border-y border-line bg-bg">
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32">
        <div className="grid gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <p className="font-mono text-[11px] tracking-[0.14em] text-ink-muted uppercase">
              What SGA does
            </p>
            <h2 className="serif-display mt-5 text-[40px] md:text-[64px]">
              Four jobs. One campus.
            </h2>
          </div>
          <p className="max-w-[40ch] text-[15px] leading-[1.6] text-ink-muted md:col-span-5">
            Everything SGA does falls under one of these. If it affects students on the
            Rockville Campus, it is our business.
          </p>
        </div>
        <Reveal className="mt-14 grid border border-line bg-surface md:mt-20 md:grid-cols-4">
          {cells.map((c, i) => (
            <RevealItem
              key={c.n}
              as="article"
              className={`flex flex-col p-7 md:p-8 ${i > 0 ? "border-t border-line md:border-t-0 md:border-l" : ""}`}
            >
              <p className="font-mono text-[11px] tracking-[0.12em] text-ink-faint">
                {c.n}
              </p>
              <h3 className="mt-8 font-serif text-[28px] leading-none tracking-[-0.01em] text-ink">
                {c.title}
              </h3>
              <p className="mt-4 text-[14px] leading-[1.65] text-ink-muted">{c.body}</p>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
