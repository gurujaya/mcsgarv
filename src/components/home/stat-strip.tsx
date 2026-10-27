"use client";

import * as React from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

type Stat = { value: number | string; suffix?: string; label: string; prefix?: string };

function CountUp({
  to,
  suffix = "",
  prefix = "",
}: {
  to: number;
  suffix?: string;
  prefix?: string;
}) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduced = useReducedMotion();

  React.useEffect(() => {
    const el = ref.current;
    if (!el || !inView) return;
    if (reduced) {
      el.textContent = `${prefix}${to.toLocaleString()}${suffix}`;
      return;
    }
    const controls = animate(0, to, {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        el.textContent = `${prefix}${Math.round(v).toLocaleString()}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, to, suffix, prefix, reduced]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}0{suffix}
    </span>
  );
}

/** Bordered cells, like a table row: number, then a mono label. */
export function StatStrip({ stats }: { stats: Stat[] }) {
  return (
    <dl className="grid grid-cols-2 border-b border-line md:grid-cols-4">
      {stats.map((s, i) => (
        <div
          key={s.label}
          className={`flex flex-col gap-2 px-6 py-7 md:px-10 md:py-8 ${i % 2 === 1 ? "border-l border-line" : ""} ${i >= 2 ? "border-t border-line md:border-t-0 md:border-l" : ""}`}
        >
          <dt className="order-2 font-mono text-[11px] tracking-[0.06em] text-ink-muted uppercase">
            {s.label}
          </dt>
          <dd className="order-1 text-[32px] leading-none font-medium tracking-[-0.03em] text-ink md:text-[40px]">
            {typeof s.value === "number" ? (
              <CountUp to={s.value} suffix={s.suffix} prefix={s.prefix} />
            ) : (
              s.value
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}
