import { Container } from "@/components/primitives/container";
import { CTA } from "@/components/primitives/cta";
import { HeroCanvas } from "./hero-canvas";
import { site } from "@/content/site";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <HeroCanvas />
      <Container className="relative flex min-h-[min(calc(100svh-4rem),820px)] flex-col justify-center py-24 md:py-32">
        <p className="text-xs font-medium tracking-[0.16em] text-mc-purple uppercase">
          Montgomery College · Rockville Campus
        </p>
        <h1 className="mt-5 max-w-[16ch] font-serif text-5xl leading-[1.02] font-semibold tracking-tight text-ink md:text-7xl">
          The official voice of every Rockville student.
        </h1>
        <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-ink-muted">
          We represent you to College leadership, fund your clubs, and build the events
          that make campus feel like a community.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <CTA href={site.applyUrl} variant="accent" size="lg">
            Apply to be a Senator
          </CTA>
          <CTA href="#what-we-do" variant="ghost" size="lg">
            See what we do
          </CTA>
        </div>
        <p className="mt-10 text-sm text-ink-muted">
          Open meetings every {site.meeting.day}, {site.meeting.time} ·{" "}
          {site.meeting.location}
        </p>
      </Container>
    </section>
  );
}
