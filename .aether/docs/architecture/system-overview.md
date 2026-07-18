# System Overview

## Goal

`aether-docs` is the official documentation site and landing page for Aether, the open-source CLI that transforms any codebase into an AI-native workspace. It is built as a Next.js 16 application with static export (`next.config.ts` sets `output: "export"`) and renders docs via MDX.

## Architecture

This is a client-side static site with no backend, database, or server runtime in the provided context.

- **Frontend**: Next.js 16 App Router application (`package.json` dependency `next: "16.2.10"`, `src/app/layout.tsx`, `src/app/page.tsx`). Pages are statically exported (`next.config.ts` → `output: "export"`).
- **Styling**: Tailwind CSS 4 (`postcss.config.mjs`, `package.json` devDependency `tailwindcss: "^4"`, `@tailwindcss/postcss: "^4"`).
- **3D / Animation**: React Three Fiber (`@react-three/fiber`), `@react-three/drei`, `three` for the galaxy background (`src/components/galaxy/Galaxy.tsx`); Framer Motion (`framer-motion`) for UI animation (`src/components/features/Features.tsx`, `Hero.tsx`, etc.).
- **Docs**: MDX pages with `remark-gfm` (`next.config.ts` → `withMDX` + `remarkPlugins: [["remark-gfm"]]`; `mdx-components.tsx` customizes MDX rendering).
- **Theme**: Client-side dark/light theme via React Context (`src/components/theme/ThemeProvider.tsx`, `ThemeToggle.tsx`), persisted to `localStorage` under key `aether-theme`.

## System Components

| Component | File(s) | Role |
|-----------|---------|------|
| Root Layout | `src/app/layout.tsx` | Sets HTML lang, Geist fonts, metadata, wraps app in `ThemeProvider`. |
| Landing Page | `src/app/page.tsx` | Composes `Navbar`, `Hero`, `Features`, `HowItWorks`, `QuickStart`, `Roadmap`, `Footer`. |
| Docs Layout | `src/app/docs/layout.tsx` | Wraps docs pages with `DocsHeader`, `DocsSidebar`, `Footer`. |
| Navbar | `src/components/navbar/Navbar.tsx` | Fixed nav with logo, anchor links, theme toggle, GitHub link. |
| Hero | `src/components/hero/Hero.tsx` | Landing hero with 3D `Galaxy`, headline, CTAs, terminal mock. |
| Galaxy | `src/components/galaxy/Galaxy.tsx` | React Three Fiber canvas with 4 point-cloud layers (`StarField`, `SpiralNebula`, `GalacticCore`, `BlueStreaks`). |
| Features | `src/components/features/Features.tsx` | Grid of feature cards with Framer Motion. |
| HowItWorks | `src/components/how-it-works/HowItWorks.tsx` | Step list (Install/Run/Chat) with terminal-style code. |
| QuickStart | `src/components/quickstart/QuickStart.tsx` | Mock `/genesis` terminal output. |
| Roadmap | `src/components/roadmap/Roadmap.tsx` | Timeline phases (Now/Next/Later). |
| Footer | `src/components/footer/Footer.tsx` | Brand, doc links, GitHub, MIT license line. |
| DocsHeader | `src/components/docs/DocsHeader.tsx` | Sticky docs header with logo, theme toggle, GitHub. |
| DocsSidebar | `src/components/docs/DocsSidebar.tsx` | Nav links to `/docs`, `/docs/getting-started`, `/docs/cli-reference`, `/docs/changelog`, `/docs/contributing` using `usePathname`. |
| Authors | `src/components/docs/Authors.tsx` | Renders author byline from `authors` prop (GitHub avatar + link). |
| PlatformInstall | `src/components/docs/PlatformInstall.tsx` | Per-OS (Windows/macOS/Linux) install script cards with copy button. |
| ThemeProvider / ThemeToggle | `src/components/theme/ThemeProvider.tsx`, `ThemeToggle.tsx`, `index.ts` | Context-based theme state + toggle UI. |
| UI primitives | `src/components/ui/Button.tsx`, `Card.tsx`, `Badge.tsx`, `Logo.tsx`, `index.ts` | Reusable `Button`, `Card`(+`CardHeader`/`CardTitle`/`CardDescription`), `Badge`, `Logo` (theme-aware img). |
| MDX components | `mdx-components.tsx` | Maps `h1`–`hr` MDX elements to styled JSX using CSS vars. |
| Docs MDX pages | `src/app/docs/page.mdx`, `getting-started/page.mdx`, `cli-reference/page.mdx`, `changelog/page.mdx`, `contributing/page.mdx` | Documentation content (files exist; content not provided). |

## Communication Patterns

- **Component composition**: Pages import and render components directly (e.g. `src/app/page.tsx` imports `Navbar`, `Hero`, etc.).
- **React Context**: `ThemeProvider` supplies `theme`/`toggleTheme` via `ThemeContext`; consumed by `useTheme` in `Navbar`, `Logo`, `ThemeToggle`, `Hero`.
- **Next.js routing / Link**: Client navigation via `next/link` (`Navbar`, `Footer`, `DocsSidebar`, `DocsHeader`). `DocsSidebar` uses `usePathname` from `next/navigation` to mark active link.
- **Dynamic import**: `Hero.tsx` dynamically imports `Galaxy` with `ssr: false` (`next/dynamic`).
- No REST, WebSocket, or event-bus communication is present in the provided context.

## Deployment

- **Static export**: `next.config.ts` sets `output: "export"` and `images.unoptimized = true`; `package.json` scripts `build` (`next build`) and `start` (`next start`).
- **README deployment note**: README.md states the site auto-deploys to GitHub Pages on push to `main` via GitHub Actions, and that static files are in the `out/` directory after `npm run build`. (The `.github/workflows/deploy.yml` referenced in README is NOT present in the provided directory structure.)
- No other deployment configuration (Dockerfile, CI config files, hosting config) is present in the provided context.

## Authentication & Authorization

Not detected from provided context. No auth, login, session, or permission logic appears in any provided file.