"use client";

import * as React from "react";
import { Funnel, Search, X } from "lucide-react";
import { AnimatePresence, LayoutGroup } from "motion/react";
import { Container } from "@/components/primitives/container";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

/**
 * YC-directory layout: sticky 260px filter sidebar on lg+, vertical row list.
 * On mobile the sidebar becomes a Sheet behind a "Filters" button.
 */
export function DirectoryShell({
  search,
  onSearch,
  searchPlaceholder = "Search…",
  filters,
  activeCount,
  onClear,
  resultLabel,
  children,
  empty,
  aside,
}: {
  search: string;
  onSearch: (v: string) => void;
  searchPlaceholder?: string;
  filters: React.ReactNode;
  activeCount: number;
  onClear: () => void;
  resultLabel: string;
  children: React.ReactNode;
  empty?: React.ReactNode;
  /** Optional content under the filters (e.g. a CTA box). */
  aside?: React.ReactNode;
}) {
  const hasActive = activeCount > 0 || search.length > 0;
  const [sheetOpen, setSheetOpen] = React.useState(false);

  const sidebar = (
    <div className="space-y-5">
      <label className="relative block">
        <span className="sr-only">Search</span>
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-muted" />
        <input
          type="search"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder={searchPlaceholder}
          className="h-10 w-full rounded-md border border-line bg-surface pr-9 pl-9 text-[14px] text-ink placeholder:text-ink-faint focus:border-ink focus:outline-none"
        />
        {search ? (
          <button
            type="button"
            onClick={() => onSearch("")}
            aria-label="Clear search"
            className="absolute top-1/2 right-2 flex size-6 -translate-y-1/2 items-center justify-center rounded-full text-ink-muted hover:bg-bg hover:text-ink"
          >
            <X className="size-3.5" />
          </button>
        ) : null}
      </label>
      <div>{filters}</div>
      {aside}
    </div>
  );

  return (
    <Container className="pb-24">
      <div className="grid gap-8 lg:grid-cols-[260px_1fr] lg:gap-14">
        <aside className="hidden lg:block">
          <div className="sticky top-[84px] pt-8">{sidebar}</div>
        </aside>

        <section aria-live="polite" className="min-w-0 pt-8">
          <div className="mb-3 flex items-center justify-between gap-3 px-3 md:px-4">
            <p className="font-mono text-[11px] tracking-[0.06em] text-ink-muted uppercase">
              <span className="text-ink">{resultLabel}</span>
              {hasActive ? (
                <>
                  {" · "}
                  <button
                    type="button"
                    onClick={() => {
                      onClear();
                      onSearch("");
                    }}
                    className="text-ink-muted underline underline-offset-4 hover:text-ink"
                  >
                    Clear filters
                  </button>
                </>
              ) : null}
            </p>

            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <button
                  type="button"
                  className="inline-flex h-9 items-center gap-2 rounded-md border border-line bg-surface px-3 text-[13px] text-ink lg:hidden"
                >
                  <Funnel className="size-4" />
                  Filters
                  {activeCount ? (
                    <span className="rounded-[3px] bg-ink px-1.5 py-px font-mono text-[10px] text-white">
                      {activeCount}
                    </span>
                  ) : null}
                </button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-[88vw] max-w-sm overflow-y-auto bg-bg"
              >
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                  <SheetDescription>
                    Narrow the list. Changes apply instantly.
                  </SheetDescription>
                </SheetHeader>
                <div className="px-4 pb-8">{sidebar}</div>
              </SheetContent>
            </Sheet>
          </div>

          <h2 className="sr-only">Results</h2>
          <LayoutGroup>
            <ul className="flex flex-col border-t border-line">
              <AnimatePresence initial={false} mode="popLayout">
                {children}
              </AnimatePresence>
            </ul>
          </LayoutGroup>
          {empty}
        </section>
      </div>
    </Container>
  );
}

export function DirectoryEmpty({
  children,
  onClear,
}: {
  children: React.ReactNode;
  onClear?: () => void;
}) {
  return (
    <div className="border-b border-line px-6 py-16 text-center">
      <p className="text-[14px] text-ink-muted">{children}</p>
      {onClear ? (
        <button
          type="button"
          onClick={onClear}
          className="mt-3 text-[14px] font-medium text-ink underline underline-offset-4"
        >
          Clear filters
        </button>
      ) : null}
    </div>
  );
}
