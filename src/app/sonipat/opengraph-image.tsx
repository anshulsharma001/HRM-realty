import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og";
import { SONIPAT } from "@/content";

export const alt = SONIPAT.hero.title;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogCard({ title: SONIPAT.hero.title, subtitle: SONIPAT.hero.subtitle });
}
