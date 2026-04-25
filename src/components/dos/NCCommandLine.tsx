import { useRouterState } from "@tanstack/react-router";

const PATH_LABELS: Record<string, string> = {
  "/": "",
  "/about": "ABOUT",
  "/portfolio": "PORTFOLIO",
  "/contact": "CONTACT",
};

function buildPrompt(pathname: string): string {
  const tail = PATH_LABELS[pathname];
  if (tail === undefined) {
    return `C:\\LUIZBUENO\\${pathname.replace(/^\//, "").toUpperCase() || "UNKNOWN"}>`;
  }
  if (tail === "") {
    return "C:\\LUIZBUENO>";
  }
  return `C:\\LUIZBUENO\\${tail}>`;
}

export function NCCommandLine() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const prompt = buildPrompt(pathname);

  return (
    <div className="nc-cmd-line" role="status" aria-live="polite">
      <div className="nc-cmd-line__inner">
        <span className="nc-cmd-line__prompt">{prompt}</span>
        <span className="nc-cmd-line__cursor" aria-hidden>
          ▁
        </span>
      </div>
    </div>
  );
}
