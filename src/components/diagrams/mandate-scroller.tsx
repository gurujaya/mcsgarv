"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "cn";
import { BuildFig, FundFig, ListenFig, RepresentFig } from "./figures";

const FIGS = {
  represent: RepresentFig,
  fund: FundFig,
  listen: ListenFig,
  build: BuildFig,
} as const;
export type FigKey = keyof typeof FIGS;

export type Chapter = {
  n: string;
  verb: string;
  claim: string;
  how: string;
  where: string;
  fig: FigKey;
};

/**
 * Scroll-driven sequence: chapters scroll on the left while one large figure
 * stays pinned on the right and crossfades as the active chapter changes.
 * On small screens each chapter shows its own figure inline.
 */
export function MandateScroller({ chapters }: { chapters: Chapter[] }) {
  const [active, setActive] = React.useState(0);
  const refs = React.useRef<(HTMLElement | null)[]>([]);
  const reduced = useReducedMotion();

  React.useEffect(() => {
    const els = refs.current.filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting)
            setActive(Number((e.target as HTMLElement).dataset.index));
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const Active = chapters[active] ? FIGS[chapters[active].fig] : null;

  return (
    <div className="grid lg:grid-cols-12 lg:gap-10">
      {/* Chapters */}
      <ol className="lg:col-span-6">
        {chapters.map((c, i) => (
          <li
            key={c.n}
            data-index={i}
            ref={(el) => {
              refs.current[i] = el;
            }}
            className="flex min-h-[70svh] flex-col justify-center border-t border-white/10 py-16 first:border-t-0 lg:min-h-[92svh] lg:py-24 lg:last:min-h-[64svh]"
          >
            <p className="font-mono text-[11px] tracking-[0.14em] text-white/45 uppercase">
              Fig 02.{i + 1} · {c.n} of 04
            </p>
            {/* inline figure on small screens */}
            <div className="iso-dark mt-8 lg:hidden">
              {React.createElement(FIGS[c.fig], { className: "h-[220px] w-full" })}
            </div>
            <h3 className="serif-display mt-8 text-[64px] text-white md:text-[112px]">
              {c.verb}
            </h3>
            <p className="mt-6 max-w-[26ch] font-serif text-[26px] leading-[1.15] tracking-[-0.01em] text-white/85 md:text-[34px]">
              {c.claim}
            </p>
            <p className="mt-6 max-w-[52ch] text-[15px] leading-[1.65] text-white/60">
              {c.how}
            </p>
            <p className="mt-8 font-mono text-[11px] leading-[1.9] tracking-[0.08em] text-white/45 uppercase">
              <span className="text-white/50">Where it happens — </span>
              {c.where}
            </p>
          </li>
        ))}
      </ol>

      {/* Pinned stage */}
      <div className="hidden lg:col-span-6 lg:block">
        <div className="iso-dark sticky top-16 flex h-[calc(100vh-4rem)] flex-col justify-center">
          <div className="relative aspect-square w-full max-w-[640px] self-center">
            {/* faint grid */}
            <div
              aria-hidden
              className="absolute inset-0 opacity-50"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
                maskImage: "radial-gradient(closest-side, black 55%, transparent 100%)",
                WebkitMaskImage:
                  "radial-gradient(closest-side, black 55%, transparent 100%)",
              }}
            />
            <AnimatePresence mode="wait" initial={false}>
              {Active ? (
                <motion.div
                  key={active}
                  className="absolute inset-0 flex items-center justify-center"
                  initial={reduced ? false : { opacity: 0, y: 18, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={reduced ? { opacity: 0 } : { opacity: 0, y: -14, scale: 0.985 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <motion.div
                    className="size-full"
                    animate={reduced ? undefined : { y: [0, -6, 0] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Active className="size-full" />
                  </motion.div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
          {/* progress */}
          <ol className="mx-auto mt-6 flex w-full max-w-[640px] items-center gap-6 font-mono text-[11px] tracking-[0.12em] uppercase">
            {chapters.map((c, i) => (
              <li key={c.n} className="flex items-center gap-3">
                <span
                  className={cn(
                    "h-px w-10 transition-colors duration-500",
                    i <= active ? "bg-white/70" : "bg-white/15",
                  )}
                />
                <span
                  className={cn(
                    "transition-colors duration-500",
                    i === active ? "text-white" : "text-white/35",
                  )}
                >
                  {c.verb}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
