import type { Event, EventType } from "./types";

/**
 * SGA events: upcoming, recurring, and past.
 *
 * To add an event: append an object with a unique `slug`, an ISO `start`
 * with the Eastern offset (-04:00 in summer, -05:00 in winter), `location`,
 * `type`, and a short `description`. Add `cover: "/events/<slug>.jpg"` for a
 * photo in /public/events/. Set `past: true` when it has happened, or leave it
 * off and the site will sort it by date automatically.
 *
 * `approximate: true` means the month is known but the day is not confirmed.
 * `recurring: "weekly"` or `"biweekly"` expands the event forward from `start`
 * (which must be a real occurrence; for biweekly it fixes the cycle).
 *
 * TODO: add Fall 2026 events from the SGA Instagram (Desi After Dark, etc.)
 *       with dates and covers.
 */
export const events: Event[] = [
  // ---- Recurring --------------------------------------------------------
  {
    slug: "sga-open-meeting",
    title: "SGA Open Meeting",
    // start = a real meeting Monday; the cycle repeats every two weeks from it.
    // TODO: confirm the anchor (see site.ts → meeting.anchor).
    start: "2026-10-26T16:00:00-04:00",
    end: "2026-10-26T18:00:00-04:00",
    location: "Office of Student Life, SV 104A",
    type: "meeting",
    recurring: "biweekly",
    description:
      "The SGA open meeting, every other Monday, is open to every Rockville student. Hear what senators are working on, raise a concern during open floor, and see how decisions get made. No sign-up needed. Just walk in.",
  },
  {
    slug: "connect-over-coffee",
    title: "Connect Over Coffee",
    start: "2026-09-01T10:00:00-04:00",
    end: "2026-09-01T12:00:00-04:00",
    location: "Office of Student Life, SV 104",
    type: "social",
    recurring: "weekly",
    host: "Office of Student Life",
    description:
      "Free coffee and conversation every Tuesday morning in Student Life. Meet staff, senators, and other students between classes.",
  },

  // ---- Upcoming (Fall 2026 / Spring 2027) --------------------------------
  {
    slug: "international-education-week-2026",
    title: "International Education Week",
    start: "2026-11-16T10:00:00-05:00",
    end: "2026-11-20T16:00:00-05:00",
    location: "SV Atrium and campus-wide",
    type: "cultural",
    approximate: true,
    description:
      "A week of cultural showcases, food, and conversation celebrating the countries and languages represented on the Rockville Campus. TODO: confirm the 2026 schedule and daily events.",
  },
  {
    slug: "international-ball-2026",
    title: "International Ball",
    start: "2026-11-20T18:00:00-05:00",
    end: "2026-11-20T22:00:00-05:00",
    location: "TODO: confirm venue",
    type: "social",
    committee: "sab",
    description:
      "The Fall 2026 International Ball closes out International Education Week with music, food, and dancing from around the world. Dress up and bring friends. TODO: confirm time, venue, tickets, and add the cover image from Instagram.",
  },
  {
    slug: "desi-after-dark-2026",
    title: "Desi After Dark",
    start: "2026-11-06T18:00:00-05:00",
    location: "TODO: confirm venue",
    type: "cultural",
    approximate: true,
    description:
      "An evening of South Asian music, dance, and food on campus. TODO: confirm date, time, venue, and host club, and add the cover image from Instagram.",
  },
  {
    slug: "student-advocacy-day-2027",
    title: "Student Advocacy Day in Annapolis",
    start: "2027-02-10T08:00:00-05:00",
    end: "2027-02-10T16:00:00-05:00",
    location: "Maryland State House, Annapolis (bus from Rockville)",
    type: "advocacy",
    approximate: true,
    description:
      "Every February, students from all 16 Maryland community colleges travel to Annapolis to meet legislators. MC students make the case for affordable tuition and campus investments. In 2024 MC's asks included affordable tuition, a Germantown student services center, and renovating the Rockville library. TODO: confirm the 2027 date and sign-up link.",
  },
  {
    slug: "club-rush-spring-2027",
    title: "Club Rush — Spring 2027",
    start: "2027-02-04T12:00:00-05:00",
    end: "2027-02-04T14:00:00-05:00",
    location: "The Quad (rain location: Small Gym, PE 137A)",
    type: "tabling",
    committee: "public-outreach",
    approximate: true,
    description:
      "Meet every club on campus in one place. SGA tables at Club Rush each semester to recruit senators and committee members. TODO: confirm the Spring 2027 date.",
  },

  // ---- Past -------------------------------------------------------------
  {
    slug: "club-rush-fall-2026",
    title: "Club Rush — Fall 2026",
    start: "2026-09-24T12:00:00-04:00",
    end: "2026-09-24T14:00:00-04:00",
    location: "The Quad (rain location: Small Gym, PE 137A)",
    type: "tabling",
    committee: "public-outreach",
    approximate: true,
    past: true,
    description:
      "SGA's table at Fall 2026 Club Rush, where new students met senators and signed up for committees. TODO: confirm the exact Fall 2026 date and add photos.",
  },
  {
    slug: "hispanic-heritage-month-2026",
    title: "Hispanic Heritage Month",
    start: "2026-09-15T12:00:00-04:00",
    end: "2026-10-15T14:00:00-04:00",
    location: "SV Atrium",
    type: "cultural",
    past: true,
    description:
      "A month of events in the SV Atrium celebrating Hispanic and Latino culture on campus, from music and food to student panels.",
  },
  {
    slug: "volunteer-fair-2026",
    title: "Volunteer Fair",
    start: "2026-10-06T11:00:00-04:00",
    end: "2026-10-06T14:00:00-04:00",
    location: "SV Atrium",
    type: "service",
    committee: "community-service",
    approximate: true,
    past: true,
    description:
      "Local nonprofits and campus service programs recruit student volunteers. The fair is held in early October each year (October 6 in 2025). TODO: confirm the 2026 date.",
  },
  {
    slug: "mcs-got-talent-2026",
    title: "MC's Got Talent Show",
    start: "2026-03-26T18:00:00-04:00",
    end: "2026-03-26T20:30:00-04:00",
    location: "Robert E. Parilla Performing Arts Center (PA Building)",
    type: "social",
    past: true,
    description:
      "Presented by the Rockville SGA: singers, dancers, poets, and bands from across the Rockville Campus competing on the Parilla stage.",
  },
  {
    slug: "student-advocacy-day-2026",
    title: "Student Advocacy Day in Annapolis",
    start: "2026-02-11T08:00:00-05:00",
    end: "2026-02-11T16:00:00-05:00",
    location: "Maryland State House, Annapolis",
    type: "advocacy",
    approximate: true,
    past: true,
    description:
      "MC students joined peers from all 16 Maryland community colleges to meet legislators about tuition affordability and campus investments.",
  },
  {
    slug: "international-education-week-2025",
    title: "International Education Week",
    start: "2025-11-17T10:00:00-05:00",
    end: "2025-11-21T16:00:00-05:00",
    location: "SV Atrium and campus-wide",
    type: "cultural",
    approximate: true,
    past: true,
    description:
      "A week of cultural showcases and conversation celebrating the countries and languages represented on the Rockville Campus.",
  },
  {
    slug: "volunteer-fair-2025",
    title: "Volunteer Fair",
    start: "2025-10-06T11:00:00-04:00",
    end: "2025-10-06T14:00:00-04:00",
    location: "SV Atrium",
    type: "service",
    committee: "community-service",
    past: true,
    description:
      "Local nonprofits and campus service programs recruited student volunteers for the year ahead.",
  },
  {
    slug: "club-rush-fall-2025",
    title: "Club Rush — Fall 2025",
    start: "2025-09-25T12:00:00-04:00",
    end: "2025-09-25T14:00:00-04:00",
    location: "The Quad (rain location: Small Gym, PE 137A)",
    type: "tabling",
    committee: "public-outreach",
    past: true,
    description:
      "Every club on campus in one place on the Quad. SGA tabled to recruit senators and committee members for the 2025–26 year.",
  },
  {
    slug: "hispanic-heritage-month-2025",
    title: "Hispanic Heritage Month",
    start: "2025-09-15T12:00:00-04:00",
    end: "2025-10-15T14:00:00-04:00",
    location: "SV Atrium",
    type: "cultural",
    past: true,
    description:
      "A month of events in the SV Atrium celebrating Hispanic and Latino culture on campus.",
  },
];

export const eventTypes: Record<EventType, string> = {
  meeting: "Meeting",
  social: "Social",
  cultural: "Cultural",
  advocacy: "Advocacy",
  service: "Service",
  tabling: "Tabling",
};

export function getEvent(slug: string): Event | undefined {
  return events.find((e) => e.slug === slug);
}
