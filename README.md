# luizbueno.com v2

A personal portfolio with a DOS / Norton Commander visual identity, built with **Next.js 16, React 19, TypeScript, Biome, and Tailwind CSS v4**.

The codebase is organized to prioritize:

- readability
- clear architectural boundaries
- maintainability and predictability
- modern React 19 / Next.js 16 patterns

## Tech Stack

- Next.js 16 (App Router, Turbopack)
- React 19 (Server Components)
- TypeScript (strict)
- Tailwind CSS v4
- Biome (lint + formatting + import organization)
- Playwright (E2E)
- Classic Console Neue — self-hosted DOS console font (`next/font/local`)

## Project Layout

The repository follows the **Next.js recommended layout**: a single `src/` folder is the source of truth, and the App Router lives at `src/app/`.

```text
src/
  app/                     # Next.js App Router (routing, layouts, metadata routes)
    about/page.tsx
    contact/page.tsx
    portfolio/page.tsx
    error.tsx
    globals.css
    layout.tsx
    loading.tsx
    not-found.tsx
    page.tsx
    robots.ts
    sitemap.ts

  content/                 # Static domain data (typed sources of truth)
    career.ts
    profile.ts
    projects.ts
    skills.ts

  features/                # Feature-oriented modules (UI + logic colocated)
    about/
      components/about-screen.tsx
      lib/get-related-projects.ts
    contact/
      components/contact-screen.client.tsx
    home/
      components/home-screen.tsx
    portfolio/
      components/portfolio-screen.client.tsx
      lib/project-period.ts
    shell/
      components/command-line.client.tsx
      components/shell-frame.client.tsx
      components/status-bar.client.tsx
      lib/prompt.ts

  shared/                  # Cross-cutting layer (reusable across features)
    config/navigation.ts
    lib/
      cn.ts
      dom.ts
      home-intro-session.ts
      time.ts
    seo/metadata.ts
    ui/dos/                # Base presentational primitives (DOS theme)
      blinking-cursor.tsx
      nc-panel.tsx
      nc-window.tsx
      typewriter.tsx

tests/
  e2e/
    shell-shortcuts.spec.ts

playwright.config.ts
next.config.ts
biome.json
postcss.config.mjs
tsconfig.json
```

### Path alias

`tsconfig.json` exposes a single alias that covers the entire codebase:

```jsonc
"paths": { "@/*": ["./src/*"] }
```

So routes, features, shared utilities and content are all imported through `@/...` (no relative `../../..` chains).

## Architectural Layers

The structure is layered, not just folder-organized. Dependencies flow **inward only**:

```
src/app/        ← src/features/        ← src/shared/
                                       ← src/content/
```

### `src/app/` — routing layer

- Route entry points (`page.tsx`, `layout.tsx`)
- Route-level UI states: `loading.tsx`, `error.tsx`, `not-found.tsx`
- Metadata Routes: `robots.ts`, `sitemap.ts`
- Global stylesheet (`globals.css`)
- Each route file is intentionally thin: it composes a feature screen and declares metadata.

### `src/features/` — feature layer

Each feature owns a self-contained module with its own:

- `components/` — feature-specific UI (Server or Client Components)
- `lib/` — feature-specific helpers
- `actions/` — Server Actions (when applicable)

Features may depend on `shared/` and `content/`, but never on each other.

| Feature     | Responsibility                                                            |
| ----------- | ------------------------------------------------------------------------- |
| `home`      | DOS-style intro, typewriter animation, session-based replay control       |
| `about`     | Profile bio, skills, languages, career timeline                           |
| `portfolio` | Filterable project list, paging, detail pane, keyboard navigation         |
| `contact`   | Contact info, links, and copy-to-clipboard email helper                   |
| `shell`     | Persistent app shell (menu bar, command line, status bar, F-key shortcuts) |

### `src/shared/` — shared layer

Cross-cutting concerns reused by multiple features:

- `config/navigation.ts` — global route table
- `lib/` — pure utilities (`cn`, `dom`, `time`, `home-intro-session`)
- `seo/metadata.ts` — typed metadata builders, canonical URLs, OG/Twitter, JSON-LD graph
- `ui/dos/` — design-system primitives styled in the DOS palette (`NCWindow`, `NCPanel`, `BlinkingCursor`, `Typewriter`)

