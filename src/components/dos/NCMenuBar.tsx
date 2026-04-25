import { useCallback, useRef } from "react";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import { Link } from "@tanstack/react-router";
import { MAIN_NAV_ITEMS } from "./main-nav";

function BarHotkey({ label, index }: { label: string; index: number }) {
  const before = label.slice(0, index);
  const ch = label[index] ?? "";
  const after = label.slice(index + 1);
  return (
    <>
      {before}
      <span className="nc-menu-bar__hotkey">{ch}</span>
      {after}
    </>
  );
}

export function NCMenuBar() {
  const navRef = useRef<HTMLElement>(null);

  const focusLink = useCallback((index: number) => {
    const root = navRef.current;
    if (!root) return;
    const links = root.querySelectorAll<HTMLAnchorElement>("a[href]");
    const i = ((index % links.length) + links.length) % links.length;
    links[i]?.focus();
  }, []);

  const onKeyDown = useCallback(
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
        focusLink(idx + 1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        focusLink(idx - 1);
      } else if (e.key === "Home") {
        e.preventDefault();
        focusLink(0);
      } else if (e.key === "End") {
        e.preventDefault();
        focusLink(links.length - 1);
      }
    },
    [focusLink],
  );

  return (
    <header className="nc-menu-bar">
      <div className="nc-menu-bar__inner">
        <nav
          ref={navRef}
          className="nc-menu-bar__nav"
          aria-label="Menu principal"
          onKeyDown={onKeyDown}
        >
          {MAIN_NAV_ITEMS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="nc-menu-bar__link"
              activeProps={{ className: "nc-menu-bar__link--active" }}
            >
              <BarHotkey label={item.barLabel} index={item.barHotkeyIndex} />
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
