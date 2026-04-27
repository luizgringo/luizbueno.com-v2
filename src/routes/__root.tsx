import { useEffect } from "react";
import {
  Outlet,
  Link,
  createRootRoute,
  HeadContent,
  Scripts,
  useRouterState,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { NCCommandLine } from "@/components/dos/NCCommandLine";
import { StatusBar } from "@/components/dos/StatusBar";
import {
  isHomePathname,
  registerPathnameForHomeIntro,
  shouldAnimateHomeIntro,
} from "@/lib/homeIntroSession";
import { pageSeoMeta, rootStructuredDataJsonLd, seoDefaults } from "@/lib/seo";
import { profile } from "@/data/profile";

function NotFoundComponent() {
  return (
    <div className="not-found-root scanlines">
      <NCCommandLine />
      <main className="not-found-root__main">
        <section className="nc-window nc-window--full-width">
          <header className="nc-window-title">═[ ABORT, RETRY, FAIL? ]═</header>
          <div className="nc-window-body nc-window-body--centered">
            <p className="pixel-heading not-found-error-title dos-text--destructive">ERROR 404</p>
            <p className="not-found-lead">Bad command or file name.</p>
            <p className="not-found-sub">
              The page you requested could not be located on this drive.
            </p>
            <div className="not-found-actions">
              <Link to="/" className="nc-nav-item">
                <span aria-hidden>{">"}</span> RETURN TO C:\
              </Link>
            </div>
          </div>
        </section>
      </main>
      <StatusBar />
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "author", content: profile.name },
      { name: "robots", content: "index, follow" },
      { name: "theme-color", content: "#0000AA" },
      ...pageSeoMeta(seoDefaults.home),
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(rootStructuredDataJsonLd()),
      },
    ],
    links: [
      {
        rel: "icon",
        href: "/favicon.ico",
        sizes: "32x32",
      },
      {
        rel: "icon",
        type: "image/png",
        href: "/favicon-32.png",
        sizes: "32x32",
      },
      {
        rel: "apple-touch-icon",
        href: "/apple-touch-icon.png",
        sizes: "180x180",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=VT323&family=Press+Start+2P&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const outletRouteReveal = !isHomePathname(pathname) || shouldAnimateHomeIntro();

  useEffect(() => {
    registerPathnameForHomeIntro(pathname);
  }, [pathname]);

  return (
    <div className="app-root scanlines">
      <NCCommandLine />
      <main className="app-root__main">
        <div key={pathname} className={outletRouteReveal ? "route-vintage-reveal" : undefined}>
          <Outlet />
        </div>
      </main>
      <StatusBar />
    </div>
  );
}
