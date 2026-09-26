import { MeasuredList } from "@/components/primitives/MeasuredList";
import { Prose } from "@/components/primitives/Prose";
import { FOUNDER } from "@/content";

export function Contribution() {
  const c = FOUNDER.contribution;
  return (
    <section aria-labelledby="contribution" className="mt-14 lg:mt-20">
      <h2 id="contribution" className="type-h2">
        {c.heading}
      </h2>
      <p className="type-display-lg mt-5">{c.line}</p>
      <Prose paragraphs={[c.paragraph]} className="mt-6 max-w-[60ch]" />
      <MeasuredList items={c.chain} size="lead" className="mt-8" />
      <p className="type-lead mt-8 max-w-[60ch]">{c.closing}</p>
    </section>
  );
}
