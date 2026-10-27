import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import { HeroCanvas } from "./hero-canvas";
import { site } from "@/content/site";

function CornerMarks() {
  const c = "absolute size-3 border-ink/30";
  return (
    <>
      <span aria-hidden className={`${c} top-0 left-0 border-t border-l`} />
      <span aria-hidden className={`${c} top-0 right-0 border-t border-r`} />
      <span aria-hidden className={`${c} bottom-0 left-0 border-b border-l`} />
      <span aria-hidden className={`${c} right-0 bottom-0 border-r border-b`} />
    </>
  );
}

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-line bg-bg">
      <HeroCanvas />
      <div className="mx-auto flex min-h-[calc(100svh-4rem)] w-full max-w-[1400px] flex-col justify-center px-6 pt-32 pb-20 md:px-10 md:pb-24">
        <p className="font-mono text-[11px] tracking-[0.14em] text-ink-muted uppercase">
          Montgomery College · Rockville Campus · Student Government
        </p>
        <h1 className="serif-display mt-8 max-w-[12ch] text-[clamp(48px,8.2vw,112px)]">
          The voice of every Rockville student.
        </h1>
        <p className="mt-8 max-w-[44ch] text-[17px] leading-[1.55] text-ink-muted md:text-[19px]">
          We represent you to College leadership, fund your clubs, and build the events
          that make a commuter campus feel like a community.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <span className="relative inline-flex p-1.5">
            <CornerMarks />
            <Link
              href={site.applyUrl}
              className="mono-button bg-mc-purple text-white hover:bg-[#45186f]"
            >
              Apply to serve <ArrowRight className="size-3.5" aria-hidden />
            </Link>
          </span>
          <Link
            href="#intro"
            className="mono-button border border-line-strong text-ink hover:border-ink"
          >
            Learn more <ArrowDown className="size-3.5" aria-hidden />
          </Link>
        </div>
        <p className="mt-16 flex items-center gap-3 font-mono text-[11px] tracking-[0.06em] text-ink-muted uppercase">
          <span className="h-px w-8 bg-line-strong" aria-hidden />
          Open meetings · {site.meeting.day}s {site.meeting.time} ·{" "}
          {site.meeting.location}
        </p>
      </div>
    </section>
  );
}
