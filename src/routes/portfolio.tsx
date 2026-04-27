import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { NCWindow } from "@/components/dos/NCWindow";
import { profile } from "@/data/profile";
import { projects, categoryLabels, type ProjectCategory } from "@/data/projects";
import { pageSeoLinks, pageSeoMeta, seoDefaults } from "@/lib/seo";

type Filter = ProjectCategory | "all";
const PAGE_SIZE = 9;
const MONTH_TO_INDEX: Record<string, number> = {
  jan: 1,
  feb: 2,
  mar: 3,
  apr: 4,
  may: 5,
  jun: 6,
  jul: 7,
  aug: 8,
  sep: 9,
  oct: 10,
  nov: 11,
  dec: 12,
};

function toPeriodRank(period: string): number {
  if (/present|today/i.test(period)) return 999999;
  const entries = [...period.matchAll(/\b([A-Za-z]{3,9})\s+(\d{4})\b/g)].map((m) => {
    const month = MONTH_TO_INDEX[m[1].slice(0, 3).toLowerCase()] ?? 1;
    const year = Number(m[2] ?? 0);
    return year * 12 + month;
  });
  if (entries.length > 0) return Math.max(...entries);

  const years = [...period.matchAll(/\b(19|20)\d{2}\b/g)].map((m) => Number(m[0]));
  if (years.length > 0) return Math.max(...years) * 12 + 1;

  return 0;
}

function isTypingContext(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return true;
  if (target.isContentEditable) return true;
  return false;
}

type PortfolioSearch = {
  project?: string;
};

export const Route = createFileRoute("/portfolio")({
  validateSearch: (raw: Record<string, unknown>): PortfolioSearch => ({
    project: typeof raw.project === "string" && raw.project.length > 0 ? raw.project : undefined,
  }),
  head: ({ match }) => {
    const search = match.search;
    const selected =
      search.project !== undefined ? projects.find((p) => p.id === search.project) : undefined;

    if (selected) {
      const title = `${selected.name} — ${selected.company} | ${profile.shortName}`;
      const path = `/portfolio?project=${encodeURIComponent(selected.id)}`;
      return {
        meta: pageSeoMeta({
          title,
          description: selected.summary,
          path,
        }),
        links: pageSeoLinks(path),
      };
    }

    return {
      meta: pageSeoMeta(seoDefaults.portfolio),
      links: pageSeoLinks(seoDefaults.portfolio.path),
    };
  },
  component: PortfolioPage,
});

const filters: Filter[] = ["all", "frontend", "fullstack", "tech-lead", "legacy"];

