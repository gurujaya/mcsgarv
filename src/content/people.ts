import type { Person, Role } from "./types";

/**
 * 2026–2027 Rockville SGA officers and senators.
 * Sources: montgomerycollege.edu SGA Rockville page, reconciled against the
 * SGA Rockville group membership (31 members) on 2026-10-27.
 *
 * To add a senator: append an object with a unique `slug`, the person's `name`,
 * and `role`. Add a square photo at /public/people/<slug>.jpg and set
 * `photo: "/people/<slug>.jpg"`; otherwise an initials avatar is used.
 *
 * Names marked `unconfirmed: true` need an officer to confirm the role.
 * TODO: add committee assignments for each senator (only Guru's and the
 *       Treasurer's Budget Panel seat are known).
 * TODO: add the SGA faculty/staff advisor (role: "Advisor").
 */
export const people: Person[] = [
  // Executive Board (group owners)
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

  // Senators-at-Large listed on the MC page and present in the SGA group
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
  // Group record: "Jalili, Amir Ali". MC page: "Amirali". Keeping the MC page form.
  {
    slug: "amirali-jalili",
    name: "Amirali Jalili",
    role: "Senator-at-Large",
    committees: [],
  },
  // Group record: "Kivembele, Edna". MC page: "EdnaJoan". Keeping the MC page form.
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
    slug: "paniz-salehi",
    name: "Paniz Salehi",
    role: "Senator-at-Large",
    committees: [],
  },
  // Group record spells it "Corrianne"; the MC page had "Corriane". Using the record.
  {
    slug: "corrianne-smith",
    name: "Corrianne Smith",
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

  // In the SGA group but not yet on the MC page (sworn in after it was updated).
  // Confirmed by Guru 2026-10-27: 30 senators and officers in total.
  {
    slug: "nila-amin",
    name: "Nila Amin",
    role: "Senator-at-Large",
    committees: [],
  },
  {
    slug: "advika-babu",
    name: "Advika Babu",
    role: "Senator-at-Large",
    committees: [],
  },
  {
    slug: "ana-bocachica",
    name: "Ana Bocachica",
    role: "Senator-at-Large",
    committees: [],
  },
  {
    slug: "nourhayet-chaherli",
    name: "Nourhayet Chaherli",
    role: "Senator-at-Large",
    committees: [],
  },
  {
    slug: "sahasra-chittampelli",
    name: "Sahasra Chittampelli",
    role: "Senator-at-Large",
    committees: [],
  },
  {
    slug: "samantha-melton",
    name: "Samantha Melton",
    role: "Senator-at-Large",
    committees: [],
  },
  {
    slug: "dana-narh",
    name: "Dana Narh",
    role: "Senator-at-Large",
    committees: [],
  },
  {
    slug: "khadija-saleck-ould-belkhair",
    name: "Khadija Saleck Ould Belkhair",
    role: "Senator-at-Large",
    committees: [],
  },
  {
    slug: "douglas-salerno",
    name: "Douglas Salerno",
    role: "Senator-at-Large",
    committees: [],
  },
  {
    slug: "eden-tenagashaw",
    name: "Eden Tenagashaw",
    role: "Senator-at-Large",
    committees: [],
  },

  // Advisor: Director of Student Life and an owner of the SGA group.
  // TODO: confirm "Advisor" is the right title to display.
  {
    slug: "lisa-hackley",
    name: "Lisa Hackley",
    role: "Advisor",
    committees: [],
    bio: "Director of Student Life",
    email: "stlifer@montgomerycollege.edu",
    unconfirmed: true,
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
export const advisors = people.filter((p) => p.role === "Advisor");
/** Elected members only (officers + senators), used for the public headcount. */
export const elected = people.filter((p) => p.role !== "Advisor");

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
