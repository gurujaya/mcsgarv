import type { ResourceLink } from "./types";

/**
 * Links shown on /resources. Add a link by appending an object.
 * Mark `external: true` for anything that leaves this site.
 */
export const resources: ResourceLink[] = [
  // SGA
  {
    category: "sga",
    title: "SGA on montgomerycollege.edu",
    description:
      "The official College page for the Rockville SGA, including the current roster.",
    href: "https://www.montgomerycollege.edu/life-at-mc/student-life/student-government-association/rockville.html",
    external: true,
  },
  {
    category: "sga",
    title: "SGA Constitution",
    description: "The governing document for the Rockville SGA.",
    href: "/constitution",
  },
  {
    category: "sga",
    title: "Request club funding",
    description: "How the Budget Panel works and how to submit a request.",
    href: "/funding",
  },
  {
    category: "sga",
    title: "SGA Linktree",
    description: "Every SGA link in one place: socials, forms, and current campaigns.",
    href: "https://linktr.ee/sgarv",
    external: true,
  },

  // Student Life
  {
    category: "student-life",
    title: "Office of Student Life",
    description:
      "Clubs, leadership programs, events, and the people who make campus life happen. SV 104.",
    href: "https://www.montgomerycollege.edu/life-at-mc/student-life/index.html",
    external: true,
  },
  {
    category: "student-life",
    title: "Student clubs and organizations",
    description: "Browse the 130+ clubs on campus and learn how to start a new one.",
    href: "https://www.montgomerycollege.edu/life-at-mc/student-life/clubs-and-organizations/index.html",
    external: true,
  },
  {
    category: "student-life",
    title: "Club Handbook",
    description:
      "Rules for recognized clubs, including how to propose initiatives through SGA.",
    href: "TODO:",
    external: true,
  },
  {
    category: "student-life",
    title: "Student Activities Board (SAB)",
    description:
      "Join the student-run board that plans campus events. Rolling applications.",
    href: "/committees/sab",
  },

  // Campus
  {
    category: "campus",
    title: "Campus food pantry",
    description: "Free food for MC students. No questions asked.",
    href: "TODO:",
    external: true,
  },
  {
    category: "campus",
    title: "Counseling and advising",
    description: "Academic advising, personal counseling, and career planning.",
    href: "https://www.montgomerycollege.edu/counseling-and-advising/index.html",
    external: true,
  },
  {
    category: "campus",
    title: "Disability Support Services",
    description: "Accommodations and support for students with disabilities.",
    href: "https://www.montgomerycollege.edu/academics/support/disability-support-services/index.html",
    external: true,
  },
  {
    category: "campus",
    title: "Campus safety and security",
    description: "Emergency numbers, escorts, and how to report an incident.",
    href: "https://www.montgomerycollege.edu/offices/public-safety-and-emergency-management/index.html",
    external: true,
  },
  {
    category: "campus",
    title: "Service-Learning & Civic Engagement",
    description:
      "Volunteer opportunities and service hours. Partner office for our Community Service Committee.",
    href: "TODO:",
    external: true,
  },

  // Advocacy
  {
    category: "advocacy",
    title: "Student Advocacy Day",
    description:
      "Every February in Annapolis. Students from all 16 Maryland community colleges meet legislators.",
    href: "/events?type=advocacy",
  },
  {
    category: "advocacy",
    title: "Maryland Association of Community Colleges",
    description: "The statewide association behind Student Advocacy Day.",
    href: "https://mdacc.org/",
    external: true,
  },

  // Forms
  {
    category: "forms",
    title: "Senator-at-Large application",
    description: "Turn in a completed application to the Office of Student Life.",
    href: "TODO:",
    external: true,
  },
  {
    category: "forms",
    title: "SAB application form",
    description: "Apply to the Student Activities Board. Accepted year-round.",
    href: "TODO:",
    external: true,
  },
  {
    category: "forms",
    title: "Club funding request",
    description: "Submit a Budget Panel request for your club's event.",
    href: "/funding#request",
  },
];

export const resourceCategories: Record<ResourceLink["category"], string> = {
  sga: "SGA",
  "student-life": "Student Life",
  campus: "Campus resources",
  advocacy: "Advocacy",
  forms: "Forms",
};
