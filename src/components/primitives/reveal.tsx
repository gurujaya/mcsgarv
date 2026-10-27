"use client";

import { motion, type Variants } from "motion/react";
import { cn } from "cn";

const parent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
};

export const revealChild: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

/**
 * Fade-up on scroll. Wrap a section in <Reveal>; wrap each item in
 * <RevealItem> to stagger them. Honors prefers-reduced-motion through the
 * global <MotionConfig reducedMotion="user">.
 */
export function Reveal({
  className,
  children,
  as = "div",
  once = true,
}: {
  className?: string;
  children: React.ReactNode;
  as?: "div" | "section" | "ul" | "ol";
  once?: boolean;
}) {
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      variants={parent}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "0px 0px -60px 0px", amount: 0.05 }}
    >
      {children}
    </Comp>
  );
}

export function RevealItem({
  className,
  children,
  as = "div",
}: {
  className?: string;
  children: React.ReactNode;
  as?: "div" | "li" | "article" | "section";
}) {
  const Comp = motion[as];
  return (
    <Comp className={cn(className)} variants={revealChild}>
      {children}
    </Comp>
  );
}
