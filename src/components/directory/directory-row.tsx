"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { cn } from "cn";
import { revealChild } from "@/components/primitives/reveal";

export type DirectoryRowProps = {
  href: string;
  /** 48px square avatar / logo / icon tile. */
  leading: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Pill cluster, right-aligned on desktop, stacked under text on mobile. */
  pills?: React.ReactNode;
  /** Small muted text under pills (e.g. date) */
  meta?: React.ReactNode;
  id?: string;
  className?: string;
  external?: boolean;
  /**
   * "list": animated filter list (layout + enter/exit, default).
   * "reveal": staggered fade-up child of a <Reveal as="ul"> parent.
   * "none": plain <li>.
   */
  animate?: "list" | "reveal" | "none";
};

/* decision: rows are a ruled list, not stacked cards. Hairline between rows,
   a faint wash on hover, nothing moves. */
const rowClass =
  "group relative flex gap-4 border-b border-line px-3 py-4 transition-colors duration-150 hover:bg-ink/[0.025] focus-within:bg-ink/[0.025] md:items-center md:px-4";

export function DirectoryRow({
  href,
  leading,
  title,
  description,
  pills,
  meta,
  id,
  className,
  external,
  animate = "list",
}: DirectoryRowProps) {
  const inner = (
    <>
      <div className="flex size-10 shrink-0 items-center justify-center overflow-hidden">
        {leading}
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-1 md:flex-row md:items-center md:gap-4">
        <div className="min-w-0 flex-1">
          <h3 className="text-[15px] font-medium tracking-[-0.01em] text-ink">
            {external ? (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="after:absolute after:inset-0 focus-visible:outline-none"
              >
                {title}
              </a>
            ) : (
              <Link
                href={href}
                className="after:absolute after:inset-0 focus-visible:outline-none"
              >
                {title}
              </Link>
            )}
          </h3>
          {description ? (
            <p className="mt-0.5 line-clamp-2 text-[14px] leading-snug text-ink-muted md:line-clamp-1">
              {description}
            </p>
          ) : null}
        </div>
        {pills || meta ? (
          <div className="flex shrink-0 flex-col items-start gap-1.5 md:items-end">
            {pills ? (
              <div className="flex flex-wrap gap-1.5 md:justify-end">{pills}</div>
            ) : null}
            {meta ? (
              <div className="font-mono text-[11px] tracking-[0.02em] text-ink-muted">
                {meta}
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </>
  );

  if (animate === "none") {
    return (
      <li id={id} className={cn(rowClass, className)}>
        {inner}
      </li>
    );
  }

  if (animate === "reveal") {
    return (
      <motion.li id={id} variants={revealChild} className={cn(rowClass, className)}>
        {inner}
      </motion.li>
    );
  }

  return (
    <motion.li
      id={id}
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8, transition: { duration: 0.15 } }}
      transition={{ type: "spring", stiffness: 400, damping: 36, mass: 0.8 }}
      className={cn(rowClass, className)}
    >
      {inner}
    </motion.li>
  );
}

/** Square tile used as the row's `leading` slot when there is no image. */
export function IconTile({
  children,
  className,
}: {
  tone?: "purple" | "blue" | "green" | "orange" | "neutral";
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "flex size-10 items-center justify-center rounded-[6px] border border-line bg-surface text-ink [&_svg]:size-[18px] [&_svg]:stroke-[1.5]",
        className,
      )}
    >
      {children}
    </span>
  );
}
