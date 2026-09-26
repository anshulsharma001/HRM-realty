import { Prose } from "@/components/primitives/Prose";
import { FOUNDER } from "@/content";

/** Two paragraphs from the deck. Renders nothing until they are supplied. */
export function FounderIntro() {
  if (!FOUNDER.intro.some(Boolean)) return null;
  return <Prose paragraphs={FOUNDER.intro} size="lead" />;
}
