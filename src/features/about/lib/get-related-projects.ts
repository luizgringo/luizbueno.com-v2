import { type Project, projects } from "@/content/projects";

/**
 * Maps career companies to keywords used to match portfolio entries.
 */
const COMPANY_ALIASES: Record<string, string[]> = {
  "Globoplay @ Globo": ["globoplay", "globo"],
  "Capgemini Brasil": ["capgemini"],
  "Kyte Tecnologia": ["kyte"],
  "Localiza Rent A Car": ["localiza", "zarp"],
  "Lett Insights": ["lett"],
  "Squadra Tecnologia": ["squadra", "empresa 1", "backoffice"],
  SLIIC: ["sliic", "seqtra"],
  "Cactus Gaming": ["cactus", "bet7k", "7k"],
  "ETUS Media Holding": ["etus", "brius", "luther"],
  "Arbeit Software": ["arbeit", "cosmik", "agent"],
  Hotmart: ["hotmart"],
};

/**
 * Resolves portfolio projects related to a career company.
 *
 * @param company - Company name from the career timeline.
 * @returns Deduplicated projects matched by company aliases.
 */
export function getRelatedProjects(company: string): Project[] {
  const aliases = COMPANY_ALIASES[company] ?? [company.toLowerCase()];
  const uniqueProjects = new Map<string, Project>();

  for (const project of projects) {
    const haystack = `${project.company} ${project.name}`.toLowerCase();

    if (aliases.some((alias) => haystack.includes(alias.toLowerCase()))) {
      uniqueProjects.set(project.id, project);
    }
  }

  return [...uniqueProjects.values()];
}
