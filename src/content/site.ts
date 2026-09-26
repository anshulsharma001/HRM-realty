import type { Cta } from "./types";

/** Canonical origin. Set NEXT_PUBLIC_SITE_URL on Vercel; the client has not supplied the domain. */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const SITE = {
  name: "HRM Realty",
  tagline: "Building the Future of Sonipat",
  sinceLine: "Building Sonipat's future since 1994.",
  legal: "© 2026 HRM Realty. All Rights Reserved.",
  brand: {
    names: "Hari. Rahul. Mangla.", // set in capitals by CSS, as the deck writes it
    line: "More than a name. A commitment.",
    /** From the logo lockup, not the deck: set in capitals by CSS as the logo does. */
    tagline: "Trust. Vision. Value.",
    paragraph:
      "Building on more than three decades of experience, HRM Realty continues to create opportunities that contribute to the growth of Sonipat and the wider region.",
  },
  /** Footer contact column labels, as the deck writes them. */
  footerContact: { title: "Contact", call: "Call", email: "Email", visit: "Visit" },
} as const;

export const NAV: readonly Cta[] = [
  { label: "Founder", href: "/founder" },
  { label: "Sonipat", href: "/sonipat" },
  { label: "Ecosystem", href: "/ecosystem" },
  { label: "Industrial", href: "/projects/industrial" },
  { label: "Residential", href: "/projects/residential" },
  { label: "Team", href: "/team" },
  { label: "Contact", href: "/contact" },
];

/**
 * Footer columns as the deck lists them. Labels without a route of their own
 * point at the nearest existing page: About HRM at the home page, Our Legacy at
 * the Sonipat story, Our Values at the values chapter, Leadership at the team,
 * Future Opportunities at the residential interest register, Food Processing
 * at the Industry entry of the ecosystem index.
 */
export const FOOTER_COLUMNS: ReadonlyArray<{ title: string; links: Cta[] }> = [
  {
    title: "Company",
    links: [
      { label: "About HRM", href: "/" },
      { label: "Our Founder", href: "/founder" },
      { label: "Our Legacy", href: "/sonipat" },
      { label: "Our Values", href: "/ecosystem#values" },
      { label: "Leadership", href: "/team" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Developments",
    links: [
      { label: "HRM Industrial Estate", href: "/projects/industrial#hrm-industrial-estate" },
      { label: "HRM Commercial Arcade", href: "/projects/industrial#hrm-commercial-arcade" },
      { label: "Residential Developments", href: "/projects/residential" },
      { label: "Future Opportunities", href: "/projects/residential#enquire" },
    ],
  },
  {
    title: "HRM Ecosystem",
    links: [
      { label: "Education", href: "/ecosystem#education" },
      { label: "Hospitality", href: "/ecosystem#hospitality" },
      { label: "Food Processing", href: "/ecosystem#industry" },
      { label: "Logistics", href: "/ecosystem#logistics" },
      { label: "Commercial", href: "/ecosystem#commercial" },
      { label: "Community", href: "/ecosystem#community" },
    ],
  },
];
