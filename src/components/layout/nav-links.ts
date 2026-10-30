import { committees } from "@/content/committees";

export type NavChild = {
  label: string;
  href: string;
  /** Short form shown after the name, e.g. "SAB". */
  abbr?: string;
  description?: string;
  /** One-line fact set apart from the description, e.g. who may join. */
  note?: string;
};

export type NavItem = {
  label: string;
  href: string;
  /** Sentence shown beside the drawer grid. Facts only. */
  blurb?: string;
  children?: NavChild[];
};

export const navItems: NavItem[] = [
  { label: "About", href: "/about" },
  {
    label: "Committees",
    href: "/committees",
    blurb:
      "Seven committees carry the SGA's work between meetings. Senators sit on each one. The Student Activities Board also seats any Rockville student.",
    children: committees.map((c) => ({
      label: c.name,
      abbr: c.shortName && !c.name.includes(c.shortName) ? c.shortName : undefined,
      href: `/committees/${c.slug}`,
      description: c.tagline,
      note: c.openTo === "all-students" ? "Open to every Rockville student" : undefined,
    })),
  },
  { label: "Senators", href: "/senators" },
  { label: "Events", href: "/events" },
  { label: "Get involved", href: "/get-involved" },
  {
    label: "Resources",
    href: "/resources",
    blurb: "Funding rules, the constitution, campus forms, and the people to reach.",
    children: [
      { label: "Club funding", href: "/funding", description: "How the Budget Panel works" },
      {
        label: "Resources and links",
        href: "/resources",
        description: "Student Life, forms, campus services",
      },
      { label: "FAQ", href: "/faq", description: "Meetings, joining, funding" },
      { label: "Constitution", href: "/constitution", description: "The governing document" },
      { label: "Contact", href: "/contact", description: "Office, email, open meeting" },
    ],
  },
];

/** Flat list for the footer and mobile menu. */
export const navLinks = navItems.map(({ label, href }) => ({ label, href }));
export const secondaryLinks = [
  { label: "Funding", href: "/funding" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
  { label: "Constitution", href: "/constitution" },
] as const;
