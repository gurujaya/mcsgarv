import { cn } from "cn";
import type { CommitteeColor } from "@/content/types";

export type PillTone = CommitteeColor | "neutral" | "live";

/* decision: tinted backgrounds use the official accent HEX at low alpha; text
   uses the darker "-ink" shade so every pill passes WCAG AA (see globals.css). */
const tones: Record<PillTone, string> = {
  purple: "bg-mc-purple/8 text-mc-purple",
  blue: "bg-mc-blue/10 text-mc-blue-ink",
  green: "bg-mc-green/10 text-mc-green-ink",
  orange: "bg-mc-orange/10 text-mc-orange-ink",
  neutral: "bg-ink/6 text-ink-muted",
  live: "bg-mc-orange text-ink",
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
        "inline-flex items-center gap-1 rounded-pill px-2.5 py-0.5 text-xs font-medium whitespace-nowrap",
        tones[tone],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}

/** Map a committee category to a pill tone. */
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
