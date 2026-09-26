import type { IconName } from "@/lib/icons";

/**
 * Which line icon sits beside which deck line. Keyed by the exact copy so the
 * content files stay pure text; anything unmapped falls back to a plot mark.
 */
const ICON_FOR: Record<string, IconName> = {
  // Home qualities
  "Thoughtful planning": "plan",
  "Quality construction": "bricks",
  "Modern amenities": "amenities",
  "Good infrastructure": "road",
  Security: "shield",
  "Green spaces": "leaf",
  "Community living": "houses",
  "Dignity of ownership": "key",
  // Values
  Integrity: "shield-check",
  Quality: "gem",
  Trust: "handshake",
  Vision: "eye",
  Responsibility: "scale",
  "Long-term value": "hourglass",
  // Why HRM
  "30+ years of experience": "calendar",
  "Deep Sonipat roots": "roots",
  "Multi-sector experience": "layers",
  "A long-term approach": "horizon",
  "Relationship-led": "handshake",
  "Built for the next generation": "seedling",
  // Industrial estate highlights
  "Planned internal roads": "road",
  "Industrial infrastructure": "pylon",
  "Security provisions": "shield",
  "Utility infrastructure": "bolt",
  "Strategic connectivity": "network",
  "Business-oriented planning": "compass",
  // Commercial arcade highlights
  "Strategic location": "pin",
  "Modern commercial planning": "plan",
  "Customer accessibility": "door",
  "Parking provisions": "parking",
  "High-visibility environment": "eye",
  "Retail and commercial potential": "bag",
  // Ecosystem items
  "CBSE K–12 Schools": "school",
  Colleges: "college",
  University: "university",
  "Food Processing": "silos",
  "Luxury Four-Star Resort": "resort",
  "20+ Acre Logistics Park": "truck",
  "Commercial Spaces": "storefront",
  "Temple & Community Infrastructure": "temple",
  // Team: the opportunity chain
  "A school serves families.": "school",
  "A university educates young people.": "college",
  "A factory supports workers and suppliers.": "factory",
  "A commercial development enables entrepreneurs.": "storefront",
  "A logistics park supports trade.": "truck",
  "A hospitality destination creates employment and brings people together.": "resort",
  // Contact: a city where
  "People can work.": "briefcase",
  "People can learn.": "book",
  "Businesses can grow.": "growth",
  "Families can build their future.": "home",
  // Contact details and footer
  Phone: "phone",
  Call: "phone",
  Email: "mail",
  "Corporate Office": "building",
  Visit: "building",
  "Office Hours": "clock",
};

export function iconFor(label: string): IconName {
  return ICON_FOR[label] ?? "plot";
}
