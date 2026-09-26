"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { DUR, EASE, MQ } from "@/lib/motion";

/**
 * Provider smoke test for Phase 1: one rule draws from the left on load,
 * exactly as §3.2 specifies for rules. Reduced motion: present immediately.
 */
export function HorizonRule({ className = "" }: { className?: string }) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.full, () => {
        gsap.fromTo(
          ".horizon",
          { scaleX: 0, transformOrigin: "left center" },
          { scaleX: 1, duration: DUR.chapter, ease: EASE.move, delay: 0.15 },
        );
      });
      mm.add(MQ.reduced, () => {
        gsap.set(".horizon", { scaleX: 1 });
      });
    },
    { scope },
  );

  return (
    <div ref={scope} className={className} aria-hidden="true">
      <div className="horizon rule" />
    </div>
  );
}
