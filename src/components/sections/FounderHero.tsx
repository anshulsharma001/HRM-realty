import { Chapter } from "@/components/primitives/Chapter";
import { Placeholder } from "@/components/primitives/Placeholder";
import { FOUNDER, image } from "@/content";

/** Title and name on the left, the founder's portrait beside them. The portrait slot takes the client's photograph as-is. */
export function FounderHero() {
  return (
    <Chapter marker="The founder" pad="tight" className="pt-10 lg:pt-16">
      <div className="grid-site items-end gap-y-10">
        <div className="col-span-12 lg:col-start-2 lg:col-span-6">
          <h1 className="type-display-lg">{FOUNDER.hero.title}</h1>
          <p className="type-h2 mt-5 text-steel-dk">{FOUNDER.hero.name}</p>
        </div>
        <div className="col-span-8 sm:col-span-6 lg:col-start-9 lg:col-span-4">
          <Placeholder image={image("founder-site")} sizes="(min-width: 1024px) 30vw, 66vw" priority />
        </div>
      </div>
    </Chapter>
  );
}
