import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Container } from "@/components/primitives/container";
import { SocialIcon } from "@/components/primitives/social-icons";
import { TodoChip } from "@/components/primitives/todo-chip";
import { ContactForm } from "@/components/forms/contact-form";
import { site } from "@/content/site";
import { isTodo } from "@/lib/todo";

export const metadata: Metadata = {
  title: "Contact",
  description: `Reach the SGA Rockville: ${site.email}, ${site.phone}, ${site.office.room} in the Student Services Center, or the Monday open meeting.`,
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        compact
        eyebrow="Contact"
        title="Talk to your student government."
        description="Three ways to reach us, in order of speed: come to a Monday meeting, email, or use the form. All of them get a reply."
      />
      <Container className="grid gap-12 pb-24 lg:grid-cols-12">
        <div className="space-y-4 lg:col-span-5">
          <div className="rounded-card border border-line bg-surface p-6">
            <dl className="space-y-5 text-sm">
              <div className="flex gap-3">
                <Clock className="mt-0.5 size-4 shrink-0 text-mc-purple" aria-hidden />
                <div>
                  <dt className="text-ink-muted">Open meeting</dt>
                  <dd className="font-medium text-ink">
                    {site.meeting.day}s, {site.meeting.time}
                  </dd>
                  <dd className="text-ink-muted">{site.meeting.location}</dd>
                </div>
              </div>
              <div className="flex gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-mc-purple" aria-hidden />
                <div>
                  <dt className="text-ink-muted">Office</dt>
                  <dd className="font-medium text-ink">
                    {site.office.room} · {site.office.within}
                  </dd>
                  <dd className="text-ink-muted">
                    {site.office.building}
                    <br />
                    {site.office.street}, {site.office.city}
                  </dd>
                  <dd className="mt-1 flex items-center gap-2">
                    <a
                      href={site.office.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-mc-purple hover:underline"
                    >
                      Open in Maps
                    </a>
                    <TodoChip note="Confirm office room: SV 104A (MC site) vs SV 007/007G (X profile)" />
                  </dd>
                </div>
              </div>
              <div className="flex gap-3">
                <Mail className="mt-0.5 size-4 shrink-0 text-mc-purple" aria-hidden />
                <div>
                  <dt className="text-ink-muted">Email</dt>
                  <dd>
                    <a
                      href={`mailto:${site.email}`}
                      className="font-medium text-mc-purple hover:underline"
                    >
                      {site.email}
                    </a>
                  </dd>
                  <dd className="text-ink-muted">
                    Senator applications:{" "}
                    <a
                      href={`mailto:${site.senatorInquiriesEmail}`}
                      className="text-mc-purple hover:underline"
                    >
                      {site.senatorInquiriesEmail}
                    </a>
                  </dd>
                  <dd className="text-ink-muted">
                    SAB:{" "}
                    <a
                      href={`mailto:${site.sab.email}`}
                      className="text-mc-purple hover:underline"
                    >
                      {site.sab.email}
                    </a>
                  </dd>
                </div>
              </div>
              <div className="flex gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-mc-purple" aria-hidden />
                <div>
                  <dt className="text-ink-muted">Phone</dt>
                  <dd>
                    <a
                      href={site.phoneHref}
                      className="font-medium text-mc-purple hover:underline"
                    >
                      {site.phone}
                    </a>
                  </dd>
                </div>
              </div>
            </dl>
          </div>

          <div className="rounded-card border border-line bg-surface p-6">
            <h2 className="text-xs font-medium tracking-[0.14em] text-ink uppercase">
              Follow
            </h2>
            <ul className="mt-3 space-y-2">
              {site.socials.map((s) => (
                <li key={s.kind}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 text-sm text-ink hover:text-mc-purple"
                  >
                    <SocialIcon kind={s.kind} className="size-4" />
                    {s.label}
                    <span className="text-ink-muted">
                      {isTodo(s.handle) ? (
                        <TodoChip note="Confirm handle in site.ts" />
                      ) : (
                        s.handle
                      )}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-card border border-line bg-surface p-6">
            <h2 className="text-xs font-medium tracking-[0.14em] text-ink uppercase">
              Office of Student Life
            </h2>
            <p className="mt-3 text-sm text-ink-muted">
              SGA’s advising office. {site.studentLife.room} · {site.studentLife.hours}
              <br />
              <a
                href={site.studentLife.phoneHref}
                className="text-mc-purple hover:underline"
              >
                {site.studentLife.phone}
              </a>{" "}
              ·{" "}
              <a
                href={`mailto:${site.studentLife.email}`}
                className="text-mc-purple hover:underline"
              >
                {site.studentLife.email}
              </a>
              <br />
              Director: {site.studentLife.director}
            </p>
          </div>
        </div>

        <div className="space-y-6 lg:col-span-7">
          <div className="rounded-card border border-line bg-surface p-6 md:p-8">
            <h2 className="font-serif text-2xl font-semibold text-ink">Send a message</h2>
            <p className="mt-1 mb-6 text-sm text-ink-muted">
              Goes to the SGA Secretary, who routes it to the right senator or committee.
            </p>
            <ContactForm />
          </div>
          <div className="overflow-hidden rounded-card border border-line bg-surface">
            <iframe
              title="Map of the Student Services Center (SV), Montgomery College Rockville"
              src={site.office.mapsEmbedUrl}
              className="h-72 w-full border-0 grayscale-[30%]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </Container>
    </>
  );
}
