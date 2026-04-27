import { profile } from "@/content/profile";
import type { Project } from "@/content/projects";
import type { Metadata } from "next";

/**
 * Canonical origin used when building absolute SEO URLs.
 */
const WEBSITE_ORIGIN = new URL(profile.links.website).origin;

/**
 * Open Graph image path shared across all pages.
 */
const OG_IMAGE_PATH = "/og-image.png";

/**
 * Default SEO payload by page.
 */
export const seoDefaults = {
  home: {
    title: "Luiz Bueno — Senior Frontend Developer & Tech Lead",
    description:
      "Senior Frontend Developer and Tech Lead in Belo Horizonte, Brazil. 17+ years shipping web products with a pixel-art portfolio.",
    path: "/",
  },
  about: {
    title: "About — Luiz Bueno | Senior Frontend Developer & Tech Lead",
    description:
      "Background, education at PUC Minas, certifications and 17+ years leading teams and building reliable web platforms.",
    path: "/about",
  },
  contact: {
    title: "Contact — Luiz Bueno",
    description:
      "Reach Luiz Bueno via LinkedIn, GitHub or email. Based in Belo Horizonte, Minas Gerais, Brazil.",
    path: "/contact",
  },
  portfolio: {
    title: "Portfolio — Luiz Bueno | Selected Web Projects",
    description:
      "Highlights across iGaming, streaming, e-commerce, technical leadership and enterprise delivery from 2010 to today.",
    path: "/portfolio",
  },
} as const;

/**
 * Input contract for metadata helper functions.
 */
type PageSeoInput = {
  title: string;
  description: string;
  path: string;
};

/**
 * Limits description length while preserving whole words.
 *
 * @param text - Raw meta description.
 * @param max - Maximum length.
 * @returns Clamped description suitable for SEO tags.
 */
function clampMetaDescription(text: string, max = 158): string {
  const trimmed = text.trim();

  if (trimmed.length <= max) {
    return trimmed;
  }

  const cut = trimmed.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  const base = (lastSpace > 110 ? cut.slice(0, lastSpace) : cut).trimEnd();

  return `${base}…`;
}

/**
 * Builds an absolute URL from a path or path+query string.
 *
 * @param pathnameWithSearch - Relative path fragment.
 * @returns Absolute URL using the site origin.
 */
export function absoluteUrl(pathnameWithSearch: string): string {
  const path = pathnameWithSearch.startsWith("/") ? pathnameWithSearch : `/${pathnameWithSearch}`;

  return `${WEBSITE_ORIGIN}${path}`;
}

/**
 * Produces typed Next.js metadata for a regular page.
 *
 * @param input - Page metadata input.
 * @returns Metadata object with Open Graph and Twitter fields.
 */
export function buildPageMetadata(input: PageSeoInput): Metadata {
  const description = clampMetaDescription(input.description);
  const canonical = absoluteUrl(input.path);
  const image = absoluteUrl(OG_IMAGE_PATH);

  return {
    title: input.title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title: input.title,
      description,
      url: canonical,
      siteName: profile.shortName,
      locale: "en_US",
      type: "website",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `Norton Commander-style portfolio — ${profile.shortName}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description,
      images: [image],
    },
  };
}

/**
 * Produces project-specific metadata for the portfolio details query string.
 *
 * @param project - Selected project entry.
 * @returns Metadata describing the selected project.
 */
export function buildPortfolioProjectMetadata(project: Project): Metadata {
  return buildPageMetadata({
    title: `${project.name} — ${project.company} | ${profile.shortName}`,
    description: project.summary,
    path: `/portfolio?project=${encodeURIComponent(project.id)}`,
  });
}

/**
 * Metadata shared by the entire application.
 */
export const rootMetadata: Metadata = {
  ...buildPageMetadata(seoDefaults.home),
  metadataBase: new URL(WEBSITE_ORIGIN),
  authors: [{ name: profile.name }],
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/favicon-32.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
};

/**
 * Builds structured data for `WebSite` and `Person`.
 *
 * @returns JSON-LD graph ready to be embedded in layout.
 */
export function rootStructuredDataJsonLd(): Record<string, unknown> {
  const sameAs = [profile.links.linkedin, profile.links.github, profile.links.scrum].filter(
    Boolean,
  );

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${WEBSITE_ORIGIN}/#website`,
        url: `${WEBSITE_ORIGIN}/`,
        name: profile.shortName,
        description: clampMetaDescription(seoDefaults.home.description),
        inLanguage: "en",
        publisher: { "@id": `${WEBSITE_ORIGIN}/#person` },
      },
      {
        "@type": "Person",
        "@id": `${WEBSITE_ORIGIN}/#person`,
        name: profile.name,
        jobTitle: profile.title,
        url: profile.links.website,
        sameAs,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Belo Horizonte",
          addressRegion: "MG",
          addressCountry: "BR",
        },
      },
    ],
  };
}
