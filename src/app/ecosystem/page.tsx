import type { Metadata } from "next";
import { EcosystemIntro } from "@/components/sections/EcosystemIntro";
import { EcosystemIndex } from "@/components/sections/EcosystemIndex";
import { Values } from "@/components/sections/Values";
import { ECOSYSTEM, ECOSYSTEM_INTRO } from "@/content";

export const metadata: Metadata = {
  title: `The HRM Ecosystem | ${ECOSYSTEM_INTRO.title}`,
  description: `${ECOSYSTEM_INTRO.title}: ${ECOSYSTEM.map((c) => c.name).join(", ")}.`,
  alternates: { canonical: "/ecosystem" },
};

export default function EcosystemPage() {
  return (
    <>
      <EcosystemIntro />
      <EcosystemIndex />
      <Values />
    </>
  );
}
