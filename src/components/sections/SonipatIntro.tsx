import { Chapter } from "@/components/primitives/Chapter";
import { Placeholder } from "@/components/primitives/Placeholder";
import { Prose } from "@/components/primitives/Prose";
import { SONIPAT, image } from "@/content";

/** The deck's intro paragraph, then the working estate at full width. */
export function SonipatIntro() {
  return (
    <Chapter marker="Sonipat" pad="tight">
      <div className="grid-site">
        <div className="col-span-12 lg:col-start-6 lg:col-span-6">
          <Prose paragraphs={[SONIPAT.intro]} size="lead" />
        </div>
      </div>
      <div className="-mx-[var(--site-margin)] mt-12 lg:mt-16">
        <Placeholder image={image("sonipat-industrial")} sizes="100vw" />
      </div>
    </Chapter>
  );
}
