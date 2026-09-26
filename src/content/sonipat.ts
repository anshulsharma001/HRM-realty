import type { ChainSegment, Cta } from "./types";

export const SONIPAT = {
  hero: { title: "Development of Sonipat", subtitle: "From land to livelihoods to lives" },
  intro:
    "Sonipat's industrial growth has been shaped by thousands of entrepreneurs who chose to build their businesses here. HRM's industrial developments helped provide them with the infrastructure and opportunity to take that first step — turning land into workplaces, businesses and livelihoods, and becoming part of Sonipat's larger growth story.",
  transformation: {
    heading: "The transformation",
    closing:
      "What began with the development of industrial land became part of something much larger — the economic and social growth of a city.",
    cta: { label: "Explore industrial projects", href: "/projects/industrial" } satisfies Cta,
  },
  journey: {
    title: "The journey evolves",
    subtitle: "From industrial development to community development",
    paragraphs: [
      "The journey did not stop with industry.",
      "As Sonipat grew, so did the vision of what development could mean.",
      "For decades, the focus was on creating places where businesses could start, operate and grow. But a growing city needs more than places to work. It needs places to learn, live, connect, grow and prosper.",
      "And that is where the next chapter of the HRM journey begins.",
    ],
    transitions: [
      "From creating industrial opportunity to creating a complete ecosystem.",
      "From workplaces to institutions.",
      "From infrastructure to communities.",
      "From enabling businesses to enabling lives.",
    ],
    closing:
      "Today, HRM Realty is taking that evolution forward by entering the development of residential spaces — creating homes and communities that become an integral part of the city we have been helping build.",
    cta: { label: "Explore residential projects", href: "/projects/residential" } satisfies Cta,
  },
  turn: ["We helped build the places where Sonipat works.", "Now, we are building the places where Sonipat lives."],
} as const;

/**
 * Eight beats. Each shared phrase carries the same data-chain value (c1–c7) at
 * the tail of one beat and the head of the next, so the Flip animation later
 * reads its pairs straight out of the DOM.
 */
export const TRANSFORMATION_CHAIN: readonly ChainSegment[][] = [
  [{ text: "Land became " }, { text: "industrial opportunity", chain: "c1", role: "tail" }, { text: "." }],
  [{ text: "Industrial opportunity", chain: "c1", role: "head" }, { text: " became " }, { text: "factories", chain: "c2", role: "tail" }, { text: "." }],
  [{ text: "Factories", chain: "c2", role: "head" }, { text: " became " }, { text: "businesses", chain: "c3", role: "tail" }, { text: "." }],
  [{ text: "Businesses", chain: "c3", role: "head" }, { text: " created " }, { text: "employment", chain: "c4", role: "tail" }, { text: "." }],
  [{ text: "Employment", chain: "c4", role: "head" }, { text: " created " }, { text: "livelihoods", chain: "c5", role: "tail" }, { text: "." }],
  [{ text: "Livelihoods", chain: "c5", role: "head" }, { text: " gave " }, { text: "families", chain: "c6", role: "tail" }, { text: " the means to grow." }],
  [{ text: "Families", chain: "c6", role: "head" }, { text: " became " }, { text: "communities", chain: "c7", role: "tail" }, { text: "." }],
  [{ text: "And " }, { text: "communities", chain: "c7", role: "head" }, { text: " helped transform Sonipat." }],
];
