"use client";

import {
  ExternalLink,
  FileText,
  Link2,
  Landmark,
  School,
  Megaphone,
  ClipboardList,
} from "lucide-react";
import { DirectoryShell, DirectoryEmpty } from "./directory-shell";
import { DirectoryRow, IconTile } from "./directory-row";
import { FilterGroup } from "./filter-group";
import {
  useDirectoryState,
  inertState,
  matches,
  type DirectoryState,
} from "./use-directory-state";
import { Pill } from "@/components/primitives/pill";
import { TodoChip } from "@/components/primitives/todo-chip";
import { resources, resourceCategories } from "@/content/resources";
import type { ResourceLink } from "@/content/types";
import { isTodo } from "@/lib/todo";

const KEYS = ["category"] as const;

const icon: Record<ResourceLink["category"], React.ReactNode> = {
  sga: <Landmark />,
  "student-life": <School />,
  campus: <Link2 />,
  advocacy: <Megaphone />,
  forms: <ClipboardList />,
};
const tone: Record<
  ResourceLink["category"],
  "purple" | "blue" | "green" | "orange" | "neutral"
> = {
  sga: "purple",
  "student-life": "blue",
  campus: "neutral",
  advocacy: "green",
  forms: "orange",
};

export function ResourcesDirectory() {
  return <ResourcesDirectoryView s={useDirectoryState(KEYS)} />;
}

export function ResourcesDirectoryStatic() {
  return <ResourcesDirectoryView s={inertState(KEYS)} />;
}

function ResourcesDirectoryView({ s }: { s: DirectoryState<(typeof KEYS)[number]> }) {
  const list = resources.filter((r) => {
    if (s.filters.category.length && !s.filters.category.includes(r.category))
      return false;
    return matches(s.q, r.title, r.description, resourceCategories[r.category]);
  });

  return (
    <DirectoryShell
      search={s.q}
      onSearch={s.setQ}
      searchPlaceholder="Search resources…"
      activeCount={s.activeCount}
      onClear={s.clear}
      resultLabel={`${list.length} ${list.length === 1 ? "link" : "links"}`}
      filters={
        <FilterGroup
          id="category"
          title="Category"
          selected={s.filters.category}
          onChange={(v) => s.setFilter("category", v)}
          options={(Object.keys(resourceCategories) as ResourceLink["category"][]).map(
            (k) => ({
              value: k,
              label: resourceCategories[k],
              count: resources.filter((r) => r.category === k).length,
            }),
          )}
        />
      }
      empty={
        list.length === 0 ? (
          <DirectoryEmpty onClear={s.clear}>No links match.</DirectoryEmpty>
        ) : null
      }
    >
      {list.map((r) => {
        const missing = isTodo(r.href);
        return (
          <DirectoryRow
            key={r.title}
            href={missing ? "/contact" : r.href}
            external={!missing && !!r.external}
            leading={
              <IconTile tone={tone[r.category]}>
                {missing ? <FileText /> : icon[r.category]}
              </IconTile>
            }
            title={
              <span className="inline-flex items-center gap-1.5">
                {r.title}
                {r.external && !missing ? (
                  <ExternalLink className="size-3.5 text-ink-muted" aria-hidden />
                ) : null}
              </span>
            }
            description={r.description}
            pills={
              <>
                <Pill tone={tone[r.category]}>{resourceCategories[r.category]}</Pill>
                {missing ? <TodoChip note="Add link in resources.ts" /> : null}
              </>
            }
          />
        );
      })}
    </DirectoryShell>
  );
}
