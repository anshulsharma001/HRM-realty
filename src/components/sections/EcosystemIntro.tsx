import { PageHero } from "@/components/primitives/PageHero";
import { ECOSYSTEM_INTRO } from "@/content";

export function EcosystemIntro() {
  return <PageHero marker="The ecosystem" title={ECOSYSTEM_INTRO.title} paragraphs={[ECOSYSTEM_INTRO.paragraph]} />;
}
