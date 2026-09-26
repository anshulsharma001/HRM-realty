import { Chapter } from "@/components/primitives/Chapter";
import { MapVerticals } from "./MapVerticals";

/** The Sonipat map with the eight verticals pinned on it. The layered map with toggles lives on /sonipat. */
export function MapTeaser() {
  return (
    <Chapter id="map-teaser" marker="The map">
      <MapVerticals />
    </Chapter>
  );
}
