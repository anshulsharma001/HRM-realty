"use client";

import { useRef } from "react";
import { ButtonLink } from "@/components/primitives/Button";
import { HERO } from "@/content";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { DUR, EASE, MQ, STAGGER } from "@/lib/motion";

/**
 * Hero copy with the load sequence (§3.3 ①): the title's characters rise out
 * of a line mask, then the lead and paragraph lines, then the two CTAs. Runs
 * once after the fonts are ready so the split matches the final wrapping, and
 * re-splits on resize. Reduced motion shows everything at once.
 */
export function HeroCopy() {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      const mm = gsap.matchMedia();

      mm.add(MQ.full, () => {
        const title = root.querySelector<HTMLElement>("[data-hero-title]");
        const lines = gsap.utils.toArray<HTMLElement>("[data-hero-line]", root);
        const ctas = gsap.utils.toArray<HTMLElement>("[data-hero-cta]", root);
        if (!title) return;

        // Hide before first paint; the split reveals from here.
        gsap.set([title, ...lines], { autoAlpha: 0 });
        gsap.set(ctas, { autoAlpha: 0, y: 12 });

        const splits: SplitText[] = [];
        let tl: gsap.core.Timeline | null = null;

        const run = () => {
          tl?.kill();
          splits.forEach((s) => s.revert());
          splits.length = 0;

          const titleSplit = SplitText.create(title, { type: "lines,chars", mask: "lines", linesClass: "hero-line" });
          const lineSplits = lines.map((el) => SplitText.create(el, { type: "lines", mask: "lines", linesClass: "hero-line" }));
          splits.push(titleSplit, ...lineSplits);
          gsap.set([title, ...lines], { autoAlpha: 1 });

          tl = gsap.timeline({
            defaults: { ease: EASE.reveal },
            // Hand the text back once revealed so masks cannot clip descenders or affect wrapping.
            onComplete: () => {
              splits.forEach((s) => s.revert());
              splits.length = 0;
            },
          });
          tl.from(titleSplit.chars, { yPercent: 110, duration: DUR.hero, stagger: STAGGER / 2 }, 0);
          lineSplits.forEach((s, i) => {
            tl!.from(s.lines, { yPercent: 100, duration: DUR.reveal, stagger: STAGGER }, 0.35 + i * 0.15);
          });
          tl.to(ctas, { autoAlpha: 1, y: 0, duration: DUR.reveal, stagger: STAGGER }, 0.75);
        };

        let cancelled = false;
        document.fonts.ready.then(() => {
          if (!cancelled) run();
        });

        // Re-split on width changes so masked lines match the wrapping; do not replay.
        let lastWidth = root.clientWidth;
        const ro = new ResizeObserver(() => {
          if (root.clientWidth === lastWidth) return;
          lastWidth = root.clientWidth;
          tl?.progress(1);
          splits.forEach((s) => s.revert());
          splits.length = 0;
        });
        ro.observe(root);

        return () => {
          cancelled = true;
          ro.disconnect();
          tl?.kill();
          splits.forEach((s) => s.revert());
        };
      });

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef} className="col-span-12 lg:col-span-8">
      <h1 data-hero-title className="type-display-xl uppercase">
        {HERO.title}
      </h1>
      <p data-hero-line className="type-lead mt-6 text-steel-dk lg:mt-8">
        {HERO.lead}
      </p>
      <p data-hero-line className="type-body mt-6 max-w-[52ch] lg:mt-8">
        {HERO.paragraph}
      </p>
      <div className="mt-8 flex flex-wrap gap-3 lg:mt-10">
        {HERO.ctas.map((cta) => (
          <div key={cta.href} data-hero-cta>
            <ButtonLink href={cta.href}>{cta.label}</ButtonLink>
          </div>
        ))}
      </div>
    </div>
  );
}
