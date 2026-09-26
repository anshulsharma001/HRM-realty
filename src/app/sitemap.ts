import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content";

const ROUTES: Array<{ path: string; priority: number; changeFrequency: "monthly" | "yearly" }> = [
  { path: "/", priority: 1, changeFrequency: "monthly" },
  { path: "/founder", priority: 0.9, changeFrequency: "yearly" },
  { path: "/sonipat", priority: 0.9, changeFrequency: "monthly" },
  { path: "/ecosystem", priority: 0.7, changeFrequency: "monthly" },
  { path: "/projects/industrial", priority: 0.8, changeFrequency: "monthly" },
  { path: "/projects/residential", priority: 0.8, changeFrequency: "monthly" },
  { path: "/team", priority: 0.5, changeFrequency: "yearly" },
  { path: "/contact", priority: 0.7, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ROUTES.map((r) => ({ url: `${SITE_URL}${r.path}`, lastModified, changeFrequency: r.changeFrequency, priority: r.priority }));
}
