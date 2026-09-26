import type { Metadata } from "next";
import { Chapter } from "@/components/primitives/Chapter";
import { Placeholder } from "@/components/primitives/Placeholder";
import { FounderHero } from "@/components/sections/FounderHero";
import { FounderIntro } from "@/components/sections/FounderIntro";
import { AcreageGrid } from "@/components/sections/AcreageGrid";
import { Contribution } from "@/components/sections/Contribution";
import { NextStep } from "@/components/sections/NextStep";
import { Vision } from "@/components/sections/Vision";
import { FOUNDER, image } from "@/content";
import { JsonLd, founderJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: `${FOUNDER.hero.name} | ${FOUNDER.hero.title}`,
  description: `${FOUNDER.hero.name}. ${FOUNDER.contribution.line} ${FOUNDER.contribution.closing}`,
  alternates: { canonical: "/founder" },
};

/** Long-form editorial with a sticky portrait, not a bio card. */
export default function FounderPage() {
  return (
    <>
      <FounderHero />
      <Chapter id="story" marker="His story" pad="tight">
        <div className="grid-site items-start">
          <div className="col-span-8 lg:sticky lg:top-24 lg:col-span-4">
            <Placeholder image={image("founder-early")} sizes="(min-width: 1024px) 30vw, 66vw" />
          </div>
          <article className="col-span-12 mt-12 lg:col-start-6 lg:col-span-7 lg:mt-0">
            <FounderIntro />
            <AcreageGrid />
            <Contribution />
            <NextStep />
          </article>
        </div>
      </Chapter>
      <Vision />
      <JsonLd data={founderJsonLd()} />
    </>
  );
}
