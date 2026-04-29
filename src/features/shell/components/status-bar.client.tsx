"use client";

import { MAIN_NAV_ITEMS } from "@/shared/config/navigation";
import { cn } from "@/shared/lib/cn";
import { isTypingContext } from "@/shared/lib/dom";
import { formatClockTime } from "@/shared/lib/time";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Bottom shell bar with route shortcuts and live clock.
 *
 * @returns Interactive status/navigation bar.
 */
export function StatusBar() {
  const pathname = usePathname();
  const router = useRouter();
  const [time, setTime] = useState("--:--:--");
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setTime(formatClockTime(new Date()));

    const timer = window.setInterval(() => {
      setTime(formatClockTime(new Date()));
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (isTypingContext(event.target)) {
        return;
      }

      if (event.key === "1" || event.key === "2" || event.key === "3" || event.key === "4") {
        if (event.ctrlKey || event.metaKey || event.altKey || event.repeat) {
          return;
        }

        const item = MAIN_NAV_ITEMS[Number(event.key) - 1];

        if (item) {
          event.preventDefault();
          router.push(item.href);
        }

        return;
      }

      switch (event.key) {
        case "F1":
          event.preventDefault();
          router.push("/about");
          break;
        case "F2":
          event.preventDefault();
          router.push("/portfolio");
          break;
        case "F3":
          event.preventDefault();
          router.push("/");
          break;
        case "F4":
          event.preventDefault();
          router.push("/contact");
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", onKeyDown, true);

    return () => {
      window.removeEventListener("keydown", onKeyDown, true);
    };
  }, [router]);

  /**
   * Moves keyboard focus across the footer navigation links.
   *
   * @param index - Target link index, wrapped within bounds.
   */
  const focusNavLink = useCallback((index: number) => {
    const navRoot = navRef.current;

    if (!navRoot) {
      return;
    }

    const links = navRoot.querySelectorAll<HTMLAnchorElement>("a[href]");
    const nextIndex = ((index % links.length) + links.length) % links.length;
    links[nextIndex]?.focus();
  }, []);

  /**
   * Handles arrow/home/end navigation when focus is inside the footer links.
   *
   * @param event - Keyboard event emitted by the navigation container.
   */
  const onNavKeyDown = useCallback(
    (event: ReactKeyboardEvent<HTMLElement>) => {
      const navRoot = navRef.current;

      if (
        !navRoot ||
        !(event.target instanceof HTMLAnchorElement) ||
        !navRoot.contains(event.target)
      ) {
        return;
      }

      const links = [...navRoot.querySelectorAll<HTMLAnchorElement>("a[href]")];
      const currentIndex = links.indexOf(event.target);

      if (currentIndex < 0) {
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        focusNavLink(currentIndex + 1);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        focusNavLink(currentIndex - 1);
      } else if (event.key === "Home") {
        event.preventDefault();
        focusNavLink(0);
      } else if (event.key === "End") {
        event.preventDefault();
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
          aria-label="Main navigation"
          onKeyDown={onNavKeyDown}
        >
          {MAIN_NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn("status-bar__link", isActive && "status-bar__link--active")}
                aria-label={`${item.digitKey} ${item.footerShortLabel}, ${item.fnKeyLabel}`}
                title={`Key ${item.digitKey} or ${item.fnKeyLabel}`}
              >
                <span className="status-bar__fkey">
                  <span className="status-bar__fkey-num" aria-hidden>
                    {item.digitKey}
                  </span>
                  <span className="status-bar__fkey-label">{item.footerShortLabel}</span>
                </span>
              </Link>
            );
          })}
        </nav>
        <div className="status-bar__meta">
          <span aria-hidden>640K OK</span>
          <span aria-label={`Current time ${time}`}>{time}</span>
        </div>
      </div>
    </footer>
  );
}
