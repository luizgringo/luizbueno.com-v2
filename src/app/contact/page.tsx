import { ContactScreen } from "@/features/contact/components/contact-screen.client";
import { buildPageMetadata, seoDefaults } from "@/shared/seo/metadata";
import type { Metadata } from "next";

/**
 * Metadata definition for the Contact page.
 */
export const metadata: Metadata = buildPageMetadata(seoDefaults.contact);

/**
 * Renders the Contact route.
 *
 * @returns The contact screen content.
 */
export default function ContactPage() {
  return <ContactScreen />;
}
