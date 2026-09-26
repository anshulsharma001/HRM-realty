import { Chapter } from "@/components/primitives/Chapter";
import { Button, ButtonLink } from "@/components/primitives/Button";
import { TextLink } from "@/components/primitives/TextLink";
import { Placeholder } from "@/components/primitives/Placeholder";
import { IMAGES, STATS, image } from "@/content";
import { contrast, grade } from "@/lib/color";
import { COLORS, RULES, type ColorName } from "@/lib/tokens";
import { DUR, EASE, STAGGER, motionFor } from "@/lib/motion";
import { cn } from "@/lib/cn";
import { HorizonRule } from "./HorizonRule";

/* ------------------------------------------------------------------ */
/* Data for the sheet                                                   */
/* ------------------------------------------------------------------ */

const SWATCH_ORDER: ColorName[] = ["paper", "paper-hi", "ink", "steel", "steel-dk", "soil", "wheat"];

const PAIRS: Array<{ fg: ColorName; bg: ColorName; use: string; large: boolean }> = [
  { fg: "ink", bg: "paper", use: "Body text on the sheet", large: false },
  { fg: "steel", bg: "paper", use: "Secondary type, micro labels", large: false },
  { fg: "steel-dk", bg: "paper", use: "Cold-chapter emphasis", large: false },
  { fg: "soil", bg: "paper", use: "Warm mid-tone text", large: false },
  { fg: "paper", bg: "ink", use: "Body text in dark chapters", large: false },
  { fg: "steel", bg: "ink", use: "Secondary type in dark chapters", large: false },
  { fg: "wheat", bg: "ink", use: "Display type in warm dark chapters", large: true },
  { fg: "wheat", bg: "paper", use: "Display type on paper (large only)", large: true },
  { fg: "soil", bg: "paper-hi", use: "Form helper text", large: false },
];

const ARC: Array<{ label: string; tone: "paper" | "ink"; text: string; note: string; temp: "cold" | "turn" | "warm" }> = [
  { label: "Founder, early", tone: "paper", text: "text-steel-dk", note: "steel on paper", temp: "cold" },
  { label: "Sonipat, industrial", tone: "ink", text: "text-paper", note: "paper on ink", temp: "cold" },
  { label: "Industrial Estate", tone: "paper", text: "text-steel-dk", note: "steel on paper", temp: "cold" },
  { label: "Commercial Arcade", tone: "paper", text: "text-steel", note: "steel on paper", temp: "cold" },
  { label: "The turn", tone: "ink", text: "text-paper", note: "the one deliberate colour moment", temp: "turn" },
  { label: "Residential", tone: "paper", text: "text-soil", note: "soil on paper, softer easing", temp: "warm" },
  { label: "Founder's vision", tone: "ink", text: "text-wheat", note: "wheat's first appearance", temp: "warm" },
  { label: "Home", tone: "paper", text: "text-soil", note: "warm close", temp: "warm" },
];

