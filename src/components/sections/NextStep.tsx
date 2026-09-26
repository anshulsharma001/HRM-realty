import { Prose } from "@/components/primitives/Prose";
import { FOUNDER } from "@/content";

/** The body sentence is rendered exactly as the deck writes it; its grammar is flagged for the client. */
export function NextStep() {
  const n = FOUNDER.nextStep;
  return (
    <section aria-labelledby="next-step" className="mt-14 lg:mt-20">
      <h2 id="next-step" className="type-h2">
        {n.heading}
      </h2>
      <p className="type-display-lg mt-5">{n.line}</p>
      <Prose paragraphs={[n.paragraph]} className="mt-6 max-w-[60ch]" />
    </section>
  );
}
