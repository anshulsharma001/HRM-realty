import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { NameReveal } from "@/components/sections/NameReveal";
import { EvolvingStory } from "@/components/sections/EvolvingStory";
import { Stats } from "@/components/sections/Stats";
import { MapTeaser } from "@/components/sections/MapTeaser";
import { EVOLVING_STORY, SITE } from "@/content";

export const metadata: Metadata = {
  title: { absolute: `${SITE.name} | ${SITE.tagline}` },
  description: `${EVOLVING_STORY.subtitle} ${SITE.tagline}.`,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <NameReveal />
      <EvolvingStory />
      <Stats />
      <MapTeaser />
    </>
  );
}
