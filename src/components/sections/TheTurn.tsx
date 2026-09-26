import { Chapter } from "@/components/primitives/Chapter";
import { SONIPAT } from "@/content";

/**
 * The cold-to-warm pivot of the site: two lines at display-lg, generous space,
 * nothing else. Both sit on ink so the second can be set in wheat (7.9:1 on
 * ink; wheat fails contrast on any paper). This is wheat's only appearance on
 * the route.
 */
export function TheTurn() {
  const [works, lives] = SONIPAT.turn;
  return (
    <Chapter id="turn" marker="The turn" tone="ink" pad="loose" temperature="warm">
      <div className="flex min-h-[52svh] flex-col justify-between gap-y-16 lg:gap-y-28">
        <div className="grid-site">
          <p className="col-span-12 type-display-lg lg:col-start-2 lg:col-span-8">{works}</p>
        </div>
        <div className="grid-site">
          <p className="col-span-12 type-display-lg text-wheat lg:col-start-4 lg:col-span-8">{lives}</p>
        </div>
      </div>
    </Chapter>
  );
}
