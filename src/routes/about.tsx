import { createFileRoute, Link } from "@tanstack/react-router";
import { NCWindow } from "@/components/dos/NCWindow";
import { NCPanel } from "@/components/dos/NCPanel";
import { profile } from "@/data/profile";
import { career } from "@/data/career";
import { skillGroups, industryKnowledge } from "@/data/skills";
import { projects } from "@/data/projects";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Luiz Bueno" },
      {
        name: "description",
        content:
          "About Luiz Bueno — Senior Frontend Developer and Tech Lead with 17+ years of experience, education at PUC-Minas and PSM I + IFTL Tech Lead certifications.",
      },
      { property: "og:title", content: "About — Luiz Bueno" },
      {
        property: "og:description",
        content:
          "About Luiz Bueno — Senior Frontend Developer and Tech Lead with 17+ years of experience.",
      },
    ],
  }),
  component: AboutPage,
});

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

function getRelatedProjects(company: string) {
  const normalizedCompany = company.toLowerCase();
  const aliases = COMPANY_ALIASES[company] ?? [normalizedCompany];
  const unique = new Map<string, (typeof projects)[number]>();

  projects.forEach((project) => {
    const haystack = `${project.company} ${project.name}`.toLowerCase();
    if (aliases.some((alias) => haystack.includes(alias.toLowerCase()))) {
      unique.set(project.id, project);
    }
  });

  return [...unique.values()];
}

function AboutPage() {
  return (
    <div className="page-stack">
      <NCWindow title="C:\LUIZBUENO\ABOUT.TXT">
        <h1 className="pixel-heading about-title dos-text--accent">{profile.name}</h1>
        <p className="about-subline">
          {profile.title} · {profile.location}
        </p>
        <div className="about-bio-stack">
          {profile.bio.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </NCWindow>

      <div className="about-two-col">
        <NCWindow title="[ EDUCATION ]">
          <ul className="about-list">
            {profile.education.map((e) => (
              <li key={e.degree}>
                <p className="dos-text--accent">{e.year}</p>
                <p>{e.degree}</p>
                <p className="dos-text--soft">{e.school}</p>
              </li>
            ))}
          </ul>
        </NCWindow>

        <NCWindow title="[ CERTIFICATIONS ]">
          <ul className="about-list">
            {profile.certifications.map((c) => (
              <li key={c.name}>
                <p className="dos-text--accent">{c.year}</p>
                <p>
                  <a href={c.url} target="_blank" rel="noopener noreferrer">
                    {c.name}
                  </a>
                </p>
                <p className="dos-text--soft">{c.issuer}</p>
              </li>
            ))}
          </ul>
        </NCWindow>
      </div>

      <NCWindow title="[ LANGUAGES ]">
        <ul className="about-list about-list--tight">
          {profile.languages.map((lang) => (
            <li key={lang.name} className="about-lang-row">
              <span className="about-lang-name">{lang.name}</span>
              <span aria-hidden className="about-lang-meter">
                [{"█".repeat(lang.bars)}
                {"░".repeat(5 - lang.bars)}]
              </span>
              <span className="dos-text--soft">{lang.level}</span>
            </li>
          ))}
        </ul>
      </NCWindow>

      <NCWindow title="[ TOOLS & TECHNOLOGIES ]">
        <div className="about-skill-grid">
          {skillGroups.map((group) => (
            <NCPanel key={group.title}>
              <p className="pixel-heading about-skill-panel-title">{group.title}</p>
              <ul className="about-skill-items">
                {group.items.map((item) => (
                  <li key={item}>
                    <span aria-hidden>[X]</span> {item}
                  </li>
                ))}
              </ul>
            </NCPanel>
          ))}
        </div>
      </NCWindow>

      <NCWindow title="[ INDUSTRY KNOWLEDGE ]">
        <ul className="about-industry-list">
          {industryKnowledge.map((k) => (
            <li key={k}>
              <span aria-hidden className="dos-text--accent">
                ▶
              </span>{" "}
              {k}
            </li>
          ))}
        </ul>
      </NCWindow>

      <NCWindow title="[ CAREER LOG — FULL ]">
        <ol className="about-career-list">
          {career.map((e) => {
            const relatedProjects = getRelatedProjects(e.company);
            return (
              <li key={`${e.company}-${e.period}`} className="about-career-item">
                <span className="dos-text--accent">{e.period}</span>
                <span>
                  <span>{e.role}</span> <span className="dos-text--dim">@</span>{" "}
                  <span>{e.company}</span>
                </span>
                <span className="about-career-item__location">{e.location}</span>
                {relatedProjects.length > 0 && (
                  <div className="about-career-projects">
                    <span className="dos-text--soft">Related portfolio projects:</span>
                    <div className="about-career-projects__links">
                      {relatedProjects.map((project) => (
                        <Link
                          key={project.id}
                          to="/portfolio"
                          search={{ project: project.id }}
                          className="about-career-project-link"
                        >
                          [{project.name}]
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      </NCWindow>
    </div>
  );
}
