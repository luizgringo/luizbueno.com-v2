import { absoluteUrl } from "@/shared/seo/metadata";
import type { MetadataRoute } from "next";

/**
 * Creates the XML sitemap via Next.js metadata routes.
 *
 * @returns Static sitemap entries for all public pages.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: absoluteUrl("/"), lastModified, changeFrequency: "monthly", priority: 1 },
    { url: absoluteUrl("/portfolio"), lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/about"), lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/contact"), lastModified, changeFrequency: "monthly", priority: 0.7 },
  ];
}
