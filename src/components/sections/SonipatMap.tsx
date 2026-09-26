"use client";

import { useState } from "react";
import { Chapter } from "@/components/primitives/Chapter";
import { MAP_LAYERS, type MapLayerId } from "@/content";
import { MapScale, SonipatOutline } from "./SonipatOutline";

type Visible = Record<MapLayerId, boolean>;

const ALL_ON = Object.fromEntries(MAP_LAYERS.map((l) => [l.id, true])) as Visible;

/**
 * Custom SVG map with eight toggleable layers. Static in this pass: real
 * <button aria-pressed> toggles show and hide each layer group; pins draw in
 * with DrawSVG in the motion pass. The text equivalent lists every place by
 * category and doubles as the SEO payload.
 */
export function SonipatMap() {
  const [visible, setVisible] = useState<Visible>(ALL_ON);
  const toggle = (id: MapLayerId) => setVisible((v) => ({ ...v, [id]: !v[id] }));

  return (
    <Chapter id="map" marker="The map">
      <div className="grid-site">
        <div className="col-span-12 lg:col-start-2 lg:col-span-6">
          <h2 className="type-h2">Sonipat</h2>
        </div>
      </div>
      <div className="strip -mx-[var(--site-margin)] mt-10 overflow-x-auto px-[var(--site-margin)]">
        <div className="flex gap-2 pb-2" role="group" aria-label="Map layers">
          {MAP_LAYERS.map((layer) => (
            <button key={layer.id} type="button" className="legend-chip" aria-pressed={visible[layer.id]} onClick={() => toggle(layer.id)}>
              <span className="swatch" aria-hidden="true" />
              {layer.label}
            </button>
          ))}
        </div>
      </div>
      <div className="grid-site mt-8 items-start gap-y-12 lg:mt-12">
        <div className="col-span-12 text-steel-dk lg:col-span-8">
          <SonipatOutline>
            {MAP_LAYERS.map((layer) => (
              <g key={layer.id} data-layer={layer.id} style={{ display: visible[layer.id] ? undefined : "none" }} aria-hidden={!visible[layer.id]}>
                {layer.places.map((p) => (
                  <g key={p.name} data-pin>
                    <circle cx={p.x} cy={p.y} r="4" fill="none" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                    <path d={`M${p.x} ${p.y + 4} L${p.x} ${p.y + 14}`} stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                  </g>
                ))}
              </g>
            ))}
          </SonipatOutline>
          <MapScale className="mt-4" />
        </div>
        <dl className="col-span-12 flex flex-col gap-y-3 lg:col-start-10 lg:col-span-3">
          {MAP_LAYERS.map((layer) => (
            <div key={layer.id}>
              <dt className="type-small font-medium">{layer.label}</dt>
              {layer.places.map((p) => (
                <dd key={p.name} className="type-small text-steel-dk">
                  {p.name}
                </dd>
              ))}
            </div>
          ))}
        </dl>
      </div>
    </Chapter>
  );
}
