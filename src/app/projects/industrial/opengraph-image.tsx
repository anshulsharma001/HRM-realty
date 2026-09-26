import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og";
import { PROJECTS, PROJECTS_INTRO } from "@/content";

export const alt = PROJECTS_INTRO.title;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogCard({ title: PROJECTS_INTRO.title, subtitle: `${PROJECTS[0].name}. ${PROJECTS[1].name}.` });
}