const TYPE_ROWS: Array<{ name: string; cls: string; spec: string[]; sample: string; tag: "h1" | "h2" | "h3" | "p" }> = [
  { name: "display-xl", cls: "type-display-xl", spec: ["Fraunces 400", "clamp(3.5rem, 8vw, 7.5rem)", "0.92", "−0.02em", "opsz 144"], sample: "Building the Future of Sonipat", tag: "h1" },
  { name: "display-lg", cls: "type-display-lg", spec: ["Fraunces 400", "clamp(2.6rem, 5vw, 4.5rem)", "1.02", "−0.015em", "opsz 144"], sample: "We helped build the places where Sonipat works.", tag: "h2" },
  { name: "h2", cls: "type-h2", spec: ["Fraunces 400", "clamp(2rem, 3.2vw, 3rem)", "1.1", "opsz 96"], sample: "Now, we are building the places where Sonipat lives.", tag: "h2" },
  { name: "h3", cls: "type-h3", spec: ["Switzer 500", "1.5rem", "1.3"], sample: "Land became industrial opportunity.", tag: "h3" },
  { name: "lead", cls: "type-lead", spec: ["Switzer 400", "1.25rem", "1.5", "max 60ch"], sample: "The lead style opens a chapter. It is the only text size between h3 and body, and it never runs longer than sixty characters a line.", tag: "p" },
  { name: "body", cls: "type-body", spec: ["Switzer 400", "1.0625rem (17px)", "1.6", "max 68ch"], sample: "Body copy is set at seventeen pixels on a sixteen-pixel root, so spacing stays on the eight-pixel rhythm while the reading size is comfortable on a mid-range Android. Lines never run past sixty-eight characters.", tag: "p" },
  { name: "small", cls: "type-small", spec: ["Switzer 400", "0.9375rem"], sample: "Small carries captions, stat labels and form helper text. Contrast is checked below before it is used in steel.", tag: "p" },
  { name: "micro", cls: "type-micro", spec: ["Switzer 500", "0.8125rem", "+0.01em", "sentence case"], sample: "Micro labels are sentence case. Never tracked-out capitals.", tag: "p" },
];

const BANNED: Array<{ item: string; status: string }> = [
  { item: "Cream #F4F1EA, terracotta #D97757, warm-clay accents", status: "Absent. Palette namespace is wiped; only the seven tokens exist." },
  { item: "Tracked-out all-caps eyebrow labels", status: "Absent. Micro style is sentence case with +0.01em only." },
  { item: "Meta strings joined with middle dots", status: "Absent in UI. The deck's dot string is set as a ruled list (Linework)." },
  { item: "Arrow glyphs appended to buttons or links", status: "Absent. Button and link primitives carry no glyphs." },
  { item: "Identical rounded cards with the same shadow", status: "Absent. Radius and shadow namespaces are wiped." },
  { item: "Numbered 01 / 02 / 03 markers", status: "Absent. Rail markers are words. Reserved for the Transformation chain and the journey itinerary." },
  { item: "Glassmorphism, blobs, mesh gradients, particles, spotlight cursors", status: "Absent. Blur namespace is wiped; no gradients anywhere." },
  { item: "Emoji or generic line icons", status: "Absent. Survey-line marks are drawn at 1px (Linework)." },
  { item: "Fade-and-slide-up on every section", status: "Not applicable yet. Baseline motion arrives in Phase 3 per §3.2." },
  { item: "Hover card-lift with scale and shadow", status: "Absent. Hover is an underline draw or a bottom fill; transforms only." },
];

const COPY_ISSUES = [
  { issue: "\"people of Haryana know his as the man\"", where: "Founder page", note: "Should be \"him\"." },
  { issue: "Placeholder phone +91-9999988888", where: "Contact, footer", note: "Needs the real number before launch." },
  { issue: "\"SINCE 1994\" vs \"30+ Years\"", where: "Footer vs stats", note: "2026 − 1994 = 32. Pick one and make it consistent." },
  { issue: "Corporate office is Delhi (Rohini)", where: "Contact, footer", note: "The story is Sonipat. Is there a Sonipat site office to lead with?" },
  { issue: "\"10,000+ factories\"", where: "Founder, stats", note: "Large claim. Confirm it is defensible under RERA advertising scrutiny." },
  { issue: "Residential has copy but no project", where: "/projects/residential", note: "No name, location, size or RERA number. Named project, or registrations capture?" },
  { issue: "Two competing hero CTAs", where: "Home", note: "\"Explore Our Journey\" and \"Discover Our Vision\" go to the same place. Cut to one." },
  { issue: "RERA registration", where: "Sitewide", note: "Residential promotion in Haryana needs HRERA disclosure before that page goes live." },
];

const ECOSYSTEM_LIST = ["Industry", "Education", "Hospitality", "Logistics", "Commercial", "Community"];

