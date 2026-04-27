"use client";

import { profile } from "@/content/profile";
import { BlinkingCursor } from "@/shared/ui/dos/blinking-cursor";
import { NCWindow } from "@/shared/ui/dos/nc-window";
import { useState } from "react";
import type { ReactNode } from "react";

/**
 * Props used to render DOS terminal-like output lines.
 */
type LineProps = {
  cmd: string;
  out: ReactNode;
};

/**
 * Renders a command/output pair in the contact terminal section.
 *
 * @param props - Command label and output node.
 * @returns A formatted terminal line.
 */
function Line({ cmd, out }: LineProps) {
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

/**
 * Contact page screen with links, copy helper and message form.
 *
 * @returns DOS-themed contact screen.
 */
export function ContactScreen() {
  const [copied, setCopied] = useState(false);

  /**
   * Copies the unobfuscated email address to the clipboard.
   */
  const onCopyEmail = async () => {
    const address = `${profile.emailUser}@${profile.emailDomain}`;

    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      window.setTimeout(() => {
        setCopied(false);
      }, 2000);
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
                <li>
                  <span className="contact-kv">resume........:</span>{" "}
                  <a href={profile.links.resume} target="_blank" rel="noopener noreferrer" download>
                    [ DOWNLOAD .PDF ]
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
