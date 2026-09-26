import { Chapter } from "@/components/primitives/Chapter";
import { FOUNDER } from "@/content";

/** The first appearance of wheat on the site. Warm timing applies here in the motion pass. */
export function Vision() {
  const [first, second] = FOUNDER.vision.lines;
  return (
    <Chapter id="vision" marker="The vision" tone="ink" temperature="warm">
      <div className="grid-site gap-y-12">
        <div className="col-span-12 lg:col-start-2 lg:col-span-9">
          <h2 className="type-h2 text-paper/80">{FOUNDER.vision.heading}</h2>
          <p className="type-display-lg mt-8">{first}</p>
        </div>
        <div className="col-span-12 lg:col-start-4 lg:col-span-9">
          <p className="type-display-xl text-wheat">{second}</p>
        </div>
      </div>
    </Chapter>
  );
}
