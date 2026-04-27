import { profile } from "@/data/profile";

const WEBSITE_ORIGIN = new URL(profile.links.website).origin;

const OG_IMAGE_PATH = "/og-image.png";
const OG_IMAGE_WIDTH = 1200;
const OG_IMAGE_HEIGHT = 630;

export const seoDefaults = {
  home: {
    title: "Luiz Bueno — Senior Frontend Developer & Tech Lead",
    description:
      "Senior Frontend Developer and Tech Lead in Belo Horizonte, Brazil. 17+ years shipping web products—pixel-art Norton Commander portfolio. Currently at Cactus Gaming.",
    path: "/",
  },
  about: {
    title: "About — Luiz Bueno | Senior Frontend Developer & Tech Lead",
    description:
      "Background, PUC Minas education, PSM I and IFTL Tech Lead certifications, and 17+ years leading frontend teams and building reliable web platforms.",
    path: "/about",
  },
  contact: {
    title: "Contact — Luiz Bueno",
    description:
      "Reach Luiz Bueno on LinkedIn, GitHub, or email. Based in Belo Horizonte, Minas Gerais, Brazil.",
    path: "/contact",
  },
  portfolio: {
    title: "Portfolio — Luiz Bueno | Selected Web Projects",
    description:
      "Highlights across iGaming, streaming (Globoplay), e-commerce (Hotmart, Kyte), tech leadership, and enterprise delivery—from 2010 to today.",
    path: "/portfolio",
  },
} as const;

export function getSiteOrigin(): string {
  const raw = import.meta.env.VITE_SITE_URL;
  if (typeof raw === "string" && raw.trim().length > 0) {
    return raw.trim().replace(/\/$/, "");
  }
  return WEBSITE_ORIGIN;
}

export function absoluteUrl(pathnameWithSearch: string): string {
  const path = pathnameWithSearch.startsWith("/") ? pathnameWithSearch : `/${pathnameWithSearch}`;
  return `${getSiteOrigin()}${path}`;
}

function clampMetaDescription(text: string, max = 158): string {
  const t = text.trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  const base = (lastSpace > 110 ? cut.slice(0, lastSpace) : cut).trimEnd();
  return `${base}…`;
}

type PageSeoInput = {
  title: string;
  description: string;
  path: string;
};

export function pageSeoLinks(path: string): Array<{ rel: "canonical"; href: string }> {
  return [{ rel: "canonical", href: absoluteUrl(path) }];
}

export function pageSeoMeta(input: PageSeoInput) {
  const description = clampMetaDescription(input.description);
  const pageUrl = absoluteUrl(input.path);
  const imageUrl = absoluteUrl(OG_IMAGE_PATH);
  const imageAlt = `Norton Commander–style portfolio — ${profile.shortName}`;

  return [
    { title: input.title },
    { name: "description", content: description },
    { property: "og:title", content: input.title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:url", content: pageUrl },
    { property: "og:site_name", content: profile.shortName },
    { property: "og:locale", content: "en_US" },
    { property: "og:image", content: imageUrl },
    { property: "og:image:width", content: String(OG_IMAGE_WIDTH) },
    { property: "og:image:height", content: String(OG_IMAGE_HEIGHT) },
    { property: "og:image:alt", content: imageAlt },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: input.title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: imageUrl },
    { name: "twitter:image:alt", content: imageAlt },
  ] as unknown as Array<Record<string, unknown>>;
}

export function rootStructuredDataJsonLd(): Record<string, unknown> {
  const origin = getSiteOrigin();
  const sameAs = [profile.links.linkedin, profile.links.github, profile.links.scrum].filter(
    Boolean,
  );

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${origin}/#website`,
        url: `${origin}/`,
        name: profile.shortName,
        description: clampMetaDescription(seoDefaults.home.description),
        inLanguage: "en",
        publisher: { "@id": `${origin}/#person` },
      },
      {
        "@type": "Person",
        "@id": `${origin}/#person`,
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
