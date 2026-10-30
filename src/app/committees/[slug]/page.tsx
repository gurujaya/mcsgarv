import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/primitives/container";
import { Todo, TodoChip } from "@/components/primitives/todo-chip";
import { committees, getCommittee } from "@/content/committees";
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

const h2 = "font-serif text-[28px] leading-[1.1] tracking-[-0.01em] text-ink md:text-[32px]";

export default async function CommitteePage({ params }: PageProps<"/committees/[slug]">) {
  const { slug } = await params;
  const c = getCommittee(slug);
  if (!c) notFound();

  const isChair = (p: { name: string; role?: string }) =>
    c.chair === p.name || c.chair === p.role;
  const isCoChair = (p: { name: string }) => c.coChair === p.name;
  const last = (p: { name: string }) => p.name.trim().split(/\s+/).slice(-1)[0] ?? "";
  const members = people
    .filter((p) => p.committees.includes(c.slug))
    .sort((a, b) => {
      const rank = (p: { name: string; role?: string }) =>
        isChair(p) ? 0 : isCoChair(p) ? 1 : 2;
      return rank(a) - rank(b) || last(a).localeCompare(last(b));
    });
  const paragraphs = c.description.split(/\n\s*\n/);
  const chairPerson = c.chair
    ? people.find((p) => p.role === c.chair || p.name === c.chair)
    : undefined;
  const coChairPerson = c.coChair ? people.find((p) => p.name === c.coChair) : undefined;
  const others = committees.filter((o) => o.slug !== c.slug);
  const open = c.openTo === "all-students";
  const joinHref = open
    ? c.slug === "sab"
      ? "/get-involved#sab"
      : "/get-involved#committees"
    : site.applyUrl;

  const facts: { term: string; value: React.ReactNode }[] = [
    {
      term: "Chair",
      value: chairPerson ? (
        <Link href={`/senators#${chairPerson.slug}`} className="text-link">
          {chairPerson.name}
        </Link>
      ) : (
        (c.chair ?? "Elected by the committee")
      ),
    },
    ...(c.coChair
      ? [
          {
            term: "Co-chair",
            value: coChairPerson ? (
              <Link href={`/senators#${coChairPerson.slug}`} className="text-link">
                {coChairPerson.name}
              </Link>
            ) : (
              c.coChair
            ),
          },
        ]
      : []),
    { term: "Meets", value: <Todo value={c.meets} fallback="Time to be confirmed" /> },
    { term: "Who can join", value: open ? "Any Rockville student" : "Current senators" },
    {
      term: "Email",
      value: (
        <a href={`mailto:${c.contact ?? site.email}`} className="text-link break-all">
          {c.contact ?? site.email}
        </a>
      ),
    },
  ];

  return (
    <>
      {/* Header */}
      <Container as="header" className="pt-28 pb-12 md:pt-36 md:pb-16">
        <Link href="/committees" className="text-[14px] text-ink-muted hover:text-ink">
          Committees
        </Link>
        <h1 className="serif-display mt-6 flex flex-wrap items-baseline gap-x-4 text-[48px] md:text-[80px]">
          {c.name}
          {c.shortName && !c.name.includes(c.shortName) ? (
            <span className="font-sans text-[16px] tracking-normal text-ink-faint md:text-[18px]">
              {c.shortName}
            </span>
          ) : null}
        </h1>
        <p className="mt-6 max-w-[40ch] font-serif text-[24px] leading-[1.2] tracking-[-0.01em] text-ink-muted md:text-[30px]">
          {c.tagline}
        </p>
        {c.draft ? (
          <p className="mt-4">
            <TodoChip note="Description is a draft; an officer must confirm." />
          </p>
        ) : null}
      </Container>

      <Container className="grid gap-14 border-t border-line pt-12 pb-24 md:pt-16 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <div className="max-w-[62ch] text-[17px] leading-[1.6] text-ink-muted [&_p+p]:mt-5">
            {paragraphs.map((p, i) => (
              <p key={i} className={i === 0 ? "text-ink" : undefined}>
                {p}
              </p>
            ))}
          </div>

          <h2 className={`${h2} mt-16`}>What the committee does</h2>
          <ul className="mt-6 max-w-[62ch] border-t border-line">
            {c.responsibilities.map((r) => (
              <li key={r} className="border-b border-line py-4 text-[16px] leading-[1.5] text-ink">
                {r}
              </li>
            ))}
          </ul>

          {c.howToJoin ? (
            <>
              <h2 className={`${h2} mt-16`}>How to join</h2>
              <p className="mt-5 max-w-[62ch] text-[16px] leading-[1.6] text-ink-muted">
                <Todo value={c.howToJoin} fallback="Ask at a Monday open meeting." />
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                <Link href={joinHref} className="button-primary">
                  {open ? "Join this committee" : "Become a senator"}
                </Link>
                <Link href="/contact" className="text-link text-[15px]">
                  Ask a question
                </Link>
              </div>
            </>
          ) : null}

          <h2 className={`${h2} mt-16 flex items-baseline gap-3`}>
            Members
            <span className="font-sans text-[15px] text-ink-muted">{members.length}</span>
          </h2>
          {members.length ? (
            <ul className="mt-6 grid grid-cols-2 border-t border-l border-line sm:grid-cols-3 md:grid-cols-4">
              {members.map((m) => {
                const tag = isChair(m) ? "Chair" : isCoChair(m) ? "Co-chair" : null;
                return (
                  <li key={m.slug} className="border-r border-b border-line">
                    <Link href={`/senators#${m.slug}`} className="group block">
                      <div className="relative aspect-square overflow-hidden bg-surface">
                        {m.photo ? (
                          <Image
                            src={m.photo}
                            alt={m.name}
                            fill
                            sizes="(min-width: 768px) 200px, 50vw"
                            className="object-cover object-top grayscale transition-[filter] duration-500 group-hover:grayscale-0"
                          />
                        ) : (
                          <div className="flex size-full items-center justify-center font-serif text-[28px] text-ink-faint">
                            {initials(m.name)}
                          </div>
                        )}
                        {tag ? (
                          <span className="absolute top-2 left-2 bg-bg px-2 py-0.5 text-[12px] font-medium text-ink">
                            {tag}
                          </span>
                        ) : null}
                      </div>
                      <div className="px-3 pt-3 pb-3.5">
                        <p className="text-[15px] leading-[1.2] font-medium text-ink">{m.name}</p>
                        <p className="mt-1 text-[13px] text-ink-muted">{m.role}</p>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="mt-5 text-[15px] text-ink-muted">
              The roster for this committee is not on the site yet.{" "}
              <TodoChip note="Add committee assignments in people.ts" />
            </p>
          )}
        </div>

        <aside className="lg:col-span-4 lg:col-start-9">
          <div className="lg:sticky lg:top-24">
            <dl className="border-t border-line">
              {facts.map((f) => (
                <div
                  key={f.term}
                  className="grid grid-cols-[7.5rem_1fr] gap-4 border-b border-line py-3.5 text-[15px]"
                >
                  <dt className="text-ink-muted">{f.term}</dt>
                  <dd className="text-ink">{f.value}</dd>
                </div>
              ))}
            </dl>

            {c.showSocials ? (
              <>
                <h2 className="mt-12 text-[15px] font-medium text-ink">Where SGA posts</h2>
                <ul className="mt-3 border-t border-line">
                  {site.socials.map((s) => (
                    <li
                      key={s.kind}
                      className="flex items-baseline justify-between gap-4 border-b border-line py-3 text-[15px]"
                    >
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-link"
                      >
                        {s.label}
                      </a>
                      <span className="text-[13px] text-ink-muted">
                        {isTodo(s.handle) ? <TodoChip note="Confirm handle" /> : s.handle}
                      </span>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}

            {c.links?.length ? (
              <>
                <h2 className="mt-12 text-[15px] font-medium text-ink">Links</h2>
                <ul className="mt-3 border-t border-line">
                  {c.links.map((l) => (
                    <li key={l.label} className="border-b border-line py-3 text-[15px]">
                      {isTodo(l.href) ? (
                        <span className="flex items-center gap-2 text-ink-muted">
                          {l.label} <TodoChip note="Add link" />
                        </span>
                      ) : l.href.startsWith("/") ? (
                        <Link href={l.href} className="text-link">
                          {l.label}
                        </Link>
                      ) : (
                        <a
                          href={l.href}
                          target={l.href.startsWith("mailto:") ? undefined : "_blank"}
                          rel="noopener noreferrer"
                          className="text-link"
                        >
                          {l.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </>
            ) : null}

            <h2 className="mt-12 text-[15px] font-medium text-ink">Other committees</h2>
            <ul className="mt-3 border-t border-line">
              {others.map((o) => (
                <li
                  key={o.slug}
                  className="flex items-baseline justify-between gap-4 border-b border-line py-3 text-[15px]"
                >
                  <Link href={`/committees/${o.slug}`} className="text-ink-muted hover:text-ink">
                    {o.name}
                  </Link>
                  {o.openTo === "all-students" ? (
                    <span className="text-[13px] text-mc-purple">Open to all students</span>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </Container>
    </>
  );
}
