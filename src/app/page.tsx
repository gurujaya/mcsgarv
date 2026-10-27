import { Hero } from "@/components/home/hero";
import { StatStrip } from "@/components/home/stat-strip";
import { WhatWeDo } from "@/components/home/what-we-do";
import { CommitteesPreview } from "@/components/home/committees-preview";
import { UpcomingEvents } from "@/components/home/upcoming-events";
import { MeetSenators } from "@/components/home/meet-senators";
import { GetInvolvedPaths } from "@/components/home/get-involved-paths";
import { committees } from "@/content/committees";
import { elected } from "@/content/people";
import { site } from "@/content/site";

// Upcoming events are computed from the current date at render time; refresh hourly.
export const revalidate = 3600;

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatStrip
        stats={[
          { value: 15000, suffix: "+", label: "students represented" },
          { value: committees.length, label: "committees" },
          { value: elected.length, label: "senators & officers" },
          { value: site.meeting.day, label: `open meetings, ${site.meeting.time}` },
        ]}
      />
      <WhatWeDo />
      <CommitteesPreview />
      <UpcomingEvents />
      <MeetSenators />
      <GetInvolvedPaths />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: site.fullName,
            alternateName: site.shortName,
            url: site.url,
            email: site.email,
            telephone: site.phone,
            parentOrganization: {
              "@type": "CollegeOrUniversity",
              name: "Montgomery College",
            },
            address: {
              "@type": "PostalAddress",
              streetAddress: `${site.office.street}, ${site.office.room}`,
              addressLocality: "Rockville",
              addressRegion: "MD",
              postalCode: "20850",
              addressCountry: "US",
            },
            sameAs: site.socials.map((s) => s.href),
          }),
        }}
      />
    </>
  );
}