/* ------------------------------------------------------------------ */
/* Small presentational helpers                                         */
/* ------------------------------------------------------------------ */

/** Inline meta items separated by hairline rules, never by middle dots (§2.6). */
function MetaList({ items, className }: { items: readonly string[]; className?: string }) {
  return (
    <ul className={cn("flex flex-wrap items-center type-micro text-steel tnum", className)}>
      {items.map((item, i) => (
        <li key={item} className={cn("flex items-center", i > 0 && "before:mx-3 before:block before:h-3 before:w-px before:bg-tone-rule before:content-['']")}>
          {item}
        </li>
      ))}
    </ul>
  );
}

function SectionHead({ title, note }: { title: string; note?: string }) {
  return (
    <header className="grid-site mb-12 lg:mb-16">
      <div className="col-span-12 lg:col-start-2 lg:col-span-6">
        <div className="rule mb-6" />
        <h2 className="type-h2">{title}</h2>
        {note ? <p className="type-lead mt-4 text-steel">{note}</p> : null}
      </div>
    </header>
  );
}

function Swatch({ name }: { name: ColorName }) {
  const c = COLORS[name];
  return (
    <li className="flex flex-col gap-3">
      <div className="h-24 w-full border border-tone lg:h-32" style={{ backgroundColor: c.hex }} />
      <div>
        <p className="type-small tnum">
          <span className="font-medium">{name}</span>
          <span className="text-steel"> {c.hex}</span>
        </p>
        <p className="type-small text-steel">{c.role}</p>
      </div>
    </li>
  );
}

function StatBlock() {
  const stats = STATS;
  const max = Math.log10(Math.max(...stats.map((s) => s.value)));
  return (
    <ul className="grid grid-cols-1 gap-y-14 md:grid-cols-2 md:gap-x-6 lg:gap-y-20">
      {stats.map((s) => {
        const width = Math.round((Math.log10(s.value) / max) * 100);
        return (
          <li key={s.display}>
            <p className="type-display-xl tnum">{s.display}</p>
            <div className="rule mt-3" style={{ width: `${width}%`, backgroundColor: "currentColor", opacity: 0.55 }} />
            <p className={cn("type-small mt-3", s.label.startsWith("TODO") && "text-steel")}>{s.label}</p>
          </li>
        );
      })}
    </ul>
  );
}

function ScaleBar() {
  const ticks = Array.from({ length: 11 }, (_, i) => i);
  return (
    <svg viewBox="0 0 400 28" className="w-full max-w-xl overflow-visible" aria-hidden="true">
      <line x1="0" y1="20" x2="400" y2="20" stroke="currentColor" strokeWidth="1" />
      {ticks.map((t) => (
        <line key={t} x1={t * 40} y1={t % 5 === 0 ? 8 : 14} x2={t * 40} y2="20" stroke="currentColor" strokeWidth="1" />
      ))}
      <text x="0" y="5" fontSize="9" fill="currentColor" fontFamily="var(--font-text)">
        0
      </text>
      <text x="200" y="5" fontSize="9" fill="currentColor" fontFamily="var(--font-text)" textAnchor="middle">
        500 m
      </text>
      <text x="400" y="5" fontSize="9" fill="currentColor" fontFamily="var(--font-text)" textAnchor="end">
        1 km
      </text>
    </svg>
  );
}

function PlotMark() {
  return (
    <svg viewBox="0 0 160 120" className="w-40 text-steel-dk" aria-hidden="true">
      <path d="M12 108 L28 14 L118 10 L148 98 Z" fill="none" stroke="currentColor" strokeWidth="1" />
      <path d="M28 14 L148 98" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" />
      {[
        [12, 108],
        [28, 14],
        [118, 10],
        [148, 98],
      ].map(([x, y]) => (
        <g key={`${x}-${y}`} stroke="currentColor" strokeWidth="1">
          <line x1={x - 4} y1={y} x2={x + 4} y2={y} />
          <line x1={x} y1={y - 4} x2={x} y2={y + 4} />
        </g>
      ))}
      <text x="68" y="70" fontSize="9" fill="currentColor" fontFamily="var(--font-text)">
        1 acre
      </text>
    </svg>
  );
}

