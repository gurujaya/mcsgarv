"use client";

import { DirectoryShell, DirectoryEmpty } from "./directory-shell";
import { DirectoryRow } from "./directory-row";
import { FilterGroup } from "./filter-group";
import {
  useDirectoryState,
  inertState,
  matches,
  type DirectoryState,
} from "./use-directory-state";
import { Pill } from "@/components/primitives/pill";
import { CommitteeTile } from "@/components/committee-icon";
import { committees, committeeCategories } from "@/content/committees";
import type { Committee } from "@/content/types";

const KEYS = ["category", "open"] as const;

export function CommitteesDirectory() {
  return <CommitteesDirectoryView s={useDirectoryState(KEYS)} />;
}

export function CommitteesDirectoryStatic() {
  return <CommitteesDirectoryView s={inertState(KEYS)} />;
}

function CommitteesDirectoryView({ s }: { s: DirectoryState<(typeof KEYS)[number]> }) {
  const list = committees.filter((c) => {
    if (s.filters.category.length && !s.filters.category.includes(c.category))
      return false;
    if (s.filters.open.length && !s.filters.open.includes(c.openTo)) return false;
    return matches(s.q, c.name, c.shortName, c.tagline, c.category, ...c.pills);
  });

  const count = (pred: (c: Committee) => boolean) => committees.filter(pred).length;

  return (
    <DirectoryShell
      search={s.q}
      onSearch={s.setQ}
      searchPlaceholder="Search committees…"
      activeCount={s.activeCount}
      onClear={s.clear}
      resultLabel={`${list.length} ${list.length === 1 ? "committee" : "committees"}`}
      filters={
        <>
          <FilterGroup
            id="category"
            title="Category"
            selected={s.filters.category}
            onChange={(v) => s.setFilter("category", v)}
            options={(Object.keys(committeeCategories) as Committee["category"][]).map(
              (k) => ({
                value: k,
                label: committeeCategories[k],
                count: count((c) => c.category === k),
              }),
            )}
          />
          <FilterGroup
            id="open"
            title="Who can join"
            selected={s.filters.open}
            onChange={(v) => s.setFilter("open", v)}
            options={[
              {
                value: "all-students",
                label: "Open to all students",
                count: count((c) => c.openTo === "all-students"),
              },
              {
                value: "senators-only",
                label: "Senators only",
                count: count((c) => c.openTo === "senators-only"),
              },
            ]}
          />
        </>
      }
      empty={
        list.length === 0 ? (
          <DirectoryEmpty onClear={s.clear}>
            No committees match those filters.
          </DirectoryEmpty>
        ) : null
      }
    >
      {list.map((c) => (
        <DirectoryRow
          key={c.slug}
          href={`/committees/${c.slug}`}
          leading={<CommitteeTile committee={c} />}
          title={c.shortName ? `${c.name} (${c.shortName})` : c.name}
          description={c.tagline}
          pills={c.pills.map((p) => (
            <Pill
              key={p}
              tone={
                p === "Open to all"
                  ? "green"
                  : p === "Rolling applications"
                    ? "orange"
                    : c.color
              }
            >
              {p}
            </Pill>
          ))}
        />
      ))}
    </DirectoryShell>
  );
}
