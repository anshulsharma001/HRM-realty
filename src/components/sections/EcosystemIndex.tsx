import { Chapter } from "@/components/primitives/Chapter";
import { IconList } from "@/components/primitives/IconList";
import { Placeholder } from "@/components/primitives/Placeholder";
import { ECOSYSTEM, image, type ImageId } from "@/content";

/**
 * Six categories in a two-column editorial grid: a photograph in a uniform
 * 3:2 frame, the category name, then its entries, each led by a line icon
 * with the deck's one-line description. Rows align at the top; no card
 * chrome, no rules.
 */
export function EcosystemIndex() {
  return (
    <Chapter id="index" marker="The index" pad="tight">
      <div className="grid grid-cols-1 gap-x-8 gap-y-14 lg:grid-cols-2 lg:gap-x-12 lg:gap-y-20">
        {ECOSYSTEM.map((cat) => (
          <section key={cat.slug} id={cat.slug} aria-labelledby={`${cat.slug}-title`} className="scroll-mt-24">
            <Placeholder image={image(cat.image as ImageId)} frame="3/2" sizes="(min-width: 1024px) 45vw, 100vw" />
            <h2 id={`${cat.slug}-title`} className="type-h2 mt-6">
              {cat.name}
            </h2>
            <IconList items={cat.items.map((i) => ({ label: i.name, description: i.description }))} size="h3" className="mt-5" />
          </section>
        ))}
      </div>
    </Chapter>
  );
}
