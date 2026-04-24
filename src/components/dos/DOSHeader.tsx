import { Link } from "@tanstack/react-router";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function DOSHeader() {
  return (
    <header className="sticky top-0 z-40 w-full bg-secondary text-secondary-foreground border-b-2 border-foreground">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-2">
        <Link
          to="/"
          className="flex items-center gap-3 text-secondary-foreground hover:bg-transparent hover:text-secondary-foreground"
        >
          <span
            aria-hidden
            className="pixel-heading inline-flex h-9 w-9 items-center justify-center bg-foreground text-background text-[10px]"
          >
            LB
          </span>
          <span className="hidden sm:inline text-base leading-tight">
            Luiz Bueno`s
            <br />
            Portfolio Website
          </span>
        </Link>
        <nav className="flex flex-wrap items-center justify-end gap-1 text-base sm:text-lg">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="nc-nav-item text-secondary-foreground"
            >
              <span aria-hidden>#</span>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}