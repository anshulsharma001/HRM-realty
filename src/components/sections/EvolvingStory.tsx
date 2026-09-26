import { ButtonLink } from "@/components/primitives/Button";
import { Chapter } from "@/components/primitives/Chapter";
import { Placeholder } from "@/components/primitives/Placeholder";
import { Prose } from "@/components/primitives/Prose";
import { EVOLVING_STORY, image } from "@/content";

/** Title across the top, then a portrait photograph beside the subtitle, paragraphs and CTA. */
export function EvolvingStory() {
  return (
    <Chapter id="story" marker="The story">
      <div className="grid-site">
        <div className="col-span-12 lg:col-start-2 lg:col-span-6">
          <h2 className="type-h2">{EVOLVING_STORY.title}</h2>
        </div>
      </div>
      <div className="grid-site mt-8 items-start gap-y-8 lg:mt-10">
        <div className="col-span-8 sm:col-span-6 lg:col-span-4">
          <Placeholder image={image("story-office")} sizes="(min-width: 1024px) 30vw, 66vw" />
        </div>
        <div className="col-span-12 lg:col-start-6 lg:col-span-7">
          <p className="type-display-lg">{EVOLVING_STORY.subtitle}</p>
          <Prose paragraphs={EVOLVING_STORY.paragraphs} className="mt-6 max-w-[60ch]" />
          <div className="mt-8">
            <ButtonLink href={EVOLVING_STORY.cta.href}>{EVOLVING_STORY.cta.label}</ButtonLink>
          </div>
        </div>
      </div>
    </Chapter>
  );
}
