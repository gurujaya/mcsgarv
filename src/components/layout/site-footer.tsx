import Link from "next/link";
import { Seal } from "@/components/primitives/seal";
import { SocialIcon } from "@/components/primitives/social-icons";
import { navLinks, secondaryLinks } from "./nav-links";
import { site } from "@/content/site";
import { isTodo } from "@/lib/todo";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-line">
      <div className="grid gap-12 px-6 py-16 md:px-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <Seal size={26} />
            <span className="text-[15px] font-medium text-ink">SGA Rockville</span>
          </Link>
          <p className="mt-5 max-w-[38ch] text-[14px] leading-[1.6] text-ink-muted">
            Made by students, for students. The official representative body for every
            student on the Montgomery College Rockville Campus.
          </p>
          <ul className="mt-6 flex items-center gap-1.5">
            {site.socials.map((s) => (
              <li key={s.kind}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${s.label}${isTodo(s.handle) ? "" : ` ${s.handle}`}`}
                  className="flex size-8 items-center justify-center rounded-md border border-line text-ink-muted transition-colors hover:border-line-strong hover:text-ink"
                >
                  <SocialIcon kind={s.kind} className="size-3.5" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h3 className="eyebrow">Explore</h3>
          <ul className="mt-4 space-y-2">
            {[...navLinks, ...secondaryLinks].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-[14px] text-ink-muted hover:text-ink">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-5">
          <h3 className="eyebrow">Find us</h3>
          <address className="mt-4 space-y-3 text-[14px] leading-[1.6] text-ink-muted not-italic">
            <p>
              {site.office.within}, {site.office.room}
              <br />
              {site.office.building}
              <br />
              {site.office.street}, {site.office.city}
            </p>
            <p>
              <a href={`mailto:${site.email}`} className="hover:text-ink">
                {site.email}
              </a>
              <br />
              <a href={site.phoneHref} className="hover:text-ink">
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
                className="hover:text-ink"
              >
                MC Office of Student Life ↗
              </a>
            </p>
          </address>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="flex flex-col gap-2 px-6 py-5 font-mono text-[11px] tracking-[0.02em] text-ink-muted uppercase sm:flex-row sm:items-center sm:justify-between md:px-10">
          <p>© {new Date().getFullYear()} Montgomery College Rockville SGA</p>
          <p>
            Student-run ·{" "}
            <a
              href={site.mcSgaPageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ink"
            >
              Official MC SGA page
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
