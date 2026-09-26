import { Chapter } from "@/components/primitives/Chapter";
import { RESIDENTIAL } from "@/content";

/** The warm chapter opens on ink with the title in wheat. */
export function ResidentialHero() {
  return (
    <Chapter marker="A home for all" tone="ink" temperature="warm" pad="tight" className="pt-10 lg:pt-16">
      <div className="grid-site">
        <div className="col-span-12 lg:col-start-2 lg:col-span-9">
          <h1 className="type-display-xl text-wheat">{RESIDENTIAL.hero.title}</h1>
          <p className="type-lead mt-8 text-paper/85">{RESIDENTIAL.hero.subtitle}</p>
          <p className="type-body mt-6 max-w-[60ch] text-paper/80">{RESIDENTIAL.hero.paragraph}</p>
        </div>
      </div>
    </Chapter>
  );
}
