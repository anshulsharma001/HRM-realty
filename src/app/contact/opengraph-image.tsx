import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og";
import { CONTACT } from "@/content";

export const alt = CONTACT.hero.title;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogCard({ title: CONTACT.hero.title, subtitle: undefined });
}
