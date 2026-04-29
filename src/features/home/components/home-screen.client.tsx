"use client";

import { profile } from "@/content/profile";
import { BlinkingCursor } from "@/shared/ui/dos/blinking-cursor";
import { NCPanel } from "@/shared/ui/dos/nc-panel";
import { NCWindow } from "@/shared/ui/dos/nc-window";
import Image from "next/image";
import Link from "next/link";

export function HomeScreen() {
  return (
    <div className="page-stack">
      <NCWindow title="C:\LUIZBUENO\HOME">
        <div className="home-intro-split home-intro--static">
          <div className="home-legacy-hero">
            <Image
              src="/images/vintage-computer.webp"
              alt="Vintage computer workstation"
              className="home-legacy-hero__image"
              width={328}
              height={291}
              sizes="(min-width: 1024px) 328px, 100vw"
              priority
              fetchPriority="high"
            />
          </div>
          <div className="home-intro-split__content page-stack page-stack--roomy">
            <p className="pixel-heading home-greeting dos-text--accent">
              <span className="dos-text--accent">HI!</span> <BlinkingCursor />
            </p>
            <p>
              <span className="dos-text dos-text--typewriter">
                I&apos;m {profile.shortName} — Full Stack Developer.
              </span>
            </p>
            <p>
              <span className="dos-text--muted">
                Based in {profile.location}. Since 2009, I have been building frontend and backend
                systems for web products, combining technical quality, business impact and excellent
                user experience.
              </span>
            </p>

            <NCPanel className="nc-panel--body-text home-vintage-reveal home-vintage-reveal--panel">
              <p>
                I have led and delivered products across iGaming, streaming and SaaS contexts, with
                hands-on work in Vue/Nuxt, React/TypeScript, Node.js and modern frontend
                architecture. My recent experience includes building large-scale experiences and
                supporting multi-platform frontend ecosystems.
              </p>
              <p className="home-bio-gap">
                Alongside delivery, I drive technical direction, mentoring and cross-team alignment
                as Tech Lead and Scrum Master. I hold a Bachelor&apos;s degree in Information
                Systems, postgraduate specialization in Web Development and UX/Agility at PUC Minas,
                plus PSM and Tech Lead certifications.
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
                <Link href="/" className="nc-action-link">
                  1 - Home
                </Link>
                <Link href="/portfolio" className="nc-action-link">
                  2 - Portfolio
                </Link>
                <Link href="/about" className="nc-action-link">
                  3 - About Me
                </Link>
                <Link href="/contact" className="nc-action-link">
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
