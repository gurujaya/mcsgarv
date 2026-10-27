import { ImageResponse } from "next/og";
import { committees, getCommittee } from "@/content/committees";
import { OgCard } from "@/app/opengraph-image";

export const alt = "SGA Rockville committee";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return committees.map((c) => ({ slug: c.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getCommittee(slug);
  return new ImageResponse(
    <OgCard title={c?.name ?? "Committee"} subtitle={c?.tagline ?? "SGA Rockville"} />,
    size,
  );
}
