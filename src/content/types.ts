/**
 * Content types for the SGA Rockville site.
 * Every piece of site content is a typed TS module in `src/content/`.
 * A student officer can edit these files without touching components.
 *
 * Any string that starts with "TODO:" is treated as missing content:
 * it renders normally in production and shows an amber "Needs content"
 * chip in development so it is easy to spot.
 */

export type CommitteeCategory =
  "governance" | "finance" | "programming" | "advocacy" | "service";

export type CommitteeColor = "purple" | "blue" | "green" | "orange";

export type Committee = {
  slug: string;
  name: string;
  shortName?: string; // "SAB", "WDCE"
  tagline: string; // one line, YC-style
  description: string; // 2–4 paragraphs (markdown-lite: blank line = new paragraph)
  category: CommitteeCategory;
  openTo: "all-students" | "senators-only";
  chair?: string; // name or role e.g. "Treasurer"
  meets?: string; // "Mondays 4–6 PM, SV 104A" or "TBD"
  contact?: string; // email
  color: CommitteeColor;
  pills: string[]; // short tags shown in directory rows
  responsibilities: string[];
  howToJoin?: string;
  links?: { label: string; href: string }[];
  /** Set to true when the description is a draft an officer must confirm. */
  draft?: boolean;
};

export type Role =
  | "President"
  | "Vice President"
  | "Secretary"
  | "Treasurer"
  | "Senator-at-Large"
  | "Advisor";

export type Person = {
  slug: string;
  name: string;
  role: Role;
  committees: string[]; // committee slugs
  photo?: string; // /people/<slug>.jpg — falls back to an initials avatar
  major?: string;
  bio?: string;
  email?: string;
  /**
   * Role is inferred (e.g. from group membership) and not yet confirmed by an
   * officer. Shows a dev-only "Confirm role" chip; renders normally in production.
   */
  unconfirmed?: boolean;
};

export type EventType =
  "meeting" | "social" | "cultural" | "advocacy" | "service" | "tabling";

export type Event = {
  slug: string;
  title: string;
  start: string; // ISO 8601 with offset, e.g. "2026-11-20T19:00:00-05:00"
  end?: string;
  location: string;
  type: EventType;
  committee?: string; // committee slug
  description: string;
  rsvpUrl?: string;
  cover?: string;
  past?: boolean;
  /** Date is approximate (month known, day not confirmed). Shows "Date TBD". */
  approximate?: boolean;
  /** Recurring event. `start` is one real occurrence; the site expands forward from it. */
  recurring?: "weekly" | "biweekly";
  /** Who runs it when it is not SGA (e.g. "Office of Student Life"). */
  host?: string;
};

export type FAQCategory = "joining" | "meetings" | "funding" | "general";

export type FAQ = { q: string; a: string; category: FAQCategory };

export type ResourceLink = {
  title: string;
  description: string;
  href: string;
  category: "sga" | "student-life" | "campus" | "advocacy" | "forms";
  external?: boolean;
};
