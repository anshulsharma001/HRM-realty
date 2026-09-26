import { Chapter } from "@/components/primitives/Chapter";
import { IconList } from "@/components/primitives/IconList";
import { SectionHead } from "@/components/primitives/SectionHead";
import { WHY_HRM } from "@/content";

/** Six reasons, each led by a line icon, two columns on desktop. */
export function WhyHRM() {
  return (
    <Chapter id="why-hrm" marker="Why HRM" tone="paper-hi">
      <SectionHead title={WHY_HRM.heading} size="display-lg" />
      <div className="grid-site mt-10">
        <div className="col-span-12 lg:col-start-2 lg:col-span-10">
          <IconList items={WHY_HRM.reasons.map((r) => ({ label: r.name, description: r.description }))} size="h3" columns={2} className="gap-y-8" />
        </div>
      </div>
    </Chapter>
  );
}
