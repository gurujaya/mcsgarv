import { cn } from "cn";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  className,
  align = "left",
  size = "md",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: { label: string; href: string };
  className?: string;
  align?: "left" | "center";
  size?: "md" | "lg";
}) {
  return (
    <div
      className={cn(
        "mb-8 flex flex-col gap-4 md:mb-10 md:flex-row md:items-end md:justify-between",
        align === "center" && "items-center text-center md:flex-col md:items-center",
        className,
      )}
    >
      <div className={cn("max-w-[70ch]", align === "center" && "mx-auto")}>
        {eyebrow ? (
          <p className="mb-2 text-xs font-medium tracking-[0.14em] text-mc-purple uppercase">
            {eyebrow}
          </p>
        ) : null}
        <h2
          className={cn(
            "font-serif font-semibold tracking-tight text-ink",
            size === "lg" ? "text-4xl md:text-5xl" : "text-3xl md:text-4xl",
          )}
        >
          {title}
        </h2>
        {description ? (
          <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">{description}</p>
        ) : null}
      </div>
      {action ? (
        <Link
          href={action.href}
          className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-mc-purple hover:text-mc-purple-77"
        >
          {action.label}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      ) : null}
    </div>
  );
}
