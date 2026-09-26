/**
 * Colour tokens (§2.3). The CSS source of truth is src/app/globals.css;
 * this mirror exists for build-time uses (OG images, contrast tables).
 * Keep the two in sync.
 */
export const COLORS = {
  ink: { hex: "#12100D", role: "Warm soil-black. Story ground, not the default surface." },
  paper: { hex: "#E4E1D6", role: "Grey-linen survey sheet. Dominant surface." },
  "paper-hi": { hex: "#F2F0E9", role: "Inset panels, form fields." },
  steel: { hex: "#56606A", role: "Industrial cold. Rules, linework, secondary type." },
  "steel-dk": { hex: "#333B42", role: "Darker steel for cold-chapter emphasis." },
  wheat: { hex: "#C9A24B", role: "Warm. Residential and vision chapters only. Display type and rules, never small body text on paper." },
  soil: { hex: "#6B563C", role: "Mid-tone for the warm half." },
} as const;

export type ColorName = keyof typeof COLORS;

export const RULES = {
  rule: { css: "rgba(18, 16, 13, 0.16)", role: "Hairline on paper." },
  "rule-inv": { css: "rgba(228, 225, 214, 0.20)", role: "Hairline on ink." },
} as const;
