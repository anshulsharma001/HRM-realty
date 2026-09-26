import type { CSSProperties } from "react";
import { Chapter } from "@/components/primitives/Chapter";
import { MeasuredList } from "@/components/primitives/MeasuredList";
import { Placeholder } from "@/components/primitives/Placeholder";
import { NAME_REVEAL, image } from "@/content";

/** Card surfaces follow the site's arc: cool at H, paper at R, warm at M. */
function surface(t: number) {
  if (t < 0.5) return `color-mix(in oklab, var(--color-paper), var(--color-steel) ${Math.round(((0.5 - t) / 0.5) * 14)}%)`;
  return `color-mix(in oklab, var(--color-paper), var(--color-wheat) ${Math.round(((t - 0.5) / 0.5) * 30)}%)`;
}

/**
 * The brand's core idea as three stacking cards. Each card sticks under the
 * nav as the next arrives; on desktop each card starts a third further in, so
 * once all three have collected the letters read H, R, M across the width,
 * each with its name and line. M carries no portrait: the five commitments
 * are the portrait. CSS sticky only; the Flip into the nav monogram arrives
 * in the motion pass and targets the data-letter spans.
 */
export function NameReveal() {
  const [first, second] = NAME_REVEAL.opening;
  const total = NAME_REVEAL.letters.length;
  return (
    <Chapter id="name" marker="The name" tone="ink">
      <div className="grid-site">
        <div className="col-span-12 lg:col-start-2 lg:col-span-8">
          <h2 className="type-display-lg">{first}</h2>
          <p className="type-h2 mt-5 text-paper/80">{second}</p>
        </div>
      </div>
      <ol className="name-stack mt-10 lg:mt-14" aria-label="Hari. Rahul. Mangla.">
        {NAME_REVEAL.letters.map((item, i) => {
          const t = i / (total - 1);
          const commitments = item.portrait === null ? NAME_REVEAL.commitments : [];
          return (
            <li
              key={item.letter}
              data-card={i + 1}
              className="name-card"
              style={{ "--i": i, backgroundColor: surface(t) } as CSSProperties}
            >
              <div className="flex items-center gap-4 lg:gap-6">
                <span className="type-display-xl leading-none" data-letter={item.letter}>
                  {item.letter}
                </span>
                <span className="type-h2">{item.name}</span>
              </div>
              <p className="type-lead mt-4 max-w-[26ch]">{item.line}</p>
              {item.portrait ? (
                <div className="mt-6 w-56 sm:w-64 lg:absolute lg:right-10 lg:top-10 lg:mt-0 lg:w-[30%]">
                  <Placeholder image={image(item.portrait)} sizes="(min-width: 1024px) 25vw, 256px" />
                </div>
              ) : null}
              {commitments.length > 0 ? (
                <MeasuredList items={commitments} size="body" className="mt-6" itemClassName="max-w-[40ch]" />
              ) : null}
            </li>
          );
        })}
        {/* Non-sticky spacer: extends the list's content box so the collected stack holds before it scrolls away. */}
        <li aria-hidden="true" role="presentation" className="h-[28svh]" />
      </ol>
    </Chapter>
  );
}
