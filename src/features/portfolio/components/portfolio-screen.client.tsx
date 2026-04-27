"use client";

import { type ProjectCategory, categoryLabels, projects } from "@/content/projects";
import { toPeriodRank } from "@/features/portfolio/lib/project-period";
import { isTypingContext } from "@/shared/lib/dom";
import { NCWindow } from "@/shared/ui/dos/nc-window";
import { useCallback, useEffect, useMemo, useState } from "react";

/**
 * Available filter values shown in the portfolio tabs.
 */
type Filter = ProjectCategory | "all";

/**
 * Props accepted by the portfolio client screen.
 */
type PortfolioScreenProps = {
  /** Optional project id to pre-select from query string. */
  initialProjectId?: string;
};

/**
 * Number of projects displayed per page in the left panel.
 */
const PAGE_SIZE = 9;

/**
 * Ordered list of selectable filter tabs.
 */
const FILTERS: readonly Filter[] = ["all", "frontend", "fullstack", "tech-lead", "legacy"];

/**
 * Interactive portfolio explorer with filters, pagination and keyboard shortcuts.
 *
 * @param props - Initial route context, including pre-selected project id.
 * @returns Two-pane project browser UI.
 */
export function PortfolioScreen({ initialProjectId }: PortfolioScreenProps) {
  const orderedProjects = useMemo(
    () => [...projects].sort((a, b) => toPeriodRank(b.period) - toPeriodRank(a.period)),
    [],
  );
  const [filter, setFilter] = useState<Filter>("all");
  const filteredProjects = useMemo(() => {
    if (filter === "all") {
      return orderedProjects;
    }

    return orderedProjects.filter((project) => project.category === filter);
  }, [filter, orderedProjects]);
  const [page, setPage] = useState(0);
  const [selectedId, setSelectedId] = useState(
    () => initialProjectId ?? orderedProjects[0]?.id ?? "",
  );
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

  /**
   * Moves the list view to a specific page and aligns selection with that page.
   */
  const goToPage = useCallback(
    (nextPage: number) => {
      const clamped = Math.min(Math.max(nextPage, 0), totalPages - 1);
      setPage(clamped);

      const firstOnPage = filteredProjects[clamped * PAGE_SIZE];

      if (firstOnPage) {
        setSelectedId(firstOnPage.id);
      }
    },
    [filteredProjects, totalPages],
  );

  /**
   * Selects a project using its index from the currently filtered collection.
   */
  const selectProjectByIndex = useCallback(
    (index: number) => {
      const project = filteredProjects[index];

      if (!project) {
        return;
      }

      setSelectedId(project.id);

      const nextPage = Math.floor(index / PAGE_SIZE);

      if (nextPage !== currentPage) {
        setPage(nextPage);
      }
    },
    [currentPage, filteredProjects],
  );

  /**
   * Selects the previous project in the filtered sequence.
   */
  const goToPrevProject = useCallback(() => {
    selectProjectByIndex(Math.max(selectedGlobalIndex - 1, 0));
  }, [selectProjectByIndex, selectedGlobalIndex]);

  /**
   * Selects the next project in the filtered sequence.
   */
  const goToNextProject = useCallback(() => {
    selectProjectByIndex(Math.min(selectedGlobalIndex + 1, filteredProjects.length - 1));
  }, [filteredProjects.length, selectProjectByIndex, selectedGlobalIndex]);

  useEffect(() => {
    if (!initialProjectId) {
      return;
    }

    const index = orderedProjects.findIndex((project) => project.id === initialProjectId);

    if (index < 0) {
      return;
    }

    setFilter("all");
    setPage(Math.floor(index / PAGE_SIZE));
    setSelectedId(initialProjectId);
  }, [initialProjectId, orderedProjects]);

  useEffect(() => {
    if (page !== currentPage) {
      setPage(currentPage);
    }
  }, [currentPage, page]);

  useEffect(() => {
    if (selected && selected.id !== selectedId) {
      setSelectedId(selected.id);
    }
  }, [selected, selectedId]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (isTypingContext(event.target) || pagedProjects.length === 0) {
        return;
      }

      const selectedIndex = Math.max(
        0,
        pagedProjects.findIndex((project) => project.id === selectedId),
      );

      if (event.key === "ArrowDown") {
        event.preventDefault();
        const next = pagedProjects[Math.min(selectedIndex + 1, pagedProjects.length - 1)];
        if (next) {
          setSelectedId(next.id);
        }
        return;
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        const previous = pagedProjects[Math.max(selectedIndex - 1, 0)];
        if (previous) {
          setSelectedId(previous.id);
        }
        return;
      }

      if (event.key === "Home") {
        event.preventDefault();
        setSelectedId(pagedProjects[0].id);
        return;
      }

      if (event.key === "End") {
        event.preventDefault();
        setSelectedId(pagedProjects[pagedProjects.length - 1].id);
        return;
      }

      if (event.key === "PageDown") {
        event.preventDefault();
        goToPage(currentPage + 1);
        return;
      }

      if (event.key === "PageUp") {
        event.preventDefault();
        goToPage(currentPage - 1);
        return;
      }

      if (event.key === "ArrowRight" && (event.altKey || event.ctrlKey)) {
        event.preventDefault();
        goToPage(currentPage + 1);
        return;
      }

      if (event.key === "ArrowLeft" && (event.altKey || event.ctrlKey)) {
        event.preventDefault();
        goToPage(currentPage - 1);
        return;
      }

      if (/^[a-z0-9]$/i.test(event.key)) {
        const key = event.key.toLowerCase();
        const startIndex = Math.max(
          0,
          filteredProjects.findIndex((project) => project.id === selectedId),
        );

        const forwardIndex = filteredProjects.findIndex(
          (project, index) => index > startIndex && project.name[0]?.toLowerCase() === key,
        );

        if (forwardIndex >= 0) {
          event.preventDefault();
          setLastJumpKey(key.toUpperCase());
          selectProjectByIndex(forwardIndex);
          return;
        }

        const wrapIndex = filteredProjects.findIndex(
          (project) => project.name[0]?.toLowerCase() === key,
        );

        if (wrapIndex >= 0) {
          event.preventDefault();
          setLastJumpKey(key.toUpperCase());
          selectProjectByIndex(wrapIndex);
        }
      }
    };

    window.addEventListener("keydown", onKeyDown, true);

    return () => {
      window.removeEventListener("keydown", onKeyDown, true);
    };
  }, [currentPage, filteredProjects, goToPage, pagedProjects, selectProjectByIndex, selectedId]);

  return (
    <div className="page-stack">
      <NCWindow title="C:\LUIZBUENO">
        <div className="portfolio-intro">
          <p className="dos-text--softer">
            Browse projects from 2010 to today. Use tabs to filter and keyboard shortcuts to
            navigate quickly: ↑/↓ selects, PgUp/PgDn changes page, A-Z jumps by letter.
          </p>
          <div className="portfolio-filter-row">
            {FILTERS.map((nextFilter) => (
              <button
                key={nextFilter}
                type="button"
                onClick={() => {
                  setFilter(nextFilter);

                  const nextFiltered =
                    nextFilter === "all"
                      ? orderedProjects
                      : orderedProjects.filter((project) => project.category === nextFilter);

                  setPage(0);

                  const first = nextFiltered[0];
                  if (first) {
                    setSelectedId(first.id);
                  }
                }}
                className={[
                  "portfolio-filter-tab",
                  filter === nextFilter ? "portfolio-filter-tab--active" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                [{categoryLabels[nextFilter]}]
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
            {pagedProjects.map((project) => {
              const active = selected ? project.id === selected.id : false;

              return (
                <li key={project.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedId(project.id)}
                    className={[
                      "portfolio-project-row",
                      active ? "portfolio-project-row--active" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    <span aria-hidden>{active ? ">" : " "}</span>{" "}
                    <span className="portfolio-project-row__name">{project.name}</span>
                    <div className="portfolio-project-row__meta">
                      {project.company} · {project.period}
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
          {selected ? (
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
                {selected.url ? (
                  <p className="dos-text--break">
                    <span className="dos-text--dim">URL.......:</span>{" "}
                    <a href={selected.url} target="_blank" rel="noopener noreferrer">
                      {selected.url}
                    </a>
                  </p>
                ) : null}
              </div>
              <div>
                <p className="dos-text--dim">Stack:</p>
                <ul className="portfolio-stack-list">
                  {selected.stack.map((stack) => (
                    <li key={stack} className="portfolio-stack-chip">
                      {stack}
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
                  {selected.highlights.map((highlight) => (
                    <li key={highlight}>
                      <span aria-hidden className="dos-text--accent">
                        ●
                      </span>{" "}
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : null}
        </NCWindow>
      </div>
    </div>
  );
}
