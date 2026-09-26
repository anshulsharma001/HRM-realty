import { Chapter } from "@/components/primitives/Chapter";
import { MeasuredList } from "@/components/primitives/MeasuredList";
import { Prose } from "@/components/primitives/Prose";
import { RESIDENTIAL } from "@/content";

export function HomeIsMore() {
  const h = RESIDENTIAL.homeIsMore;
  return (
    <Chapter id="home" marker="A home" tone="warm" temperature="warm">
      <div className="grid-site gap-y-12">
        <div className="col-span-12 lg:col-start-2 lg:col-span-8">
          <h2 className="type-display-lg">{h.heading}</h2>
        </div>
        <div className="col-span-12 lg:col-start-4 lg:col-span-7">
          <MeasuredList items={h.clauses} size="h3" itemClassName="py-5 lg:py-6" />
          <Prose paragraphs={[h.paragraph]} size="lead" className="mt-8" />
        </div>
      </div>
    </Chapter>
  );
}
