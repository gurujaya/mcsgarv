/**
 * Site-wide facts: contact info, socials, meeting time.
 * Change these here and they update everywhere (header, footer, contact page,
 * FAQ, structured data).
 */
export const site = {
  name: "SGA Rockville",
  fullName: "Montgomery College Rockville Student Government Association",
  shortName: "MC Rockville SGA",
  tagline: "The official voice of every Rockville student.",
  description:
    "The Student Government Association is the official representative body for all students on the Montgomery College Rockville Campus. We represent you to College leadership, fund your clubs, and build the events that make campus feel like a community.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://sgarv.vercel.app",
  campus: "Rockville Campus",
  college: "Montgomery College",

  office: {
    // decision: the MC website lists the SGA inside the Office of Student Life,
    // SV 104A. The @mcsgarv X profile lists SV 007 / SV 007G.
    // TODO: confirm which room is current and update `room` below.
    room: "SV 104A",
    building: "Long Nguyen and Kimmy Duong Student Services Center (SV)",
    within: "Office of Student Life",
    street: "51 Mannakee Street",
    city: "Rockville, MD 20850",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=51+Mannakee+Street+Rockville+MD+20850",
    mapsEmbedUrl:
      "https://www.google.com/maps?q=Montgomery+College+Student+Services+Center,+51+Mannakee+St,+Rockville,+MD+20850&output=embed",
  },

  email: "sgarv@montgomerycollege.edu",
  senatorInquiriesEmail: "mcrvsga@gmail.com",
  phone: "240-567-7177",
  phoneHref: "tel:+12405677177",

  meeting: {
    label: "Open meetings every other Monday",
    /** Short form for headers and footers. */
    short: "Every other Monday, 4:00–6:00 PM",
    cadence: "biweekly" as const,
    /**
     * A real meeting Monday that fixes the two-week cycle (ISO date, Eastern).
     * TODO: confirm this anchor; if the next meeting is Nov 2 rather than Nov 9,
     * change it to "2026-10-19".
     */
    anchor: "2026-10-26",
    day: "Monday",
    time: "4:00–6:00 PM",
    location: "Office of Student Life, SV 104A",
    note: "All students are welcome. No sign-up needed.",
  },

  studentLife: {
    name: "Office of Student Life",
    room: "SV 104",
    phone: "240-567-5092",
    phoneHref: "tel:+12405675092",
    email: "stlifer@montgomerycollege.edu",
    hours: "Mon–Fri, 8:30 AM–5:00 PM",
    director: "Lisa Hackley",
    url: "https://www.montgomerycollege.edu/life-at-mc/student-life/index.html",
  },

  sab: {
    email: "RVSAB@montgomerycollege.edu",
    // TODO: paste the SAB application form link.
    applicationUrl: "TODO:",
    // TODO: paste the SAB WhatsApp group invite link.
    whatsappUrl: "TODO:",
  },

  socials: [
    {
      label: "Instagram",
      handle: "TODO: confirm handle",
      href: "https://linktr.ee/sgarv",
      kind: "instagram",
    },
    { label: "X", handle: "@mcsgarv", href: "https://x.com/mcsgarv", kind: "x" },
    {
      label: "TikTok",
      handle: "TODO: confirm handle",
      href: "https://linktr.ee/sgarv",
      kind: "tiktok",
    },
    {
      label: "Linktree",
      handle: "linktr.ee/sgarv",
      href: "https://linktr.ee/sgarv",
      kind: "link",
    },
  ] as const,

  mcSgaPageUrl:
    "https://www.montgomerycollege.edu/life-at-mc/student-life/student-government-association/rockville.html",

  // Primary CTAs
  applyUrl: "/get-involved#senator",
  fundingUrl: "/funding",

  stats: {
    studentsRepresented: "15,000+",
    clubs: "130+",
  },

  term: "2026–2027",
} as const;

export type SocialKind = (typeof site.socials)[number]["kind"];
