"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { useReducedMotion } from "motion/react";

const HeroScene = dynamic(() => import("./hero-scene"), {
  ssr: false,
  loading: () => null,
});

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
 * Full-bleed canvas behind the hero copy. Degrades to a static radial gradient
 * when the user prefers reduced motion, the device is low-end, or WebGL is
 * unavailable. Pauses the render loop when scrolled off-screen.
 */
export function HeroCanvas() {
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = React.useState(false);
  const [visible, setVisible] = React.useState(true);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (reduced) return;
    // Load the 3D chunk only after the page has fully loaded and the main thread
    // is idle, so it never competes with LCP or hydration.
    let cancelled = false;
    let idleId: number | undefined;
    const start = () => {
      const w = window as Window & {
        requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      };
      const run = () => {
        if (!cancelled) setEnabled(canRun3D());
      };
      if (w.requestIdleCallback) idleId = w.requestIdleCallback(run, { timeout: 2500 });
      else idleId = window.setTimeout(run, 600);
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    return () => {
      cancelled = true;
      window.removeEventListener("load", start);
      if (idleId !== undefined) {
        const w = window as Window & { cancelIdleCallback?: (id: number) => void };
        if (w.cancelIdleCallback) w.cancelIdleCallback(idleId);
        window.clearTimeout(idleId);
      }
    };
  }, [reduced]);

  React.useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry?.isIntersecting ?? true),
      {
        threshold: 0.05,
      },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [enabled]);

  return (
    <div ref={ref} aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
      {/* Static fallback: always present, the canvas fades in over it. */}
      <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_70%_40%,color-mix(in_srgb,var(--color-mc-purple)_12%,transparent),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(40%_40%_at_20%_80%,color-mix(in_srgb,var(--color-mc-orange)_7%,transparent),transparent_70%)]" />
      {enabled && !reduced ? (
        <div className="absolute inset-0 animate-in duration-1000 fade-in">
          <HeroScene paused={!visible} />
        </div>
      ) : null}
      {/* Soften the bottom edge into the page background. */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg" />
    </div>
  );
}
