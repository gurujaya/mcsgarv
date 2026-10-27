import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHeader } from "@/components/page-header";
import {
  SenatorsDirectory,
  SenatorsDirectoryStatic,
} from "@/components/directory/senators-directory";
import { TodoChip } from "@/components/primitives/todo-chip";
import { elected, officers, senators } from "@/content/people";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Senators & Officers",
  description: `The ${elected.length} elected officers and senators-at-large representing Rockville Campus students in ${site.term}.`,
};

export default function SenatorsPage() {
  return (
    <>
      <PageHeader
        compact
        eyebrow={`${site.term} · Rockville Campus`}
        title="The people you elected."
        description={`${officers.length} Executive Board officers and ${senators.length} Senators-at-Large. Every one of them attends the Monday open meeting, so the fastest way to reach them is to show up.`}
      >
        <p className="mt-4 text-xs text-ink-muted">
          Roster from montgomerycollege.edu and the SGA group membership.{" "}
          <TodoChip note="Confirm roles marked unconfirmed in people.ts; add photos to /public/people" />
        </p>
      </PageHeader>
      <Suspense fallback={<SenatorsDirectoryStatic />}>
        <SenatorsDirectory />
      </Suspense>
    </>
  );
}
