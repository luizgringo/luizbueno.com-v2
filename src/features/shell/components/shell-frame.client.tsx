"use client";

import { CommandLine } from "@/features/shell/components/command-line.client";
import { StatusBar } from "@/features/shell/components/status-bar.client";
import { cn } from "@/shared/lib/cn";
import {
  isHomePathname,
  registerPathnameForHomeIntro,
  shouldAnimateHomeIntro,
} from "@/shared/lib/home-intro-session";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";

/**
 * Props accepted by the shared shell frame.
 */
type ShellFrameProps = {
  /** Route content rendered between command line and status bar. */
  children: ReactNode;
};

/**
 * Persistent shell wrapper displayed on every route.
 *
 * @remarks
 * The reveal animation depends on browser-only state (`sessionStorage`) and
 * therefore cannot be evaluated during SSR without causing a hydration
 * mismatch. The component renders the SSR-safe default on the first paint and
 * reconciles the real value after mount.
 *
 * @param props - Child route segment.
 * @returns Application shell with command line, page area and status bar.
 */
export function ShellFrame({ children }: ShellFrameProps) {
  const pathname = usePathname();
  const [shouldRevealOutlet, setShouldRevealOutlet] = useState(true);

  useEffect(() => {
    setShouldRevealOutlet(!isHomePathname(pathname) || shouldAnimateHomeIntro());
    registerPathnameForHomeIntro(pathname);
  }, [pathname]);

  return (
    <div className="app-root scanlines">
      <CommandLine />
      <main className="app-root__main">
        <div key={pathname} className={cn(shouldRevealOutlet && "route-vintage-reveal")}>
          {children}
        </div>
      </main>
      <StatusBar />
    </div>
  );
}
