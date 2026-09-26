"use client";

import { useRef } from "react";
import { Chapter } from "@/components/primitives/Chapter";
import { Figure } from "@/components/primitives/Figure";
import { MeasuredList } from "@/components/primitives/MeasuredList";
import { STATS, STATS_CATEGORIES, STATS_HEADING } from "@/content";
import { cn } from "@/lib/cn";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { DUR, EASE, MQ, STAGGER } from "@/lib/motion";

/**
 * Five figures as an editorial column. The indent is anchored to magnitude:
 * the largest number sits furthest left with the most room, each order of
 * magnitude below it steps two columns in. Equal magnitudes share an indent.
 */
const PLACEMENT_BY_STEP = [
  "lg:col-start-1 lg:col-span-8",
  "lg:col-start-3 lg:col-span-7",
  "lg:col-start-5 lg:col-span-6",
  "lg:col-start-7 lg:col-span-6",
] as const;

const format = (n: number) => Math.round(n).toLocaleString("en-US");

/**
 * Motion (§3.3 ④): the heading's lines rise out of a mask, the categories
 * stagger in, and each figure counts up from zero in tabular figures as it
 * enters the viewport, its unit and label rising behind it. Each runs once.
 * A figure already on screen when the page hydrates keeps its final value so
 * nothing jumps. Reduced motion renders the final values, static.
 */
export function Stats() {
  const rootRef = useRef<HTMLElement>(null);
  const maxLog = Math.log10(Math.max(...STATS.map((s) => s.value)));
  const minLog = Math.log10(Math.min(...STATS.map((s) => s.value)));
  const steps = PLACEMENT_BY_STEP.length - 1;
  const stepFor = (value: number) => Math.round(((maxLog - Math.log10(value)) / (maxLog - minLog)) * steps);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      const mm = gsap.matchMedia();

      mm.add(MQ.full, () => {
        const splits: SplitText[] = [];
        let cancelled = false;

        const setup = () => {
          if (cancelled) return;
          const heading = root.querySelector<HTMLElement>("[data-stats-heading]");
          if (heading) {
            const split = SplitText.create(heading, { type: "lines", mask: "lines" });
            splits.push(split);
            gsap.from(split.lines, {
              yPercent: 100,
              duration: DUR.reveal,
              ease: EASE.reveal,
              stagger: STAGGER,
              scrollTrigger: { trigger: heading, start: "top 85%", once: true },
              // Masks clip Fraunces descenders at this line-height: hand the text back once revealed.
              onComplete: () => split.revert(),
            });
          }

          const categories = gsap.utils.toArray<HTMLElement>("[data-stats-categories] li", root);
          if (categories.length) {
            gsap.from(categories, {
              autoAlpha: 0,
              y: 10,
              duration: DUR.reveal,
              ease: EASE.reveal,
              stagger: STAGGER,
              scrollTrigger: { trigger: categories[0], start: "top 88%", once: true },
            });
          }

          gsap.utils.toArray<HTMLElement>("[data-count]", root).forEach((el) => {
            const value = Number(el.dataset.count);
            const suffix = el.dataset.suffix ?? "";
            const text = el.querySelector<HTMLElement>("[data-count-text]");
            const figure = el.closest<HTMLElement>("[data-figure]") ?? el;
            if (!text || !Number.isFinite(value)) return;

            // Already in view at hydration: keep the server-rendered final value.
            const r = figure.getBoundingClientRect();
            if (r.top < window.innerHeight && r.bottom > 0) return;

            const extras = [figure.querySelector("[data-figure-unit]"), figure.querySelector("[data-figure-label]")].filter(Boolean) as HTMLElement[];
            const counter = { v: 0 };
            text.textContent = `0${suffix}`;
            gsap.set(extras, { autoAlpha: 0, y: 10 });

            const tl = gsap.timeline({ scrollTrigger: { trigger: figure, start: "top 92%", once: true } });
            tl.to(
              counter,
              {
                v: value,
                duration: DUR.chapter,
                ease: EASE.reveal,
                onUpdate: () => {
                  text.textContent = `${format(counter.v)}${suffix}`;
                },
              },
              0,
            );
            tl.to(extras, { autoAlpha: 1, y: 0, duration: DUR.reveal, ease: EASE.reveal, stagger: STAGGER }, 0.25);
          });
        };

        document.fonts.ready.then(setup);
        return () => {
          cancelled = true;
          splits.forEach((s) => s.revert());
        };
      });

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <Chapter id="stats" marker="In figures" tone="paper-hi">
      <section ref={rootRef} aria-labelledby="stats-heading">
        <div className="grid-site">
          <div className="col-span-12 lg:col-span-9">
            <h2 id="stats-heading" data-stats-heading className="type-display-lg">
              {STATS_HEADING}
            </h2>
          </div>
          <div className="col-span-12 mt-6 lg:col-start-2 lg:col-span-11" data-stats-categories>
            <MeasuredList items={[...STATS_CATEGORIES]} inline size="h3" />
          </div>
        </div>
        <ol className="mt-10 flex flex-col gap-y-8 lg:mt-12 lg:gap-y-10">
          {STATS.map((s) => (
            <li key={`${s.display}-${s.label}`} className="grid-site" data-magnitude={Math.round(Math.log10(s.value))}>
              <div className={cn("col-span-12", PLACEMENT_BY_STEP[stepFor(s.value)])}>
                <Figure display={s.display} value={s.value} unit={s.unit} label={s.label} ratio={Math.log10(s.value) / maxLog} />
              </div>
            </li>
          ))}
        </ol>
      </section>
    </Chapter>
  );
}
