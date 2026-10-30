"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { ChevronDown, Search } from "lucide-react";
import { cn } from "cn";
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
 * A masthead, not a toolbar. One row of sentence-case links in the body face,
 * the name set in the site serif, one button. Committees and Resources open a
 * full-width drawer beneath the row. The bar sits transparent over the top of
 * the page, turns to paper once scrolled, and steps out of the way while you
 * scroll down.
 *
 * Logo: when the official seal arrives, drop it at public/brand/sga-seal.svg
 * and place <Seal size={28}/> before the wordmark in <Brand/>.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);
  const [openItem, setOpenItem] = React.useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const cmd = useCommandMenu();
  const closeTimer = React.useRef<number | null>(null);
  const lastY = React.useRef(0);

  useMotionValueEvent(scrollY, "change", (y) => {
    const dy = y - lastY.current;
    lastY.current = y;
    setScrolled(y > 8);
    if (openItem) return;
    if (y < 120) setHidden(false);
    else if (Math.abs(dy) > 6) setHidden(dy > 0);
  });

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");
  const open = (label: string) => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setOpenItem(label);
    setHidden(false);
  };
  const close = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setOpenItem(null);
  };
  const scheduleClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpenItem(null), 160);
  };
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenItem(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const current = navItems.find((i) => i.label === openItem && i.children);
  const solid = scrolled || !!current;

  return (
    <>
      <motion.header
        className={cn(
          "fixed inset-x-0 top-0 z-40 text-ink transition-colors duration-300",
          solid ? "bg-bg" : "bg-transparent",
        )}
        animate={{ y: hidden ? "-100%" : "0%" }}
        transition={{ duration: 0.32, ease: [0.32, 0.72, 0, 1] }}
        onMouseLeave={scheduleClose}
      >
        <nav
          aria-label="Primary"
          className="relative mx-auto flex h-[68px] w-full max-w-[1400px] items-center px-6 md:px-10"
        >
          <Brand onClick={close} />

          {/* Primary links. Hovering one lets the others recede. */}
          <ul className="group/nav ml-12 hidden items-center gap-7 lg:flex">
            {navItems.map((item) => (
              <li key={item.label} className="flex">
                {item.children ? (
                  <button
                    type="button"
                    aria-expanded={openItem === item.label}
                    aria-haspopup="true"
                    onMouseEnter={() => open(item.label)}
                    onFocus={() => open(item.label)}
                    onClick={() => (openItem === item.label ? close() : open(item.label))}
                    className={cn(
                      linkClass,
                      (isActive(item.href) || openItem === item.label) && "text-ink",
                      openItem === item.label && "[&_svg]:rotate-180",
                    )}
                  >
                    {item.label}
                    <ChevronDown
                      aria-hidden
                      className="ml-1 size-[13px] stroke-[1.75] text-ink-faint transition-transform duration-300"
                    />
                    {isActive(item.href) && !openItem ? <ActiveRule /> : null}
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    onMouseEnter={scheduleClose}
                    onClick={close}
                    className={linkClass}
                  >
                    {item.label}
                    {isActive(item.href) ? <ActiveRule /> : null}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <div className="ml-auto flex items-center gap-6">
            <MeetingStatus className="hidden text-[14px] text-ink-muted transition-colors hover:text-ink xl:inline-flex" />
            <button
              type="button"
              onClick={cmd.open}
              aria-label="Search the site"
              className="hidden size-9 items-center justify-center text-ink-muted transition-colors hover:text-ink lg:flex"
            >
              <Search className="size-[18px] stroke-[1.5]" />
            </button>
            <Link
              href={site.applyUrl}
              onClick={close}
              className="hidden h-10 items-center rounded-[4px] bg-mc-purple px-4 text-[14px] font-medium text-white transition-colors hover:bg-[#44196c] sm:inline-flex"
            >
              Become a senator
            </Link>
            <MobileMenu open={mobileOpen} onOpenChange={setMobileOpen} />
          </div>
        </nav>

        {/* Drawer */}
        <AnimatePresence initial={false}>
          {current ? (
            <motion.div
              key="drawer"
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              transition={{ duration: 0.36, ease: [0.32, 0.72, 0, 1] }}
              className="overflow-hidden border-t border-line bg-bg"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={current.label}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.16 }}
                >
                  <Drawer item={current} onNavigate={close} />
                </motion.div>
              </AnimatePresence>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-x-0 bottom-0 h-px bg-line transition-opacity duration-300",
            solid ? "opacity-100" : "opacity-0",
          )}
        />
      </motion.header>

      {/* Scrim under an open drawer. */}
      <AnimatePresence>
        {current ? (
          <motion.button
            type="button"
            aria-label="Close menu"
            tabIndex={-1}
            key="scrim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={close}
            className="fixed inset-0 z-30 cursor-default bg-ink/20"
          />
        ) : null}
      </AnimatePresence>

      <CommandMenu open={cmd.isOpen} onOpenChange={cmd.setOpen} />
    </>
  );
}

const linkClass =
  "relative flex h-10 items-center text-[15px] text-ink transition-colors duration-200 group-hover/nav:not-hover:text-ink-muted";

function ActiveRule() {
  return (
    <span
      aria-hidden
      className="absolute inset-x-0 bottom-1 h-px bg-ink"
    />
  );
}

function Brand({ onClick, className }: { onClick?: () => void; className?: string }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label={`${site.name} home`}
      className={cn("flex items-baseline gap-2 whitespace-nowrap", className)}
    >
      <span className="font-serif text-[25px] leading-none tracking-[-0.01em] text-ink">
        SGA Rockville
      </span>
    </Link>
  );
}

function Drawer({ item, onNavigate }: { item: NavItem; onNavigate: () => void }) {
  const children = item.children ?? [];
  return (
    <div className="mx-auto grid w-full max-w-[1400px] gap-x-12 gap-y-8 px-6 py-10 md:px-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
      <div className="flex flex-col items-start">
        <p className="font-serif text-[34px] leading-none tracking-[-0.015em] text-ink">
          {item.label}
        </p>
        {item.blurb ? (
          <p className="mt-4 max-w-[34ch] text-[15px] leading-[1.55] text-ink-muted">
            {item.blurb}
          </p>
        ) : null}
        <Link
          href={item.href}
          onClick={onNavigate}
          className="mt-6 text-[14px] text-ink underline decoration-line-strong underline-offset-[5px] transition-colors hover:decoration-ink"
        >
          All {item.label.toLowerCase()}
        </Link>
      </div>
      <ul className="group/grid grid gap-x-10 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
        {children.map((c) => (
          <li key={c.href} className="flex">
            <Link
              href={c.href}
              onClick={onNavigate}
              className="flex w-full flex-col items-start transition-opacity duration-200 group-hover/grid:not-hover:opacity-50"
            >
              <span className="font-serif text-[22px] leading-[1.05] tracking-[-0.01em] text-ink">
                {c.label}
                {c.abbr ? (
                  <span className="ml-2 font-sans text-[13px] tracking-normal text-ink-faint">
                    {c.abbr}
                  </span>
                ) : null}
              </span>
              {c.description ? (
                <span className="mt-1.5 max-w-[30ch] text-[13.5px] leading-[1.45] text-ink-muted">
                  {c.description}
                </span>
              ) : null}
              {c.note ? (
                <span className="mt-2 text-[12.5px] font-medium text-mc-purple">{c.note}</span>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MobileMenu({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const closeMenu = () => onOpenChange(false);
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <button type="button" className="flex h-10 items-center text-[15px] text-ink lg:hidden">
          Menu
        </button>
      </SheetTrigger>
      <SheetContent
        side="top"
        showCloseButton={false}
        className="inset-0 flex h-full w-full max-w-none flex-col overflow-y-auto border-0 bg-bg p-0 shadow-none data-[state=closed]:slide-out-to-top-0 data-[state=closed]:fade-out data-[state=open]:slide-in-from-top-0 data-[state=open]:fade-in"
      >
        <SheetHeader className="sr-only">
          <SheetTitle>Menu</SheetTitle>
          <SheetDescription>Site navigation</SheetDescription>
        </SheetHeader>
        <div className="flex h-[68px] shrink-0 items-center justify-between px-6">
          <Brand onClick={closeMenu} />
          <button
            type="button"
            onClick={closeMenu}
            className="flex h-10 items-center text-[15px] text-ink"
          >
            Close
          </button>
        </div>
        <nav className="flex flex-1 flex-col px-6 pt-6 pb-8" aria-label="Mobile">
          <ul>
            {navItems.map((item) => (
              <li key={item.label} className="border-t border-line py-5">
                <Link
                  href={item.href}
                  onClick={closeMenu}
                  className="font-serif text-[40px] leading-none tracking-[-0.015em] text-ink"
                >
                  {item.label}
                </Link>
                {item.children ? (
                  <ul className="mt-4 grid gap-2.5">
                    {item.children.map((c) => (
                      <li key={c.href}>
                        <Link
                          href={c.href}
                          onClick={closeMenu}
                          className="text-[17px] text-ink-muted"
                        >
                          {c.label}
                          {c.abbr ? (
                            <span className="ml-2 text-[13px] text-ink-faint">{c.abbr}</span>
                          ) : null}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>
          <div className="mt-auto flex flex-col gap-5 border-t border-line pt-6">
            <MeetingStatus className="text-[15px] text-ink-muted" />
            <Link
              href={site.applyUrl}
              onClick={closeMenu}
              className="inline-flex h-12 items-center justify-center rounded-[4px] bg-mc-purple text-[15px] font-medium text-white"
            >
              Become a senator
            </Link>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
