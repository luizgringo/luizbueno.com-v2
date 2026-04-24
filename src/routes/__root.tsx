import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { DOSHeader } from "../components/dos/DOSHeader";
import { StatusBar } from "../components/dos/StatusBar";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <DOSHeader />
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-4 py-10">
        <section className="nc-window w-full">
          <header className="nc-window-title">═[ ABORT, RETRY, FAIL? ]═</header>
          <div className="nc-window-body text-center">
            <p className="pixel-heading text-2xl text-destructive">ERROR 404</p>
            <p className="mt-4">Bad command or file name.</p>
            <p className="mt-1 text-foreground/80">
              The page you requested could not be located on this drive.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
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
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground scanlines">
      <DOSHeader />
      <main className="mx-auto w-full max-w-6xl flex-1 px-3 sm:px-6 py-6 pb-24">
        <Outlet />
      </main>
      <StatusBar />
    </div>
  );
}
