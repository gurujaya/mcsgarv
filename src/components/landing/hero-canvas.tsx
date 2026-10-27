"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { useReducedMotion } from "motion/react";

const HeroShader = dynamic(() => import("./hero-shader"), {
  ssr: false,
  loading: () => null,
});

const PHOTO = "/images/sga-group-wide.jpg";

function canRun3D(): boolean {
  if (typeof window === "undefined") return false;
  const nav = navigator as Navigator & { deviceMemory?: number };
  if (typeof nav.hardwareConcurrency === "number" && nav.hardwareConcurrency < 4)
    return false;
  if (typeof nav.deviceMemory === "number" && nav.deviceMemory < 4) return false;
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

/**
 * The hero's one visual: the group photo as a halftone dot screen bleeding in
 * from the right. Without WebGL or with reduced motion it falls back to the
 * photo itself, desaturated and masked the same way.
 */
export function HeroCanvas() {
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = React.useState(false);
  const [visible, setVisible] = React.useState(true);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (reduced) return;
    // Start the three.js chunk on the first user interaction, or 2.5s after the
    // page loads, whichever comes first. It never competes with first paint.
    let done = false;
    let timer: number | undefined;
    const run = () => {
      if (done) return;
      done = true;
      setEnabled(canRun3D());
      cleanup();
    };
    const events = ["pointermove", "scroll", "touchstart", "keydown"] as const;
    const cleanup = () => {
      events.forEach((e) => window.removeEventListener(e, run));
      window.removeEventListener("load", onLoad);
      if (timer) window.clearTimeout(timer);
    };
    const onLoad = () => {
      timer = window.setTimeout(run, 2500);
    };
    events.forEach((e) => window.addEventListener(e, run, { passive: true, once: true }));
    if (document.readyState === "complete") onLoad();
    else window.addEventListener("load", onLoad, { once: true });
    return cleanup;
  }, [reduced]);

  React.useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;
    const io = new IntersectionObserver(([e]) => setVisible(e?.isIntersecting ?? true), {
      threshold: 0.02,
    });
    io.observe(el);
    return () => io.disconnect();
  }, [enabled]);

  const mask =
    "linear-gradient(to right, transparent 0%, black 55%), linear-gradient(to top, transparent 0%, black 40%, black 88%, transparent 100%)";

  return (
    <div ref={ref} aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
      {/* faint dot grid over the whole hero */}
      <div
        className="absolute inset-0 opacity-[0.55]"
        style={{
          backgroundImage:
            "radial-gradient(circle, color-mix(in srgb, var(--color-ink) 14%, transparent) 1px, transparent 1.2px)",
          backgroundSize: "28px 28px",
          maskImage: "linear-gradient(to bottom, black 0%, transparent 85%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 85%)",
        }}
      />
      {enabled && !reduced ? (
        <div className="absolute inset-y-0 right-0 w-full animate-in duration-1000 fade-in lg:w-[62%]">
          <HeroShader paused={!visible} src={PHOTO} />
        </div>
      ) : (
        <div
          className="absolute inset-y-0 right-0 w-full lg:w-[62%]"
          style={{
            maskImage: mask,
            WebkitMaskImage: mask,
            maskComposite: "intersect",
            WebkitMaskComposite: "source-in",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- decorative, masked */}
          <img
            src={PHOTO}
            alt=""
            className="size-full object-cover opacity-[0.28] grayscale"
          />
        </div>
      )}
    </div>
  );
}
