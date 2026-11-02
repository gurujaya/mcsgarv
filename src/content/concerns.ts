import type { Concern, ConcernCategory, ConcernStatus } from "./types";

/**
 * The public concern board. Every entry here is visible to anyone on /concerns.
 *
 * How to log one: when a concern comes in (the form, email, or open floor at a
 * meeting), add an entry at the TOP of the list with status "received". As it
 * moves, change `status`, set `committee` or `senator`, and append a dated
 * note to `updates`. Write notes in plain words a student would understand.
 *
 * Keep students' names, emails, and anything identifying out of this file.
 * It is a public record of what SGA is doing, not of who asked.
 *
 * Example entry (copy, uncomment, and edit):
 *
 * {
 *   id: "2026-001",
 *   title: "No microwave in the Science Center for commuter students",
 *   category: "facilities",
 *   status: "in-progress",
 *   raised: "2026-10-14",
 *   committee: "food",
 *   updates: [
 *     { date: "2026-10-14", note: "Logged from the open floor at the Oct 14 meeting." },
 *     { date: "2026-10-28", note: "Food Committee asked Student Life about a microwave in SC 106." },
 *   ],
 * },
 */
export const concerns: Concern[] = [];

export const concernStatuses: Record<
  ConcernStatus,
  { label: string; description: string }
> = {
  received: {
    label: "Received",
    description: "Logged by the Secretary. Not yet assigned.",
  },
  "in-progress": {
    label: "In progress",
    description: "A committee or senator has taken it on.",
  },
  resolved: {
    label: "Resolved",
    description: "Something changed. The last note says what.",
  },
  closed: {
    label: "Closed",
    description: "SGA could not change it. The last note says why.",
  },
};

export const statusOrder: ConcernStatus[] = [
  "received",
  "in-progress",
  "resolved",
  "closed",
];

export const concernCategories: Record<ConcernCategory, string> = {
  dining: "Dining",
  safety: "Safety",
  facilities: "Facilities",
  parking: "Parking and transit",
  academics: "Classes and academics",
  accessibility: "Accessibility",
  policy: "College policy",
  events: "Events and clubs",
  other: "Something else",
};
