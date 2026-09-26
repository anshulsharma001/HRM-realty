import { Chapter } from "@/components/primitives/Chapter";
import { Placeholder } from "@/components/primitives/Placeholder";
import { Prose } from "@/components/primitives/Prose";
import { TEAM, image } from "@/content";

/**
 * Title, subtitle and both paragraphs share one left edge; the team
 * photograph sits beside them. Its column is kept under 600 CSS px on desktop
 * so the 1200px source stays sharp on 2× screens.
 */
export function TeamIntro() {
  const t = TEAM.intro;
  return (
    <Chapter marker="Team HRM" pad="tight" className="pt-10 lg:pt-16">
      <div className="grid-site items-start gap-y-10">
        <div className="col-span-12 lg:col-start-2 lg:col-span-6">
          <h1 className="type-display-lg">{t.title}</h1>
          <p className="type-lead mt-6 opacity-80">{t.subtitle}</p>
          <Prose paragraphs={t.paragraphs} className="mt-8" />
        </div>
        <div className="col-span-12 sm:col-span-10 lg:col-start-8 lg:col-span-5">
          <Placeholder image={image("team-site")} sizes="(min-width: 1024px) 37vw, 100vw" priority />
        </div>
      </div>
    </Chapter>
  );
}
