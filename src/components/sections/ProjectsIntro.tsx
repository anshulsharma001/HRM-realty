import { PageHero } from "@/components/primitives/PageHero";
import { PROJECTS_INTRO } from "@/content";

export function ProjectsIntro() {
  return <PageHero marker="Developments" title={PROJECTS_INTRO.title} paragraphs={[PROJECTS_INTRO.paragraph]} />;
}
