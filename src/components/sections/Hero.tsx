import { Chapter } from "@/components/primitives/Chapter";
import { HeroArt } from "./HeroArt";
import { HeroCopy } from "./HeroCopy";

/**
 * Full viewport under the fixed nav. The client's horizon fills the chapter
 * edge to edge, zoomed to the building line, panned by the cursor and drifted
 * on scroll (HeroArt). The copy plays its load sequence once (HeroCopy).
 */
export function Hero() {
  return (
    <Chapter id="hero" pad="none" className="overflow-hidden" backdrop={<HeroArt />}>
      <div className="relative flex min-h-[calc(100svh-4rem)] flex-col justify-start pb-16 pt-[12svh] lg:pb-24 lg:pt-[13svh]">
        <div className="grid-site">
          <HeroCopy />
        </div>
      </div>
    </Chapter>
  );
}
