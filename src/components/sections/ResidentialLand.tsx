import { Chapter } from "@/components/primitives/Chapter";
import { Placeholder } from "@/components/primitives/Placeholder";
import { image } from "@/content";

/** A family at home: the first warm photograph on the route, set off-centre under the hero. */
export function ResidentialLand() {
  return (
    <Chapter tone="warm" temperature="warm" pad="tight">
      <div className="grid-site">
        <div className="col-span-12 lg:col-start-5 lg:col-span-8">
          <Placeholder image={image("residential-land")} sizes="(min-width: 1024px) 66vw, 100vw" priority />
        </div>
      </div>
    </Chapter>
  );
}
