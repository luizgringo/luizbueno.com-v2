import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import * as React from "react";
import { NCWindow } from "@/components/dos/NCWindow";
import { BlinkingCursor } from "@/components/dos/BlinkingCursor";
import { profile } from "@/data/profile";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Luiz Bueno" },
      {
        name: "description",
        content:
          "Get in touch with Luiz Bueno via LinkedIn, GitHub or email — Belo Horizonte, Brazil.",
      },
      { property: "og:title", content: "Contact — Luiz Bueno" },
      {
        property: "og:description",
        content: "Get in touch with Luiz Bueno via LinkedIn, GitHub or email.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [copied, setCopied] = useState(false);

  const onCopyEmail = async () => {
    const address = [profile.emailUser, profile.emailDomain].join("@");
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="page-stack">
      <NCWindow title="C:\LUIZBUENO\CONTACT.COM">
        <div className="contact-page-body">
          <Line cmd="WHOAMI" out={profile.name} />
          <Line cmd="LOCATION" out={profile.location} />
          <Line
            cmd="EMAIL"
            out={
              <>
                <span>
                  {profile.emailUser} [at] {profile.emailDomain}
                </span>
                <button type="button" onClick={onCopyEmail} className="contact-copy-btn">
                  {copied ? "OK." : "[ COPY ]"}
                </button>
                <p className="contact-hint">
                  (address shown obfuscated to prevent spam — click COPY for the real one)
                </p>
              </>
            }
          />
          <Line cmd="PHONE" out={profile.phoneDisplay} />
          <Line
            cmd="LINKS /LIST"
            out={
              <ul className="contact-links-list">
                <li>
                  <span className="contact-kv">linkedin......:</span>{" "}
                  <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer">
                    /in/luizhenriquebueno
                  </a>
                </li>
                <li>
                  <span className="contact-kv">github........:</span>{" "}
                  <a href={profile.links.github} target="_blank" rel="noopener noreferrer">
                    @luizgringo
                  </a>
                </li>
                <li>
                  <span className="contact-kv">website.......:</span>{" "}
                  <a href={profile.links.website} target="_blank" rel="noopener noreferrer">
                    luizbueno.com
                  </a>
                </li>
                <li>
                  <span className="contact-kv">scrum.org.....:</span>{" "}
                  <a href={profile.links.scrum} target="_blank" rel="noopener noreferrer">
                    profile
                  </a>
                </li>
              </ul>
            }
          />
          <p className="contact-prompt-line">
            <span className="dos-text--accent">C:\&gt;</span> <BlinkingCursor />
          </p>
        </div>
      </NCWindow>

      <NCWindow title="[ HELP ]">
        <p>
          The fastest way to reach me is through LinkedIn or GitHub. For email, please use the{" "}
          <strong>COPY</strong> button above — the address is intentionally shown as{" "}
          <code>contact [at] luizbueno.com</code> to keep automated bots away.
        </p>
      </NCWindow>
    </div>
  );
}

function Line({ cmd, out }: { cmd: string; out: React.ReactNode }) {
  return (
    <div>
      <p>
        <span className="dos-text--accent">C:\&gt;</span> {cmd}
      </p>
      <div className="contact-line-out">
        <span className="dos-text--dim">&gt;</span> <span>{out}</span>
      </div>
    </div>
  );
}
