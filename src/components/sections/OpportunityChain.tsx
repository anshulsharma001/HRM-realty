import { Chapter } from "@/components/primitives/Chapter";
import { IconList } from "@/components/primitives/IconList";
import { TEAM } from "@/content";

/**
 * Six lines, each led by the icon of the place it names, and the closing.
 * No headshot grid; the deck names no individuals. The third closing line is
 * rendered as the deck writes it and flagged.
 */
export function OpportunityChain() {
  const [first, second, third] = TEAM.closing;
  return (
    <Chapter id="opportunity" marker="Opportunity" tone="paper-hi">
      <div className="grid-site gap-y-14">
        <div className="col-span-12 lg:col-start-2 lg:col-span-9">
          <IconList items={TEAM.chain.map((label) => ({ label }))} size="h3" columns={2} className="gap-y-6" />
        </div>
        <div className="col-span-12 lg:col-start-2 lg:col-span-8">
          <p className="type-display-lg">{first}</p>
          <p className="type-h2 mt-6 text-steel-dk">{second}</p>
          <p className="type-lead mt-8 text-steel-dk">{third}</p>
        </div>
      </div>
    </Chapter>
  );
}
