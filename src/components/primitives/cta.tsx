"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { cn } from "cn";

const MotionLink = motion.create(Link);

/* decision: two button styles only. Primary is MC purple, used once or twice per
   screen; everything else is a hairline ghost. "accent" is kept as an alias of
   primary so older call sites keep working; orange is no longer a button color. */
const variants = {
  primary: "bg-mc-purple text-white hover:bg-[#45186f]",
  accent: "bg-mc-purple text-white hover:bg-[#45186f]",
  ghost: "border border-line-strong bg-surface text-ink hover:border-ink",
  link: "text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink px-0",
} as const;

const sizes = {
  sm: "h-9 px-3.5 text-[13px]",
  md: "h-10 px-4 text-[14px]",
  lg: "h-11 px-5 text-[15px]",
} as const;

export type CTAProps = {
  href: string;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  className?: string;
  children: React.ReactNode;
  external?: boolean;
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-md font-medium whitespace-nowrap transition-colors duration-150";

export function CTA({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  external,
}: CTAProps) {
  const cls = cn(base, variants[variant], variant !== "link" && sizes[size], className);
  if (external) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cls}
        whileTap={{ scale: 0.985 }}
      >
        {children}
      </motion.a>
    );
  }
  return (
    <MotionLink href={href} className={cls} whileTap={{ scale: 0.985 }}>
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
        base,
        "disabled:opacity-60",
        variants[variant],
        variant !== "link" && sizes[size],
        className,
      )}
      whileTap={{ scale: 0.985 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}
