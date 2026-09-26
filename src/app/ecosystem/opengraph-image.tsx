import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og";
import { ECOSYSTEM_INTRO } from "@/content";

export const alt = ECOSYSTEM_INTRO.title;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogCard({ title: ECOSYSTEM_INTRO.title, subtitle: undefined });
}
