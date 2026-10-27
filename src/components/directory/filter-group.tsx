"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "cn";
import { Checkbox } from "@/components/ui/checkbox";

export type FilterOption = { value: string; label: string; count?: number };

export function FilterGroup({
  id,
  title,
  options,
  selected,
  onChange,
  defaultOpen = true,
}: {
  id: string;
  title: string;
  options: FilterOption[];
  selected: string[];
  onChange: (next: string[]) => void;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = React.useState(defaultOpen);
  const panelId = `${id}-panel`;

  const toggle = (value: string) => {
    onChange(
      selected.includes(value)
        ? selected.filter((v) => v !== value)
        : [...selected, value],
    );
  };

  return (
    <fieldset className="border-t border-line py-4 first:border-t-0 first:pt-0">
      <legend className="sr-only">{title}</legend>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between rounded-md py-1 text-left text-sm font-medium text-ink"
      >
        <span className="flex items-center gap-2">
          {title}
          {selected.length ? (
            <span className="rounded-pill bg-mc-purple px-1.5 py-px text-[10px] font-medium text-white">
              {selected.length}
            </span>
          ) : null}
        </span>
        <ChevronDown
          className={cn(
            "size-4 text-ink-muted transition-transform",
            open && "rotate-180",
          )}
        />
      </button>
      <div id={panelId} hidden={!open} className="mt-2 space-y-1">
        {options.map((o) => {
          const checked = selected.includes(o.value);
          const inputId = `${id}-${o.value}`;
          return (
            <label
              key={o.value}
              htmlFor={inputId}
              className={cn(
                "flex cursor-pointer items-center gap-2.5 rounded-md px-1.5 py-1.5 text-sm transition-colors hover:bg-surface",
                checked ? "text-ink" : "text-ink-muted",
              )}
            >
              <Checkbox
                id={inputId}
                checked={checked}
                onCheckedChange={() => toggle(o.value)}
                className="data-[state=checked]:border-mc-purple data-[state=checked]:bg-mc-purple"
              />
              <span className="flex-1">{o.label}</span>
              {typeof o.count === "number" ? (
                <span className="text-xs text-ink-muted tabular-nums">{o.count}</span>
              ) : null}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