function TokenTable({
  rows,
  head,
  nowrap = [],
}: {
  rows: Array<[string, string, string]>;
  head: [string, string, string];
  /** Column indexes that must not wrap (numerals). */
  nowrap?: number[];
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse type-small tnum">
        <thead>
          <tr className="text-left text-steel">
            {head.map((h) => (
              <th key={h} className="border-b border-tone py-2 pr-4 font-medium lg:pr-6">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r[0]}>
              {r.map((cell, i) => (
                <td key={i} className={cn("border-b border-tone py-2 pr-4 align-top lg:pr-6", i === 0 && "font-medium", nowrap.includes(i) && "whitespace-nowrap")}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* The sheet                                                            */
/* ------------------------------------------------------------------ */

export function SpecSheet() {
  const cold = motionFor("cold");
  const warm = motionFor("warm");
  const wheatOnPaper = contrast(COLORS.wheat.hex, COLORS.paper.hex).toFixed(2);
  const wheatOnInk = contrast(COLORS.wheat.hex, COLORS.ink.hex).toFixed(2);

  return (
    <main id="main">
      {/* Sheet head. Left-aligned; the only centred moments on the site are the hero monogram and the closing line. */}
      <Chapter id="head" marker="Sheet" className="pt-10 lg:pt-16">
        <div className="grid-site">
          <div className="col-span-12 lg:col-start-2 lg:col-span-10">
            <MetaList items={["HRM Realty", "Foundation spec sheet", "Phase 1 of 6", "September 2026"]} />
            <HorizonRule className="mt-6" />
            <h1 className="type-display-xl mt-10 lg:mt-14">The survey sheet</h1>
            <p className="type-lead mt-8 text-steel-dk lg:ml-[calc(100%/10*4)]">
              The visual system is the land survey drawing. Thin measured rules and tick marks carry information, the
              palette runs cold to warm down the page, and the sheet opens on empty land and closes on a home. This page
              renders the tokens so the art direction can be reviewed before any content is placed.
            </p>
          </div>
        </div>
      </Chapter>

      {/* Colour */}
      <Chapter id="colour" marker="Colour">
        <SectionHead
          title="Colour"
          note="A light site with dark chapters, not a dark site with an accent. Paper is the dominant surface."
        />
        <ul className="grid-site gap-y-10 [&>li]:col-span-6 lg:[&>li]:col-span-3">
          {SWATCH_ORDER.map((n) => (
            <Swatch key={n} name={n} />
          ))}
          <li className="flex flex-col gap-3">
            <div className="flex h-24 w-full items-center border border-tone px-4 lg:h-32">
              <div className="rule w-full" />
            </div>
            <p className="type-small">
              <span className="font-medium">rule</span>
              <span className="text-steel"> {RULES.rule.css}</span>
            </p>
            <p className="type-small text-steel">{RULES.rule.role} Inverse on ink: {RULES["rule-inv"].css}.</p>
          </li>
        </ul>

        <div className="grid-site mt-20">
          <div className="col-span-12 lg:col-start-2 lg:col-span-10">
            <h3 className="type-h3">Temperature arc</h3>
            <p className="type-body mt-3 text-steel-dk">
              Chapter surfaces in reading order. Cold chapters use steel, graphite and paper. The turn is the single most
              deliberate colour moment. Wheat appears nowhere before the Founder&rsquo;s vision and the residential chapter;
              its first appearance is an event. Measured against paper it reaches only {wheatOnPaper} to 1, which fails
              even for display sizes, so wheat is set on ink, or used on paper as rules and marks rather than as type.
            </p>
            <ol className="mt-8 grid grid-cols-2 border-l border-t border-tone md:grid-cols-4 lg:grid-cols-8">
              {ARC.map((c) => (
                <li
                  key={c.label}
                  className={cn(
                    "flex aspect-[3/4] flex-col justify-between border-b border-r border-tone p-3",
                    c.tone === "ink" ? "tone-ink" : "tone-paper",
                    c.temp === "warm" && c.tone === "paper" && "tone-paper-hi",
                  )}
                >
                  <span className={cn("type-micro", c.text)}>{c.label}</span>
                  <span className={cn("type-display-lg leading-none", c.text)} aria-hidden="true">
                    {c.temp === "turn" ? "◆" : "—"}
                  </span>
                  <span className={cn("type-micro opacity-70", c.text)}>{c.note}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="grid-site mt-20">
          <div className="col-span-12 lg:col-start-2 lg:col-span-10">
            <h3 className="type-h3">Contrast</h3>
            <p className="type-body mt-3 text-steel-dk">
              Ratios are computed from the token hex values at build time. AA is the floor for body text; large means 24px
              regular or 19px medium and up.
            </p>
            <div className="mt-6">
              <TokenTable
                nowrap={[1]}
                head={["Pair", "Ratio", "Use and verdict"]}
                rows={PAIRS.map((p) => {
                  const r = contrast(COLORS[p.fg].hex, COLORS[p.bg].hex);
                  const g = grade(r, p.large);
                  return [`${p.fg} on ${p.bg}`, `${r.toFixed(2)} : 1`, `${p.use}. ${g}${p.large ? " (large text)" : ""}`];
                })}
              />
            </div>
          </div>
        </div>
      </Chapter>

      {/* Dark chapter sample */}
      <Chapter id="dark-sample" marker="Dark chapter" tone="ink">
        <div className="grid-site">
          <div className="col-span-12 lg:col-start-2 lg:col-span-6">
            <div className="rule mb-6" />
            <h2 className="type-display-lg">A dark chapter on the sheet</h2>
            <p className="type-body mt-6 text-paper/80">
              Ink is a story ground, not the default surface. Rules invert to twenty percent paper, secondary type stays
              paper at eighty percent, and steel is reserved for linework because its contrast on ink fails for text.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button inverted>Enquire</Button>
              <TextLink href="#type" className="type-small self-center">
                A link in a dark chapter
              </TextLink>
            </div>
          </div>
          <div className="col-span-12 mt-12 lg:col-start-9 lg:col-span-4 lg:mt-0">
            <p className="type-micro text-paper/60">Warm dark chapter, for reference only</p>
            <p className="type-display-lg mt-4 text-wheat">Wheat</p>
            <div className="mt-4 h-px w-2/3 bg-wheat" />
            <p className="type-small mt-4 text-paper/80">
              Display type and rules, on ink ({wheatOnInk} to 1). Not as type on paper.
            </p>
          </div>
        </div>
      </Chapter>

      {/* Type */}
      <Chapter id="type" marker="Type">
        <SectionHead
          title="Type"
          note="Two families. Fraunces for display with wonk and soft pinned to zero; Switzer for everything else. Headings are sentence case in the markup."
        />
        <ol className="flex flex-col">
          {TYPE_ROWS.map((row) => {
            const Tag = row.tag;
            return (
              <li key={row.name} className="grid-site border-t border-tone py-8 lg:py-10">
                <div className="col-span-12 lg:col-span-2">
                  <p className="type-micro text-steel">{row.name}</p>
                  <MetaList items={row.spec} className="mt-1 text-steel/80" />
                </div>
                <div className="col-span-12 mt-4 lg:col-start-3 lg:col-span-9 lg:mt-0">
                  <Tag className={row.cls}>{row.sample}</Tag>
                </div>
              </li>
            );
          })}
        </ol>

        <div className="grid-site mt-16 border-t border-tone pt-10">
          <div className="col-span-12 lg:col-start-2 lg:col-span-5">
            <h3 className="type-h3">Case</h3>
            <p className="type-body mt-3 text-steel-dk">
              The deck writes section headers in capitals. That is a writing convention in the document, not a design
              instruction. Initialisms keep their capitals.
            </p>
          </div>
          <dl className="col-span-12 mt-6 grid grid-cols-2 gap-6 lg:col-start-7 lg:col-span-6 lg:mt-0">
            <div>
              <dt className="type-micro text-steel">In the deck</dt>
              <dd className="type-h3 mt-2 text-steel">THE HRM ECOSYSTEM</dd>
            </div>
            <div>
              <dt className="type-micro text-steel">On the site</dt>
              <dd className="type-h3 mt-2">The HRM ecosystem</dd>
            </div>
          </dl>
        </div>
      </Chapter>

      {/* Figures */}
      <Chapter id="figures" marker="Figures" tone="paper-hi">
        <SectionHead
          title="Figures"
          note="Tabular lining numerals. Labels sit below and left of the number, never centred under it. The unit rule under each number is proportional to its magnitude on a log scale, so the block reads as a bar chart without announcing itself as one."
        />
        <div className="grid-site">
          <div className="col-span-12 lg:col-start-2 lg:col-span-10">
            <StatBlock />
            <p className="type-small mt-10 text-steel">
              In Phase 4 the numbers are tied to scroll progress and snap to their final values. The 100+ label is not in
              the brief and is left as a visible placeholder until the deck arrives.
            </p>
          </div>
        </div>
      </Chapter>

      {/* Linework */}
      <Chapter id="linework" marker="Linework">
        <SectionHead
          title="Linework"
          note="Rules and tick marks are information, not decoration. Everything is drawn at one pixel in the survey style."
        />
        <div className="grid-site gap-y-14">
          <div className="col-span-12 lg:col-start-2 lg:col-span-5">
            <p className="type-micro text-steel">Measured scale</p>
            <div className="mt-4 text-steel-dk">
              <ScaleBar />
            </div>
          </div>
          <div className="col-span-12 lg:col-start-8 lg:col-span-4">
            <p className="type-micro text-steel">Plot demarcation, the icon style</p>
            <div className="mt-4">
              <PlotMark />
            </div>
          </div>
          <div className="col-span-12 lg:col-start-2 lg:col-span-10">
            <p className="type-micro text-steel">A list with rules between, not a dot string</p>
            <ul className="mt-4 flex flex-wrap">
              {ECOSYSTEM_LIST.map((item, i) => (
                <li
                  key={item}
                  className={cn(
                    "type-h3 border-t border-tone py-3 pr-6",
                    i > 0 && "lg:border-l lg:pl-6",
                    "basis-1/2 lg:basis-auto",
                  )}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-12 lg:col-start-2 lg:col-span-10">
            <p className="type-micro text-steel">Chapter rail</p>
            <p className="type-body mt-3 text-steel-dk">
              On screens of 1024px and wider a 32px rail runs down the left margin of every chapter, with a tick and a
              sentence-case marker at each chapter start. It scrolls with the content and never floats. You are looking at
              it now, to the left of this text.
            </p>
          </div>
        </div>
      </Chapter>

      {/* Layout */}
      <Chapter id="layout" marker="Layout">
        <SectionHead
          title="Layout"
          note="Container 1440px, twelve columns, 24px gutter, 64px margins on desktop and 20px on mobile. Left-aligned and asymmetric by default."
        />
        <div className="grid-site relative">
          <div className="pointer-events-none absolute inset-0 grid-site" aria-hidden="true">
            {Array.from({ length: 12 }, (_, i) => (
              <div key={i} className="h-full border-x border-tone/60 bg-ink/[0.025]" />
            ))}
          </div>
          <div className="col-span-12 py-10 lg:col-start-2 lg:col-span-6">
            <p className="type-micro text-steel">Columns 2 to 7</p>
            <p className="type-body mt-3">
              Text sits in columns two to seven or six to twelve. It never spans one to twelve, which is what makes the
              sheet feel measured rather than templated.
            </p>
          </div>
          <div className="col-span-12 py-10 lg:col-start-6 lg:col-span-7">
            <p className="type-micro text-steel">Columns 6 to 12</p>
            <p className="type-body mt-3">
              The second column of text steps right, leaving the left of the sheet open for a tick, a figure or nothing.
            </p>
          </div>
        </div>

        <div className="mt-16 grid-site gap-y-10">
          <div className="col-span-12 lg:col-start-2 lg:col-span-10">
            <p className="type-micro text-steel">Image bleeding off one edge only</p>
          </div>
          <div className="col-span-12 lg:col-start-6 lg:col-span-7 lg:-mr-[var(--site-margin)]">
            <Placeholder image={image("sonipat-industrial")} sizes="(min-width: 1024px) 60vw, 100vw" />
          </div>
        </div>
        <div className="-mx-[var(--site-margin)] mt-10">
          <p className="type-micro mb-4 px-[var(--site-margin)] text-steel">Full bleed</p>
          <Placeholder image={image("residential-land")} />
        </div>

        <div className="grid-site mt-16">
          <div className="col-span-12 lg:col-start-2 lg:col-span-10">
            <TokenTable
              head={["Token", "Desktop", "Mobile"]}
              rows={[
                ["Container", "1440px max", "100%"],
                ["Columns and gutter", "12 columns, 24px", "12 columns, 16px"],
                ["Side margin", "64px", "20px"],
                ["Left rail", "32px, from 1024px", "hidden"],
                ["Chapter spacing", "160px", "80px"],
                ["Vertical rhythm", "8px base", "8px base"],
              ]}
            />
          </div>
        </div>
      </Chapter>

      {/* Motion */}
      <Chapter id="motion" marker="Motion" tone="ink">
        <SectionHead
          title="Motion"
          note="A small quiet baseline plus seven set-pieces. Nothing here moves yet except the horizon rule at the top of the sheet, which proves the GSAP and Lenis provider is wired."
        />
        <div className="grid-site gap-y-14">
          <div className="col-span-12 lg:col-start-2 lg:col-span-5">
            <p className="type-micro text-paper/60">Tokens</p>
            <div className="mt-4 text-paper">
              <TokenTable
                head={["Token", "Cold", "Warm (×1.35)"]}
                rows={[
                  ["Reveal ease", EASE.reveal, warm.reveal],
                  ["Move ease", EASE.move, warm.move],
                  ["Scrub ease", EASE.scrub, EASE.scrub],
                  ["micro", `${DUR.micro}s`, `${warm.dur.micro}s`],
                  ["reveal", `${DUR.reveal}s`, `${warm.dur.reveal}s`],
                  ["hero", `${DUR.hero}s`, `${warm.dur.hero}s`],
                  ["chapter", `${DUR.chapter}s`, `${warm.dur.chapter}s`],
                  ["stagger", `${STAGGER}s`, `${warm.stagger}s`],
                ]}
              />
            </div>
          </div>
          <div className="col-span-12 lg:col-start-8 lg:col-span-4">
            <p className="type-micro text-paper/60">Baseline, Phase 3</p>
            <ul className="mt-4 flex flex-col divide-y divide-rule-inv type-small text-paper/85">
              <li className="py-3">Headlines: mask-slide by line, 105% to 0, stagger {cold.stagger}s, expo.out.</li>
              <li className="py-3">Body: opacity only, 0.4s.</li>
              <li className="py-3">Images: clip-path wipe along the grid axis with a 1.06 to 1 scale, 0.9s.</li>
              <li className="py-3">Rules: scaleX from the left, 0.6s.</li>
              <li className="py-3">Links: underline draws from the left, 0.25s.</li>
              <li className="py-3">Buttons: fill from the bottom edge, 0.3s.</li>
            </ul>
          </div>
          <div className="col-span-12 lg:col-start-2 lg:col-span-10">
            <p className="type-micro text-paper/60">Live primitives (CSS only, transform and opacity)</p>
            <div className="mt-6 flex flex-wrap items-center gap-8">
              <Button inverted>Button on ink</Button>
              <TextLink href="#colour" className="type-body">
                Link with drawn underline
              </TextLink>
            </div>
          </div>
          <div className="col-span-12 lg:col-start-2 lg:col-span-10">
            <p className="type-micro text-paper/60">Reduced motion</p>
            <p className="type-body mt-3 text-paper/85">
              Lenis is created with respectReducedMotion so smoothing switches off, and every GSAP piece runs inside
              gsap.matchMedia with a reduce branch that presents the complete experience statically. No pins, no scrubs.
            </p>
          </div>
        </div>
      </Chapter>

      {/* Primitives on paper */}
      <Chapter id="primitives" marker="Primitives">
        <SectionHead title="Primitives on paper" note="The same button and link on the dominant surface, plus the image slot." />
        <div className="grid-site gap-y-12">
          <div className="col-span-12 flex flex-wrap items-center gap-8 lg:col-start-2 lg:col-span-6">
            <Button>Enquire</Button>
            <ButtonLink href="/">Button as link</ButtonLink>
            <TextLink href="#head" className="type-body">
              Back to the top of the sheet
            </TextLink>
          </div>
          <div className="col-span-12 lg:col-start-2 lg:col-span-4">
            <Placeholder image={image("founder-site")} sizes="(min-width: 1024px) 30vw, 100vw" />
          </div>
          <div className="col-span-12 lg:col-start-7 lg:col-span-5">
            <p className="type-body text-steel-dk">
              Every image slot is typed in the manifest with its subject, aspect and grade. The placeholder carries the
              manifest id so a shoot can be dropped in without touching layout. Blacks are lifted to ink by compositing
              the photograph over ink at 94% rather than by a filter.
            </p>
            <p className="type-small mt-4 text-steel">
              {Object.keys(IMAGES).length} slots in the manifest.
            </p>
          </div>
        </div>
      </Chapter>

      {/* Audit */}
      <Chapter id="audit" marker="Audit" tone="paper-hi">
        <SectionHead title="Audit against the banned list" note="Checked at the end of every phase. Anything present is fixed before the next phase begins." />
        <div className="grid-site">
          <div className="col-span-12 lg:col-start-2 lg:col-span-10">
            <ul className="flex flex-col divide-y divide-rule border-y border-tone">
              {BANNED.map((b) => (
                <li key={b.item} className="grid gap-2 py-4 lg:grid-cols-2 lg:gap-6">
                  <span className="type-small font-medium">{b.item}</span>
                  <span className="type-small text-steel-dk">{b.status}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Chapter>

      {/* Open items */}
      <Chapter id="open" marker="Open items">
        <SectionHead title="Open items for the client" note="Raised, not silently fixed." />
        <div className="grid-site">
          <div className="col-span-12 lg:col-start-2 lg:col-span-10">
            <TokenTable head={["Issue", "Where", "Note"]} rows={COPY_ISSUES.map((c) => [c.issue, c.where, c.note])} />
            <p className="type-body mt-10 text-steel-dk">
              The copy deck was not supplied alongside the build prompt. Phases 2 to 6 need it verbatim; nothing on this
              sheet beyond the fragments quoted in the brief is client copy.
            </p>
          </div>
        </div>
        <div className="mt-24 text-center">
          <p className="type-micro text-steel">End of sheet</p>
        </div>
      </Chapter>
    </main>
  );
}
