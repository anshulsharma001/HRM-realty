import type { Metadata } from "next";
import { SonipatHero } from "@/components/sections/SonipatHero";
import { SonipatIntro } from "@/components/sections/SonipatIntro";
import { TransformationChain } from "@/components/sections/TransformationChain";
import { JourneyEvolves } from "@/components/sections/JourneyEvolves";
import { TheTurn } from "@/components/sections/TheTurn";
import { SonipatMap } from "@/components/sections/SonipatMap";
import { SONIPAT } from "@/content";

export const metadata: Metadata = {
  title: SONIPAT.hero.title,
  description: `${SONIPAT.hero.subtitle}. ${SONIPAT.turn.join(" ")}`,
  alternates: { canonical: "/sonipat" },
};

export default function SonipatPage() {
  return (
    <>
      <SonipatHero />
      <SonipatIntro />
      <TransformationChain />
      <JourneyEvolves />
      <TheTurn />
      <SonipatMap />
    </>
  );
}
