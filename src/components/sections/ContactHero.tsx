import { PageHero } from "@/components/primitives/PageHero";
import { CONTACT } from "@/content";

export function ContactHero() {
  return <PageHero marker="Contact" title={CONTACT.hero.title} paragraphs={[CONTACT.hero.paragraph]} />;
}
