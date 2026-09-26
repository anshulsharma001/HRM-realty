/**
 * Motion tokens (§3.1). Cold chapters use these as-is; warm chapters
 * (residential, vision) multiply every duration by 1.35 and use power3.out.
 */
export const EASE = {
  reveal: "expo.out", // entrances
  move: "power2.inOut", // repositioning
  scrub: "none", // always linear when scrubbed
} as const;

export const DUR = {
  micro: 0.3,
  reveal: 0.6,
  hero: 0.9,
  chapter: 1.2,
} as const;

export const STAGGER = 0.06;

export type Temperature = "cold" | "warm";

export const WARM_FACTOR = 1.35;
export const WARM_EASE = "power3.out";

export interface ChapterMotion {
  readonly temperature: Temperature;
  readonly reveal: string;
  readonly move: string;
  readonly dur: { readonly [K in keyof typeof DUR]: number };
  readonly stagger: number;
}

/** Resolve the motion tokens for a chapter's temperature. */
export function motionFor(temperature: Temperature): ChapterMotion {
  const k = temperature === "warm" ? WARM_FACTOR : 1;
  return {
    temperature,
    reveal: temperature === "warm" ? WARM_EASE : EASE.reveal,
    move: EASE.move,
    dur: {
      micro: +(DUR.micro * k).toFixed(3),
      reveal: +(DUR.reveal * k).toFixed(3),
      hero: +(DUR.hero * k).toFixed(3),
      chapter: +(DUR.chapter * k).toFixed(3),
    },
    stagger: +(STAGGER * k).toFixed(3),
  };
}

/** Media queries for gsap.matchMedia() branches (§3.4). */
export const MQ = {
  reduced: "(prefers-reduced-motion: reduce)",
  full: "(prefers-reduced-motion: no-preference)",
  desktop: "(min-width: 64rem)",
  mobile: "(max-width: 63.999rem)",
} as const;
