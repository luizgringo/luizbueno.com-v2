import { career, companyUrls } from "@/content/career";
import { profile } from "@/content/profile";
import { industryKnowledge, skillGroups } from "@/content/skills";
import { getRelatedProjects } from "@/features/about/lib/get-related-projects";
import { NCPanel } from "@/shared/ui/dos/nc-panel";
import { NCWindow } from "@/shared/ui/dos/nc-window";
import Link from "next/link";

/**
 * Full About screen composed from static profile content.
 *
 * @returns DOS-styled about sections with profile, skills and career timeline.
 */
export function AboutScreen() {
  return (
    <div className="page-stack">
      <NCWindow title="C:\LUIZBUENO\ABOUT.TXT">
        <h1 className="pixel-heading about-title dos-text--accent">{profile.name}</h1>
        <p className="about-subline">
          {profile.title} · {profile.location}
        </p>
        <div className="about-bio-stack">
          {profile.bio.map((paragraph, index) => (
            <p key={`${index}-${paragraph.slice(0, 20)}`}>{paragraph}</p>
          ))}
        </div>
        <div className="about-resume-row">
          <a
            href={profile.links.resume}
            target="_blank"
            rel="noopener noreferrer"
            download
            className="about-resume-button"
          >
            [ DOWNLOAD RESUME .PDF ]
          </a>
        </div>
      </NCWindow>

      <NCWindow title="[ EDUCATION ]">
        <ol className="about-education-list">
          {profile.education.map((education) => (
            <li key={education.degree} className="about-education-item">
              <header className="about-education-header">
                <p className="dos-text--accent about-education-period">[ {education.period} ]</p>
                <p className="about-education-degree">{education.degree}</p>
                <p className="dos-text--soft about-education-school">
                  {education.school}
                  {education.campus ? ` · ${education.campus}` : ""}
                </p>
                {education.diploma ? (
                  <a
                    href={education.diploma}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="about-education-diploma-link"
                    aria-label={`View diploma — ${education.degree}`}
                  >
                    [ VIEW DIPLOMA .JPG ]
                  </a>
                ) : null}
              </header>

              {education.activities ? (
                <div className="about-education-section">
                  <p className="pixel-heading about-education-section-title">Activities</p>
                  <ul className="about-education-activities">
                    {education.activities.map((activity) => (
                      <li key={activity}>
                        <span aria-hidden>[X]</span> {activity}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {education.description ? (
                <div className="about-education-section">
                  <p className="pixel-heading about-education-section-title">Overview</p>
                  <ul className="about-education-bullets">
                    {education.description.map((paragraph) => (
                      <li key={paragraph}>
                        <span aria-hidden className="dos-text--accent">
                          ▶
                        </span>{" "}
                        {paragraph}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {education.dissertation ? (
                <div className="about-education-section">
                  <p className="pixel-heading about-education-section-title">Dissertation</p>
                  <p className="about-education-dissertation">{education.dissertation}</p>
                </div>
              ) : null}
            </li>
          ))}
        </ol>
      </NCWindow>

      <div className="about-two-col">
        <NCWindow title="[ CERTIFICATIONS ]">
          <ul className="about-list">
            {profile.certifications.map((certification) => (
              <li key={certification.name}>
                <p className="dos-text--accent">{certification.year}</p>
                <p>
                  <a href={certification.url} target="_blank" rel="noopener noreferrer">
                    {certification.name}
                  </a>
                </p>
                <p className="dos-text--soft">{certification.issuer}</p>
              </li>
            ))}
          </ul>
        </NCWindow>

        <NCWindow title="[ LANGUAGES ]">
          <ul className="about-list about-list--tight">
            {profile.languages.map((language) => (
              <li key={language.name} className="about-lang-row">
                <span className="about-lang-name">{language.name}</span>
                <span aria-hidden className="about-lang-meter">
                  [{"█".repeat(language.bars)}
                  {"░".repeat(5 - language.bars)}]
                </span>
                <span className="dos-text--soft">{language.level}</span>
              </li>
            ))}
          </ul>
        </NCWindow>
      </div>

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
          {industryKnowledge.map((knowledge) => (
            <li key={knowledge}>
              <span aria-hidden className="dos-text--accent">
                ▶
              </span>{" "}
              {knowledge}
            </li>
          ))}
        </ul>
      </NCWindow>

      <NCWindow title="[ CAREER LOG — FULL ]">
        <ol className="about-career-list">
          {career.map((entry) => {
            const relatedProjects = getRelatedProjects(entry.company);
            const companyUrl = companyUrls[entry.company];

            return (
              <li key={`${entry.company}-${entry.period}`} className="about-career-item">
                <span className="dos-text--accent">{entry.period}</span>
                <span>
                  <span>{entry.role}</span> <span className="dos-text--dim">@</span>{" "}
                  {companyUrl ? (
                    <a
                      href={companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="company-link"
                    >
                      {entry.company}
                    </a>
                  ) : (
                    <span>{entry.company}</span>
                  )}
                </span>
                <span className="about-career-item__location">{entry.location}</span>
                {relatedProjects.length > 0 ? (
                  <div className="about-career-projects">
                    <span className="dos-text--soft">Related portfolio projects:</span>
                    <div className="about-career-projects__links">
                      {relatedProjects.map((project) => (
                        <Link
                          key={project.id}
                          href={`/portfolio?project=${encodeURIComponent(project.id)}`}
                          className="about-career-project-link"
                          prefetch={false}
                        >
                          [{project.name}]
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : null}
              </li>
            );
          })}
        </ol>
      </NCWindow>
    </div>
  );
}
