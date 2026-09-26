import { PageHero } from "@/components/primitives/PageHero";
import { SONIPAT } from "@/content";

export function SonipatHero() {
  return <PageHero marker="Sonipat" title={SONIPAT.hero.title} subtitle={SONIPAT.hero.subtitle} />;
}
