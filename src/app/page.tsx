import { Hero } from "@/components/landing/hero";
import { Intro } from "@/components/landing/intro";
import { WhatWeDo } from "@/components/landing/what-we-do";
import { CampusLife } from "@/components/landing/campus-life";
import { MeetingBand } from "@/components/landing/meeting-band";
import { CommitteesIndex } from "@/components/landing/committees-index";
import { NextEvents } from "@/components/landing/next-events";
import { site } from "@/content/site";

// Upcoming events are computed from the current date at render time; refresh hourly.
export const revalidate = 3600;

export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <WhatWeDo />
      <CommitteesIndex />
      <CampusLife />
      <MeetingBand />
      <NextEvents />
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
