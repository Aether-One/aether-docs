# Onboarding: aether-docs

This guide is for a developer who has already run `aether-docs` locally and now wants to understand it well enough to change it without breaking things. It is the human-oriented counterpart to a machine index: the goal is the *mental model*, not a file catalogue.

## Why this project exists

`aether-docs` is the official documentation site and landing page for **Aether**, an open-source CLI described in the README as the tool that "transforms any codebase into an AI-native workspace." The docs site exists to explain that CLI to the world: what it is, how to install it, how to use its commands, and how to contribute back.

The motivation is practical. Aether is a real command-line tool (referenced throughout the site via `https://github.com/aether-one/aether`), and a project like that is only useful if people can understand and adopt it. `aether-docs` is the public face: the landing page sells the idea and the `/docs` section teaches the mechanics. The README frames the site itself as a **Next.js 16 App Router project with static export**, which tells you the whole thing is built to be deployed as flat HTML — currently auto-deployed to GitHub Pages on push to `main` per the README, though note the README mentions a `.github/workflows/deploy.yml` that is *not* present in the provided project tree, so treat that deployment path as described-by-author rather than verifiable here.

One thing to keep straight: the *docs site* is not the CLI. The CLI features (Genesis command, context scanning, provider support) appear in the landing page copy and roadmap, but only as content describing the external tool. Nothing in this repo implements the CLI.

## Mental model

Think of the project as two connected surfaces wrapped in one Next.js app.

The first surface is the **landing page** at `src/app/page.tsx`. It is a stacked sequence of sections, each a self-contained component: `Navbar`, `Hero`, `Features`, `HowItWorks`, `QuickStart`, `Roadmap`, and `Footer`. The Hero is the only part with a 3D background — it lazy-loads `Galaxy` (a React Three Fiber particle system) and layers marketing copy, a fake terminal, and scroll-based motion on top. The other sections are mostly Framer Motion entrance animations around static content describing Aether.

The second surface is the **documentation area** under `src/app/docs/`. This is a nested route with its own `layout.tsx` that wraps every docs page in a `DocsHeader` and `DocsSidebar`. The actual documentation content lives as `.mdx` files: `page.mdx` (Introduction), `getting-started/page.mdx`, `cli-reference/page.mdx`, `changelog/page.mdx`, and `contributing/page.mdx`. MDX is wired up in `next.config.ts` via `@next/mdx` with `remark-gfm`, and `mdx-components.tsx` at the root provides the styled equivalents of every standard Markdown element (headings, code blocks, tables, blockquotes). That file is the single place where docs typography is defined — it maps Markdown tags to styled React elements using CSS variables like `--docs-text` and `--docs-border`.

Theme is a cross-cutting concern. `ThemeProvider` (in `src/components/theme/`) sets `dark` or `light` on the HTML element and persists the choice to `localStorage`. Almost every visual component reads theme indirectly through CSS variables or, in the case of `Logo` and `Navbar`, swaps image assets based on `useTheme()`. The root layout hard-codes `className="dark"` on `<html>` and uses `suppressHydrationWarning`, because the real theme is applied client-side after mount.

The reusable primitives — `Button`, `Card`, `Badge`, `Logo` — live in `src/components/ui/` and are re-exported through `index.ts`. The docs-specific pieces (`DocsSidebar`, `DocsHeader`, `Authors`, `PlatformInstall`) live in `src/components/docs/`.

## Where things live

A short map for the changes you'll most likely make:

- **I want to edit the landing page sections** → the components in `src/components/features/`, `how-it-works/`, `quickstart/`, `roadmap/`, `hero/`, `navbar/`, `footer/`; the order they render is in `src/app/page.tsx`.
- **I want to change docs content** → the `.mdx` files under `src/app/docs/` (e.g. `getting-started/page.mdx`).
- **I want to restyle how docs render** → `mdx-components.tsx` at the project root, not the individual pages.
- **I want to add or rename a docs page** → create the `.mdx` file under `src/app/docs/<slug>/page.mdx`, then add it to the `navigation` array in `src/components/docs/DocsSidebar.tsx` (and optionally `Footer.tsx` links).
- **I want to change the docs sidebar/layout chrome** → `src/app/docs/layout.tsx`, `DocsSidebar.tsx`, `DocsHeader.tsx`.
- **I want to tweak theme tokens or dark/light behavior** → `src/components/theme/` and the CSS variables consumed across components (defined in `globals.css`, which is imported by the root layout).
- **I want to change the 3D background** → `src/components/galaxy/Galaxy.tsx` (four particle layers: `StarField`, `SpiralNebula`, `GalacticCore`, `BlueStreaks`); it is only mounted by `Hero.tsx`.

