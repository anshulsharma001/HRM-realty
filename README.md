# HRM Realty

Legacy-led brand site for a Sonipat land and industrial developer entering residential. Eight routes, client copy only, built to the art direction already in the repo.

## Stack

Next.js 16.3 (App Router, Turbopack) · React 19 · TypeScript strict · Tailwind v4.3 (CSS-first `@theme`, no config file) · GSAP 3.15 with ScrollTrigger, SplitText, DrawSVG, Flip, CustomEase via `@gsap/react` · Lenis 1.3 driven from `gsap.ticker` · Zod + Resend for the enquiry form · Vercel.

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck
npm run lint
npm run build
npm run shots -- http://localhost:3000 shots home --segments=1800   # device-accurate captures, desktop + phone
# flags: --only=desktop|mobile  --reduced  --desktop-width=1920  --mobile-width=375  "--eval=<js>" (runs before capture)
```

`shots` drives headless Chrome over the DevTools Protocol with real device metrics and exits 2 if any viewport scrolls horizontally. Do not use Chrome's `--window-size` for phone widths: its headless window floor is 500px.

## Environment

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical origin for metadata, sitemap, robots and JSON-LD. Falls back to `http://localhost:3000`. The client has not supplied the domain. |
| `RESEND_API_KEY` | Resend API key for the enquiry form. |
| `ENQUIRY_TO` | Destination mailbox (the sales address). The interest category is in the subject for triage. |
| `ENQUIRY_FROM` | Optional verified sender. Defaults to Resend's onboarding sender. |

Without `RESEND_API_KEY` and `ENQUIRY_TO`, a development server logs the enquiry and shows the success state; a production build shows the failure state with the phone number.

## Routes

