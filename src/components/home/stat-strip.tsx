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
      duration: 1.4,
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

export function StatStrip({ stats }: { stats: Stat[] }) {
  return (
    <dl className="grid grid-cols-2 divide-line overflow-hidden rounded-card border border-line bg-surface md:grid-cols-4 md:divide-x">
      {stats.map((s, i) => (
        <div
          key={s.label}
          className={`flex flex-col gap-1 px-6 py-6 ${i < 2 ? "border-b md:border-b-0" : ""} ${i % 2 === 0 ? "border-r md:border-r-0" : ""} border-line`}
        >
          <dt className="order-2 text-xs text-ink-muted">{s.label}</dt>
          <dd className="order-1 font-serif text-3xl font-semibold tracking-tight text-mc-purple md:text-4xl">
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
