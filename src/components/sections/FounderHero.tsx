import { Chapter } from "@/components/primitives/Chapter";
import { Placeholder } from "@/components/primitives/Placeholder";
import { FOUNDER, image } from "@/content";

/**
 * Title and name, then the client's banner of the founder offset to the right,
 * shown whole so the line set in the artwork survives. Eight columns tops out
 * near 870 CSS px, about half the 1600px source, so it holds up on 2× screens.
 */
export function FounderHero() {
  return (
    <Chapter marker="The founder" pad="tight" className="pt-10 lg:pt-16">
      <div className="grid-site gap-y-10 lg:gap-y-12">
        <div className="col-span-12 lg:col-start-2 lg:col-span-6">
          <h1 className="type-display-lg">{FOUNDER.hero.title}</h1>
          <p className="type-h2 mt-5 text-steel-dk">{FOUNDER.hero.name}</p>
        </div>
        <div className="col-span-12 lg:col-start-5 lg:col-span-8">
          <Placeholder image={image("founder-hero")} sizes="(min-width: 1024px) 60vw, 100vw" priority />
        </div>
      </div>
    </Chapter>
  );
}