| Route | Sections |
|---|---|
| `/` | Hero (client's horizon zoomed to the building line and cursor-panned; copy aligned to the left margin with the logo; title, lead, the evolving-story paragraph and both deck CTAs with a SplitText load sequence), NameReveal (three stacking cards that collect into H, R, M; five commitments under M), EvolvingStory (portrait photograph beside the text), Stats (indent by magnitude; count-up set-piece), MapTeaser (the eight verticals pinned on the Sonipat map, popping in on scroll; hover, focus or tap shows the vertical's photograph and name) |
| `/founder` | FounderHero (title and name with the founder portrait slot beside them), sticky early-plots photograph with FounderIntro, AcreageGrid (canvas, "His impact"), Contribution, NextStep, Vision (first wheat) |
| `/sonipat` | SonipatHero, SonipatIntro (full-width photograph), TransformationChain (`data-chain` c1–c7 pairs), JourneyEvolves (community photograph, four paragraphs, four transitions, closing), TheTurn (two lines on ink, second in wheat), SonipatMap (eight toggles, text equivalent) |
| `/ecosystem` | EcosystemIntro, EcosystemIndex (two-column grid: uniform 3:2 photograph, category, entries with line icons and one line each), Values (six with line icons and one line each, two columns) |
| `/projects/industrial` | ProjectsIntro, ProjectDetail ×2 (tagline, acreage, description, six highlights with line icons, project photograph), WhyHRM (six reasons with line icons, two columns) |
| `/projects/residential` | ResidentialHero (with the deck's residential paragraph from the Sonipat journey), family-at-home photograph, HomeIsMore (six clauses, closing paragraph), HomeQualities (eight qualities with line icons, second family photograph), ResidentialEnquiry (interest pre-set, with the contact deck copy) |
| `/team` | TeamIntro (title, subtitle and paragraphs on one left edge, the team photograph beside them at under 600 CSS px so its 1200px source stays sharp on 2× screens), OpportunityChain |
| `/contact` | ContactHero, ACityWhere (four lines with line icons), ContactDetails (phone, emails, office, hours with line icons; the office photograph beside), EnquiryForm |

Each route has its own `opengraph-image.tsx`; `sitemap.ts` and `robots.ts` sit at the app root. Organization and LocalBusiness JSON-LD is in the root layout, Person JSON-LD on `/founder`.

## Where things live

- `src/content/` — every word on the site, one file per area, plus the image manifest. Pages import through `src/content/index.ts` only, so a CMS swap later touches this directory alone.
- `src/components/chrome/` — Nav (monogram `#hrm-monogram` is the Flip target), NavLinks, NavMenu, Footer, LeftRail, TransitionLink.
- `src/components/primitives/` — Chapter, Rule, TickScale, PlotMark, Figure, MeasuredList, IconList, LineIcon, SectionHead, PageHero, Prose, Button, TextLink, Placeholder (with an optional uniform `frame`).
- `src/lib/icons.ts` — the site's line icons as 24-unit paths; `src/content/icons.ts` maps each deck line to one, so the content files stay pure text. Unmapped lines get a plot mark.
- `src/components/sections/` — one file per section named above.
- `src/app/actions/enquiry.ts` — Server Action: Zod, honeypot, fill-time check, per-IP rate limit, Resend.
- `src/app/globals.css` — the theme (unchanged from the foundation pass) plus form, strip, legend and scroll-cue utilities. Use `border-tone` / `bg-tone-rule` for rules: they follow the chapter tone, so lists keep their rules on ink.
- `src/lib/` — `gsap.ts` (single plugin registry), `lenis.ts`, `motion.ts`, `fonts.ts`, `og.tsx`, `seo.tsx`.
- `src/app/_design/` — the foundation spec sheet. Underscore folders are private in Next, so it is not routed; it is kept as the art-direction record.

## Copy status

The client copy deck was supplied on 12 September 2026 and every line of it is on screen, verbatim, in the section the deck assigns it. Two sentences the deck writes ungrammatically are rendered exactly as written and flagged below rather than silently rewritten.

Deliberate departures from the deck, each flagged:

- The deck's second home CTA, "Discover Our Vision", pointed at the same page as "Explore our journey"; it now sits beside it in the hero and links to the founder's vision (`/founder#vision`).
- "know his as the man" is corrected to "him" on `/founder`.
- The form submit reads "Send enquiry" instead of the deck's "Submit Enquiry", per the copy guidance that a CTA names what happens.
- Office hours are set as two lines; the deck separates them with a middle dot, which the art direction bans.

The one genuine gap is the map. The deck names no individual locations for any of the eight layers. Each layer in `src/content/mapLayers.ts` keeps an empty, typed `places` array (`name`, `x`, `y`, optional `year`), so pins render the moment data is added. Ask the client, per layer, for site name, an approximate position or a marked point on a Sonipat map, and year established. Year is what makes "Play the journey" possible.

System strings that are not deck copy and need client approval: nav labels, form validation messages, the form success and failure messages, and the map's cartographic labels (Sonipat, Gohana, Ganaur, Murthal, Rai, Kundli, Kharkhoda, Yamuna, NH 44).

Footer links the deck names that have no route of their own point at the nearest existing page: About HRM → `/`, Our Legacy → `/sonipat`, Our Values → `/ecosystem#values`, Leadership → `/team`, Future Opportunities → `/projects/residential#enquire`, Food Processing → `/ecosystem#industry`. Give each its own route when the deck supplies that content.

## Images

Photographs come from two places, and every manifest entry in `src/content/images.ts` names its source in `dummy` so nothing is mistaken for the shoot:

- **The client's existing website (hrmrealty.com).** Its project renders and office photographs fill the slots where they fit. No person from that site is shown as a named individual: the founder and Rahul slots carry the estate and the office building rather than a stock face. Stock people appear only in generic roles (the Entrepreneur stage, the families on the residential route).
- **Lorem Picsum stand-ins** where the old site has nothing suitable (four map-layer photographs and the logistics layer).

The hero backdrop is `public/images/hero-image.png`, supplied directly by the client. Before launch: replace each `src` with the shoot listed in `subject`, add `alt`, and delete `dummy`. Images render through `next/image` with explicit dimensions and the chapter's grade filter.

| Slot | Placed on | Source |
|---|---|---|
| hero | `/` hero backdrop, full bleed, priority; zoomed so the building baseline sits just above the bottom edge with ground beneath, panned on the x axis by the cursor and drifted upward on scroll (`HeroArt`) | Client-supplied `hero-image.png` |
| founder-site | The founder portrait slot: `/founder` beside the title and the H card on `/`. No photograph of Shri Hari Parkash Mangla Ji exists on this machine or the old site; the slot shows a Sonipat crop until one is supplied | hero-image.png, water-tower crop, standing in for the founder |
| founder-early | `/founder` sticky beside the story | hero-image.png, sheds crop |
| sonipat-industrial | `/sonipat` under the intro, full width | hero-image.png, pylon-and-sheds crop |
| portrait-rahul | `/` name reveal (R card) | hrmrealty.com hrm-realty-building |
| story-office | `/` evolving story | hrmrealty.com indian-office-interior |
| project-industrial-estate | `/projects/industrial`; Industrial Development pin | hrmrealty.com industrial-estate-hero (the old site's project image) |
| project-commercial-arcade | `/projects/industrial`; Commercial pin; ecosystem Commercial | hrmrealty.com commercial-arcade-hero (the old site's project image) |
| residential-land | `/projects/residential` under the hero; Future Residential pin | StockSnap CC0 (Direct Media), a family in their living room |
| residential-home | `/projects/residential` beside the qualities | StockSnap CC0 (Direct Media), a family on the sofa |
| community-family | `/ecosystem` Community; `/sonipat` journey | hrmrealty.com client-family-2 |
| office-building | `/contact` beside the details | hrmrealty.com hrm-realty-building |
| ecosystem-industry | `/ecosystem` Industry | hero-image.png, tower-and-silos crop |
| team-site | `/team`, beside the intro copy | hrmrealty.com indian-business-meeting (1200px, the largest the old site has) |
| journey-university, journey-hospitality, journey-logistics, journey-school, journey-entrepreneur, journey-home, journey-land, journey-factory, journey-commercial, journey-residential | Map pins and ecosystem categories | Picsum stand-ins and hrmrealty.com, credited per entry |
| layer-schools, layer-colleges, layer-university, layer-hospitality, layer-logistics | Map pins | Picsum 24, 1033, 1076, 42, 1026 |

The old site's remaining photographs (nine stock portraits, a boardroom, an office interior) are not used: the deck has no testimonials or people cards. The map teaser's hover reveal (`LayerHoverList`) slides one ink highlight between rows, turns the hovered row's text paper, and floats the layer's photograph beside the cursor, growing each new photograph from scale 0; it ignores touch pointers and is instant under reduced motion.

The two residential photographs are CC0 stock of a Western family indoors (StockSnap, photographer Direct Media), the closest match to the client's request for happy families inside a home; no free-licence Indian family photographed indoors exists at usable quality (Openverse and Wikimedia Commons were both swept). They are 960px wide, the largest copy obtainable without a browser session, because StockSnap's CDN sits behind Cloudflare; downloading the two originals from the StockSnap links in the manifest and saving them as `public/images/residential-land.jpg` and `residential-home.jpg` (3:2 crop) upgrades them with no code change. An Indian family set from the client or a licensed library should replace them before launch.

Map pins on the home page are indicative positions in `src/content/mapLayers.ts` (near the part of the district each vertical is associated with) and must be replaced with real coordinates when the client supplies locations.

## Logo

The nav carries the full lockup (HRM with the gold R, REALTY beneath) from the client's PDF. The client's logo (`hrm logo.pdf`, HRM with a gold R, REALTY between rules, the line "Trust. Vision. Value.") was cut from its white background into transparent PNGs in `public/brand/`: `hrm-mark-*` (the three letters) and `hrm-wordmark-*` (letters plus REALTY), each in a dark version for paper and a light version with the navy recoloured to paper for ink. The nav carries the dark wordmark; the footer carries the light wordmark with the tagline; the Open Graph cards carry the mark; `src/app/icon.png` and `apple-icon.png` are the light mark on ink. The gold gradient is the client's artwork and is exempt from the no-gradient rule. A vector master would let these be SVG; ask for the AI or EPS.

## Icons

The client asked for icons on the pointer lists. Rather than an icon font, the site draws its own 24-unit line icons in the survey-sheet language (1.25px strokes, no fills): 45 of them in `src/lib/icons.ts`, mapped to deck lines in `src/content/icons.ts`. They lead the home qualities, the six values, the six reasons, both projects' highlights, the ecosystem entries, the team's opportunity chain, the contact lines and details, and the footer contact rows. `IconList` renders any of these lists in one or two columns with an optional description.

## Layout notes from client review

Dividing rules are now the exception: lists are measured by spacing (`MeasuredList` has an opt-in `rules` prop), headings carry no rule above them, and the only remaining horizontal rules are the one above the footer's closing line and the vertical hairline between letter and name in the name reveal. Chapter spacing is 120px on desktop and 64px on phones (was 160 and 80), and the loose chapters are 1.25× rather than 1.5×.

## Flags for the client

Three grammar items to confirm before publishing:

1. `/founder`, contribution closing: deck reads "know his as the man". Rendered as "know him as the man".
2. `/founder`, "The next step": rendered as written, "But now it's time, HRM provides better living opportunities to the people of Sonipat, where they don't just live but thrive." Suggested replacement: "But now the time has come for HRM to provide better living opportunities to the people of Sonipat — where they don't just live, but thrive."
3. `/team`, closing: rendered as written, "And we are proud of our HRM family who is enabling this development." Suggested replacement: "And we are proud of the HRM family making it possible."

Outstanding questions:

- Real phone number. `+91-9999988888` is a placeholder in every location.
- Map locations for all eight layers, with year established.
- "Building Sonipat's future since 1994." in the footer versus "30+ Years" in the stats: 2026 − 1994 = 32. Pick one.
- Corporate office is Delhi (Rohini). Is there a Sonipat site office to lead with? JSON-LD sets the service area to Sonipat, Haryana.
- Is "10,000+ factories" defensible under RERA advertising scrutiny?
- Residential: a named project or a registrations-opening capture? HRERA number required either way. `/projects/residential` has no project attached and ends in an interest register; do not publish it live without the HRERA disclosure.
- The ecosystem index has six categories although the brief said seven.
- All photographs except the hero are interim: the old site's renders and stock, or Picsum. The shoot list is the `subject` field of each manifest entry. A real portrait of the founder and of Rahul are the most visible gaps.
- The logo was received as a PDF containing a raster image. Ask for the vector master.
- The founder photograph. None was supplied and none exists on the old site; the `founder-site` slot (4:5) takes it on `/founder` and the home H card the moment the file is dropped in.
- 26 Sep review, still open on the client side: real Sonipat photography for the sections that now share crops of one photograph; actual project photographs if the old site's two renders are not what was meant; Indian family-at-home photographs for the residential route; a sharp team photograph at 2400px or wider; real locations for the map pins.

## Measured

| Measure | Value | Note |
|---|---|---|
| Modern-browser JS on `/`, gzipped | about 204KB | Budget is 200KB. Next 16 + React 19 alone is about 139KB; GSAP with all five plugins about 61KB. Plan: lazy-load Flip, DrawSVG and CustomEase inside their set-pieces in the motion pass and re-measure. |
| Wheat on paper | 1.83 : 1 | Fails AA even for display text. Wheat is used on ink or as rules and marks, never as type on paper. On `/sonipat` The Turn therefore sets both lines on ink, the second in wheat (7.9 : 1). |
| Steel on ink | 2.96 : 1 | Fails. Dark chapters use paper at reduced opacity for secondary type. |

## Fonts

Both families are self-hosted in `src/fonts/` through `next/font/local`, so Next computes size-adjusted fallback faces. Static TTF instances in `src/fonts/og/` exist only for the Open Graph renderer, which cannot read woff2. Licence notes in `src/fonts/LICENSES.md`.
