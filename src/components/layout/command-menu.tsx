"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Calendar,
  FileText,
  CircleQuestionMark,
  Link2,
  Users,
  Landmark,
  type LucideIcon,
} from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import type { SearchItem, SearchKind } from "@/lib/search";

const kindMeta: Record<SearchKind, { label: string; icon: LucideIcon }> = {
  page: { label: "Pages", icon: FileText },
  committee: { label: "Committees", icon: Landmark },
  person: { label: "Senators & Officers", icon: Users },
  event: { label: "Events", icon: Calendar },
  faq: { label: "FAQ", icon: CircleQuestionMark },
  resource: { label: "Resources", icon: Link2 },
};

const order: SearchKind[] = ["page", "committee", "person", "event", "faq", "resource"];

export function useCommandMenu() {
  const [isOpen, setOpen] = React.useState(false);
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  return { isOpen, setOpen, open: () => setOpen(true) };
}

let cache: SearchItem[] | null = null;

export function CommandMenu({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const router = useRouter();
  const [items, setItems] = React.useState<SearchItem[]>(cache ?? []);

  React.useEffect(() => {
    if (!open || cache) return;
    fetch("/search-index.json")
      .then((r) => r.json())
      .then((data: SearchItem[]) => {
        cache = data;
        setItems(data);
      })
      .catch(() => setItems([]));
  }, [open]);

  const go = (href: string) => {
    onOpenChange(false);
    if (/^https?:\/\//.test(href)) {
      window.open(href, "_blank", "noopener,noreferrer");
    } else {
      router.push(href);
    }
  };

  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Search SGA Rockville"
      description="Search senators, committees, events, and FAQ"
      className="max-w-xl"
    >
      <CommandInput placeholder="Search senators, committees, events, FAQ…" />
      <CommandList className="max-h-[60vh]">
        <CommandEmpty>
          No results. Try “funding”, “SAB”, or a senator’s name.
        </CommandEmpty>
        {order.map((kind) => {
          const group = items.filter((i) => i.kind === kind);
          if (!group.length) return null;
          const Icon = kindMeta[kind].icon;
          return (
            <CommandGroup key={kind} heading={kindMeta[kind].label}>
              {group.map((item) => (
                <CommandItem
                  key={item.id}
                  value={`${item.title} ${item.subtitle ?? ""} ${item.keywords ?? ""}`}
                  onSelect={() => go(item.href)}
                  className="gap-3"
                >
                  <Icon className="size-4 text-mc-purple" />
                  <span className="flex min-w-0 flex-col">
                    <span className="truncate text-sm text-ink">{item.title}</span>
                    {item.subtitle ? (
                      <span className="truncate text-xs text-ink-muted">
                        {item.subtitle}
                      </span>
                    ) : null}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          );
        })}
      </CommandList>
    </CommandDialog>
  );
}
