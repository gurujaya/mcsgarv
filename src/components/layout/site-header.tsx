"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { ArrowRight, ArrowUpRight, Plus, Search, X } from "lucide-react";
import { cn } from "cn";
import { Seal } from "@/components/primitives/seal";
import { navItems, type NavItem } from "./nav-links";
import { CommandMenu, useCommandMenu } from "./command-menu";
import { MeetingStatus } from "./meeting-status";
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
 * A celled bar: brand | links | live meeting status | search | Apply, divided
 * by hairlines, the action block flush to the edge. Condenses on scroll.
 * Dropdowns are editorial panels with numbered serif entries.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [condensed, setCondensed] = React.useState(false);
  const [openItem, setOpenItem] = React.useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const cmd = useCommandMenu();
  const closeTimer = React.useRef<number | null>(null);

  useMotionValueEvent(scrollY, "change", (y) => setCondensed(y > 48));

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");
  const open = (label: string) => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setOpenItem(label);
  };
  const scheduleClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpenItem(null), 140);
  };
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenItem(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const cell = "flex h-full items-center border-l border-line";

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-line bg-bg/85 text-ink backdrop-blur-md">
      <nav
        className={cn(
          "mx-auto flex w-full max-w-[1400px] items-stretch justify-between transition-[height] duration-300",
          condensed ? "h-14" : "h-[68px]",
        )}
        aria-label="Primary"
      >
        {/* Brand cell */}
        <Link
          href="/"
          className="flex items-center gap-3 pr-6 pl-6 md:pl-10"
          onClick={() => setOpenItem(null)}
        >
          <Seal
            size={condensed ? 24 : 28}
            className="transition-[width,height] duration-300"
          />
          <span className="flex flex-col leading-none">
            <span className="text-[15px] font-medium tracking-[-0.01em]">
              SGA Rockville
            </span>
            <span
              className={cn(
                "mt-1 font-mono text-[10px] tracking-[0.12em] text-ink-muted uppercase transition-[opacity,height] duration-300",
                condensed ? "h-0 opacity-0" : "h-3 opacity-100",
              )}
            >
              Montgomery College
            </span>
          </span>
        </Link>

        {/* Links */}
        <ul
          className="hidden items-center gap-1 px-4 lg:flex"
          onMouseLeave={scheduleClose}
        >
          {navItems.map((item) => (
            <NavEntry
              key={item.label}
              item={item}
              active={isActive(item.href)}
              isOpen={openItem === item.label}
              onOpen={() => open(item.label)}
              onClose={scheduleClose}
              onNavigate={() => setOpenItem(null)}
            />
          ))}
        </ul>

        {/* Status + actions */}
        <div className="flex items-stretch">
          <MeetingStatus
            className={cn(
              cell,
              "hidden gap-2 px-5 font-mono text-[11px] tracking-[0.06em] whitespace-nowrap text-ink-muted uppercase transition-colors hover:text-ink lg:flex",
            )}
          />
          <button
            type="button"
            onClick={cmd.open}
            aria-label="Search the site"
            className={cn(
              cell,
              "w-14 justify-center text-ink-muted transition-colors hover:bg-ink/[0.03] hover:text-ink",
            )}
          >
            <Search className="size-4" />
          </button>
          <Link
            href={site.applyUrl}
            className={cn(
              cell,
              "group hidden gap-2 bg-mc-purple px-6 font-mono text-[12px] tracking-[0.1em] text-white uppercase transition-colors hover:bg-[#45186f] sm:flex",
            )}
          >
            Apply
            <ArrowRight
              className="size-3.5 transition-transform group-hover:translate-x-0.5"
              aria-hidden
            />
          </Link>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Open menu"
                className={cn(cell, "w-14 justify-center text-ink lg:hidden")}
              >
                <Plus className="size-5 stroke-[1.5]" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="top"
              showCloseButton={false}
              className="inset-0 h-full w-full max-w-none overflow-y-auto border-0 bg-bg p-0 data-[state=closed]:slide-out-to-top-0 data-[state=closed]:fade-out data-[state=open]:slide-in-from-top-0 data-[state=open]:fade-in"
            >
              <SheetHeader className="sr-only">
                <SheetTitle>Menu</SheetTitle>
                <SheetDescription>Site navigation</SheetDescription>
              </SheetHeader>
              <div className="flex h-14 items-center justify-between border-b border-line px-6">
                <span className="flex items-center gap-2.5">
                  <Seal size={24} />
                  <span className="text-[15px] font-medium">SGA Rockville</span>
                </span>
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setMobileOpen(false)}
                  className="flex size-10 items-center justify-center border border-line"
                >
                  <X className="size-4" />
                </button>
              </div>
              <nav className="px-6 py-8" aria-label="Mobile">
                <ol>
                  {navItems.map((item, i) => (
                    <li key={item.label} className="border-b border-line py-5">
                      <Link
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-baseline gap-4"
                      >
                        <span className="font-mono text-[11px] text-ink-faint">
                          0{i + 1}
                        </span>
                        <span className="font-serif text-[38px] leading-none tracking-[-0.01em] text-ink">
                          {item.label}
                        </span>
                      </Link>
                      {item.children ? (
                        <ul className="mt-4 grid gap-2 pl-9">
                          {item.children.map((c) => (
                            <li key={c.href}>
                              <Link
                                href={c.href}
                                onClick={() => setMobileOpen(false)}
                                className="text-[15px] text-ink-muted hover:text-ink"
                              >
                                {c.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </li>
                  ))}
                </ol>
                <div className="mt-8 flex flex-col gap-3">
                  <Link
                    href={site.applyUrl}
                    onClick={() => setMobileOpen(false)}
                    className="mono-button h-12 bg-mc-purple text-white"
                  >
                    Apply to be a Senator <ArrowRight className="size-3.5" aria-hidden />
                  </Link>
                  <MeetingStatus className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.06em] text-ink-muted uppercase" />
                </div>
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
  isOpen,
  onOpen,
  onClose,
  onNavigate,
}: {
  item: NavItem;
  active: boolean;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onNavigate: () => void;
}) {
  const linkClass = cn(
    "group relative flex items-center gap-1.5 px-3 py-2 text-[14px] transition-colors",
    active ? "text-ink" : "text-ink-muted hover:text-ink",
  );
  // Underline drawn left-to-right on hover; solid when active or open.
  const underline = (
    <span
      aria-hidden
      className={cn(
        "absolute right-3 bottom-0.5 left-3 h-px origin-left scale-x-0 bg-ink transition-transform duration-300 ease-out group-hover:scale-x-100",
        (active || isOpen) && "scale-x-100",
      )}
    />
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
          {underline}
        </Link>
      </li>
    );
  }

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
        <Plus
          className={cn(
            "size-3 stroke-[1.75] text-ink-faint transition-transform duration-300",
            isOpen && "rotate-45",
          )}
          aria-hidden
        />
        {underline}
      </button>
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-full left-0 z-50 mt-3 w-[600px] border border-line bg-bg text-ink shadow-[0_24px_60px_-24px_rgba(22,17,28,0.35)]"
          >
            <div className="grid grid-cols-[1fr_220px]">
              <ol className="p-2">
                {item.children.map((c, i) => (
                  <li key={c.href}>
                    <Link
                      href={c.href}
                      onClick={onNavigate}
                      className="group/row grid grid-cols-[2.25rem_1fr_1rem] items-baseline gap-3 px-3 py-3 transition-colors hover:bg-surface"
                    >
                      <span className="font-mono text-[11px] text-ink-faint">
                        0{i + 1}
                      </span>
                      <span>
                        <span className="block font-serif text-[20px] leading-none tracking-[-0.01em] text-ink">
                          {c.label}
                        </span>
                        {c.description ? (
                          <span className="mt-1.5 line-clamp-1 block text-[12px] text-ink-muted">
                            {c.description}
                          </span>
                        ) : null}
                      </span>
                      <ArrowUpRight
                        className="size-3.5 self-center text-ink-faint opacity-0 transition-opacity group-hover/row:opacity-100"
                        aria-hidden
                      />
                    </Link>
                  </li>
                ))}
              </ol>
              <div className="flex flex-col justify-between border-l border-line bg-surface p-5">
                <p className="font-mono text-[11px] leading-[1.7] tracking-[0.08em] text-ink-muted uppercase">
                  {item.label === "Committees"
                    ? `${item.children.length} committees · most open to any student`
                    : "Funding, forms, answers, and how to reach us"}
                </p>
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  className="mono-button mt-6 h-9 border border-line-strong whitespace-nowrap text-ink hover:border-ink"
                >
                  All {item.label.toLowerCase()}{" "}
                  <ArrowRight className="size-3.5" aria-hidden />
                </Link>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </li>
  );
}
