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
        className="flex w-full items-center justify-between py-1 text-left font-mono text-[11px] tracking-[0.08em] text-ink uppercase"
      >
        <span className="flex items-center gap-2">
          {title}
          {selected.length ? (
            <span className="rounded-[3px] bg-ink px-1.5 py-px font-mono text-[10px] text-white">
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
                "flex cursor-pointer items-center gap-2.5 rounded-md px-1.5 py-1.5 text-[14px] transition-colors hover:bg-ink/[0.03]",
                checked ? "text-ink" : "text-ink-muted",
              )}
            >
              <Checkbox
                id={inputId}
                checked={checked}
                onCheckedChange={() => toggle(o.value)}
                className="rounded-[3px] border-line-strong data-[state=checked]:border-ink data-[state=checked]:bg-ink"
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
