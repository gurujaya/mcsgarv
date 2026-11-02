import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { Container } from "@/components/primitives/container";
import { ConcernForm } from "@/components/forms/concern-form";
import { ConcernBoard, type BoardItem } from "@/components/concern-board";
import { concerns, concernStatuses, statusOrder } from "@/content/concerns";
import { getCommittee } from "@/content/committees";
import { people } from "@/content/people";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Concerns",
  description:
    "Raise a problem with the Rockville campus and follow what SGA does about it. Every concern, its owner, and its status, in public.",
};

const h2 =
  "font-serif text-[28px] leading-[1.1] tracking-[-0.01em] text-ink md:text-[32px]";

export default function ConcernsPage() {
  const items: BoardItem[] = concerns.map((c) => {
    const committee = c.committee ? getCommittee(c.committee) : undefined;
    const senator = c.senator ? people.find((p) => p.slug === c.senator) : undefined;
    const owner = committee
      ? { label: committee.name, href: `/committees/${committee.slug}` }
      : senator
        ? { label: senator.name, href: `/senators#${senator.slug}` }
        : undefined;
    return { ...c, owner };
  });
  const open = items.filter(
    (c) => c.status === "received" || c.status === "in-progress",
  ).length;
  const resolved = items.filter((c) => c.status === "resolved").length;

  return (
    <>
      <Container as="header" className="pt-28 pb-12 md:pt-36 md:pb-16">
        <h1 className="serif-display text-[48px] md:text-[80px]">Raise a concern.</h1>
        <p className="mt-6 max-w-[40ch] font-serif text-[24px] leading-[1.2] tracking-[-0.01em] text-ink-muted md:text-[30px]">
          Something on campus should be better. Tell SGA here, then follow what happens to
          it below.
        </p>
      </Container>

      <Container className="grid gap-14 border-t border-line pt-12 pb-20 md:pt-16 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <ConcernForm />
        </div>
        <aside className="lg:col-span-4 lg:col-start-9">
          <h2 className="text-[15px] font-medium text-ink">What happens to it</h2>
          <ol className="mt-3 border-t border-line">
            {statusOrder.map((s) => (
              <li
                key={s}
                className="border-b border-line py-3.5 text-[15px] leading-[1.5]"
              >
                <p className="text-ink">{concernStatuses[s].label}</p>
                <p className="text-ink-muted">{concernStatuses[s].description}</p>
              </li>
            ))}
          </ol>
          <p className="mt-5 text-[14px] leading-[1.55] text-ink-muted">
            Goes to the SGA Secretary. Replies within a week during the semester. You can
            also raise it in person during open floor at any{" "}
            <Link href="/events?type=meeting" className="text-link">
              open meeting
            </Link>
            , or email{" "}
            <a href={`mailto:${site.email}`} className="text-link break-all">
              {site.email}
            </a>
            .
          </p>
        </aside>
      </Container>

      <section id="board" className="scroll-mt-24 border-t border-line">
        <Container className="pt-12 pb-24 md:pt-16">
          <h2 className={h2}>What students have raised</h2>
          <p className="mt-3 text-[16px] text-ink-muted">
            {items.length === 0
              ? "Every concern SGA takes on is listed here with who has it and where it stands."
              : `${items.length} this term. ${open} open, ${resolved} resolved.`}
          </p>
          <Suspense fallback={<div className="mt-8 border-t border-line" aria-hidden />}>
            <ConcernBoard items={items} />
          </Suspense>
        </Container>
      </section>
    </>
  );
}
