import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Mail, Clock, Users, UserCheck, ExternalLink } from "lucide-react";
import { Container } from "@/components/primitives/container";
import { Pill } from "@/components/primitives/pill";
import { CTA } from "@/components/primitives/cta";
import { Todo, TodoChip } from "@/components/primitives/todo-chip";
import { CommitteeIcon } from "@/components/committee-icon";
import { committees, getCommittee, committeeCategories } from "@/content/committees";
import { initials, people } from "@/content/people";
import { site } from "@/content/site";
import { isTodo } from "@/lib/todo";

export function generateStaticParams() {
  return committees.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/committees/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const c = getCommittee(slug);
  if (!c) return {};
  return { title: c.name, description: c.tagline };
}

const toneBg: Record<string, string> = {
  purple: "border border-line bg-surface text-ink",
  blue: "border border-line bg-surface text-ink",
  green: "border border-line bg-surface text-ink",
  orange: "border border-line bg-surface text-ink",
};

export default async function CommitteePage({ params }: PageProps<"/committees/[slug]">) {
  const { slug } = await params;
  const c = getCommittee(slug);
  if (!c) notFound();

  const last = (p: { name: string }) => p.name.trim().split(/\s+/).slice(-1)[0] ?? "";
  const members = people
    .filter((p) => p.committees.includes(c.slug))
    .sort((a, b) => {
      const rank = (p: { name: string }) =>
        (c.chair === p.name || c.chair === p.role) ? 0 : c.coChair === p.name ? 1 : 2;
      return rank(a) - rank(b) || last(a).localeCompare(last(b));
    });
  const paragraphs = c.description.split(/\n\s*\n/);
  const chairPerson = c.chair
    ? people.find((p) => p.role === c.chair || p.name === c.chair)
    : undefined;
  const others = committees.filter((o) => o.slug !== c.slug).slice(0, 3);

  return (
    <>
      <Container
        as="header"
        className="border-b border-line pt-26 pb-10 md:pt-30 md:pb-12"
      >
        <Link
          href="/committees"
          className="inline-flex items-center gap-1.5 text-[14px] text-ink-muted hover:text-ink"
        >
          <ArrowLeft className="size-4" /> All committees
        </Link>
        <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-start md:gap-8">
          <span
            className={`flex size-20 shrink-0 items-center justify-center rounded-card ${toneBg[c.color]}`}
          >
            <CommitteeIcon slug={c.slug} className="size-9" />
          </span>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <Pill tone={c.color}>{committeeCategories[c.category]}</Pill>
              <Pill tone={c.openTo === "all-students" ? "green" : "neutral"}>
                {c.openTo === "all-students" ? "Open to all students" : "Senators only"}
              </Pill>
              {c.draft ? (
                <TodoChip note="Description is a draft; an officer must confirm." />
              ) : null}
            </div>
            <h1 className="display mt-4 text-[40px] text-ink md:text-6xl md:text-[52px]">
              {c.name}
              {c.shortName ? (
                <span className="ml-3 align-middle font-sans text-xl font-normal text-ink-muted">
                  {c.shortName}
                </span>
              ) : null}
            </h1>
            <p className="mt-4 max-w-[60ch] text-lg leading-relaxed text-ink-muted">
              {c.tagline}
            </p>
          </div>
        </div>
      </Container>

      <Container className="grid gap-12 pt-12 pb-24 md:pt-16 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="prose-sga">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <h2 className="eyebrow mt-12">Responsibilities</h2>
          <ul className="mt-4 divide-y divide-line rounded-card border border-line bg-surface">
            {c.responsibilities.map((r) => (
              <li key={r} className="flex gap-3 px-5 py-3.5 text-[15px] text-ink">
                <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-ink" />
                {r}
              </li>
            ))}
          </ul>

          {c.howToJoin ? (
            <>
              <h2 className="eyebrow mt-12">How to join</h2>
              <p className="mt-3 max-w-[65ch] text-[15px] leading-relaxed text-ink-muted">
                <Todo value={c.howToJoin} fallback="Ask at a Monday open meeting." />
              </p>
            </>
          ) : null}

          <h2 className="mt-12 text-xs font-medium tracking-[0.14em] text-ink uppercase">
            Members
            <span className="ml-2 font-mono text-[11px] text-ink-faint">
              {members.length}
            </span>
          </h2>
          {members.length ? (
            <ul className="mt-4 grid grid-cols-2 border-t border-l border-line sm:grid-cols-3 md:grid-cols-4">
              {members.map((m) => {
                const tag =
                  (c.chair === m.name || c.chair === m.role) ? "Chair" : c.coChair === m.name ? "Co-chair" : null;
                return (
                  <li key={m.slug} className="flex flex-col border-r border-b border-line bg-surface">
                    <Link href={`/senators#${m.slug}`} className="group block">
                      <div className="relative aspect-square overflow-hidden bg-bg">
                        {m.photo ? (
                          <Image
                            src={m.photo}
                            alt={m.name}
                            fill
                            sizes="(min-width: 768px) 200px, 50vw"
                            className="object-cover object-top grayscale transition-[filter] duration-500 group-hover:grayscale-0"
                          />
                        ) : (
                          <div className="flex size-full items-center justify-center font-mono text-[20px] tracking-[0.06em] text-ink-faint">
                            {initials(m.name)}
                          </div>
                        )}
                        {tag ? (
                          <span className="absolute top-2 left-2 bg-ink px-1.5 py-0.5 font-mono text-[10px] tracking-[0.1em] text-white uppercase">
                            {tag}
                          </span>
                        ) : null}
                      </div>
                      <div className="px-3 pt-2.5 pb-3">
                        <p className="text-[14px] leading-[1.2] font-medium text-ink">
                          {m.name}
                        </p>
                        <p className="mt-1 font-mono text-[10px] tracking-[0.06em] text-ink-muted uppercase">
                          {m.role}
                        </p>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-ink-muted">
              Roster coming soon.{" "}
              <TodoChip note="Add committee assignments in people.ts" />
            </p>
          )}
        </div>

        <aside className="lg:col-span-5">
          <div className="sticky top-24 space-y-4">
            <div className="rounded-card border border-line bg-surface p-6">
              <dl className="space-y-4 text-sm">
                <div className="flex gap-3">
                  <UserCheck
                    className="mt-0.5 size-4 shrink-0 text-mc-purple"
                    aria-hidden
                  />
                  <div>
                    <dt className="text-ink-muted">Chair</dt>
                    <dd className="text-ink">
                      {chairPerson
                        ? `${chairPerson.name} (${chairPerson.role})`
                        : (c.chair ?? "Elected by the committee")}
                      {c.coChair ? (
                        <span className="block text-ink-muted">
                          Co-chair: {c.coChair}
                        </span>
                      ) : null}
                    </dd>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Clock className="mt-0.5 size-4 shrink-0 text-ink-muted" aria-hidden />
                  <div>
                    <dt className="text-ink-muted">Meets</dt>
                    <dd className="text-ink">
                      <Todo value={c.meets} fallback="Time to be confirmed" />
                    </dd>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Users className="mt-0.5 size-4 shrink-0 text-ink-muted" aria-hidden />
                  <div>
                    <dt className="text-ink-muted">Who can join</dt>
                    <dd className="text-ink">
                      {c.openTo === "all-students"
                        ? "Any Rockville student"
                        : "Current senators"}
                    </dd>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Mail className="mt-0.5 size-4 shrink-0 text-ink-muted" aria-hidden />
                  <div>
                    <dt className="text-ink-muted">Contact</dt>
                    <dd>
                      <a
                        href={`mailto:${c.contact ?? site.email}`}
                        className="text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink"
                      >
                        {c.contact ?? site.email}
                      </a>
                    </dd>
                  </div>
                </div>
              </dl>
              <div className="mt-6 flex flex-col gap-2">
                {c.openTo === "all-students" ? (
                  <CTA
                    href={
                      c.slug === "sab" ? "/get-involved#sab" : "/get-involved#committees"
                    }
                    variant="accent"
                    size="sm"
                  >
                    Join this committee
                  </CTA>
                ) : (
                  <CTA href="/get-involved#senator" variant="accent" size="sm">
                    Become a Senator to serve
                  </CTA>
                )}
                <CTA href="/contact" variant="ghost" size="sm">
                  Ask a question
                </CTA>
              </div>
            </div>

            {c.links?.length ? (
              <div className="rounded-card border border-line bg-surface p-6">
                <h2 className="eyebrow">Links</h2>
                <ul className="mt-3 space-y-2">
                  {c.links.map((l) => (
                    <li
                      key={l.label}
                      className="flex items-center justify-between gap-3 text-sm"
                    >
                      {isTodo(l.href) ? (
                        <span className="flex items-center gap-2 text-ink-muted">
                          {l.label} <TodoChip note="Add link" />
                        </span>
                      ) : l.href.startsWith("/") ? (
                        <Link
                          href={l.href}
                          className="text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink"
                        >
                          {l.label}
                        </Link>
                      ) : (
                        <a
                          href={l.href}
                          target={l.href.startsWith("mailto:") ? undefined : "_blank"}
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink"
                        >
                          {l.label}
                          {l.href.startsWith("http") ? (
                            <ExternalLink className="size-3.5" />
                          ) : null}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="rounded-card border border-line bg-surface p-6">
              <h2 className="eyebrow">Other committees</h2>
              <ul className="mt-3 space-y-2">
                {others.map((o) => (
                  <li key={o.slug}>
                    <Link
                      href={`/committees/${o.slug}`}
                      className="text-[14px] text-ink-muted hover:text-ink"
                    >
                      {o.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/committees"
                    className="text-sm font-medium text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink"
                  >
                    All {committees.length} committees →
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </aside>
      </Container>
    </>
  );
}
