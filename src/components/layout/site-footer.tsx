import Link from "next/link";
import { Container } from "@/components/primitives/container";
import { Seal } from "@/components/primitives/seal";
import { SocialIcon } from "@/components/primitives/social-icons";
import { navLinks, secondaryLinks } from "./nav-links";
import { site } from "@/content/site";
import { isTodo } from "@/lib/todo";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-line bg-surface">
      <Container className="grid gap-10 py-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <Link
            href="/"
            className="inline-flex items-center gap-3"
            aria-label="SGA Rockville home"
          >
            <Seal size={44} />
            <span className="flex flex-col leading-tight">
              <span className="font-serif text-xl font-semibold text-ink">
                SGA Rockville
              </span>
              <span className="text-xs text-ink-muted">
                Montgomery College · Rockville Campus
              </span>
            </span>
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-muted">
            Made by students, for students. The Student Government Association is the
            official representative body for every student on the Rockville Campus.
          </p>
          <ul className="mt-6 flex items-center gap-2">
            {site.socials.map((s) => (
              <li key={s.kind}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${s.label}${isTodo(s.handle) ? "" : ` ${s.handle}`}`}
                  className="flex size-9 items-center justify-center rounded-pill border border-line text-ink-muted transition-colors hover:border-mc-purple/40 hover:text-mc-purple"
                >
                  <SocialIcon kind={s.kind} className="size-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2">
          <h3 className="text-xs font-medium tracking-[0.14em] text-ink uppercase">
            Explore
          </h3>
          <ul className="mt-4 space-y-2.5">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-sm text-ink-muted hover:text-mc-purple"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            {secondaryLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-sm text-ink-muted hover:text-mc-purple"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-5">
          <h3 className="text-xs font-medium tracking-[0.14em] text-ink uppercase">
            Find us
          </h3>
          <address className="mt-4 space-y-2.5 text-sm text-ink-muted not-italic">
            <p>
              {site.office.within}, {site.office.room}
              <br />
              {site.office.building}
              <br />
              {site.office.street}, {site.office.city}
            </p>
            <p>
              <a href={`mailto:${site.email}`} className="hover:text-mc-purple">
                {site.email}
              </a>
              <br />
              <a href={site.phoneHref} className="hover:text-mc-purple">
                {site.phone}
              </a>
            </p>
            <p className="text-ink">
              Open meetings: {site.meeting.day}s, {site.meeting.time}
            </p>
            <p>
              <a
                href={site.studentLife.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-mc-purple"
              >
                MC Office of Student Life ↗
              </a>
            </p>
          </address>
        </div>
      </Container>
      <div className="border-t border-line">
        <Container className="flex flex-col gap-2 py-5 text-xs text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Montgomery College Rockville SGA</p>
          <p>
            Student-run. Not an official publication of Montgomery College.{" "}
            <a
              href={site.mcSgaPageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline-offset-4 hover:text-mc-purple hover:underline"
            >
              Official MC SGA page
            </a>
          </p>
        </Container>
      </div>
    </footer>
  );
}
