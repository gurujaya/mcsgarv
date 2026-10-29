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
    photo: "/people/lizelle-rodriguez.jpg",
    name: "Lizelle Rodriguez",
    role: "President",
    committees: [],
  },
  {
    slug: "anthony-rivera",
    photo: "/people/anthony-rivera.jpg",
    name: "Anthony Rivera",
    role: "Vice President",
    committees: [],
  },
  {
    slug: "mahdiul-mahdi",
    photo: "/people/mahdiul-mahdi.jpg",
    name: "Mahdiul Mahdi",
    role: "Secretary",
    committees: [],
  },
  {
    slug: "nadia-omer",
    photo: "/people/nadia-omer.jpg",
    name: "Nadia Omer",
    role: "Treasurer",
    committees: ["budget-panel"],
  },

  // Senators-at-Large listed on the MC page and present in the SGA group
  {
    slug: "tanzeel-agarib",
    photo: "/people/tanzeel-agarib.jpg",
    name: "Tanzeel Agarib",
    role: "Senator-at-Large",
    committees: [],
  },
  {
    slug: "lina-ben-younes",
    photo: "/people/lina-ben-younes.jpg",
    name: "Lina Ben Younes",
    role: "Senator-at-Large",
    committees: [],
  },
  {
    slug: "chamod-ekanayake",
    photo: "/people/chamod-ekanayake.jpg",
    name: "Chamod Ekanayake",
    role: "Senator-at-Large",
    committees: [],
  },
  // Group record: "Jalili, Amir Ali". MC page: "Amirali". Keeping the MC page form.
  {
    slug: "amirali-jalili",
    photo: "/people/amirali-jalili.jpg",
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
    photo: "/people/tania-marquina.jpg",
    name: "Tania Marquina",
    role: "Senator-at-Large",
    committees: [],
  },
  {
    slug: "eaindra-mon",
    photo: "/people/eaindra-mon.jpg",
    name: "Eaindra Mon",
    role: "Senator-at-Large",
    committees: [],
  },
  {
    slug: "haressh-nair",
    photo: "/people/haressh-nair.jpg",
    name: "Haressh Nair",
    role: "Senator-at-Large",
    committees: [],
  },
  {
    slug: "jesse-odhiambo",
    photo: "/people/jesse-odhiambo.jpg",
    name: "Jesse Odhiambo",
    role: "Senator-at-Large",
    committees: [],
  },
  {
    slug: "joshua-oyeneyin",
    photo: "/people/joshua-oyeneyin.jpg",
    name: "Joshua Oyeneyin",
    role: "Senator-at-Large",
    committees: [],
  },
  {
    slug: "paniz-salehi",
    photo: "/people/paniz-salehi.jpg",
    name: "Paniz Salehi",
    role: "Senator-at-Large",
    committees: [],
  },
  // Group record spells it "Corrianne"; the MC page had "Corriane". Using the record.
  {
    slug: "corrianne-smith",
    photo: "/people/corrianne-smith.jpg",
    name: "Corrianne Smith",
    role: "Senator-at-Large",
    committees: [],
  },
  {
    slug: "muhammad-tayyab",
    photo: "/people/muhammad-tayyab.jpg",
    name: "Muhammad Tayyab",
    role: "Senator-at-Large",
    committees: [],
  },
  {
    slug: "akhyan-tamang",
    photo: "/people/akhyan-tamang.jpg",
    name: "Akhyan Tamang",
    role: "Senator-at-Large",
    committees: [],
  },
  {
    slug: "joselyn-ulloa",
    photo: "/people/joselyn-ulloa.jpg",
    name: "Joselyn Ulloa",
    role: "Senator-at-Large",
    committees: [],
  },
  {
    slug: "guru-jayaprakash",
    photo: "/people/guru-jayaprakash.jpg",
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
    photo: "/people/advika-babu.jpg",
    name: "Advika Babu",
    role: "Senator-at-Large",
    committees: [],
  },
  {
    slug: "ana-bocachica",
    photo: "/people/ana-bocachica.jpg",
    name: "Ana Bocachica",
    role: "Senator-at-Large",
    committees: [],
  },
  {
    slug: "nourhayet-chaherli",
    photo: "/people/nourhayet-chaherli.jpg",
    name: "Nourhayet Chaherli",
    role: "Senator-at-Large",
    committees: [],
  },
  {
    slug: "sahasra-chittampelli",
    photo: "/people/sahasra-chittampelli.jpg",
    name: "Sahasra Chittampelli",
    role: "Senator-at-Large",
    committees: [],
  },
  {
    slug: "samantha-melton",
    photo: "/people/samantha-melton.jpg",
    name: "Samantha Melton",
    role: "Senator-at-Large",
    committees: [],
  },
  {
    slug: "dana-narh",
    photo: "/people/dana-narh.jpg",
    name: "Dana Narh",
    role: "Senator-at-Large",
    committees: [],
  },
  {
    slug: "khadija-saleck-ould-belkhair",
    photo: "/people/khadija-saleck-ould-belkhair.jpg",
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
    photo: "/people/eden-tenagashaw.jpg",
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
