/** Content marked "TODO:" is missing. Used by <TodoChip/> and <Todo/>. */
export function isTodo(value: string | undefined | null): boolean {
  return typeof value === "string" && value.trim().toUpperCase().startsWith("TODO:");
}

/** Strip the TODO prefix for display, e.g. "TODO: confirm time" → "confirm time". */
export function todoText(value: string): string {
  return value.replace(/^\s*TODO:\s*/i, "");
}

/** Returns the value if it is real content, otherwise the fallback. */
export function orFallback(value: string | undefined, fallback: string): string {
  return value && !isTodo(value) ? value : fallback;
}
