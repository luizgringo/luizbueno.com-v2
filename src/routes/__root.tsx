import { Outlet, Link, createRootRoute, HeadContent, Scripts, useRouterState } from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { NCCommandLine } from "@/components/dos/NCCommandLine";
import { StatusBar } from "@/components/dos/StatusBar";

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
      { title: "Luiz Bueno — Senior Frontend Developer & Tech Lead" },
      {
        name: "description",
        content:
          "Senior Frontend Developer & Tech Lead based in Belo Horizonte, Brazil. 17+ years building web applications. A pixel-art / Norton Commander 386 portfolio.",
      },
      { name: "author", content: "Luiz Henrique Bueno" },
      { property: "og:title", content: "Luiz Bueno — Senior Frontend Developer & Tech Lead" },
      {
        property: "og:description",
        content:
          "Senior Frontend Developer & Tech Lead. 17+ years building web applications. A pixel-art / Norton Commander 386 portfolio.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [
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

  return (
    <div className="app-root scanlines">
      <NCCommandLine />
      <main className="app-root__main">
        <div key={pathname} className="route-vintage-reveal">
          <Outlet />
        </div>
      </main>
      <StatusBar />
    </div>
  );
}
