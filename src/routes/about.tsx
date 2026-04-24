import { createFileRoute } from "@tanstack/react-router";
import { NCWindow } from "@/components/dos/NCWindow";
import { NCPanel } from "@/components/dos/NCPanel";
import { profile } from "@/data/profile";
import { career } from "@/data/career";
import { skillGroups, industryKnowledge } from "@/data/skills";

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

function AboutPage() {
  return (
    <div className="space-y-6">
      <NCWindow title="C:\>TYPE ABOUT.TXT">
        <h1 className="pixel-heading text-base sm:text-lg text-accent">{profile.name}</h1>
        <p className="mt-1 text-foreground/90">
          {profile.title} · {profile.location}
        </p>
        <div className="mt-4 space-y-3">
          {profile.bio.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </NCWindow>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <NCWindow title="[ EDUCATION ]">
          <ul className="space-y-3">
            {profile.education.map((e) => (
              <li key={e.degree}>
                <p className="text-accent">{e.year}</p>
                <p>{e.degree}</p>
                <p className="text-foreground/80">{e.school}</p>
              </li>
            ))}
          </ul>
        </NCWindow>

        <NCWindow title="[ CERTIFICATIONS ]">
          <ul className="space-y-3">
            {profile.certifications.map((c) => (
              <li key={c.name}>
                <p className="text-accent">{c.year}</p>
                <p>
                  <a href={c.url} target="_blank" rel="noopener noreferrer">
                    {c.name}
                  </a>
                </p>
                <p className="text-foreground/80">{c.issuer}</p>
              </li>
            ))}
          </ul>
        </NCWindow>
      </div>

      <NCWindow title="[ LANGUAGES ]">
        <ul className="space-y-2">
          {profile.languages.map((lang) => (
            <li key={lang.name} className="flex flex-wrap items-center gap-3">
              <span className="min-w-[8rem]">{lang.name}</span>
              <span aria-hidden className="font-mono">
                [{"█".repeat(lang.bars)}
                {"░".repeat(5 - lang.bars)}]
              </span>
              <span className="text-foreground/80">{lang.level}</span>
            </li>
          ))}
        </ul>
      </NCWindow>

      <NCWindow title="[ TOOLS & TECHNOLOGIES ]">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {skillGroups.map((group) => (
            <NCPanel key={group.title}>
              <p className="pixel-heading text-xs">{group.title}</p>
              <ul className="mt-2 grid grid-cols-1 gap-x-4 gap-y-1 sm:grid-cols-2 text-sm">
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
        <ul className="grid grid-cols-1 gap-x-6 gap-y-1 sm:grid-cols-2">
          {industryKnowledge.map((k) => (
            <li key={k}>
              <span aria-hidden className="text-accent">▶</span> {k}
            </li>
          ))}
        </ul>
      </NCWindow>

      <NCWindow title="[ CAREER LOG — FULL ]">
        <ol className="space-y-2">
          {career.map((e) => (
            <li
              key={`${e.company}-${e.period}`}
              className="grid grid-cols-1 gap-1 border-b border-foreground/30 pb-2 sm:grid-cols-[10rem_1fr_auto] sm:items-baseline sm:gap-4"
            >
              <span className="text-accent">{e.period}</span>
              <span>
                <span>{e.role}</span> <span className="text-foreground/70">@</span>{" "}
                <span>{e.company}</span>
              </span>
              <span className="text-foreground/70 sm:text-right">{e.location}</span>
            </li>
          ))}
        </ol>
      </NCWindow>
    </div>
  );
}