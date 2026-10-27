import { committees } from "@/content/committees";

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string; description?: string }[];
};

export const navItems: NavItem[] = [
  { label: "About", href: "/about" },
  {
    label: "Committees",
    href: "/committees",
    children: committees.map((c) => ({
      label: c.shortName ? `${c.name} (${c.shortName})` : c.name,
      href: `/committees/${c.slug}`,
      description: c.tagline,
    })),
  },
  { label: "Senators", href: "/senators" },
  { label: "Events", href: "/events" },
  { label: "Get Involved", href: "/get-involved" },
  {
    label: "Resources",
    href: "/resources",
    children: [
      {
        label: "Club funding",
        href: "/funding",
        description: "How the Budget Panel works",
      },
      {
        label: "Resources & links",
        href: "/resources",
        description: "Student Life, forms, campus services",
      },
      { label: "FAQ", href: "/faq", description: "Meetings, joining, funding" },
      {
        label: "Constitution",
        href: "/constitution",
        description: "The governing document",
      },
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
