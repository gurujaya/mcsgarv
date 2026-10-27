import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHeader } from "@/components/page-header";
import {
  CommitteesDirectory,
  CommitteesDirectoryStatic,
} from "@/components/directory/committees-directory";
import { committees } from "@/content/committees";

export const metadata: Metadata = {
  title: "Committees",
  description: `All ${committees.length} SGA Rockville committees: what they do, who chairs them, and how to join.`,
};

export default function CommitteesPage() {
  return (
    <>
      <PageHeader
        compact
        eyebrow="Committees"
        title="Where the work actually happens."
        description="Every senator serves on at least one committee, and most committees are open to any student. Filter by what you care about."
      />
      <Suspense fallback={<CommitteesDirectoryStatic />}>
        <CommitteesDirectory />
      </Suspense>
    </>
  );
}
