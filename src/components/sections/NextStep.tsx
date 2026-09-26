import { Placeholder } from "@/components/primitives/Placeholder";
import { Prose } from "@/components/primitives/Prose";
import { FOUNDER, image } from "@/content";

/**
 * The body sentence is rendered exactly as the deck writes it; its grammar is flagged for the client.
 * Rahul closes the section as the next generation; his headshot stays small because its source is 230px.
 */
export function NextStep() {
  const n = FOUNDER.nextStep;
  return (
    <section aria-labelledby="next-step" className="mt-14 lg:mt-20">
      <h2 id="next-step" className="type-h2">
        {n.heading}
      </h2>
      <p className="type-display-lg mt-5">{n.line}</p>
      <Prose paragraphs={[n.paragraph]} className="mt-6 max-w-[60ch]" />
      <div className="mt-10 flex items-center gap-5">
        <div className="w-24 shrink-0 lg:w-28">
          <Placeholder image={image("headshot-rahul")} sizes="(min-width: 1024px) 112px, 96px" />
        </div>
        <div>
          <p className="type-h3">{n.nextGeneration.name}</p>
          <p className="type-small mt-1 text-steel-dk">{n.nextGeneration.line}</p>
        </div>
      </div>
    </section>
  );
}
