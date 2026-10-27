import { committees } from "@/content/committees";
import { people } from "@/content/people";
import { events } from "@/content/events";
import { faq } from "@/content/faq";
import { resources } from "@/content/resources";

export type SearchKind = "page" | "committee" | "person" | "event" | "faq" | "resource";

export type SearchItem = {
  id: string;
  kind: SearchKind;
  title: string;
  subtitle?: string;
  href: string;
  keywords?: string;
};

const pages: SearchItem[] = [
  { id: "page-home", kind: "page", title: "Home", href: "/" },
  {
    id: "page-about",
    kind: "page",
    title: "About SGA",
    subtitle: "Mission, responsibilities, history",
    href: "/about",
  },
  {
    id: "page-committees",
    kind: "page",
    title: "Committees",
    subtitle: "All seven committees",
    href: "/committees",
  },
  { id: "page-senators", kind: "page", title: "Senators & Officers", href: "/senators" },
  {
    id: "page-events",
    kind: "page",
    title: "Events",
    subtitle: "Upcoming and past",
    href: "/events",
  },
  {
    id: "page-get-involved",
    kind: "page",
    title: "Get Involved",
    subtitle: "Senator-at-Large, SAB, committees",
    href: "/get-involved",
  },
  {
    id: "page-funding",
    kind: "page",
    title: "Club Funding",
    subtitle: "Budget Panel requests",
    href: "/funding",
  },
  { id: "page-resources", kind: "page", title: "Resources", href: "/resources" },
  { id: "page-faq", kind: "page", title: "FAQ", href: "/faq" },
  {
    id: "page-contact",
    kind: "page",
    title: "Contact",
    subtitle: "Office, email, open meeting",
    href: "/contact",
  },
  { id: "page-constitution", kind: "page", title: "Constitution", href: "/constitution" },
];

/** Builds the static search index. Used at build time by scripts/build-search-index.ts. */
export function buildSearchIndex(): SearchItem[] {
  return [
    ...pages,
    ...committees.map<SearchItem>((c) => ({
      id: `committee-${c.slug}`,
      kind: "committee",
      title: c.shortName ? `${c.name} (${c.shortName})` : c.name,
      subtitle: c.tagline,
      href: `/committees/${c.slug}`,
      keywords: [c.category, ...c.pills].join(" "),
    })),
    ...people.map<SearchItem>((p) => ({
      id: `person-${p.slug}`,
      kind: "person",
      title: p.name,
      subtitle: p.role,
      href: `/senators?q=${encodeURIComponent(p.name.split(" ")[0] ?? p.name)}`,
      keywords: p.committees.join(" "),
    })),
    ...events
      .filter((e) => !e.recurring || e.slug === "sga-open-meeting")
      .map<SearchItem>((e) => ({
        id: `event-${e.slug}`,
        kind: "event",
        title: e.title,
        subtitle: e.location,
        href: `/events#${e.slug}`,
        keywords: e.type,
      })),
    ...faq.map<SearchItem>((f, i) => ({
      id: `faq-${i}`,
      kind: "faq",
      title: f.q,
      subtitle: f.a.slice(0, 90) + (f.a.length > 90 ? "…" : ""),
      href: `/faq#q-${i}`,
      keywords: f.category,
    })),
    ...resources.map<SearchItem>((r, i) => ({
      id: `resource-${i}`,
      kind: "resource",
      title: r.title,
      subtitle: r.description,
      href: r.href,
      keywords: r.category,
    })),
  ];
}
