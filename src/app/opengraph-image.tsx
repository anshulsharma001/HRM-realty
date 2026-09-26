import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og";
import { SITE } from "@/content";

export const alt = SITE.tagline;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogCard({ title: SITE.tagline, subtitle: undefined, footer: null });
}
