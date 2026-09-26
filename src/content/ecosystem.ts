import type { EcosystemCategory } from "./types";

export const ECOSYSTEM_INTRO = {
  title: "More than real estate",
  paragraph:
    "HRM's story cannot be understood through real estate alone. The wider ecosystem reflects a belief that meaningful development must support the needs of a growing city.",
} as const;

export const ECOSYSTEM: readonly EcosystemCategory[] = [
  {
    slug: "education",
    image: "journey-university",
    name: "Education",
    items: [
      { name: "CBSE K–12 Schools", description: "Creating strong foundations for the next generation." },
      { name: "Colleges", description: "Expanding access to higher education and professional development." },
      { name: "University", description: "Building institutions that contribute to the intellectual and social development of the region." },
    ],
  },
  {
    slug: "industry",
    image: "ecosystem-industry",
    name: "Industry",
    items: [{ name: "Food Processing", description: "Continuing the entrepreneurial and manufacturing foundation of the legacy." }],
  },
  {
    slug: "hospitality",
    image: "journey-hospitality",
    name: "Hospitality",
    items: [{ name: "Luxury Four-Star Resort", description: "Creating a destination for business, leisure and hospitality." }],
  },
  {
    slug: "logistics",
    image: "journey-logistics",
    name: "Logistics",
    items: [{ name: "20+ Acre Logistics Park", description: "Supporting the movement of goods and businesses across a growing regional economy." }],
  },
  {
    slug: "commercial",
    image: "project-commercial-arcade",
    name: "Commercial",
    items: [
      { name: "Commercial Spaces", description: "Creating environments where businesses can establish themselves, connect with customers and grow." },
    ],
  },
  {
    slug: "community",
    image: "community-family",
    name: "Community",
    items: [
      {
        name: "Temple & Community Infrastructure",
        description: "Recognising that cities are built not only around economic activity, but around people and their communities.",
      },
    ],
  },
];
