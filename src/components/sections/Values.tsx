import { Chapter } from "@/components/primitives/Chapter";
import { IconList } from "@/components/primitives/IconList";
import { VALUES, VALUES_HEADING } from "@/content";

/** Six values, each led by a line icon, with the deck's one line beneath. Two columns on desktop. */
export function Values() {
  return (
    <Chapter id="values" marker="Values" tone="paper-hi">
      <div className="grid-site gap-y-8">
        <div className="col-span-12 lg:col-start-2 lg:col-span-3">
          <h2 className="type-h2">{VALUES_HEADING}</h2>
        </div>
        <div className="col-span-12 lg:col-start-5 lg:col-span-8">
          <IconList items={VALUES.map((v) => ({ label: v.name, description: v.description }))} size="h3" columns={2} className="gap-y-8" />
        </div>
      </div>
    </Chapter>
  );
}
