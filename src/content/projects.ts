import type { NamedLine, Project } from "./types";
import { SONIPAT } from "./sonipat";

export const PROJECTS_INTRO = {
  title: "Developments with purpose",
  paragraph:
    "The HRM Realty portfolio represents individual chapters of a larger story. Each development is created with a purpose — to support businesses, enable opportunity and contribute to the growth of Sonipat.",
} as const;

export const PROJECTS: readonly Project[] = [
  {
    slug: "hrm-industrial-estate",
    name: "HRM Industrial Estate",
    tagline: "Industrial infrastructure built for business",
    acres: 20,
    acresDisplay: "20 Acres",
    description:
      "A planned industrial development created for businesses seeking connectivity, organised infrastructure and room to grow.",
    highlights: [
      "Planned internal roads",
      "Industrial infrastructure",
      "Security provisions",
      "Utility infrastructure",
      "Strategic connectivity",
      "Business-oriented planning",
    ],
    image: "project-industrial-estate",
  },
  {
    slug: "hrm-commercial-arcade",
    name: "HRM Commercial Arcade",
    tagline: "A commercial address built for visibility",
    acres: 5,
    acresDisplay: "5 Acres",
    description:
      "A modern commercial development designed for businesses, retailers and investors seeking a well-positioned commercial opportunity in Sonipat.",
    highlights: [
      "Strategic location",
      "Modern commercial planning",
      "Customer accessibility",
      "Parking provisions",
      "High-visibility environment",
      "Retail and commercial potential",
    ],
    image: "project-commercial-arcade",
  },
];

export const WHY_HRM = {
  heading: "Experience you can build on",
  reasons: [
    { name: "30+ years of experience", description: "Three decades of understanding land, markets, infrastructure and development." },
    { name: "Deep Sonipat roots", description: "Our relationship with Sonipat goes beyond business. It is part of our history." },
    {
      name: "Multi-sector experience",
      description: "Experience across industry, education, hospitality, logistics, commercial development and more.",
    },
    { name: "A long-term approach", description: "We think beyond the immediate transaction and focus on lasting value." },
    { name: "Relationship-led", description: "Our reputation has been built through generations of relationships." },
    { name: "Built for the next generation", description: "The legacy gives us the foundation. Modern thinking gives us the direction." },
  ] satisfies readonly NamedLine[],
} as const;

export const RESIDENTIAL = {
  hero: {
    title: "A home for all",
    subtitle: "The next chapter of the Mangla vision",
    /** Deck copy, reused from the Sonipat journey's closing paragraph: the deck has no residential intro of its own. */
    paragraph: SONIPAT.journey.closing,
  },
  homeIsMore: {
    heading: "A home is more than four walls",
    /** Six clauses, one per line, as the deck sets them. */
    clauses: [
      "A home is where children grow.",
      "Where families celebrate.",
      "Where dreams become plans.",
      "Where generations create memories.",
      "Where people feel safe.",
      "Where success finally feels real.",
    ],
    paragraph:
      "That is why the next chapter of HRM is not simply about developing residential plots. It is about creating communities people are proud to call home.",
  },
  qualities: {
    heading: "Homes that bring together:",
    items: [
      "Thoughtful planning",
      "Quality construction",
      "Modern amenities",
      "Good infrastructure",
      "Security",
      "Green spaces",
      "Community living",
      "Dignity of ownership",
    ],
    closing: "All while remaining accessible to the families who call Sonipat home.",
  },
} as const;
