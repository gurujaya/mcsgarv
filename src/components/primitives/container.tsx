import { cn } from "cn";

/** Horizontal padding only; the width is set by `.site-frame` in the root layout. */
export function Container({
  className,
  children,
  as: Tag = "div",
}: {
  className?: string;
  children: React.ReactNode;
  as?: "div" | "section" | "header" | "footer" | "main" | "nav" | "article";
}) {
  return (
    <Tag className={cn("mx-auto w-full max-w-site px-6 md:px-10", className)}>
      {children}
    </Tag>
  );
}
