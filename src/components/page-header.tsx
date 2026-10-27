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
        "border-b border-line",
        compact ? "pt-28 pb-10 md:pt-32 md:pb-12" : "pt-32 pb-12 md:pt-40 md:pb-16",
        className,
      )}
    >
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h1 className="display mt-5 max-w-[22ch] text-[40px] md:text-[56px]">{title}</h1>
      {description ? <p className="lede mt-6 max-w-[56ch]">{description}</p> : null}
      {children}
    </Container>
  );
}
