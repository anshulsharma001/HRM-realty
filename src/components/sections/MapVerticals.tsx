"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ButtonLink } from "@/components/primitives/Button";
import { MAP_LAYERS, MAP_TEASER, image, type ImageId, type MapLayerId } from "@/content";
import { cn } from "@/lib/cn";
import { gsap, useGSAP } from "@/lib/gsap";
import { DUR, EASE, MQ, STAGGER } from "@/lib/motion";
import { MapScale, SonipatOutline } from "./SonipatOutline";

/**
 * The eight verticals pinned on the Sonipat map. Pins pop in one after another
 * as the map enters the viewport; hovering, focusing or tapping a pin shows
 * that vertical's photograph and name beside the map. Pin positions are
 * indicative (see content/mapLayers.ts) until the client supplies locations.
 * Labels show on desktop; on phones the pins alone are the targets and the
 * name reads beside the photograph. Reduced motion shows the pins at once.
 */
export function MapVerticals() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<MapLayerId>(MAP_LAYERS[0].id);
  const current = MAP_LAYERS.find((l) => l.id === active) ?? MAP_LAYERS[0];

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      const mm = gsap.matchMedia();
      mm.add(MQ.full, () => {
        const pins = gsap.utils.toArray<HTMLElement>("[data-pin]", root);
        pins.forEach((el) => gsap.set(el, { transformOrigin: el.dataset.side === "left" ? "100% 50%" : "0% 50%" }));
        gsap.from(pins, {
          scale: 0,
          autoAlpha: 0,
          duration: DUR.reveal,
          ease: EASE.reveal,
          stagger: STAGGER * 3,
          scrollTrigger: { trigger: root, start: "top 75%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef} className="grid-site items-start gap-y-10">
      <div className="col-span-12 lg:col-span-8">
        <div className="relative text-steel-dk">
          <SonipatOutline compact />
          <ul className="absolute inset-0" aria-label="Verticals across Sonipat">
            {MAP_LAYERS.map((layer) => {
              const left = layer.pin.side === "left";
              return (
                <li
                  key={layer.id}
                  className={left ? "pin-at-left" : "pin-at"}
                  style={{ left: `${(layer.pin.x / 600) * 100}%`, top: `${(layer.pin.y / 720) * 100}%` }}
                >
                  <button
                    type="button"
                    data-pin
                    data-side={layer.pin.side ?? "right"}
                    aria-pressed={active === layer.id}
                    className={cn("map-pin", left && "flex-row-reverse")}
                    onPointerEnter={(e) => {
                      if (e.pointerType !== "touch") setActive(layer.id);
                    }}
                    onFocus={() => setActive(layer.id)}
                    onClick={() => setActive(layer.id)}
                  >
                    <span className="marker" aria-hidden="true" />
                    <span className="label">{layer.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
        <MapScale className="mt-4" />
      </div>
      <div className="col-span-12 lg:col-start-9 lg:col-span-4">
        <div className="relative aspect-[3/2] overflow-hidden bg-ink">
          {MAP_LAYERS.map((layer) => {
            const spec = image(layer.image as ImageId);
            return spec.src ? (
              <div
                key={layer.id}
                aria-hidden={active !== layer.id}
                className={cn("absolute inset-0 grade-cold transition-opacity duration-300", active === layer.id ? "opacity-100" : "opacity-0")}
              >
                <Image src={spec.src} alt="" fill sizes="(min-width: 1024px) 30vw, 100vw" className="object-cover" />
              </div>
            ) : null;
          })}
        </div>
        <p className="type-h3 mt-4" aria-live="polite">
          {current.label}
        </p>
        <div className="mt-8">
          <ButtonLink href={MAP_TEASER.cta.href}>{MAP_TEASER.cta.label}</ButtonLink>
        </div>
      </div>
    </div>
  );
}
