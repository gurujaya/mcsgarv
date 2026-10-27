"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search } from "lucide-react";
import { cn } from "cn";
import { Seal } from "@/components/primitives/seal";
import { navLinks, secondaryLinks } from "./nav-links";
import { CommandMenu, useCommandMenu } from "./command-menu";
import { site } from "@/content/site";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const cmd = useCommandMenu();

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur-md">
      <nav className="mx-auto flex h-[60px] w-full max-w-site items-center justify-between gap-6 px-6 md:px-10">
        <Link href="/" className="flex items-center gap-2.5 rounded-sm">
          <Seal size={26} />
          <span className="text-[15px] font-medium tracking-[-0.01em] text-ink">
            SGA Rockville
          </span>
        </Link>

        <ul className="hidden items-center gap-0.5 lg:flex">
          {navLinks.map((l) => {
            const active = isActive(l.href);
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "block rounded-md px-3 py-1.5 text-[14px] transition-colors",
                    active ? "text-ink" : "text-ink-muted hover:text-ink",
                  )}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={cmd.open}
            className="inline-flex h-9 items-center gap-2 rounded-md border border-line bg-surface px-3 text-[13px] text-ink-muted transition-colors hover:border-line-strong hover:text-ink"
            aria-label="Search the site"
          >
            <Search className="size-3.5" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden font-mono text-[11px] text-ink-faint md:inline">
              ⌘K
            </kbd>
          </button>

          <Link
            href={site.applyUrl}
            className="hidden h-9 items-center rounded-md bg-mc-purple px-3.5 text-[13px] font-medium text-white transition-colors hover:bg-[#45186f] sm:inline-flex"
          >
            Apply
          </Link>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                className="inline-flex size-9 items-center justify-center rounded-md border border-line bg-surface text-ink lg:hidden"
                aria-label="Open menu"
              >
                <Menu className="size-4" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[88vw] max-w-sm bg-bg">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2 text-[15px] font-medium">
                  <Seal size={24} /> SGA Rockville
                </SheetTitle>
                <SheetDescription className="eyebrow">
                  Montgomery College · Rockville
                </SheetDescription>
              </SheetHeader>
              <nav className="flex flex-col px-4 pb-6">
                {[...navLinks, ...secondaryLinks].map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    aria-current={isActive(l.href) ? "page" : undefined}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "border-b border-line py-3 text-[16px]",
                      isActive(l.href) ? "text-ink" : "text-ink-muted",
                    )}
                  >
                    {l.label}
                  </Link>
                ))}
                <Link
                  href={site.applyUrl}
                  onClick={() => setMobileOpen(false)}
                  className="mt-6 inline-flex h-11 items-center justify-center rounded-md bg-mc-purple px-4 text-[14px] font-medium text-white"
                >
                  Apply to be a Senator
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
      <CommandMenu open={cmd.isOpen} onOpenChange={cmd.setOpen} />
    </header>
  );
}
