import { useEffect, useLayoutEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { NCWindow } from "@/components/dos/NCWindow";
import { NCPanel } from "@/components/dos/NCPanel";
import { BlinkingCursor } from "@/components/dos/BlinkingCursor";
import { Typewriter } from "@/components/dos/Typewriter";
import { profile } from "@/data/profile";
import vintageComputerGif from "@/assets/images/vintage-computer.gif";
import { markHomeIntroSeenInSession, shouldAnimateHomeIntro } from "@/lib/homeIntroSession";
import { pageSeoLinks } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => ({
    links: pageSeoLinks("/"),
  }),
  component: Index,
});

const HOME_INTRO_MARK_MS = 10_500;

function Index() {
  const [playIntro, setPlayIntro] = useState(() => shouldAnimateHomeIntro());

  useLayoutEffect(() => {
    setPlayIntro(shouldAnimateHomeIntro());
  }, []);

  useEffect(() => {
    if (!playIntro) return;
    const onUnload = () => {
      markHomeIntroSeenInSession();
    };
    window.addEventListener("beforeunload", onUnload);
    const id = window.setTimeout(() => {
      markHomeIntroSeenInSession();
    }, HOME_INTRO_MARK_MS);
    return () => {
      window.removeEventListener("beforeunload", onUnload);
      window.clearTimeout(id);
    };
  }, [playIntro]);

  const instant = !playIntro;
  const introSplitClass = ["home-intro-split", playIntro ? "" : "home-intro--static"]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="page-stack">
      <NCWindow title="C:\LUIZBUENO\HOME">
        <div className={introSplitClass}>
          <div className="home-legacy-hero">
            <img
              src={vintageComputerGif}
              alt="Vintage computer workstation"
              className="home-legacy-hero__image"
              loading="eager"
            />
          </div>
          <div className="home-intro-split__content page-stack page-stack--roomy">
            <p className="pixel-heading home-greeting dos-text--accent">
              <Typewriter text="HI!" speed={26} className="dos-text--accent" instant={instant} />{" "}
              <BlinkingCursor />
            </p>
            <p>
              <Typewriter
                text={`I'm ${profile.shortName} — Full Stack Developer.`}
                speed={18}
                className="dos-text dos-text--typewriter"
                startDelay={420}
                instant={instant}
              />
            </p>
            <p>
              <Typewriter
                text={`Based in ${profile.location}. Since 2009, I have been building frontend and backend systems for web products, combining technical quality, business impact and excellent user experience.`}
                speed={10}
                startDelay={1450}
                className="dos-text--muted"
                instant={instant}
              />
            </p>

            <NCPanel className="nc-panel--body-text home-vintage-reveal home-vintage-reveal--panel">
              <p>
                <Typewriter
                  text="I have led and delivered products across iGaming, streaming and SaaS contexts, with hands-on work in Vue/Nuxt, React/TypeScript, Node.js and modern frontend architecture. My recent experience includes building large-scale experiences and supporting multi-platform frontend ecosystems."
                  speed={9}
                  startDelay={3400}
                  instant={instant}
                />
              </p>
              <p className="home-bio-gap">
                <Typewriter
                  text="Alongside delivery, I drive technical direction, mentoring and cross-team alignment as Tech Lead and Scrum Master. I hold a Bachelor's degree in Information Systems, postgraduate specialization in Web Development and UX/Agility at PUC Minas, plus PSM and Tech Lead certifications."
                  speed={9}
                  startDelay={6300}
                  instant={instant}
                />
              </p>
            </NCPanel>

            <NCWindow
              title="C:\LUIZBUENO\NAV.TXT"
              className="nc-window--full-width home-vintage-reveal home-vintage-reveal--hint"
              bodyClassName="page-stack page-stack--roomy"
            >
              <p className="nc-panel--body-text dos-text--muted">
                You can also navigate with keyboard keys 1, 2, 3 and 4.
              </p>
              <div className="page-row page-row--actions">
                <Link to="/" className="nc-action-link">
                  1 - Home
                </Link>
                <Link to="/portfolio" className="nc-action-link">
                  2 - Portfolio
                </Link>
                <Link to="/about" className="nc-action-link">
                  3 - About Me
                </Link>
                <Link to="/contact" className="nc-action-link">
                  4 - Contacts
                </Link>
              </div>
            </NCWindow>
          </div>
        </div>
      </NCWindow>
    </div>
  );
}
