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
import { Avatar } from "@/components/primitives/avatar";
import { CTA } from "@/components/primitives/cta";
import { TodoChip } from "@/components/primitives/todo-chip";
import { people, roleOrder } from "@/content/people";
import { committees, getCommittee } from "@/content/committees";
import { site } from "@/content/site";
import type { Person } from "@/content/types";

const KEYS = ["role", "committee"] as const;

const roleTone = (role: Person["role"]) =>
  role === "Senator-at-Large" ? "neutral" : role === "Advisor" ? "blue" : "purple";

export function SenatorsDirectory() {
  return <SenatorsDirectoryView s={useDirectoryState(KEYS)} />;
}

export function SenatorsDirectoryStatic() {
  return <SenatorsDirectoryView s={inertState(KEYS)} />;
}

function SenatorsDirectoryView({ s }: { s: DirectoryState<(typeof KEYS)[number]> }) {
  const list = people
    .filter((p) => {
      if (s.filters.role.length && !s.filters.role.includes(p.role)) return false;
      if (
        s.filters.committee.length &&
        !p.committees.some((c) => s.filters.committee.includes(c))
      )
        return false;
      return matches(
        s.q,
        p.name,
        p.role,
        p.major,
        ...p.committees.map((c) => getCommittee(c)?.name),
      );
    })
    .sort((a, b) => roleOrder.indexOf(a.role) - roleOrder.indexOf(b.role));

  const rolesPresent = roleOrder.filter((r) => people.some((p) => p.role === r));

  return (
    <DirectoryShell
      search={s.q}
      onSearch={s.setQ}
      searchPlaceholder="Search by name or role…"
      activeCount={s.activeCount}
      onClear={s.clear}
      resultLabel={`${list.length} ${list.length === 1 ? "person" : "people"}`}
      filters={
        <>
          <FilterGroup
            id="role"
            title="Role"
            selected={s.filters.role}
            onChange={(v) => s.setFilter("role", v)}
            options={rolesPresent.map((r) => ({
              value: r,
              label: r,
              count: people.filter((p) => p.role === r).length,
            }))}
          />
          <FilterGroup
            id="committee"
            title="Committee"
            selected={s.filters.committee}
            onChange={(v) => s.setFilter("committee", v)}
            defaultOpen={false}
            options={committees.map((c) => ({
              value: c.slug,
              label: c.shortName ?? c.name,
              count: people.filter((p) => p.committees.includes(c.slug)).length,
            }))}
          />
        </>
      }
      aside={
        <div className="border-t border-line pt-5">
          <p className="text-[14px] font-medium text-ink">Want your name here?</p>
          <p className="mt-1 text-[13px] leading-relaxed text-ink-muted">
            Senator-at-Large positions are elected. Applications go to the Office of
            Student Life.
          </p>
          <CTA href={site.applyUrl} variant="primary" size="sm" className="mt-4 w-full">
            Apply
          </CTA>
        </div>
      }
      empty={
        list.length === 0 ? (
          <DirectoryEmpty onClear={s.clear}>No one matches those filters.</DirectoryEmpty>
        ) : null
      }
    >
      {list.map((p) => (
        <DirectoryRow
          key={p.slug}
          id={p.slug}
          href={
            p.email ? `mailto:${p.email}` : `/contact?to=${encodeURIComponent(p.name)}`
          }
          leading={<Avatar name={p.name} photo={p.photo} size="md" />}
          title={p.name}
          description={
            p.bio ??
            (p.committees.length
              ? p.committees
                  .map((c) => getCommittee(c)?.name)
                  .filter(Boolean)
                  .join(" · ")
              : p.role === "Senator-at-Large"
                ? "Senator-at-Large, 2026–2027"
                : p.role === "Advisor"
                  ? "Office of Student Life"
                  : `${p.role}, Executive Board`)
          }
          pills={
            <>
              {p.unconfirmed ? <TodoChip note="Confirm this person's role" /> : null}
              <Pill tone={roleTone(p.role)}>{p.role}</Pill>
              {p.committees.map((c) => {
                const com = getCommittee(c);
                return com ? (
                  <Pill key={c} tone={com.color}>
                    {com.shortName ?? com.name}
                  </Pill>
                ) : null;
              })}
            </>
          }
        />
      ))}
    </DirectoryShell>
  );
}
