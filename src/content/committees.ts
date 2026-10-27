import type { Committee } from "./types";

/**
 * All SGA Rockville committees.
 *
 * To add a committee: copy an object, give it a unique `slug` (used in the URL
 * /committees/<slug>), and fill the fields. Set `draft: true` while the
 * description is unconfirmed; it renders a "Draft — officer to confirm" note
 * in development only.
 */
export const committees: Committee[] = [
  {
    slug: "budget-panel",
    name: "Budget Panel",
    tagline:
      "Reviews every club funding request so student activity fees reach students.",
    description: `The Budget Panel is how student activity fees turn into events. Chaired by the SGA Treasurer and made up of senators, the panel reviews funding requests from recognized student clubs and organizations.

Each request is evaluated on whether it promotes student engagement, strengthens the campus community, and how the proposed event benefits the student body. Approved requests are forwarded to the Office of Student Life for processing.

If your club needs money for an event, start on the Funding page. The panel meets as requests come in during the semester.`,
    category: "finance",
    openTo: "senators-only",
    chair: "Treasurer",
    meets:
      "During the SGA meeting block (every other Monday, 4–6 PM) as requests come in",
    contact: "sgarv@montgomerycollege.edu",
    color: "purple",
    pills: ["Finance", "Treasurer-chaired"],
    responsibilities: [
      "Review club and organization funding requests",
      "Evaluate whether a proposed event promotes student engagement and strengthens campus community",
      "Assess how an event benefits the student body before recommending funds",
      "Recommend financial expenditures for student activities to the SGA",
      "Keep a transparent record of what was funded and why",
    ],
    howToJoin:
      "The Budget Panel is made up of the Treasurer and current senators. Become a Senator-at-Large to serve on it.",
    links: [{ label: "Request funding for your club", href: "/funding" }],
  },
  {
    slug: "community-service",
    name: "Community Service",
    tagline: "Volunteer drives, food-pantry support, and service partnerships on campus.",
    description: `The Community Service Committee organizes the ways SGA gives back: volunteer drives, seasonal collections like toy drives run with Student Life, and ongoing support for the campus food pantry.

The committee partners with MC's Service-Learning and Civic Engagement office so that student volunteers can find opportunities that count toward service hours and connect to the wider Rockville community.

The committee is staffed by senators. If you want to help organize drives, run for a seat; if you just want to volunteer at one, watch the Events page.`,
    category: "service",
    openTo: "senators-only",
    meets: "TODO: confirm meeting time",
    contact: "sgarv@montgomerycollege.edu",
    color: "green",
    pills: ["Service"],
    responsibilities: [
      "Plan volunteer drives and seasonal collections (e.g., toy drives with Student Life)",
      "Support the campus food pantry with volunteers and donation pushes",
      "Partner with Service-Learning & Civic Engagement (Libby McClayton) on service opportunities",
      "Promote the annual Volunteer Fair and other service events",
    ],
    howToJoin:
      "Senators only. Become a Senator-at-Large to serve. Volunteer opportunities the committee organizes are open to everyone and listed on the Events page.",
    draft: true,
  },
  {
    slug: "ethics",
    name: "Ethics Committee",
    tagline: "Upholds the SGA constitution, senator conduct, and accountability.",
    description: `The Ethics Committee keeps SGA honest. It upholds the SGA constitution and the conduct standards that senators agree to when they take office.

In practice this means tracking attendance, handling accountability when a senator is not meeting expectations, and reviewing complaints brought by students or members about SGA conduct.

The committee is made up of senators and reports its recommendations to the full SGA.`,
    category: "governance",
    openTo: "senators-only",
    meets: "TODO: confirm meeting time",
    contact: "sgarv@montgomerycollege.edu",
    color: "purple",
    pills: ["Governance"],
    responsibilities: [
      "Uphold the SGA constitution and bylaws",
      "Maintain senator conduct and attendance standards",
      "Review complaints and recommend accountability actions",
      "Advise the Executive Board on procedural questions",
    ],
    howToJoin: "Senators only. Become a Senator-at-Large to serve.",
    links: [{ label: "Read the constitution", href: "/constitution" }],
    draft: true,
  },
  {
    slug: "food",
    name: "Food Committee",
    tagline:
      "Student feedback on campus dining and food access, taken to the people who can fix it.",
    description: `The Food Committee gathers student feedback on campus dining, hours, prices, and food access, and brings it to MC food services and campus leadership.

It also works alongside the campus food pantry so that students facing food insecurity know where to go and what is available.

Staffed by senators, fed by everyone. If you have opinions about what is (or is not) available to eat on campus, bring them to an open meeting or the contact form and this committee is where they go.`,
    category: "advocacy",
    openTo: "senators-only",
    meets: "TODO: confirm meeting time",
    contact: "sgarv@montgomerycollege.edu",
    color: "blue",
    pills: ["Advocacy"],
    responsibilities: [
      "Collect student feedback on campus dining options, hours, and pricing",
      "Liaise with MC food services on student concerns",
      "Support and promote the campus food pantry",
      "Report dining and food-access issues to the SGA and campus administration",
    ],
    howToJoin:
      "Senators only. Anyone can send the committee feedback through an open meeting or the contact form.",
    draft: true,
  },
  {
    slug: "public-outreach",
    name: "Public Outreach",
    shortName: "PO",
    tagline: "SGA's voice on Instagram, TikTok, X, flyers, and tables around campus.",
    description: `Public Outreach runs SGA's communications. If you have seen an SGA post, flyer, or table on the Quad, that was PO.

The committee manages SGA's Instagram, TikTok, and X accounts, designs flyers, staffs tabling and Club Rush, and runs "know your senator" campaigns so students can put a face to the people representing them.

Staffed by senators. Designers, photographers, and video editors who want in should run for a seat and ask for this committee.`,
    category: "programming",
    openTo: "senators-only",
    meets: "TODO: confirm meeting time",
    contact: "sgarv@montgomerycollege.edu",
    color: "orange",
    pills: ["Comms"],
    responsibilities: [
      "Run SGA's Instagram, TikTok, and X accounts",
      "Design flyers and digital graphics for SGA and SAB events",
      "Staff tabling, Club Rush, and campus-wide outreach",
      'Run "know your senator" campaigns and this website',
      "Photograph and recap SGA events",
    ],
    howToJoin:
      "Senators only. Become a Senator-at-Large and ask for Public Outreach. Tips and event photos are always welcome by DM.",
    draft: true,
  },
  {
    slug: "sab",
    name: "Student Activities Board",
    shortName: "SAB",
    tagline:
      "The student-run board that plans the social, cultural, and recreational events on campus.",
    description: `The Student Activities Board (SAB) is a student-run board that plans and promotes social, cultural, recreational, and educational programs on campus for the diverse interests of the student body.

Past SAB programs include a masquerade ball, the Halloween Bash, and trivia nights. SAB members choose the events, book the spaces, manage the budget with Student Life, and run the show on the day.

Applications are accepted on an ongoing basis, so you can join any time during the semester. Email RVSAB@montgomerycollege.edu to get started.`,
    category: "programming",
    openTo: "all-students",
    meets: "TODO: confirm SAB meeting time",
    contact: "RVSAB@montgomerycollege.edu",
    color: "blue",
    pills: ["Events", "Open to all students", "Rolling applications"],
    responsibilities: [
      "Plan and promote social, cultural, recreational, and educational programs on campus",
      "Represent the diverse interests of the student body in programming decisions",
      "Coordinate with the Office of Student Life on venues, vendors, and budgets",
      "Run events like the masquerade ball, Halloween Bash, and trivia nights",
    ],
    howToJoin:
      "Applications are accepted on a rolling basis. Email RVSAB@montgomerycollege.edu or submit the SAB application form. SAB also runs a WhatsApp group for members.",
    links: [
      { label: "Email SAB", href: "mailto:RVSAB@montgomerycollege.edu" },
      { label: "SAB application form", href: "TODO:" },
    ],
  },
  {
    slug: "wdce",
    name: "WDCE Committee",
    shortName: "WDCE",
    tagline:
      "Representing Workforce Development & Continuing Education students in campus life.",
    description: `Montgomery College serves thousands of students through Workforce Development & Continuing Education (WDCE): non-credit, certificate, and professional programs. The WDCE Committee is SGA's liaison to those students.

Its job is to make sure non-credit students are represented when decisions are made and included in campus events, resources, and student life.

If you are a WDCE student with a concern, or a credit student who wants to help bridge the gap, this committee is the place to start.`,
    category: "advocacy",
    openTo: "senators-only",
    meets: "TODO: confirm meeting time",
    contact: "sgarv@montgomerycollege.edu",
    color: "green",
    pills: ["Advocacy"],
    responsibilities: [
      "Act as liaison between SGA and Workforce Development & Continuing Education students",
      "Bring WDCE student concerns to SGA and campus leadership",
      "Make sure non-credit students are included in events and resources",
      "Build awareness of SGA among WDCE programs",
    ],
    howToJoin:
      "Senators only. Become a Senator-at-Large to serve. WDCE students with a concern can reach the committee through the contact form.",
    draft: true,
  },
];

export const committeeCategories: Record<Committee["category"], string> = {
  governance: "Governance",
  finance: "Finance",
  programming: "Programming",
  advocacy: "Advocacy",
  service: "Service",
};

export function getCommittee(slug: string): Committee | undefined {
  return committees.find((c) => c.slug === slug);
}