## Key decisions & the reasoning

**Static export is intentional.** `next.config.ts` sets `output: "export"` and `images.unoptimized = true`. The README confirms the site deploys as static files (the `out/` directory) to GitHub Pages. This means: no server-side rendering, no API routes, and image optimization is off. Don't reach for server-only Next features here — they won't work in the export.

**MDX with remark-gfm is the docs engine.** The config enables `.mdx` as a page extension and pipes GitHub-flavored Markdown through. This lets docs be written as content files rather than React components, while `mdx-components.tsx` keeps styling centralized. The reasoning is maintainability: authors edit prose, not JSX.

**Theme is client-side and persisted.** `ThemeProvider` reads `localStorage` on mount and defaults to `dark`. The root `<html>` is pre-set to `dark` with `suppressHydrationWarning` to avoid a flash mismatch. The `Logo` and `Navbar` components specifically choose between `aether_logo_no_bg_dark.png` / `_light.png` and `topbar_logo_dark.png` / `_light.png` from `public/` based on the active theme. This split-asset approach should not be casually replaced with a single SVG unless you also handle both themes.

**The Galaxy background is dynamically imported with `ssr: false`.** `Hero.tsx` uses `next/dynamic` to load `Galaxy` only on the client, with a plain background div as the loading state. This is because React Three Fiber touches `window`/WebGL and would break static prerender. Do not convert `Galaxy` to a normal import in the Hero — it will break the static build.

**Roadmap and CLI features are content, not code.** `Roadmap.tsx` hard-codes three phases ("Now / Next / Later") and `Features.tsx` hard-codes the feature grid. These describe the *external* Aether CLI's planned and current state. The "Now" phase lists Core CLI, Genesis command, AI providers, Context scanning — but that is the CLI's status, not something implemented in this repo. Don't mistake these sections for a build plan of `aether-docs` itself.

## Making your first change

A realistic small task: **add a new entry to the docs sidebar and a matching page.**

1. Create the content file, e.g. `src/app/docs/troubleshooting/page.mdx`. Write MDX using standard headings, lists, and code fences — styling comes from `mdx-components.tsx`, so you don't add classes.
2. Open `src/components/docs/DocsSidebar.tsx`. In the `navigation` array, add `{ title: "Troubleshooting", href: "/docs/troubleshooting" }` under a suitable section (e.g. "Community" or a new section).
3. Optionally add a `Footer.tsx` link so it appears site-wide.
4. Run `npm run dev` and open `http://localhost:3000/docs/troubleshooting`. Verify the sidebar highlights the active link (the `usePathname()` check in `DocsSidebar` handles that) and the page renders with the docs theme.
5. Run `npm run lint` before committing, since ESLint is configured via `eslint.config.mjs` and `eslint-config-next`.

That flow touches only MDX + one sidebar array + optionally the footer — no build config, no theme changes.

## Gotchas

- **Static export means no server routes.** Anything requiring `next start` server behavior or image optimization will not work as deployed. `images.unoptimized` is already set; use `<img>` (as `Logo` and `Authors` do) rather than `next/image` optimizations.
- **Theme flash / hydration.** The root layout forces `dark` on `<html>`. If you change the default theme in `ThemeProvider`, remember the layout still says `dark` until client mount — keep them consistent or you'll get a flash.
- **Docs styling is global via CSS variables.** `mdx-components.tsx` references variables like `--docs-bg`, `--docs-text`, `--docs-border`, `--accent`, `--muted`. If a docs page looks unstyled, the cause is almost always a missing or renamed variable in `globals.css`, not the MDX file.
- **`Authors.tsx` is ready but unused in the provided tree.** The component credits GitHub users per docs page and supports an array, but no `.mdx` page in the tree imports it. If you wire it up, pass `authors={[{ github: "handle" }]}` — and note it fetches `github.com/<handle>.png` directly, so it depends on GitHub avatars being reachable.
- **README mentions files not in this repo.** The README references `.github/workflows/deploy.yml` and a `CONTRIBUTING.md`/architecture docs; those are not present in the provided structure. The real contributing content is `src/app/docs/contributing/page.mdx`. Don't go looking for a root `CONTRIBUTING.md`.
- **`PlatformInstall.tsx` is built but not mounted.** It renders Windows/macOS/Linux install cards with copy buttons, yet no `.mdx` or layout in the tree imports it. If you want it on the Getting Started page, you'd add it to `getting-started/page.mdx` via an MDX import — it won't appear on its own.