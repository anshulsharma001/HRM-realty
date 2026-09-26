import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og";
import { TEAM } from "@/content";

export const alt = TEAM.intro.title;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogCard({ title: TEAM.intro.title, subtitle: TEAM.intro.subtitle });
}
