"use client";

import * as React from "react";
import { useReducedMotion } from "motion/react";

/**
 * Muted, looping background video that only plays while on screen and never
 * autoplays for people who prefer reduced motion (they see the poster).
 */
export function MeetingVideo({
  src,
  poster,
  className,
}: {
  src: string;
  poster: string;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const ref = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  return (
    <video
      ref={ref}
      className={className}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden
      tabIndex={-1}
    >
      {reduced ? null : <source src={src} type="video/mp4" />}
    </video>
  );
}
