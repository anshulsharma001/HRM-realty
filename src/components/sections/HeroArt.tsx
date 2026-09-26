"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { image } from "@/content";

/** Image row where the buildings meet the ground. */
const GROUND_Y = 770;
/** Image rows of ground kept in view below the buildings at rest. */
const GROUND_PEEK = 90;
/** Share of the hidden width on each side that the cursor can bring into view. */
const PAN_SHARE = 0.5;
/** Fraction of the remaining distance closed per 60fps tick. Lower is smoother and slower. */
const FOLLOW = 0.07;
/** −1: the picture slides against the cursor, like turning a camera toward it. 1: it slides with the cursor. */
const DIRECTION = -1;

/**
 * The client's horizon, zoomed so the building baseline sits just above the
 * hero's bottom edge with a strip of ground beneath it, panned along the x
 * axis by the cursor, and drifted upward as the page scrolls so the rest of
 * the ground comes into view. The plane is sized from the hero's height
 * (never narrower than the hero) and centred. Motion stays on the compositor:
 * transforms only, no filter on the moving plane, eased on the GSAP ticker
 * and scrubbed by ScrollTrigger (which Lenis already drives). Touch pointers
 * leave it centred; reduced motion disables both movements.
 */
export function HeroArt() {
  const art = image("hero");
  const boxRef = useRef<HTMLDivElement>(null);
  const planeRef = useRef<HTMLDivElement>(null);
  const maxPan = useRef(0);
  const target = useRef(0);
  const current = useRef(0);

  useGSAP(
    () => {
      const box = boxRef.current;
      const plane = planeRef.current;
      if (!box || !plane) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const section = box.parentElement ?? box;

      const size = () => {
        const W = box.clientWidth;
        const H = box.clientHeight;
        let s = H / (GROUND_Y + GROUND_PEEK); // ground row plus a strip of field reach the bottom edge
        if (art.width * s < W) s = W / art.width; // never leave a gap at the sides
        const w = art.width * s;
        const h = art.height * s;
        plane.style.width = `${w}px`;
        plane.style.height = `${h}px`;
        plane.style.left = `${(W - w) / 2}px`;
        maxPan.current = Math.max(0, (w - W) / 2) * PAN_SHARE;
        target.current = gsap.utils.clamp(-maxPan.current, maxPan.current, target.current);
        current.current = gsap.utils.clamp(-maxPan.current, maxPan.current, current.current);
        gsap.set(plane, { xPercent: 0, x: current.current, force3D: true }); // take over from the CSS first-paint transform
      };
      size();
      const ro = new ResizeObserver(() => {
        size();
        ScrollTrigger.refresh();
      });
      ro.observe(box);

      if (reduce) return () => ro.disconnect();

      // Scroll: drift the plane up by the hidden ground as the hero leaves the viewport.
      const drift = gsap.to(plane, {
        y: () => -(plane.offsetHeight - box.clientHeight),
        ease: "none",
        force3D: true,
        scrollTrigger: { trigger: section, start: "top top+=64", end: "bottom top", scrub: 0.8, invalidateOnRefresh: true },
      });

      // Cursor: ease the plane along x toward the pointer's side.
      const onMove = (e: PointerEvent) => {
        if (e.pointerType !== "mouse" && e.pointerType !== "pen") return;
        const nx = (e.clientX / window.innerWidth) * 2 - 1; // −1 at the left edge … 1 at the right
        target.current = DIRECTION * nx * maxPan.current;
      };
      section.addEventListener("pointermove", onMove, { passive: true });

      const tick = () => {
        if (current.current === target.current) return;
        const k = 1 - Math.pow(1 - FOLLOW, gsap.ticker.deltaRatio(60));
        current.current += (target.current - current.current) * k;
        if (Math.abs(target.current - current.current) < 0.05) current.current = target.current;
        gsap.set(plane, { x: current.current, force3D: true });
      };
      gsap.ticker.add(tick);

      return () => {
        ro.disconnect();
        section.removeEventListener("pointermove", onMove);
        gsap.ticker.remove(tick);
        drift.scrollTrigger?.kill();
        drift.kill();
      };
    },
    { scope: boxRef },
  );

  if (!art.src) return null;
  return (
    <div ref={boxRef} data-hero-art className="absolute inset-0 overflow-hidden bg-ink">
      {/* First paint before JS: height from the ground row plus peek, centred; JS then sizes it exactly. */}
      <div
        ref={planeRef}
        data-hero-plane
        className="absolute top-0 left-1/2 aspect-[2688/1152] min-w-full -translate-x-1/2 will-change-transform"
        style={{ height: `calc(100% * ${art.height} / ${GROUND_Y + GROUND_PEEK})` }}
      >
        <Image src={art.src} alt={art.alt ?? ""} fill priority sizes="250vw" className="object-cover" />
      </div>
    </div>
  );
}
