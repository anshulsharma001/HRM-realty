import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og";
import { FOUNDER } from "@/content";

export const alt = FOUNDER.hero.name;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogCard({ title: FOUNDER.hero.title, subtitle: FOUNDER.hero.name });
}
