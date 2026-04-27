import { useCallback, useEffect, useRef, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { MAIN_NAV_ITEMS } from "@/data/main-nav";

function formatTime(d: Date): string {
  const h = String(d.getHours()).padStart(2, "0");
  const m = String(d.getMinutes()).padStart(2, "0");
  const s = String(d.getSeconds()).padStart(2, "0");
  return `${h}:${m}:${s}`;
}

function isTypingContext(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return true;
  if (target.isContentEditable) return true;
  return false;
}

export function StatusBar() {
  const navigate = useNavigate();
  const [time, setTime] = useState<string>(() => formatTime(new Date()));
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const id = window.setInterval(() => setTime(formatTime(new Date())), 1000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (isTypingContext(e.target)) return;

      if (e.key === "1" || e.key === "2" || e.key === "3" || e.key === "4") {
        if (e.ctrlKey || e.metaKey || e.altKey) return;
        if (e.repeat) return;
        const n = Number(e.key) - 1;
        const item = MAIN_NAV_ITEMS[n];
        if (item) {
          e.preventDefault();
          navigate({ to: item.to });
        }
        return;
      }

      switch (e.key) {
        case "F1":
          e.preventDefault();
          navigate({ to: "/about" });
          break;
        case "F2":
          e.preventDefault();
          navigate({ to: "/portfolio" });
          break;
        case "F3":
          e.preventDefault();
          navigate({ to: "/" });
          break;
        case "F4":
          e.preventDefault();
          navigate({ to: "/contact" });
          break;
        default:
          break;
      }
    }
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [navigate]);

  const focusNavLink = useCallback((index: number) => {
    const root = navRef.current;
    if (!root) return;
    const links = root.querySelectorAll<HTMLAnchorElement>("a[href]");
    const i = ((index % links.length) + links.length) % links.length;
    links[i]?.focus();
  }, []);

  const onNavKeyDown = useCallback(
    (e: ReactKeyboardEvent<HTMLElement>) => {
      const root = navRef.current;
      if (!root || !(e.target instanceof HTMLAnchorElement) || !root.contains(e.target)) {
        return;
      }
      const links = [...root.querySelectorAll<HTMLAnchorElement>("a[href]")];
      const idx = links.indexOf(e.target);
      if (idx < 0) return;

      if (e.key === "ArrowRight") {
        e.preventDefault();
        focusNavLink(idx + 1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        focusNavLink(idx - 1);
      } else if (e.key === "Home") {
        e.preventDefault();
        focusNavLink(0);
      } else if (e.key === "End") {
        e.preventDefault();
        focusNavLink(links.length - 1);
      }
    },
    [focusNavLink],
  );

  return (
    <footer className="status-bar">
      <div className="status-bar__inner">
        <nav
          ref={navRef}
          className="status-bar__nav"
          aria-label="Navegação principal"
          onKeyDown={onNavKeyDown}
        >
          {MAIN_NAV_ITEMS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="status-bar__link"
              activeProps={{ className: "status-bar__link--active" }}
              aria-label={`${item.label}, tecla ${item.digitKey} ou ${item.fnKeyLabel}`}
              title={`Tecla ${item.digitKey} ou ${item.fnKeyLabel}`}
            >
              <span className="status-bar__fkey">
                <span className="status-bar__fkey-num" aria-hidden>
                  {item.digitKey}
                </span>
                <span className="status-bar__fkey-label">{item.footerShortLabel}</span>
              </span>
            </Link>
          ))}
        </nav>
        <div className="status-bar__meta">
          <span aria-hidden>640K OK</span>
          <span aria-label={`Current time ${time}`}>{time}</span>
        </div>
      </div>
    </footer>
  );
}
