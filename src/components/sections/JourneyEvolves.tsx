import { ButtonLink } from "@/components/primitives/Button";
import { Chapter } from "@/components/primitives/Chapter";
import { MeasuredList } from "@/components/primitives/MeasuredList";
import { Placeholder } from "@/components/primitives/Placeholder";
import { Prose } from "@/components/primitives/Prose";
import { SONIPAT, image } from "@/content";

export function JourneyEvolves() {
  const j = SONIPAT.journey;
  return (
    <Chapter id="journey" marker="The journey evolves" tone="paper-hi">
      <div className="grid-site gap-y-8">
        <div className="col-span-12 lg:col-start-2 lg:col-span-6">
          <h2 className="type-h2">{j.title}</h2>
          <Placeholder image={image("community-family")} frame="4/5" sizes="(min-width: 1024px) 25vw, 66vw" className="mt-8 max-w-[22rem]" />
        </div>
        <div className="col-span-12 lg:col-start-6 lg:col-span-7">
          <p className="type-display-lg">{j.subtitle}</p>
          <Prose paragraphs={j.paragraphs} size="lead" className="mt-8" />
        </div>
      </div>
      <div className="grid-site mt-10 lg:mt-12">
        <div className="col-span-12 lg:col-start-6 lg:col-span-7">
          <MeasuredList items={j.transitions} size="h3" />
          <Prose paragraphs={[j.closing]} className="mt-10 max-w-[60ch]" />
          <div className="mt-10">
            <ButtonLink href={j.cta.href}>{j.cta.label}</ButtonLink>
          </div>
        </div>
      </div>
    </Chapter>
  );
}
