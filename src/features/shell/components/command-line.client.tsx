"use client";

import { buildShellPrompt } from "@/features/shell/lib/prompt";
import { usePathname } from "next/navigation";

/**
 * Top shell line that prints the active DOS prompt.
 *
 * @returns Command prompt output element.
 */
export function CommandLine() {
  const pathname = usePathname();
  const prompt = buildShellPrompt(pathname);

  return (
    <output className="nc-cmd-line" aria-live="polite">
      <div className="nc-cmd-line__inner">
        <span className="nc-cmd-line__prompt">{prompt}</span>
        <span className="nc-cmd-line__cursor" aria-hidden>
          ▁
        </span>
      </div>
    </output>
  );
}
