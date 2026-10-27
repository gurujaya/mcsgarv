import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { Container } from "@/components/primitives/container";
import { TodoChip } from "@/components/primitives/todo-chip";
import Constitution from "@/content/constitution.mdx";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Constitution",
  description:
    "The governing document of the Montgomery College Rockville Student Government Association.",
};

export default function ConstitutionPage() {
  return (
    <>
      <PageHeader
        compact
        eyebrow="Governing document"
        title="SGA Rockville Constitution"
        description={`The rules the ${site.term} Student Government Association operates under.`}
      >
        <p className="mt-4 text-xs text-ink-muted">
          Edit{" "}
          <code className="rounded bg-surface px-1 py-0.5">
            src/content/constitution.mdx
          </code>{" "}
          to update this page.{" "}
          <TodoChip note="Paste the official constitution text into constitution.mdx" />
        </p>
      </PageHeader>
      <Container className="pt-12 pb-24 md:pt-16">
        <article className="prose-sga rounded-card border border-line bg-surface px-6 py-8 md:px-10 md:py-12">
          <Constitution />
        </article>
      </Container>
    </>
  );
}
