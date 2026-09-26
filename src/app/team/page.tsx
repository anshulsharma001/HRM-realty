import type { Metadata } from "next";
import { TeamIntro } from "@/components/sections/TeamIntro";
import { OpportunityChain } from "@/components/sections/OpportunityChain";
import { TEAM } from "@/content";

export const metadata: Metadata = {
  title: `Team HRM | ${TEAM.intro.title}`,
  description: `${TEAM.intro.subtitle}. ${TEAM.closing.join(" ")}`,
  alternates: { canonical: "/team" },
};

export default function TeamPage() {
  return (
    <>
      <TeamIntro />
      <OpportunityChain />
    </>
  );
}