function PortfolioPage() {
  const search = Route.useSearch();
  const orderedProjects = useMemo(
    () => [...projects].sort((a, b) => toPeriodRank(b.period) - toPeriodRank(a.period)),
    [],
  );
  const [filter, setFilter] = useState<Filter>("all");
  const filteredProjects = useMemo(
    () =>
      filter === "all"
        ? orderedProjects
        : orderedProjects.filter((project) => project.category === filter),
    [filter, orderedProjects],
  );
  const [page, setPage] = useState(0);
  const [selectedId, setSelectedId] = useState<string>(orderedProjects[0]?.id ?? "");
  const [lastJumpKey, setLastJumpKey] = useState<string | null>(null);

  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages - 1);
  const pageStart = currentPage * PAGE_SIZE;
  const pageEnd = pageStart + PAGE_SIZE;
  const pagedProjects = filteredProjects.slice(pageStart, pageEnd);
  const selected =
    filteredProjects.find((project) => project.id === selectedId) ??
    pagedProjects[0] ??
    filteredProjects[0];
  const selectedGlobalIndex = Math.max(
    0,
    filteredProjects.findIndex((project) => project.id === selected?.id),
  );

  const goToPage = (nextPage: number) => {
    const clamped = Math.min(Math.max(nextPage, 0), totalPages - 1);
    setPage(clamped);
    const first = filteredProjects[clamped * PAGE_SIZE];
    if (first) setSelectedId(first.id);
  };

  const selectProjectByIndex = (projectIndex: number) => {
    const project = filteredProjects[projectIndex];
    if (!project) return;
    setSelectedId(project.id);
    const targetPage = Math.floor(projectIndex / PAGE_SIZE);
    if (targetPage !== currentPage) setPage(targetPage);
  };

  const goToPrevProject = () => {
    const prevIndex = Math.max(selectedGlobalIndex - 1, 0);
    selectProjectByIndex(prevIndex);
  };

  const goToNextProject = () => {
    const nextIndex = Math.min(selectedGlobalIndex + 1, filteredProjects.length - 1);
    selectProjectByIndex(nextIndex);
  };

  useEffect(() => {
    const id = search.project;
    if (!id) return;
    const index = orderedProjects.findIndex((p) => p.id === id);
    if (index < 0) return;
    setFilter("all");
    setPage(Math.floor(index / PAGE_SIZE));
    setSelectedId(id);
  }, [search.project, orderedProjects]);

  useEffect(() => {
    if (page !== currentPage) setPage(currentPage);
  }, [currentPage, page]);

  useEffect(() => {
    if (!selected) return;
    if (selected.id !== selectedId) setSelectedId(selected.id);
  }, [selected, selectedId]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (isTypingContext(e.target)) return;
      if (pagedProjects.length === 0) return;

      const selectedIndex = Math.max(
        0,
        pagedProjects.findIndex((project) => project.id === selectedId),
      );

      if (e.key === "ArrowDown") {
        e.preventDefault();
        const next = pagedProjects[Math.min(selectedIndex + 1, pagedProjects.length - 1)];
        if (next) setSelectedId(next.id);
        return;
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        const prev = pagedProjects[Math.max(selectedIndex - 1, 0)];
        if (prev) setSelectedId(prev.id);
        return;
      }

      if (e.key === "Home") {
        e.preventDefault();
        setSelectedId(pagedProjects[0].id);
        return;
      }

      if (e.key === "End") {
        e.preventDefault();
        setSelectedId(pagedProjects[pagedProjects.length - 1].id);
        return;
      }

      if (e.key === "PageDown") {
        e.preventDefault();
        goToPage(currentPage + 1);
        return;
      }

      if (e.key === "PageUp") {
        e.preventDefault();
        goToPage(currentPage - 1);
        return;
      }

      if (e.key === "ArrowRight" && (e.altKey || e.ctrlKey)) {
        e.preventDefault();
        goToPage(currentPage + 1);
        return;
      }

      if (e.key === "ArrowLeft" && (e.altKey || e.ctrlKey)) {
        e.preventDefault();
        goToPage(currentPage - 1);
        return;
      }

      if (/^[a-z0-9]$/i.test(e.key)) {
        const key = e.key.toLowerCase();
        const startIndex = Math.max(
          0,
          filteredProjects.findIndex((project) => project.id === selectedId),
        );

        const forwardIndex = filteredProjects.findIndex(
          (project, idx) => idx > startIndex && project.name[0]?.toLowerCase() === key,
        );
        if (forwardIndex >= 0) {
          e.preventDefault();
          setLastJumpKey(key.toUpperCase());
          selectProjectByIndex(forwardIndex);
          return;
        }

        const wrapIndex = filteredProjects.findIndex(
          (project) => project.name[0]?.toLowerCase() === key,
        );
        if (wrapIndex >= 0) {
          e.preventDefault();
          setLastJumpKey(key.toUpperCase());
          selectProjectByIndex(wrapIndex);
        }
      }
    }

    window.addEventListener("keydown", onKeyDown, true);
    return () => window.removeEventListener("keydown", onKeyDown, true);
  }, [currentPage, filteredProjects, pagedProjects, selectedId, totalPages]);

  return (
    <div className="page-stack">
      <NCWindow title="C:\LUIZBUENO">
        <div className="portfolio-intro">
          <p className="dos-text--softer">
            Browse projects from 2010 to today. Use tabs to filter and keyboard shortcuts to
            navigate quickly: ↑/↓ selects, PgUp/PgDn changes page, A-Z jumps by letter.
          </p>
          <div className="portfolio-filter-row">
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => {
                  setFilter(f);
                  const nextFiltered =
                    f === "all"
                      ? orderedProjects
                      : orderedProjects.filter((project) => project.category === f);
                  const first = nextFiltered[0];
                  setPage(0);
                  if (first) setSelectedId(first.id);
                }}
                className={[
                  "portfolio-filter-tab",
                  filter === f ? "portfolio-filter-tab--active" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                [{categoryLabels[f]}]
              </button>
            ))}
          </div>
        </div>
      </NCWindow>

      <div className="portfolio-split">
        <NCWindow
          className="portfolio-list-window"
          title="C:\LUIZBUENO\*.PRJ"
          bodyClassName="nc-window-body--flush"
        >
          <ul className="portfolio-project-list">
            {pagedProjects.map((p) => {
              const active = selected && p.id === selected.id;
              return (
                <li key={p.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedId(p.id)}
                    className={[
                      "portfolio-project-row",
                      active ? "portfolio-project-row--active" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    <span aria-hidden>{active ? ">" : " "}</span>{" "}
                    <span className="portfolio-project-row__name">{p.name}</span>
                    <div className="portfolio-project-row__meta">
                      {p.company} · {p.period}
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
          <div className="portfolio-list-footer">
            <button
              type="button"
              className="portfolio-page-btn"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 0}
            >
              [PgUp] Prev
            </button>
            <span className="portfolio-list-status">
              TOTAL: {filteredProjects.length} | PAGE: {currentPage + 1}/{totalPages}
              {lastJumpKey ? ` | JUMP: ${lastJumpKey}` : ""}
            </span>
            <button
              type="button"
              className="portfolio-page-btn"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage >= totalPages - 1}
            >
              Next [PgDn]
            </button>
          </div>
        </NCWindow>

        <NCWindow
          className="portfolio-detail-window"
          title={selected ? `C:\\PORTFOLIO\\${selected.name}` : "C:\\PORTFOLIO\\VIEW"}
        >
          {selected && (
            <div className="portfolio-detail">
              <div className="portfolio-mobile-nav">
                <button
                  type="button"
                  className="portfolio-page-btn"
                  onClick={goToPrevProject}
                  disabled={selectedGlobalIndex === 0}
                >
                  [Prev]
                </button>
                <span className="portfolio-list-status">
                  ITEM: {selectedGlobalIndex + 1}/{filteredProjects.length}
                  {lastJumpKey ? ` | JUMP: ${lastJumpKey}` : ""}
                </span>
                <button
                  type="button"
                  className="portfolio-page-btn"
                  onClick={goToNextProject}
                  disabled={selectedGlobalIndex >= filteredProjects.length - 1}
                >
                  [Next]
                </button>
              </div>
              <div className="portfolio-detail__head">
                <p className="portfolio-detail__title">{selected.name}</p>
                <p>
                  <span className="dos-text--dim">Company...:</span> {selected.company}
                </p>
                <p>
                  <span className="dos-text--dim">Period....:</span> {selected.period}
                </p>
                <p>
                  <span className="dos-text--dim">Category..:</span>{" "}
                  {categoryLabels[selected.category]}
                </p>
                {selected.url && (
                  <p className="dos-text--break">
                    <span className="dos-text--dim">URL.......:</span>{" "}
                    <a href={selected.url} target="_blank" rel="noopener noreferrer">
                      {selected.url}
                    </a>
                  </p>
                )}
              </div>
              <div>
                <p className="dos-text--dim">Stack:</p>
                <ul className="portfolio-stack-list">
                  {selected.stack.map((s) => (
                    <li key={s} className="portfolio-stack-chip">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="dos-text--dim">Summary:</p>
                <p className="portfolio-summary-text">{selected.summary}</p>
              </div>
              <div>
                <p className="dos-text--dim">Highlights:</p>
                <ul className="portfolio-highlights">
                  {selected.highlights.map((h) => (
                    <li key={h}>
                      <span aria-hidden className="dos-text--accent">
                        ●
                      </span>{" "}
                      {h}
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
