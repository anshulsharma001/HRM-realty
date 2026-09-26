import type { Stat } from "./types";

export const STATS_HEADING = "A journey measured in more than years";

/** Set as a list with rules between items, never as a dot string. */
export const STATS_CATEGORIES = ["Industry", "Education", "Hospitality", "Logistics", "Commercial", "Community"] as const;

/** Five figures, verbatim from the deck. */
export const STATS: readonly Stat[] = [
  { value: 30, display: "30+", unit: "Years", label: "A strong legacy" },
  { value: 1000, display: "1,000+", unit: "Acres", label: "Industrial development in and around Sonipat" },
  { value: 10000, display: "10,000+", label: "Factories & industrial establishments" },
  { value: 1000, display: "1,000+", label: "Members of HRM family" },
  { value: 100, display: "100+", label: "Projects & Developments" },
];
