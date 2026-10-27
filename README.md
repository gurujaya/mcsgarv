# SGA Rockville — Montgomery College Rockville Student Government Association

The official website for the Montgomery College Rockville Campus SGA. Built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4, shadcn/ui, motion.dev, and a three.js shader hero. No CMS: every piece of content is a typed TypeScript file a student officer can edit in a text editor.

Live site: set `NEXT_PUBLIC_SITE_URL` (see below). Official MC page: <https://www.montgomerycollege.edu/life-at-mc/student-life/student-government-association/rockville.html>

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (also regenerates public/search-index.json)
npm run lint       # ESLint
npm run typecheck  # tsc --noEmit
npm run format     # Prettier
```

Node 20+ is required.

## Where everything lives

| What                                                | File                                   |
| --------------------------------------------------- | -------------------------------------- |
| Contact info, office, meeting time, socials, emails | `src/content/site.ts`                  |
| Committees (7)                                      | `src/content/committees.ts`            |
| Officers and senators                               | `src/content/people.ts`                |
| Events (upcoming, recurring, past)                  | `src/content/events.ts`                |
| FAQ                                                 | `src/content/faq.ts`                   |
| Resource links                                      | `src/content/resources.ts`             |
| Constitution (long-form text)                       | `src/content/constitution.mdx`         |
| Field definitions for all of the above              | `src/content/types.ts`                 |
| Brand colors, fonts, radii                          | `src/app/globals.css` (`@theme` block) |
| Pages                                               | `src/app/**/page.tsx`                  |
| Shared components                                   | `src/components/`                      |

Anything that starts with `TODO:` in a content file is treated as missing content. It renders a safe fallback in production and a small amber **Needs content** chip in `npm run dev`, so open the dev server and look for amber chips to find what still needs filling in.

## How to add or change content

### Add a senator or officer

Open `src/content/people.ts` and append an object to the `people` array:

```ts
{
  slug: "jane-doe",              // unique, lowercase, used in URLs and photo filename
  name: "Jane Doe",
  role: "Senator-at-Large",      // President | Vice President | Secretary | Treasurer | Senator-at-Large | Advisor
  committees: ["food", "sab"],   // committee slugs from committees.ts (can be empty [])
  photo: "/people/jane-doe.jpg", // optional; drop a square JPG in public/people/
  major: "Computer Science",     // optional
  bio: "One sentence.",          // optional
  email: "jane@...",             // optional; if set, the row links to mailto
},
```

Without a `photo`, the site shows an initials avatar automatically. Photos should be square, at least 320×320, JPG or PNG.

### Add a committee

Open `src/content/committees.ts` and append an object. Required fields: `slug`, `name`, `tagline`, `description`, `category`, `openTo`, `color`, `pills`, `responsibilities`. Optional: `shortName`, `chair`, `meets`, `contact`, `howToJoin`, `links`, `draft`.

- `slug` becomes the URL: `/committees/<slug>`.
- `description` supports paragraphs separated by a blank line.
- `category` is one of `governance | finance | programming | advocacy | service`.
- `openTo` is `all-students` or `senators-only`.
- `color` picks the pill/tile tint: `purple | blue | green | orange`.
- Set `draft: true` while the description is unconfirmed; it shows a dev-only chip.

To give the committee its own icon, add an entry to `committeeIcons` in `src/components/committee-icon.tsx` (any icon from `lucide-react`). Unlisted committees get a default icon.

### Add an event

Open `src/content/events.ts` and append an object:

```ts
{
  slug: "international-ball-2026",
  title: "International Ball",
  start: "2026-11-20T18:00:00-05:00",   // ISO with Eastern offset: -04:00 Mar–Nov (EDT), -05:00 Nov–Mar (EST)
  end: "2026-11-20T22:00:00-05:00",     // optional
  location: "SV Atrium",
  type: "social",                       // meeting | social | cultural | advocacy | service | tabling
  committee: "sab",                     // optional committee slug
  description: "Two or three sentences.",
  rsvpUrl: "https://...",               // optional; row links out if set
  cover: "/events/international-ball-2026.jpg", // optional
},
```

- Events sort into **Upcoming** and **Past** automatically by date. You can force `past: true`.
- `approximate: true` shows "Date TBD" with the month when the day is not confirmed.
- `recurring: "weekly"` (e.g. the Monday open meeting) expands into the next 8 weeks automatically. `start` is any one occurrence.
- Every upcoming event gets an **.ics** button that downloads a calendar file.
- The home page and `/events` revalidate hourly on Vercel, so "upcoming" stays current without a rebuild.

### Edit the FAQ, resources, or constitution

- FAQ: `src/content/faq.ts`. Each item has `q`, `a`, and a `category` (`general | meetings | joining | funding`). Use a blank line inside `a` for a paragraph break.
- Resources: `src/content/resources.ts`. Set `external: true` for links that leave the site.
- Constitution: paste the official text into `src/content/constitution.mdx`. Use `##` for section headings. Markdown links work.

### Change contact info or the meeting time

Everything is in `src/content/site.ts`: email, phone, office room, meeting day/time, Student Life contact, SAB contact, social handles. The header, footer, contact page, FAQ, and structured data all read from it.

## Swap in the official seal

