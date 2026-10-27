import { cn } from "cn";
import type { CommitteeColor } from "@/content/types";

export type PillTone = CommitteeColor | "neutral" | "live";

/* decision: chips are monochrome hairline labels in mono caps. Category color
   is carried by a 6px dot only, so color never floods a list. */
const dots: Record<PillTone, string> = {
  purple: "bg-mc-purple",
  blue: "bg-mc-blue",
  green: "bg-mc-green",
  orange: "bg-mc-orange",
  neutral: "",
  live: "bg-mc-orange",
};

export function Pill({
  tone = "neutral",
  className,
  children,
  ...props
}: React.ComponentProps<"span"> & { tone?: PillTone }) {
  return (
    <span
      className={cn(
        "inline-flex h-[22px] items-center gap-1.5 rounded-[4px] border border-line bg-surface px-2 font-mono text-[11px] leading-none tracking-[0.04em] whitespace-nowrap text-ink-muted uppercase",
        tone === "live" && "border-line-strong text-ink",
        className,
      )}
      {...props}
    >
      {dots[tone] ? (
        <span aria-hidden className={cn("size-1.5 rounded-full", dots[tone])} />
      ) : null}
      {children}
    </span>
  );
}

/** Map a committee category / event type to a dot tone. */
export const categoryTone: Record<string, PillTone> = {
  governance: "purple",
  finance: "purple",
  programming: "blue",
  advocacy: "green",
  service: "green",
  meeting: "purple",
  social: "blue",
  cultural: "orange",
  tabling: "neutral",
};
