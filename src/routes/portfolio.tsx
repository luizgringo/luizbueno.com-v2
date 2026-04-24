import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { NCWindow } from "@/components/dos/NCWindow";
import { projects, categoryLabels, type ProjectCategory } from "@/data/projects";
import { cn } from "@/lib/utils";

type Filter = ProjectCategory | "all";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — Luiz Bueno" },
      {
        name: "description",
        content:
          "Selected projects by Luiz Bueno across iGaming, streaming (Globoplay), e-commerce (Hotmart, Kyte), tech leadership and enterprise systems.",
      },
      { property: "og:title", content: "Portfolio — Luiz Bueno" },
      {
        property: "og:description",
        content:
          "Selected projects across iGaming, streaming, e-commerce, tech leadership and enterprise systems.",
      },
    ],
  }),
  component: PortfolioPage,
});

const filters: Filter[] = ["all", "frontend", "fullstack", "tech-lead", "legacy"];

function PortfolioPage() {
  const [filter, setFilter] = useState<Filter>("all");
  const visible = useMemo(
    () => (filter === "all" ? projects : projects.filter((p) => p.category === filter)),
    [filter],
  );
  const [selectedId, setSelectedId] = useState<string>(projects[0].id);
  const selected = visible.find((p) => p.id === selectedId) ?? visible[0];

  return (
    <div className="space-y-6">
      <NCWindow title="C:\>DIR /W PORTFOLIO">
        <div className="space-y-3">
          <p className="text-foreground/85">
            Browse projects from 2010 to today. Use the tabs to filter, then pick a
            project on the left to inspect it on the right.
          </p>
          <div className="flex flex-wrap gap-1">
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => {
                  setFilter(f);
                  const first = (f === "all" ? projects : projects.filter((p) => p.category === f))[0];
                  if (first) setSelectedId(first.id);
                }}
                className={cn(
                  "px-3 py-1 border border-foreground text-base",
                  filter === f
                    ? "bg-accent text-accent-foreground"
                    : "bg-background text-foreground hover:bg-primary hover:text-primary-foreground",
                )}
              >
                [{categoryLabels[f]}]
              </button>
            ))}
          </div>
        </div>
      </NCWindow>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
        <NCWindow title="LEFT.PAN" bodyClassName="p-0">
          <ul className="divide-y divide-foreground/30">
            {visible.map((p) => {
              const active = selected && p.id === selected.id;
              return (
                <li key={p.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedId(p.id)}
                    className={cn(
                      "block w-full text-left px-3 py-2 text-base",
                      active
                        ? "bg-accent text-accent-foreground"
                        : "text-foreground hover:bg-primary hover:text-primary-foreground",
                    )}
                  >
                    <span aria-hidden>{active ? ">" : " "}</span>{" "}
                    <span className="uppercase">{p.name}</span>
                    <div
                      className={cn(
                        "text-xs sm:text-sm",
                        active ? "text-accent-foreground/80" : "text-foreground/70",
                      )}
                    >
                      {p.company} · {p.period}
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </NCWindow>

        <NCWindow title={selected ? `RIGHT.PAN — ${selected.name}` : "RIGHT.PAN"}>
          {selected && (
            <div className="space-y-4">
              <div className="space-y-1">
                <p className="pixel-heading text-sm text-accent uppercase">{selected.name}</p>
                <p>
                  <span className="text-foreground/70">Company...:</span> {selected.company}
                </p>
                <p>
                  <span className="text-foreground/70">Period....:</span> {selected.period}
                </p>
                <p>
                  <span className="text-foreground/70">Category..:</span>{" "}
                  {categoryLabels[selected.category]}
                </p>
                {selected.url && (
                  <p className="break-all">
                    <span className="text-foreground/70">URL.......:</span>{" "}
                    <a href={selected.url} target="_blank" rel="noopener noreferrer">
                      {selected.url}
                    </a>
                  </p>
                )}
              </div>
              <div>
                <p className="text-foreground/70">Stack:</p>
                <ul className="mt-1 flex flex-wrap gap-1">
                  {selected.stack.map((s) => (
                    <li
                      key={s}
                      className="border border-foreground bg-background px-2 py-0.5 text-sm"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-foreground/70">Summary:</p>
                <p className="mt-1">{selected.summary}</p>
              </div>
              <div>
                <p className="text-foreground/70">Highlights:</p>
                <ul className="mt-1 space-y-1">
                  {selected.highlights.map((h) => (
                    <li key={h}>
                      <span aria-hidden className="text-accent">●</span> {h}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </NCWindow>
      </div>
    </div>
  );
}