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
    <div className="space-y-6">
      <NCWindow title="C:\>CONTACT.COM">
        <div className="space-y-2 text-base sm:text-lg">
          <Line cmd="WHOAMI" out={profile.name} />
          <Line cmd="LOCATION" out={profile.location} />
          <Line
            cmd="EMAIL"
            out={
              <>
                <span>
                  {profile.emailUser} [at] {profile.emailDomain}
                </span>
                <button
                  type="button"
                  onClick={onCopyEmail}
                  className="ml-3 border border-foreground bg-background px-2 py-0.5 text-sm text-foreground hover:bg-accent hover:text-accent-foreground"
                >
                  {copied ? "OK." : "[ COPY ]"}
                </button>
                <p className="text-foreground/70 text-sm mt-1">
                  (address shown obfuscated to prevent spam — click COPY for the real one)
                </p>
              </>
            }
          />
          <Line cmd="PHONE" out={profile.phoneDisplay} />
          <Line
            cmd="LINKS /LIST"
            out={
              <ul className="space-y-1">
                <li>
                  <span className="text-foreground/70">linkedin......:</span>{" "}
                  <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer">
                    /in/luizhenriquebueno
                  </a>
                </li>
                <li>
                  <span className="text-foreground/70">github........:</span>{" "}
                  <a href={profile.links.github} target="_blank" rel="noopener noreferrer">
                    @luizgringo
                  </a>
                </li>
                <li>
                  <span className="text-foreground/70">website.......:</span>{" "}
                  <a href={profile.links.website} target="_blank" rel="noopener noreferrer">
                    luizbueno.com
                  </a>
                </li>
                <li>
                  <span className="text-foreground/70">scrum.org.....:</span>{" "}
                  <a href={profile.links.scrum} target="_blank" rel="noopener noreferrer">
                    profile
                  </a>
                </li>
              </ul>
            }
          />
          <p className="pt-2">
            <span className="text-accent">C:\&gt;</span> <BlinkingCursor />
          </p>
        </div>
      </NCWindow>

      <NCWindow title="[ HELP ]">
        <p>
          The fastest way to reach me is through LinkedIn or GitHub. For email, please
          use the <strong>COPY</strong> button above — the address is intentionally
          shown as <code>contact [at] luizbueno.com</code> to keep automated bots away.
        </p>
      </NCWindow>
    </div>
  );
}

function Line({ cmd, out }: { cmd: string; out: React.ReactNode }) {
  return (
    <div>
      <p>
        <span className="text-accent">C:\&gt;</span> {cmd}
      </p>
      <div className="pl-4">
        <span className="text-foreground/70">&gt;</span> <span>{out}</span>
      </div>
    </div>
  );
}