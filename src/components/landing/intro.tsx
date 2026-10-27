import Link from "next/link";
import { committees } from "@/content/committees";
import { elected } from "@/content/people";
import { Reveal, RevealItem } from "@/components/primitives/reveal";

const stats = [
  { value: "15,000+", label: "Students represented every semester" },
  { value: String(committees.length), label: "Committees, staffed by senators" },
  { value: String(elected.length), label: "Elected officers and senators" },
];

export function Intro() {
  return (
    <section id="intro" className="scroll-mt-16 bg-surface">
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-36">
        <Reveal className="max-w-[860px]">
          <RevealItem>
            <h2 className="serif-display text-[40px] md:text-[60px]">
              We are SGA Rockville.
            </h2>
            <p className="serif-lede mt-2 text-[32px] md:text-[48px]">
              Students, elected by students, to speak for the largest campus at Montgomery
              College.
            </p>
          </RevealItem>
          <RevealItem
            as="div"
            className="mt-16 grid gap-10 border-t border-line pt-10 sm:grid-cols-3 md:mt-20"
          >
            {stats.map((s) => (
              <div key={s.label}>
                <p className="font-serif text-[48px] leading-none tracking-[-0.02em] text-ink md:text-[64px]">
                  {s.value}
                </p>
                <p className="mt-3 max-w-[24ch] text-[14px] leading-[1.5] text-ink-muted">
                  {s.label}
                </p>
              </div>
            ))}
          </RevealItem>
          <RevealItem className="mt-14">
            <Link
              href="/about"
              className="mono-button border border-line-strong text-ink hover:border-ink"
            >
              Learn how
            </Link>
          </RevealItem>
        </Reveal>
      </div>
    </section>
  );
}
