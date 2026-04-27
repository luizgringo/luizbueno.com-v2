import { absoluteUrl } from "@/shared/seo/metadata";
import type { MetadataRoute } from "next";

/**
 * Creates the robots.txt manifest via Next.js metadata routes.
 *
 * @returns Robots configuration for search crawlers.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
