import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHeader } from "@/components/page-header";
import {
  ResourcesDirectory,
  ResourcesDirectoryStatic,
} from "@/components/directory/resources-directory";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Links every Rockville student should have: Student Life, the club handbook, SGA forms, campus resources, the food pantry, and Student Advocacy Day.",
};

export default function ResourcesPage() {
  return (
    <>
      <PageHeader
        compact
        eyebrow="Resources"
        title="The links we send people most."
        description="Student Life, forms, campus services, and advocacy. If something you need is missing, tell us and we will add it."
      />
      <Suspense fallback={<ResourcesDirectoryStatic />}>
        <ResourcesDirectory />
      </Suspense>
    </>
  );
}
