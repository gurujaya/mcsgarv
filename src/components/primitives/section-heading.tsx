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
        "mb-10 flex flex-col gap-5 md:mb-12 md:flex-row md:items-end md:justify-between",
        align === "center" && "items-center text-center md:flex-col md:items-center",
        className,
      )}
    >
      <div className={cn("max-w-[60ch]", align === "center" && "mx-auto")}>
        {eyebrow ? <p className="eyebrow mb-4">{eyebrow}</p> : null}
        <h2
          className={cn(
            "display",
            size === "lg" ? "text-[36px] md:text-[48px]" : "text-[30px] md:text-[40px]",
          )}
        >
          {title}
        </h2>
        {description ? <p className="lede mt-4 max-w-[52ch]">{description}</p> : null}
      </div>
      {action ? (
        <Link
          href={action.href}
          className="group inline-flex shrink-0 items-center gap-1.5 text-[14px] font-medium text-ink hover:text-mc-purple"
        >
          {action.label}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      ) : null}
    </div>
  );
}
