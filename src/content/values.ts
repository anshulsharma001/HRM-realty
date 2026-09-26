import type { NamedLine } from "./types";

export const VALUES_HEADING = "Our values";

/** Six values with one line each. Not a sequence: no numbering. */
export const VALUES: readonly NamedLine[] = [
  { name: "Integrity", description: "Clear communication, transparent dealings and responsible commitments." },
  { name: "Quality", description: "Attention to planning, infrastructure, construction and execution." },
  { name: "Trust", description: "Relationships that continue long after a transaction." },
  { name: "Vision", description: "Thinking beyond today's opportunity and building for tomorrow." },
  { name: "Responsibility", description: "Understanding that development changes people's lives." },
  { name: "Long-term value", description: "Making decisions with a perspective measured in generations, not quarters." },
];
