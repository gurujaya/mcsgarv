import { isTodo, todoText } from "@/lib/todo";
import { cn } from "cn";

const isDev = process.env.NODE_ENV === "development";

/**
 * Renders a small amber "Needs content" chip in development only.
 * In production it renders nothing.
 */
export function TodoChip({ note, className }: { note?: string; className?: string }) {
  if (!isDev) return null;
  return (
    <span
      title={note}
      className={cn(
        "inline-flex items-center gap-1 rounded-pill bg-todo-bg px-2 py-0.5 text-[11px] font-medium text-todo",
        className,
      )}
    >
      <span aria-hidden className="size-1.5 rounded-full bg-todo" />
      Needs content
    </span>
  );
}

/**
 * Renders content text, or a fallback plus a dev-only chip when the value is a
 * "TODO:" string.
 */
export function Todo({
  value,
  fallback = "To be confirmed",
  className,
}: {
  value: string | undefined;
  fallback?: string;
  className?: string;
}) {
  if (!value) return <span className={className}>{fallback}</span>;
  if (isTodo(value)) {
    return (
      <span className={cn("inline-flex flex-wrap items-center gap-2", className)}>
        <span>{fallback}</span>
        <TodoChip note={todoText(value)} />
      </span>
    );
  }
  return <span className={className}>{value}</span>;
}
