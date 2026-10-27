import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal, RevealItem } from "@/components/primitives/reveal";
import { Todo } from "@/components/primitives/todo-chip";

function Figure({
  src,
  alt,
  ratio,
  label,
  caption,
  sizes,
}: {
  src: string;
  alt: string;
  ratio: string;
  label: string;
  caption: string;
  sizes: string;
}) {
  return (
    <figure>
      <div className="flex items-center justify-between border-t border-line pt-3 font-mono text-[11px] tracking-[0.08em] text-ink-muted uppercase">
        <span>{label}</span>
      </div>
      <div
        className={`relative mt-4 overflow-hidden border border-line bg-surface ${ratio}`}
      >
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
      </div>
      <figcaption className="mt-3 font-mono text-[11px] tracking-[0.04em] text-ink-muted uppercase">
        <Todo value={caption} fallback="Fall Fest on the Rockville Quad" />
      </figcaption>
    </figure>
  );
}

/** Two framed photographs with mono metadata: the campus-life side of SGA. */
export function CampusLife() {
  return (
    <section className="border-t border-line bg-bg">
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32">
        <div className="grid gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <p className="font-mono text-[11px] tracking-[0.14em] text-ink-muted uppercase">
              Campus life
            </p>
            <h2 className="serif-display mt-5 text-[40px] md:text-[64px]">
              Not everything is a meeting.
            </h2>
          </div>
          <div className="md:col-span-5">
            <p className="max-w-[40ch] text-[15px] leading-[1.6] text-ink-muted">
              Fall festivals, cultural nights, Club Rush, the talent show. SGA and the
              Student Activities Board plan the days that make a commuter campus feel like
              one place.
            </p>
            <Link
              href="/events"
              className="mono-button mt-6 border border-line-strong text-ink hover:border-ink"
            >
              See what’s on <ArrowRight className="size-3.5" aria-hidden />
            </Link>
          </div>
        </div>
        <Reveal className="mt-14 grid gap-8 md:mt-20 md:grid-cols-12 md:gap-10">
          <RevealItem className="md:col-span-7">
            <Figure
              src="/images/fall-fest.jpg"
              alt="Three students with their arms around each other, smiling in front of a white tent at Fall Fest on the Quad"
              ratio="aspect-[3/2]"
              label="Fig. 02 · Fall Fest"
              caption="TODO: add the Fall Fest date"
              sizes="(min-width: 768px) 760px, 100vw"
            />
          </RevealItem>
          <RevealItem className="md:col-span-5">
            <Figure
              src="/images/fall-fest-pair.jpg"
              alt="Two students smiling and flashing peace signs on the lawn during a fall event"
              ratio="aspect-[2/3] md:aspect-[4/5]"
              label="Fig. 03 · Fall Fest"
              caption="TODO: add the Fall Fest date"
              sizes="(min-width: 768px) 540px, 100vw"
            />
          </RevealItem>
        </Reveal>
      </div>
    </section>
  );
}
