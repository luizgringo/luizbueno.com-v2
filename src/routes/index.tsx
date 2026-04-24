import { createFileRoute, Link } from "@tanstack/react-router";
import { NCWindow } from "@/components/dos/NCWindow";
import { NCPanel } from "@/components/dos/NCPanel";
import { BlinkingCursor } from "@/components/dos/BlinkingCursor";
import { Typewriter } from "@/components/dos/Typewriter";
import { AsciiLogo } from "@/components/dos/AsciiLogo";
import { profile } from "@/data/profile";
import { career } from "@/data/career";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Luiz Bueno — Senior Frontend Developer & Tech Lead" },
      {
        name: "description",
        content:
          "Senior Frontend Developer & Tech Lead based in Belo Horizonte. 17+ years building web applications, currently at Cactus Gaming.",
      },
      { property: "og:title", content: "Luiz Bueno — Senior Frontend Developer & Tech Lead" },
      {
        property: "og:description",
        content:
          "Senior Frontend Developer & Tech Lead based in Belo Horizonte. 17+ years building web applications, currently at Cactus Gaming.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const recent = career.slice(0, 6);

  return (
    <div className="space-y-6">
      <NCWindow title="C:\>WELCOME.EXE">
        <div className="space-y-4">
          <AsciiLogo />
          <p className="pixel-heading text-sm sm:text-base text-accent">
            HI! <BlinkingCursor />
          </p>
          <p className="text-lg sm:text-xl">
            <Typewriter
              text={`I'm ${profile.shortName} — ${profile.title}.`}
              speed={18}
            />
          </p>
          <p className="text-foreground/90">
            Based in {profile.location}. {profile.yearsExperience} years developing
            web-based applications across frontend, backend and team leadership.
          </p>

          <NCPanel className="text-sm sm:text-base">
            <p>
              I&apos;ve been working since 2009 developing systems both in the Frontend and
              Backend, with a focus on web-based applications. I like to create good
              experiences so people feel the applications I built are useful, effective
              and friendly.
            </p>
            <p className="mt-3">
              Bachelor in Information Systems and postgraduate in Web Development &amp;
              UX Design / Agility — all from PUC-Minas. Also a Professional Scrum Master
              (PSM I) and IFTL Tech Lead Program graduate.
            </p>
          </NCPanel>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link to="/portfolio" className="nc-nav-item border border-border bg-primary text-primary-foreground">
              [F2] BROWSE PORTFOLIO
            </Link>
            <Link to="/contact" className="nc-nav-item border border-border bg-primary text-primary-foreground">
              [F4] SEND MESSAGE
            </Link>
            <Link to="/about" className="nc-nav-item border border-border bg-primary text-primary-foreground">
              [F1] ABOUT
            </Link>
          </div>
        </div>
      </NCWindow>

      <NCWindow title="C:\>TYPE CAREER.LOG">
        <ul className="divide-y divide-foreground/30">
          {recent.map((entry) => (
            <li
              key={`${entry.company}-${entry.period}`}
              className="grid grid-cols-1 gap-1 py-2 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-4"
            >
              <div>
                <span className="text-accent">{">"}</span>{" "}
                <span className="text-foreground">{entry.role}</span>{" "}
                <span className="text-foreground/70">@</span>{" "}
                <span className="text-foreground">{entry.company}</span>
                {entry.current && (
                  <span className="ml-2 bg-destructive text-destructive-foreground px-1 text-xs">
                    NOW
                  </span>
                )}
              </div>
              <div className="text-foreground/80 sm:text-right">{entry.period}</div>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-foreground/80">
          <Link to="/about" className="text-accent">
            {">"} Show full career log...
          </Link>
        </p>
      </NCWindow>
    </div>
  );
}
