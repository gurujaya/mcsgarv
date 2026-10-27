"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { cn } from "cn";

const MotionLink = motion.create(Link);

const variants = {
  /* purple: the primary action everywhere */
  primary: "bg-mc-purple text-white hover:bg-mc-purple-77",
  /* orange: the ONE key-contrast CTA per page. Ink text keeps AA contrast. */
  accent: "bg-mc-orange text-ink hover:brightness-95",
  ghost:
    "border border-line bg-surface text-ink hover:border-mc-purple/40 hover:text-mc-purple",
  link: "text-mc-purple hover:text-mc-purple-77 px-0",
} as const;

const sizes = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
} as const;

export type CTAProps = {
  href: string;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  className?: string;
  children: React.ReactNode;
  external?: boolean;
};

const spring = { type: "spring", stiffness: 500, damping: 30 } as const;

export function CTA({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  external,
}: CTAProps) {
  const cls = cn(
    "inline-flex items-center justify-center gap-2 rounded-pill font-medium whitespace-nowrap transition-colors",
    variants[variant],
    variant !== "link" && sizes[size],
    className,
  );
  if (external) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cls}
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.98 }}
        transition={spring}
      >
        {children}
      </motion.a>
    );
  }
  return (
    <MotionLink
      href={href}
      className={cls}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      transition={spring}
    >
      {children}
    </MotionLink>
  );
}

export function MotionButton({
  className,
  variant = "primary",
  size = "md",
  children,
  ...props
}: React.ComponentProps<typeof motion.button> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
}) {
  return (
    <motion.button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-pill font-medium whitespace-nowrap transition-colors disabled:opacity-60",
        variants[variant],
        variant !== "link" && sizes[size],
        className,
      )}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      transition={spring}
      {...props}
    >
      {children}
    </motion.button>
  );
}
