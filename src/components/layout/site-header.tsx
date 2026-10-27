"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, Menu, Search } from "lucide-react";
import { cn } from "cn";
import { Seal } from "@/components/primitives/seal";
import { navItems, type NavItem } from "./nav-links";
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

/**
 * Sparse nav on a translucent paper bar. Items with children open a dropdown
 * on hover, focus, or click.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const [openItem, setOpenItem] = React.useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const cmd = useCommandMenu();
  const closeTimer = React.useRef<number | null>(null);

  const overHero = false;
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  const open = (label: string) => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setOpenItem(label);
  };
  const scheduleClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpenItem(null), 120);
  };

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenItem(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,color] duration-300",
        overHero
          ? "border-b border-transparent bg-transparent text-white"
          : "border-b border-line bg-bg/85 text-ink backdrop-blur-md",
      )}
    >
      <nav className="mx-auto flex h-16 w-full max-w-[1400px] items-center justify-between gap-6 px-6 md:px-10">
        <Link
          href="/"
          className="flex items-center gap-2.5 rounded-sm"
          onClick={() => setOpenItem(null)}
        >
          <Seal
            size={28}
            className={cn(overHero && "rounded-full ring-1 ring-white/30")}
          />
          <span className="text-[15px] font-medium tracking-[-0.01em]">
            SGA Rockville
          </span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex" onMouseLeave={scheduleClose}>
          {navItems.map((item) => (
            <NavEntry
              key={item.label}
              item={item}
              active={isActive(item.href)}
              overHero={overHero}
              isOpen={openItem === item.label}
              onOpen={() => open(item.label)}
              onClose={scheduleClose}
              onNavigate={() => setOpenItem(null)}
            />
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={cmd.open}
            aria-label="Search the site"
            className={cn(
              "inline-flex size-9 items-center justify-center rounded-[5px] border transition-colors",
              overHero
                ? "border-white/25 text-white hover:border-white/60"
                : "border-line text-ink-muted hover:border-line-strong hover:text-ink",
            )}
          >
            <Search className="size-3.5" />
          </button>
          <Link
            href={site.applyUrl}
            className={cn(
              "mono-button hidden h-9 sm:inline-flex",
              overHero
                ? "bg-white text-ink hover:bg-white/90"
                : "bg-ink text-white hover:bg-mc-purple",
            )}
          >
            Apply
          </Link>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Open menu"
                className={cn(
                  "inline-flex size-9 items-center justify-center rounded-[5px] border lg:hidden",
                  overHero ? "border-white/25 text-white" : "border-line text-ink",
                )}
              >
                <Menu className="size-4" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[90vw] max-w-sm overflow-y-auto bg-bg"
            >
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2 text-[15px] font-medium">
                  <Seal size={24} /> SGA Rockville
                </SheetTitle>
                <SheetDescription className="eyebrow">
                  Montgomery College · Rockville
                </SheetDescription>
              </SheetHeader>
              <nav className="flex flex-col px-4 pb-8">
                {navItems.map((item) => (
                  <div key={item.label} className="border-b border-line py-3">
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "font-serif text-[24px] leading-none",
                        isActive(item.href) ? "text-ink" : "text-ink",
                      )}
                    >
                      {item.label}
                    </Link>
                    {item.children ? (
                      <ul className="mt-3 grid gap-1.5 pl-1">
                        {item.children.map((c) => (
                          <li key={c.href}>
                            <Link
                              href={c.href}
                              onClick={() => setMobileOpen(false)}
                              className="text-[14px] text-ink-muted hover:text-ink"
                            >
                              {c.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                ))}
                <Link
                  href={site.applyUrl}
                  onClick={() => setMobileOpen(false)}
                  className="mono-button mt-6 h-11 bg-ink text-white"
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

function NavEntry({
  item,
  active,
  overHero,
  isOpen,
  onOpen,
  onClose,
  onNavigate,
}: {
  item: NavItem;
  active: boolean;
  overHero: boolean;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onNavigate: () => void;
}) {
  const linkClass = cn(
    "flex items-center gap-1 rounded-[5px] px-3 py-1.5 text-[14px] transition-colors",
    overHero
      ? active
        ? "text-white"
        : "text-white/75 hover:text-white"
      : active
        ? "text-ink"
        : "text-ink-muted hover:text-ink",
  );

  if (!item.children) {
    return (
      <li>
        <Link
          href={item.href}
          aria-current={active ? "page" : undefined}
          className={linkClass}
          onClick={onNavigate}
        >
          {item.label}
        </Link>
      </li>
    );
  }

  const wide = item.children.length > 5;

  return (
    <li
      className="relative"
      onMouseEnter={onOpen}
      onFocus={onOpen}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) onClose();
      }}
    >
      <button
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="true"
        onClick={() => (isOpen ? onClose() : onOpen())}
        className={linkClass}
      >
        {item.label}
        <ChevronDown
          className={cn("size-3.5 transition-transform", isOpen && "rotate-180")}
          aria-hidden
        />
      </button>
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className={cn(
              "absolute top-full left-0 z-50 mt-2 rounded-[8px] border border-line bg-surface p-2 text-ink shadow-[0_12px_40px_-12px_rgba(15,11,20,0.25)]",
              wide ? "w-[560px]" : "w-[320px]",
            )}
          >
            <ul className={cn("grid gap-0.5", wide && "grid-cols-2")}>
              {item.children.map((c) => (
                <li key={c.href}>
                  <Link
                    href={c.href}
                    onClick={onNavigate}
                    className="block rounded-[6px] px-3 py-2.5 transition-colors hover:bg-ink/[0.04]"
                  >
                    <span className="block text-[14px] font-medium text-ink">
                      {c.label}
                    </span>
                    {c.description ? (
                      <span className="mt-0.5 line-clamp-1 block text-[12px] text-ink-muted">
                        {c.description}
                      </span>
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-1 border-t border-line pt-1">
              <Link
                href={item.href}
                onClick={onNavigate}
                className="block rounded-[6px] px-3 py-2 font-mono text-[11px] tracking-[0.08em] text-ink-muted uppercase hover:text-ink"
              >
                All {item.label.toLowerCase()} →
              </Link>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </li>
  );
}
