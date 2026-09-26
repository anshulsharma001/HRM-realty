import type { Cta } from "./types";
import type { ImageId } from "./images";

export const HERO = {
  title: "HRM Realty", // rendered in capitals by CSS, as the deck writes it
  lead: "Building the Future of Sonipat",
  /** Deck copy from "The evolving story of Sonipat", reused here as the hero's supporting line. */
  paragraph:
    "From helping shape Sonipat's industrial landscape to building institutions, businesses and communities, the Mangla journey has always been about creating opportunities for people and places to grow.",
  /** Both deck CTAs: the second now points at the founder's vision instead of duplicating the first. */
  ctas: [
    { label: "Explore our journey", href: "/sonipat" },
    { label: "Discover Our Vision", href: "/founder#vision" },
  ] satisfies readonly Cta[],
} as const;

export const NAME_REVEAL = {
  opening: ["A name can be inherited.", "A legacy has to be earned. And a commitment has to be lived."],
  letters: [
    { letter: "H", name: "Hari", line: "The vision that started the journey", portrait: "founder-site" as ImageId },
    { letter: "R", name: "Rahul", line: "The next generation carrying that vision forward", portrait: "portrait-rahul" as ImageId },
    { letter: "M", name: "Mangla", line: "More than a surname. A commitment.", portrait: null },
  ],
  /** Five commitment lines under M. M carries no portrait: this copy is the portrait. */
  commitments: [
    "A commitment to the values, relationships, reputation and responsibility built across generations.",
    "A commitment to stand by our word.",
    "A commitment to build with integrity.",
    "A commitment to create opportunities that deliver lasting value.",
    "A commitment to leave every generation with something stronger than what it inherited.",
  ],
} as const;

export const EVOLVING_STORY = {
  title: "The evolving story of Sonipat",
  subtitle: "Three decades of vision. One enduring commitment to Sonipat.",
  paragraphs: [
    "From helping shape Sonipat's industrial landscape to building institutions, businesses and communities, the Mangla journey has always been about creating opportunities for people and places to grow.",
    "Today, HRM Realty carries that journey into its next chapter — building not just developments, but a more connected, vibrant and liveable Sonipat.",
  ],
  cta: { label: "Explore our journey", href: "/sonipat" } satisfies Cta,
  // The deck also offers "Discover Our Vision" to the same destination; one CTA is used. Flagged.
} as const;

export const MAP_TEASER = {
  cta: { label: "Development of Sonipat", href: "/sonipat" } satisfies Cta,
} as const;
