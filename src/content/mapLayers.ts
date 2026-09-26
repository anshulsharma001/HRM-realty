import type { MapLayer } from "./types";

/**
 * Eight layers in the order "Play the journey" will reveal them. The deck names
 * no individual locations: a genuine client gap. Each layer keeps an empty,
 * typed place array so pins drop in the moment the client supplies site name,
 * position and year established (year drives "Play the journey"). Until then
 * the map renders the district, roads and river, and each toggle controls its
 * (empty) layer group. `image` is the photograph shown on row hover.
 */
export const MAP_LAYERS: readonly MapLayer[] = [
  { id: "industrial", image: "project-industrial-estate", label: "Industrial Development", pin: { x: 478, y: 556 }, places: [] },
  { id: "schools", image: "layer-schools", label: "Schools", pin: { x: 396, y: 446, side: "left" }, places: [] },
  { id: "colleges", image: "layer-colleges", label: "Colleges", pin: { x: 404, y: 384, side: "left" }, places: [] },
  { id: "university", image: "layer-university", label: "University", pin: { x: 482, y: 372 }, places: [] },
  { id: "logistics", image: "layer-logistics", label: "Logistics", pin: { x: 436, y: 616, side: "left" }, places: [] },
  { id: "hospitality", image: "layer-hospitality", label: "Hospitality", pin: { x: 442, y: 296 }, places: [] },
  { id: "commercial", image: "project-commercial-arcade", label: "Commercial", pin: { x: 452, y: 470 }, places: [] },
  { id: "residential", image: "residential-land", label: "Future Residential", pin: { x: 352, y: 528, side: "left" }, places: [] },
];
