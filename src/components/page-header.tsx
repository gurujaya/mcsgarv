import { Container } from "@/components/primitives/container";
import { cn } from "cn";

/** Top-of-page header used on every inner page. */
export function PageHeader({
  eyebrow,
  title,
  description,
  children,
  className,
  compact,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
  compact?: boolean;
}) {
  return (
    <Container
      as="header"
      className={cn(
        compact ? "pt-12 pb-8 md:pt-16 md:pb-10" : "pt-16 pb-12 md:pt-24 md:pb-16",
        className,
      )}
    >
      {eyebrow ? (
        <p className="text-xs font-medium tracking-[0.16em] text-mc-purple uppercase">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="mt-3 max-w-[20ch] font-serif text-4xl leading-[1.05] font-semibold tracking-tight text-ink md:text-6xl">
        {title}
      </h1>
      {description ? (
        <p className="mt-5 max-w-[60ch] text-lg leading-relaxed text-ink-muted">
          {description}
        </p>
      ) : null}
      {children}
    </Container>
  );
}
