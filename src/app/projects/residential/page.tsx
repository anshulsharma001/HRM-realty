import type { Metadata } from "next";
import { ResidentialHero } from "@/components/sections/ResidentialHero";
import { ResidentialLand } from "@/components/sections/ResidentialLand";
import { HomeIsMore } from "@/components/sections/HomeIsMore";
import { HomeQualities } from "@/components/sections/HomeQualities";
import { ResidentialEnquiry } from "@/components/sections/ResidentialEnquiry";
import { RESIDENTIAL } from "@/content";

export const metadata: Metadata = {
  title: `${RESIDENTIAL.hero.title} | ${RESIDENTIAL.hero.subtitle}`,
  description: `${RESIDENTIAL.homeIsMore.heading} ${RESIDENTIAL.qualities.closing}`,
  alternates: { canonical: "/projects/residential" },
};

export default function ResidentialPage() {
  return (
    <>
      <ResidentialHero />
      <ResidentialLand />
      <HomeIsMore />
      <HomeQualities />
      <ResidentialEnquiry />
    </>
  );
}
