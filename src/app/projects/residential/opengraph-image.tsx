import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og";
import { RESIDENTIAL } from "@/content";

export const alt = RESIDENTIAL.hero.title;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogCard({ title: RESIDENTIAL.hero.title, subtitle: RESIDENTIAL.hero.subtitle });
}
