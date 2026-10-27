"use client";

import * as React from "react";
import Image from "next/image";
import { useReducedMotion } from "motion/react";

/**
 * Muted, looping background video. The poster is a lazy next/image so nothing
 * loads until the band is near the viewport; the video itself is requested
 * only when the band is on screen, and never for people who prefer reduced
 * motion (they keep the poster).
 */
export function MeetingVideo({
  src,
  poster,
  alt,
  className,
}: {
  src: string;
  poster: string;
  alt: string;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const ref = React.useRef<HTMLVideoElement>(null);
  const [armed, setArmed] = React.useState(false);
  const [playing, setPlaying] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          setArmed(true);
          el.play()
            .then(() => setPlaying(true))
            .catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.15, rootMargin: "200px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  return (
    <div className={className}>
      <Image
        src={poster}
        alt={alt}
        fill
        sizes="100vw"
        className={`object-cover object-[50%_40%] transition-opacity duration-700 ${playing ? "opacity-0" : "opacity-100"}`}
      />
      <video
        ref={ref}
        className="absolute inset-0 size-full object-cover object-[50%_40%]"
        muted
        loop
        playsInline
        preload="none"
        aria-hidden
        tabIndex={-1}
      >
        {armed && !reduced ? <source src={src} type="video/mp4" /> : null}
      </video>
    </div>
  );
}
