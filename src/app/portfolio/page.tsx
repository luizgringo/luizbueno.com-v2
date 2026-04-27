import { projects } from "@/content/projects";
import { PortfolioScreen } from "@/features/portfolio/components/portfolio-screen.client";
import {
  buildPageMetadata,
  buildPortfolioProjectMetadata,
  seoDefaults,
} from "@/shared/seo/metadata";
import type { Metadata } from "next";

/**
 * Shape of search params exposed by Next.js for the portfolio route.
 */
type PortfolioPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

/**
 * Normalizes the `project` query string value into a single identifier.
 *
 * @param raw - Raw query parameter value.
 * @returns A valid project id or `undefined`.
 */
function normalizeProjectId(raw: string | string[] | undefined): string | undefined {
  if (typeof raw === "string" && raw.trim().length > 0) {
    return raw;
  }

  return undefined;
}

/**
 * Generates metadata dynamically for the portfolio page.
 *
 * @remarks
 * When a specific project is selected through `?project=...`, metadata is
 * customized with project-specific title and description.
 *
 * @param props - Route props with async search params.
 * @returns Page metadata for the current query.
 */
/**
 * Generates route metadata from current search parameters.
 *
 * @param props - Portfolio route props.
 * @returns Metadata resolved for either the page or selected project.
 */
export async function generateMetadata({ searchParams }: PortfolioPageProps): Promise<Metadata> {
  const query = await searchParams;
  const projectId = normalizeProjectId(query.project);

  if (projectId) {
    const selected = projects.find((project) => project.id === projectId);

    if (selected) {
      return buildPortfolioProjectMetadata(selected);
    }
  }

  return buildPageMetadata(seoDefaults.portfolio);
}

/**
 * Renders the portfolio route.
 *
 * @param props - Route props with async search params.
 * @returns The portfolio screen with optional pre-selected project.
 */
export default async function PortfolioPage({ searchParams }: PortfolioPageProps) {
  const query = await searchParams;
  const projectId = normalizeProjectId(query.project);

  return <PortfolioScreen initialProjectId={projectId} />;
}
