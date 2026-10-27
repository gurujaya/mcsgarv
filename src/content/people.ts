import type { Person, Role } from "./types";

/**
 * 2026–2027 Rockville SGA officers and senators.
 * Source: montgomerycollege.edu SGA Rockville page.
 *
 * To add a senator: append an object with a unique `slug`, the person's `name`,
 * and `role`. Add a square photo at /public/people/<slug>.jpg and set
 * `photo: "/people/<slug>.jpg"`; otherwise an initials avatar is used.
 *
 * TODO: verify spelling against the official roster before launch.
 * TODO: add senators sworn in after the MC page was last updated.
 * TODO: add committee assignments for each senator (only Guru's and the
 *       Treasurer's Budget Panel seat are known).
 * TODO: add the SGA faculty/staff advisor (role: "Advisor").
 */
export const people: Person[] = [
  // Executive Board
  {
    slug: "lizelle-rodriguez",
    name: "Lizelle Rodriguez",
    role: "President",
    committees: [],
  },
  {
    slug: "anthony-rivera",
    name: "Anthony Rivera",
    role: "Vice President",
    committees: [],
  },
  { slug: "mahdiul-mahdi", name: "Mahdiul Mahdi", role: "Secretary", committees: [] },
  {
    slug: "nadia-omer",
    name: "Nadia Omer",
    role: "Treasurer",
    committees: ["budget-panel"],
  },

  // Senators-at-Large
  {
    slug: "tanzeel-agarib",
    name: "Tanzeel Agarib",
    role: "Senator-at-Large",
    committees: [],
  },
  {
    slug: "lina-ben-younes",
    name: "Lina Ben Younes",
    role: "Senator-at-Large",
    committees: [],
  },
  {
    slug: "chamod-ekanayake",
    name: "Chamod Ekanayake",
    role: "Senator-at-Large",
    committees: [],
  },
  {
    slug: "amirali-jalili",
    name: "Amirali Jalili",
    role: "Senator-at-Large",
    committees: [],
  },
  {
    slug: "ednajoan-kivembele",
    name: "EdnaJoan Kivembele",
    role: "Senator-at-Large",
    committees: [],
  },
  {
    slug: "tania-marquina",
    name: "Tania Marquina",
    role: "Senator-at-Large",
    committees: [],
  },
  { slug: "eaindra-mon", name: "Eaindra Mon", role: "Senator-at-Large", committees: [] },
  {
    slug: "haressh-nair",
    name: "Haressh Nair",
    role: "Senator-at-Large",
    committees: [],
  },
  {
    slug: "jesse-odhiambo",
    name: "Jesse Odhiambo",
    role: "Senator-at-Large",
    committees: [],
  },
  {
    slug: "joshua-oyeneyin",
    name: "Joshua Oyeneyin",
    role: "Senator-at-Large",
    committees: [],
  },
  {
    slug: "gabriele-pastore",
    name: "Gabriele Pastore",
    role: "Senator-at-Large",
    committees: [],
  },
  {
    slug: "paniz-salehi",
    name: "Paniz Salehi",
    role: "Senator-at-Large",
    committees: [],
  },
  {
    slug: "corriane-smith",
    name: "Corriane Smith",
    role: "Senator-at-Large",
    committees: [],
  },
  {
    slug: "muhammad-tayyab",
    name: "Muhammad Tayyab",
    role: "Senator-at-Large",
    committees: [],
  },
  {
    slug: "akhyan-tamang",
    name: "Akhyan Tamang",
    role: "Senator-at-Large",
    committees: [],
  },
  {
    slug: "joselyn-ulloa",
    name: "Joselyn Ulloa",
    role: "Senator-at-Large",
    committees: [],
  },
  {
    slug: "guru-jayaprakash",
    name: "Guruprasath (Guru) Jayaprakash",
    role: "Senator-at-Large",
    committees: ["public-outreach"],
  },
];

export const roleOrder: Role[] = [
  "President",
  "Vice President",
  "Secretary",
  "Treasurer",
  "Senator-at-Large",
  "Advisor",
];

export const officers = people.filter(
  (p) => p.role !== "Senator-at-Large" && p.role !== "Advisor",
);
export const senators = people.filter((p) => p.role === "Senator-at-Large");

export function getPerson(slug: string): Person | undefined {
  return people.find((p) => p.slug === slug);
}

export function initials(name: string): string {
  const clean = name.replace(/\(.*?\)/g, "").trim();
  const parts = clean.split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? (parts[parts.length - 1]?.[0] ?? "") : "";
  return (first + last).toUpperCase();
}
