"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { Menu, Search } from "lucide-react";
import { cn } from "cn";
import { Container } from "@/components/primitives/container";
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
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const cmd = useCommandMenu();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 8));

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <header
      className={cn(
        "sticky top-0 z-40 bg-bg/80 backdrop-blur-md transition-[border-color,box-shadow] duration-300",
        "border-b",
        scrolled ? "border-line" : "border-transparent",
      )}
    >
      <Container as="nav" className="flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5 rounded-md">
          <Seal size={34} />
          <span className="flex flex-col leading-none">
            <span className="text-[15px] font-medium tracking-tight text-ink">
              SGA Rockville
            </span>
            <span className="text-[11px] text-ink-muted">Montgomery College</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((l) => {
            const active = isActive(l.href);
            return (
              <li key={l.href} className="relative">
                <Link
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative block rounded-md px-3 py-2 text-sm transition-colors",
                    active ? "text-mc-purple" : "text-ink-muted hover:text-ink",
                  )}
                >
                  {l.label}
                  {active ? (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-3 -bottom-[13px] h-0.5 rounded-full bg-mc-purple"
                      transition={{ type: "spring", stiffness: 500, damping: 40 }}
                    />
                  ) : null}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={cmd.open}
            className="inline-flex h-9 items-center gap-2 rounded-pill border border-line bg-surface px-3 text-sm text-ink-muted transition-colors hover:border-mc-purple/40 hover:text-ink"
            aria-label="Search the site"
          >
            <Search className="size-4" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden rounded border border-line bg-bg px-1.5 py-0.5 font-sans text-[10px] text-ink-muted md:inline">
              ⌘K
            </kbd>
          </button>

          <Link
            href={site.applyUrl}
            className="hidden h-9 items-center rounded-pill bg-mc-orange px-4 text-sm font-medium text-ink transition hover:brightness-95 sm:inline-flex"
          >
            Apply
          </Link>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                className="inline-flex size-9 items-center justify-center rounded-pill border border-line bg-surface text-ink lg:hidden"
                aria-label="Open menu"
              >
                <Menu className="size-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[88vw] max-w-sm bg-bg">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <Seal size={28} /> SGA Rockville
                </SheetTitle>
                <SheetDescription>Montgomery College · Rockville Campus</SheetDescription>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4 pb-6">
                {[...navLinks, ...secondaryLinks].map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    aria-current={isActive(l.href) ? "page" : undefined}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "rounded-lg px-3 py-2.5 text-base",
                      isActive(l.href)
                        ? "bg-mc-purple/8 font-medium text-mc-purple"
                        : "text-ink hover:bg-surface",
                    )}
                  >
                    {l.label}
                  </Link>
                ))}
                <Link
                  href={site.applyUrl}
                  onClick={() => setMobileOpen(false)}
                  className="mt-4 inline-flex h-11 items-center justify-center rounded-pill bg-mc-orange px-4 text-sm font-medium text-ink"
                >
                  Apply to be a Senator
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
      <CommandMenu open={cmd.isOpen} onOpenChange={cmd.setOpen} />
    </header>
  );
}
