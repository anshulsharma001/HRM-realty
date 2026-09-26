import { Chapter } from "@/components/primitives/Chapter";
import { IconList } from "@/components/primitives/IconList";
import { CONTACT } from "@/content";

export function ACityWhere() {
  const c = CONTACT.cityWhere;
  return (
    <Chapter id="city" marker="A city where" tone="paper-hi" pad="tight">
      <div className="grid-site gap-y-8">
        <div className="col-span-12 lg:col-start-2 lg:col-span-3">
          <h2 className="type-h2">{c.lead}</h2>
        </div>
        <div className="col-span-12 lg:col-start-6 lg:col-span-6">
          <IconList items={c.lines.map((label) => ({ label }))} size="h2" />
        </div>
      </div>
    </Chapter>
  );
}
