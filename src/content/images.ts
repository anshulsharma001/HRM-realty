import type { ImageSpec } from "./types";

/**
 * Image manifest and shoot list. Slots hold photographs from the client's existing
 * website (hrmrealty.com) where one fits, and Lorem Picsum stand-ins elsewhere; each
 * `dummy` names the source. No slot shows a person as a named individual. Replace
 * `src` with the shoot and delete `dummy`; add `alt` then.
 */
export const IMAGES = {
  /* Client-supplied hero art: painted industrial horizon, 21:9. Not a stand-in. */
  hero: {
    id: "hero",
    subject: "Sonipat industrial horizon: sheds, chimneys, a water tower, silos and pylons beyond dry fields under a hazy sky",
    aspect: "21/9",
    width: 2688,
    height: 1152,
    grade: "cold",
    src: "/images/hero-image.png",
    alt: "Painted panorama of an industrial horizon: sheds, chimneys, a water tower, silos and pylons beyond dry fields under a hazy sky.",
  },
  "portrait-rahul": { id: "portrait-rahul", subject: "Rahul Mangla, standing on site, natural light", aspect: "4/5", width: 1200, height: 1500, grade: "cold", src: "/images/portrait-rahul.jpg", dummy: { source: "https://hrmrealty.com/assets/hrm-realty-building.jpg", author: "HRM Realty website" } },
  "founder-early": { id: "founder-early", subject: "Archive photograph, early plots, 1990s", aspect: "3/2", width: 1800, height: 1200, grade: "cold", src: "/images/founder-early.jpg", dummy: { source: "hero-image.png (sheds crop)", author: "Client" } },
  "sonipat-industrial": { id: "sonipat-industrial", subject: "Working industrial estate, wide, morning shift", aspect: "16/9", width: 1920, height: 1080, grade: "cold", src: "/images/sonipat-industrial.jpg", dummy: { source: "hero-image.png (pylon and sheds crop)", author: "Client" } },
  "project-industrial-estate": { id: "project-industrial-estate", subject: "HRM Industrial Estate, elevated wide", aspect: "16/9", width: 1920, height: 1080, grade: "cold", src: "/images/project-industrial-estate.jpg", dummy: { source: "https://hrmrealty.com/assets/industrial-estate-hero.jpg", author: "HRM Realty website" } },
  "project-commercial-arcade": { id: "project-commercial-arcade", subject: "HRM Commercial Arcade, street-level frontage", aspect: "3/2", width: 1800, height: 1200, grade: "cold", src: "/images/project-commercial-arcade.jpg", dummy: { source: "https://hrmrealty.com/assets/commercial-arcade-hero.jpg", author: "HRM Realty website" } },
  "residential-land": { id: "residential-land", subject: "A happy family inside their home, living room, unposed", aspect: "3/2", width: 1200, height: 800, grade: "warm", src: "/images/residential-land.jpg", dummy: { source: "https://stocksnap.io/photo/happy-family-99FGTTMHTI", author: "Direct Media (StockSnap, CC0)" } },
  "residential-home": { id: "residential-home", subject: "A happy family inside their home, together on the sofa", aspect: "3/2", width: 1800, height: 1200, grade: "warm", src: "/images/residential-home.jpg", dummy: { source: "https://stocksnap.io/photo/happy-family-XBAF6ZRORS", author: "Direct Media (StockSnap, CC0)" } },
  "team-site": { id: "team-site", subject: "Team HRM on site, unposed", aspect: "16/9", width: 1920, height: 1080, grade: "cold", src: "/images/team-site.jpg", dummy: { source: "https://hrmrealty.com/assets/indian-business-meeting.jpg", author: "HRM Realty website" } },
  /* Map layer reveals: shown beside the cursor when a layer row is hovered. */
  "layer-logistics": { id: "layer-logistics", subject: "Logistics layer, the logistics park", aspect: "3/2", width: 1920, height: 1080, grade: "cold", src: "/images/layer-logistics.jpg", dummy: { source: "https://picsum.photos/id/1026", author: "Dmitrii Vaccinium" } },
  "layer-schools": { id: "layer-schools", subject: "Schools layer, a classroom or campus", aspect: "3/2", width: 900, height: 600, grade: "cold", src: "/images/layer-schools.jpg", dummy: { source: "https://picsum.photos/id/24", author: "Alejandro Escamilla" } },
  "layer-colleges": { id: "layer-colleges", subject: "Colleges layer, a college building", aspect: "3/2", width: 900, height: 600, grade: "cold", src: "/images/layer-colleges.jpg", dummy: { source: "https://picsum.photos/id/1033", author: "Erez Attias" } },
  "layer-university": { id: "layer-university", subject: "University layer, a campus landmark", aspect: "3/2", width: 900, height: 600, grade: "cold", src: "/images/layer-university.jpg", dummy: { source: "https://picsum.photos/id/1076", author: "Samuel Zeller" } },
  "layer-hospitality": { id: "layer-hospitality", subject: "Hospitality layer, the resort", aspect: "3/2", width: 900, height: 600, grade: "cold", src: "/images/layer-hospitality.jpg", dummy: { source: "https://picsum.photos/id/42", author: "Luke Chesser" } },
  "founder-site": { id: "founder-site", subject: "Shri Hari Parkash Mangla Ji: a formal portrait, natural light, 4:5. Used on /founder beside the title and on the H card of the home page.", aspect: "4/5", width: 1200, height: 1500, grade: "cold", src: "/images/founder-site.jpg", dummy: { source: "hero-image.png (water tower crop)", author: "Client" } },
  "ecosystem-industry": { id: "ecosystem-industry", subject: "Food processing: the plant, silos or line", aspect: "3/2", width: 1800, height: 1200, grade: "cold", src: "/images/ecosystem-industry.jpg", dummy: { source: "hero-image.png (tower and silos crop)", author: "Client" } },
  "community-family": { id: "community-family", subject: "Community: three generations of a Sonipat family", aspect: "3/2", width: 1200, height: 800, grade: "warm", src: "/images/community-family.jpg", dummy: { source: "https://hrmrealty.com/assets/client-family-2.jpg", author: "HRM Realty website" } },
  "office-building": { id: "office-building", subject: "The corporate office, exterior", aspect: "3/2", width: 1200, height: 800, grade: "cold", src: "/images/office-building.jpg", dummy: { source: "https://hrmrealty.com/assets/hrm-realty-building.jpg", author: "HRM Realty website" } },
  /* The evolving story: the next chapter, a working day in Sonipat. */
  "story-office": { id: "story-office", subject: "A working day in Sonipat today, warm light, unposed", aspect: "4/5", width: 1200, height: 1500, grade: "warm", src: "/images/story-office.jpg", dummy: { source: "https://hrmrealty.com/assets/indian-office-interior.jpg", author: "HRM Realty website" } },
  /* Journey strip: one photograph per stage, Land to Home. */
  "journey-land": { id: "journey-land", subject: "Open land before development, Sonipat", aspect: "2/1", width: 1200, height: 600, grade: "cold", src: "/images/journey-land.jpg", dummy: { source: "hero-image.png (field band)", author: "Client" } },
  "journey-factory": { id: "journey-factory", subject: "Factory stage of the journey", aspect: "2/1", width: 1200, height: 600, grade: "cold", src: "/images/journey-factory.jpg", dummy: { source: "https://hrmrealty.com/assets/industrial-estate-hero.jpg", author: "HRM Realty website" } },
  "journey-entrepreneur": { id: "journey-entrepreneur", subject: "Entrepreneur stage of the journey", aspect: "2/1", width: 1200, height: 600, grade: "cold", src: "/images/journey-entrepreneur.jpg", dummy: { source: "https://hrmrealty.com/assets/industrial-leader.jpg", author: "HRM Realty website" } },
  "journey-school": { id: "journey-school", subject: "School stage of the journey", aspect: "2/1", width: 1200, height: 600, grade: "cold", src: "/images/journey-school.jpg", dummy: { source: "https://picsum.photos/id/24", author: "Alejandro Escamilla" } },
  "journey-university": { id: "journey-university", subject: "University stage of the journey", aspect: "2/1", width: 1200, height: 600, grade: "cold", src: "/images/journey-university.jpg", dummy: { source: "https://picsum.photos/id/1076", author: "Samuel Zeller" } },
  "journey-hospitality": { id: "journey-hospitality", subject: "Hospitality stage of the journey", aspect: "2/1", width: 1200, height: 600, grade: "warm", src: "/images/journey-hospitality.jpg", dummy: { source: "https://picsum.photos/id/42", author: "Luke Chesser" } },
  "journey-logistics": { id: "journey-logistics", subject: "Logistics stage of the journey", aspect: "2/1", width: 1200, height: 600, grade: "warm", src: "/images/journey-logistics.jpg", dummy: { source: "https://picsum.photos/id/1026", author: "Dmitrii Vaccinium" } },
  "journey-commercial": { id: "journey-commercial", subject: "Commercial stage of the journey", aspect: "2/1", width: 1200, height: 600, grade: "warm", src: "/images/journey-commercial.jpg", dummy: { source: "https://hrmrealty.com/assets/commercial-arcade-hero.jpg", author: "HRM Realty website" } },
  "journey-residential": { id: "journey-residential", subject: "Residential stage of the journey", aspect: "2/1", width: 1200, height: 600, grade: "warm", src: "/images/journey-residential.jpg", dummy: { source: "https://hrmrealty.com/assets/client-young-couple.jpg", author: "HRM Realty website" } },
  "journey-home": { id: "journey-home", subject: "Home stage of the journey", aspect: "2/1", width: 1200, height: 600, grade: "warm", src: "/images/journey-home.jpg", dummy: { source: "https://hrmrealty.com/assets/client-family-1.jpg", author: "HRM Realty website" } },
} as const satisfies Record<string, ImageSpec>;

export type ImageId = keyof typeof IMAGES;

export function image(id: ImageId): ImageSpec {
  return IMAGES[id];
}
