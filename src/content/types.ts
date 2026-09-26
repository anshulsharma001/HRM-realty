import type { Temperature } from "@/lib/motion";

export type Aspect = "16/9" | "21/9" | "5/2" | "3/2" | "2/1" | "4/5" | "1/1";

export interface ImageSpec {
  id: string;
  /** What the photograph must show. Briefs the photographer. */
  subject: string;
  aspect: Aspect;
  width: number;
  height: number;
  grade: Temperature;
  /** Set once the asset exists under /public/images. */
  src?: string;
  alt?: string;
  /** Present while the slot holds a stand-in photograph. Remove when the shoot lands. */
  dummy?: { source: string; author: string };
}

export interface Cta {
  label: string;
  href: string;
}

export interface Stat {
  value: number;
  display: string;
  unit?: string;
  label: string;
}

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  acres: number;
  acresDisplay: string;
  /** One paragraph from the deck. */
  description: string;
  highlights: string[];
  image: string;
}

export interface EcosystemItem {
  name: string;
  /** One line from the deck. Empty until the deck arrives. */
  description: string;
}

export interface EcosystemCategory {
  slug: string;
  name: string;
  /** Image manifest id shown beside the category. */
  image: string;
  items: EcosystemItem[];
}

export type MapLayerId =
  | "industrial"
  | "schools"
  | "colleges"
  | "university"
  | "logistics"
  | "hospitality"
  | "commercial"
  | "residential";

export interface MapPlace {
  name: string;
  /** Year established; drives "Play the journey" order. Ask the client. */
  year?: number;
  /** Position in the map viewBox (0–600 × 0–720). */
  x: number;
  y: number;
}

export interface MapLayer {
  id: MapLayerId;
  label: string;
  /** Image manifest id shown when the layer's pin is hovered or chosen. */
  image: string;
  /**
   * Indicative pin for the home-page map, in the map viewBox (0–600 × 0–720),
   * placed near the part of the district the vertical is associated with.
   * Replace with real coordinates when the client supplies locations.
   */
  pin: { x: number; y: number; side?: "left" | "right" };
  places: MapPlace[];
}

/** A value or a reason: a name and one line from the deck. */
export interface NamedLine {
  name: string;
  description: string;
}

/** One beat of the Transformation chain, split so shared phrases can carry data-chain. */
export interface ChainSegment {
  text: string;
  /** Pair id shared by the tail of one beat and the head of the next. */
  chain?: string;
  role?: "tail" | "head";
}
