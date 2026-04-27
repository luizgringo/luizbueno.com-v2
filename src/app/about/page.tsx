import { AboutScreen } from "@/features/about/components/about-screen";
import { buildPageMetadata, seoDefaults } from "@/shared/seo/metadata";
import type { Metadata } from "next";

/**
 * Metadata definition for the About page.
 */
export const metadata: Metadata = buildPageMetadata(seoDefaults.about);

/**
 * Renders the About route.
 *
 * @returns The about screen content.
 */
export default function AboutPage() {
  return <AboutScreen />;
}