1. Save the official SVG as `public/brand/sga-seal.svg` (overwrite the placeholder).
2. In `src/components/primitives/seal.tsx`, change `USE_PLACEHOLDER` to `false`.
3. Optionally replace `src/app/favicon.ico` and update the `SGA` circle in `src/app/opengraph-image.tsx`.

## Swap the hero photo

Replace `public/images/sga-group-wide.jpg` with a landscape photo (16:9, at least 1600px wide) for the band on the home page, and update the `alt` text in `src/components/landing/photo-band.tsx`.

## Forms (contact, interest, funding)

Forms post to the Route Handler at `src/app/api/contact/route.ts`, which forwards the JSON to the URL in the `FORM_ENDPOINT` environment variable. There is no database.

1. Create a Formspree form (<https://formspree.io>) or a Google Apps Script web app that accepts JSON POSTs.
2. Copy `.env.example` to `.env.local` and set `FORM_ENDPOINT=https://formspree.io/f/xxxxxxxx`.
3. On Vercel, add `FORM_ENDPOINT` under Project → Settings → Environment Variables.

In development with no endpoint set, submissions are printed to the terminal. In production with no endpoint, the form shows an error asking the student to email instead. The payload includes a `form` field (`contact`, `interest`, or `funding`) so one endpoint can route all three.

## Search (⌘K)

`scripts/build-search-index.ts` runs automatically before every build and writes `public/search-index.json` from the content files. It indexes pages, committees, people, events, FAQ, and resources. No configuration needed; just edit content and rebuild. Run `npm run search-index` to regenerate it manually during development.

## Design system

The look is deliberately restrained: one typeface, near-monochrome surfaces, hairline rules instead of cards and tints, and MC purple used for one action per screen. Everything is defined once in `src/app/globals.css`:

- **Type:** Instrument Serif for display headlines (one weight, `.serif-display` / `.serif-lede`), Geist for UI and body (`.display`, `.lede`), Geist Mono for eyebrows, labels, and the `.mono-button` style. All load via `next/font/google`. Note: this departs from MC's Roboto + Crimson Text pairing; swap the font imports in `src/app/layout.tsx` and the `--font-*` lines in `globals.css` to revert.
- **Color:** warm paper page `#F7F5F1`, white surfaces, ink `#16111C` (a purple-black), muted ink `#5F5A66`, hairlines are ink at 10% and 22% alpha. MC purple `#51237F` is the only button fill. The MC accents (orange, blue, green) appear only as 6px dots on category chips and the "Today" badge.
- **Shape:** 8px radius on cards and images, 6px on controls, 4px on chips. No shadows, no hover lift.
- **Layout:** a 1320px `.site-frame` with vertical hairline rails on large screens. Sections are separated by full-width rules; grids of cells share borders instead of gaps.
- **Landing page:** a warm-paper hero whose only visual is the group photo rendered as an ink halftone dot screen through a small three.js shader (`src/components/landing/hero-shader.tsx`, React Three Fiber, loaded at idle after the page is interactive, with a masked grayscale photo as the fallback when WebGL or motion is unavailable). Then intro + stats, the "Four jobs" cells, a committee index, the full-bleed photo band, and the next four events. Each section is one file in `src/components/landing/`.
- **Photos:** `public/images/sga-group.jpg` (portrait) and `sga-group-wide.jpg` (16:9 crop used in the photo band). Replace both to change the photo.
- **Nav:** a celled bar (brand, links, live meeting status, search, Apply) that condenses on scroll. `src/components/layout/nav-links.ts` defines the items; "Committees" and "Resources" open numbered editorial dropdowns, and committee entries are generated from `committees.ts`. The status cell counts down to the next Monday 4 PM meeting (`src/lib/next-meeting.ts`) and turns green while it is in session. On phones the menu is a full-screen serif list.

## Deploy to Vercel

1. Push this repository to GitHub.
2. In Vercel, **Add New Project** → import the repo. Framework preset: Next.js. Build command and output are the defaults.
3. Add environment variables: `FORM_ENDPOINT` and `NEXT_PUBLIC_SITE_URL` (your final domain, e.g. `https://sgarv.vercel.app`).
4. Deploy. Every push to `main` redeploys. Vercel Analytics and Speed Insights are already wired in `src/app/layout.tsx`; enable them in the Vercel dashboard.

To point a custom domain (for example a subdomain Student Life provides), add it under Project → Settings → Domains and update `NEXT_PUBLIC_SITE_URL`.

## Project structure

```
src/
  app/                 routes (App Router), sitemap, robots, OG images, API route
  components/
    directory/         YC-style directory: shell, sidebar filters, rows, URL state
    forms/             react-hook-form + zod forms and the submit helper
    landing/           home page: shader hero, intro, bands, committee index, events
    layout/            header, footer, ⌘K command menu, providers
    primitives/        Container, Pill, SectionHeading, Reveal, Seal, Avatar, CTA
    ui/                shadcn/ui components
  content/             ALL site content (edit these)
  lib/                 dates, ICS export, search index, TODO helpers
scripts/               build-search-index.ts
public/brand/          seal
public/images/         hero photo
public/people/         senator photos
```

## Handing off

Before launch, search the repo for `TODO:` to see what still needs a real value: the office room (SV 104A vs SV 007), Instagram/TikTok handles, the SAB application link, senator application PDF, the club handbook and food pantry links, committee meeting times and rosters, whether SGA positions are paid, and Fall 2026 event details.