### `src/content/` — content layer

Typed static data used by features and SEO:

- `profile.ts`, `career.ts`, `projects.ts`, `skills.ts`

UI components stay declarative because the domain data is centralized here.

## Runtime Flow

### 1. Composition root

`src/app/layout.tsx` is the global composition root:

- registers global metadata + viewport
- loads Classic Console Neue locally via `next/font/local`
- emits the JSON-LD structured data
- wraps every route in the persistent `ShellFrame`

### 2. Persistent shell

The shell layer (`src/features/shell`) stays mounted across navigations:

- dynamic command prompt derived from `pathname`
- status bar with `1..4` and `F1..F4` shortcuts
- subtle route transition reveal

### 3. Server-first routes

- Routes are Server Components by default.
- `*.client.tsx` files mark the boundary where interactivity is required.

### 4. Dynamic SEO for `/portfolio`

`src/app/portfolio/page.tsx` exports `generateMetadata` to derive title, description, canonical URL and OG tags from the `?project=...` query parameter.

## Component Documentation

All exported components, helpers and content models are documented with TSDoc:

- intent and architectural responsibility
- parameter and return descriptions for exported functions
- contract clarity for new contributors

Examples:

- `src/features/shell/components/shell-frame.client.tsx`
- `src/features/contact/components/contact-screen.client.tsx`
- `src/shared/seo/metadata.ts`
- `src/shared/ui/dos/nc-window.tsx`

## SEO Strategy

SEO is centralized in `src/shared/seo/metadata.ts` and used by all routes:

- typed metadata builders (`buildPageMetadata`, `buildPortfolioProjectMetadata`)
- canonical URL helper (`absoluteUrl`)
- Open Graph + Twitter Card tags
- JSON-LD graph (`WebSite` + `Person`) emitted in the root layout
- Metadata Routes for `robots.txt` and `sitemap.xml`

## Typography

The whole UI is rendered with a single self-hosted typeface: **[Classic Console Neue](https://webdraft.hu/fonts/classic-console/)** (clacon2, MIT) — an authentic 8x16 ASCII console fixed-width font. It is loaded through `next/font/local` from `public/fonts/clacon2.woff2` (with a `clacon2.ttf` fallback) and exposed as the CSS variable `--font-clacon`.

In `src/app/globals.css`, both `--font-mono` and `--font-pixel` resolve to `--font-clacon`, so headings and body share the same DOS-authentic glyphs and the visual hierarchy is driven by size and color, not by font family.

## Tailwind CSS v4

Tailwind v4 scans content via `@source` declarations in `src/app/globals.css`:

```css
@import "tailwindcss" source(none);
@source "..";
@import "tw-animate-css";
```

`..` resolves to `src/`, so every file under `src/app/`, `src/features/`, `src/shared/`, `src/content/` is scanned automatically.

## End-to-End Testing (Playwright)

E2E tests live in `tests/e2e` and run against a real Next.js dev server (auto-started by Playwright on port 3000).

### Covered scenarios

- **Shell keyboard navigation**: function keys (`F1..F4`) and number keys (`1..4`)

## Scripts

This project uses **pnpm**.

| Script              | Purpose                                |
| ------------------- | -------------------------------------- |
| `pnpm dev`          | Start the local development server     |
| `pnpm build`        | Production build                       |
| `pnpm start`        | Run the production server              |
| `pnpm lint`         | Biome checks (lint + format + imports) |
| `pnpm lint:fix`     | Biome auto-fix                         |
| `pnpm format`       | Format the repository with Biome       |
| `pnpm typecheck`    | TypeScript type-only check             |
| `pnpm e2e`          | Run Playwright suite                   |
| `pnpm e2e:headed`   | Playwright with a headed browser       |
| `pnpm e2e:ui`       | Playwright UI mode                     |

## Local Setup

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Quality Gates

The following commands all pass on the current state of the repository:

- `pnpm typecheck`
- `pnpm lint`
- `pnpm build`
- `pnpm e2e`

## Suggested Next Steps

1. Add unit tests for helper logic (`project-period`, prompt builder, intro session logic).
2. Add observability/analytics boundaries to measure navigation.
