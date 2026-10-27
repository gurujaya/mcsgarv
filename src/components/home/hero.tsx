import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/primitives/container";
import { CTA } from "@/components/primitives/cta";
import { Todo } from "@/components/primitives/todo-chip";
import { site } from "@/content/site";

export function Hero() {
  return (
    <section className="border-b border-line">
      <Container className="grid gap-12 py-16 md:py-20 lg:grid-cols-12 lg:gap-10 lg:py-24">
        <div className="flex flex-col justify-center lg:col-span-7">
          <p className="eyebrow">Montgomery College · Rockville Campus</p>
          <h1 className="display mt-6 text-[44px] sm:text-[56px] lg:text-[68px]">
            <span className="text-ink-muted">The official voice of</span>
            <br />
            every Rockville student.
          </h1>
          <p className="lede mt-7 max-w-[48ch]">
            We represent you to College leadership, fund your clubs, and build the events
            that make campus feel like a community.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <CTA href={site.applyUrl} variant="primary" size="lg">
              Apply to be a Senator
              <ArrowRight className="size-4" aria-hidden />
            </CTA>
            <CTA href="#what-we-do" variant="ghost" size="lg">
              See what we do
            </CTA>
          </div>
          <p className="mt-10 font-mono text-[12px] tracking-[0.02em] text-ink-muted uppercase">
            Open meetings · {site.meeting.day}s {site.meeting.time} ·{" "}
            {site.meeting.location}
          </p>
        </div>

        <figure className="lg:col-span-5">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-card border border-line bg-surface">
            <Image
              src="/images/sga-group.jpg"
              alt="Rockville SGA senators and officers on the stairs of a campus building, dressed for an advocacy event"
              fill
              priority
              sizes="(min-width: 1024px) 520px, 100vw"
              className="object-cover"
            />
          </div>
          <figcaption className="mt-3 font-mono text-[11px] tracking-[0.04em] text-ink-muted uppercase">
            <Todo
              value="TODO: add where and when this photo was taken"
              fallback="Rockville SGA senators and officers"
            />
          </figcaption>
        </figure>
      </Container>
    </section>
  );
}
