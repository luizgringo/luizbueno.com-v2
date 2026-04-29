import { HomeScreen } from "@/features/home/components/home-screen";
import { buildPageMetadata, seoDefaults } from "@/shared/seo/metadata";
import type { Metadata } from "next";

/**
 * Metadata definition for the Home page.
 */
export const metadata: Metadata = buildPageMetadata(seoDefaults.home);

/**
 * Renders the Home route.
 *
 * @returns The home screen content.
 */
export default function HomePage() {
  return <HomeScreen />;
}
