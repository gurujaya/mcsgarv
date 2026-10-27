"use client";

import * as React from "react";
import { parseAsArrayOf, parseAsString, useQueryState, useQueryStates } from "nuqs";

const opts = { history: "replace", clearOnDefault: true, shallow: true } as const;

/**
 * Filters and search live in the URL (?q=…&committee=a,b) so links are shareable.
 * `keys` lists the multi-select filter names for a given directory. Pass a
 * module-level constant so the reference is stable.
 */
export function useDirectoryState<K extends string>(keys: readonly K[]) {
  const [q, setQ] = useQueryState("q", parseAsString.withDefault("").withOptions(opts));

  const parsers = React.useMemo(() => {
    const p: Record<string, ReturnType<typeof listParser>> = {};
    for (const k of keys) p[k] = listParser();
    return p;
  }, [keys]);

  const [state, setState] = useQueryStates(parsers, opts);

  const filters = {} as Record<K, string[]>;
  for (const k of keys) filters[k] = state[k] ?? [];

  const activeCount = keys.reduce((n, k) => n + filters[k].length, 0);

  return {
    q,
    setQ: (v: string) => void setQ(v),
    filters,
    setFilter: (k: K, values: string[]) => void setState({ [k]: values }),
    activeCount,
    clear: () => {
      void setQ("");
      void setState(Object.fromEntries(keys.map((k) => [k, []])));
    },
  };
}

export type DirectoryState<K extends string> = ReturnType<typeof useDirectoryState<K>>;

/**
 * A no-op state used to server-render the unfiltered list as the Suspense
 * fallback, so the full directory is in the HTML before hydration (no CLS,
 * crawlable content). Filters start working as soon as the client hydrates.
 */
export function inertState<K extends string>(keys: readonly K[]): DirectoryState<K> {
  const filters = {} as Record<K, string[]>;
  for (const k of keys) filters[k] = [];
  return {
    q: "",
    setQ: () => {},
    filters,
    setFilter: () => {},
    activeCount: 0,
    clear: () => {},
  };
}

function listParser() {
  return parseAsArrayOf(parseAsString).withDefault([]);
}

export function matches(q: string, ...fields: (string | undefined)[]): boolean {
  if (!q.trim()) return true;
  const needle = q.trim().toLowerCase();
  return fields.some((f) => f?.toLowerCase().includes(needle));
}
