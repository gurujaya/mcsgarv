import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { committees, committeeCategories } from "@/content/committees";
import { Reveal, RevealItem } from "@/components/primitives/reveal";

/** A numbered serif index of the committees. */
export function CommitteesIndex() {
  return (
    <section className="bg-surface">
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-36">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="font-mono text-[11px] tracking-[0.14em] text-ink-muted uppercase">
              Committees
            </p>
            <h2 className="serif-display mt-5 text-[40px] md:text-[56px]">
              Where the work happens.
            </h2>
            <p className="mt-5 max-w-[34ch] text-[15px] leading-[1.6] text-ink-muted">
              Every senator serves on at least one. The Student Activities Board takes any
              student; the rest are where senators do their work.
            </p>
            <Link
              href="/committees"
              className="mono-button mt-8 border border-line-strong text-ink hover:border-ink"
            >
              All committees
            </Link>
          </div>
          <Reveal as="ol" className="border-t border-line md:col-span-8">
            {committees.map((c, i) => (
              <RevealItem key={c.slug} as="li">
                <Link
                  href={`/committees/${c.slug}`}
                  className="group grid grid-cols-[3rem_1fr_auto] items-baseline gap-4 border-b border-line py-5 transition-colors hover:bg-ink/[0.02] md:grid-cols-[4rem_1fr_10rem_auto] md:py-6"
                >
                  <span className="font-mono text-[12px] text-ink-faint">0{i + 1}</span>
                  <span>
                    <span className="font-serif text-[26px] leading-none tracking-[-0.01em] text-ink md:text-[34px]">
                      {c.name}
                    </span>
                    <span className="mt-1.5 block text-[14px] text-ink-muted">
                      {c.tagline}
                    </span>
                  </span>
                  <span className="hidden font-mono text-[11px] tracking-[0.08em] text-ink-muted uppercase md:block">
                    {committeeCategories[c.category]}
                    {c.openTo === "all-students" ? " · Open" : ""}
                  </span>
                  <ArrowUpRight
                    className="size-4 text-ink-faint transition-colors group-hover:text-ink"
                    aria-hidden
                  />
                </Link>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
