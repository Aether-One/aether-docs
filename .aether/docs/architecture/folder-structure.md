# Folder Structure

## Overview

The project `aether-docs` is a Next.js 16 App Router documentation site and landing page. Source code lives under `src/`, split by route group (`app/`) and reusable UI/section components (`components/`). Documentation content is authored as MDX files under `src/app/docs/`. Static logo assets are stored in `public/`. Configuration for Next.js, TypeScript, ESLint, PostCSS, and MDX is at the repository root.

## Root Structure

```
aether-docs/
├── public/                  ← Static assets: logo PNGs (aether_logo.png, aether_logo_no_bg.png, aether_logo_no_bg_dark.png, topbar_logo_dark.png, topbar_logo_light.png) and favicon.ico
├── src/                     ← All application source code (see Source Structure)
├── eslint.config.mjs        ← ESLint configuration (eslint ^9, eslint-config-next)
├── mdx-components.tsx       ← MDX component overrides (useMDXComponents) for h1, h2, p, code, table, etc.
├── next-env.d.ts            ← Next.js generated TypeScript reference file
├── next.config.ts           ← Next.js config: output "export", unoptimized images, MDX pageExtensions, remark-gfm
├── package-lock.json        ← Lockfile for dependencies
├── package.json             ← Project metadata, scripts (dev/build/start/lint), dependencies
├── postcss.config.mjs       ← PostCSS config using @tailwindcss/postcss
├── README.md                ← Project readme (stack, structure, deploy notes)
├── tsconfig.json            ← TypeScript config (paths "@/*": "./src/*", strict, jsx react-jsx)
└── tsconfig.tsbuildinfo     ← TypeScript incremental build info
```

## Source Structure

```
src/
├── app/
│   ├── docs/
│   │   ├── changelog/
│   │   │   └── page.mdx              ← Changelog documentation page
│   │   ├── cli-reference/
│   │   │   └── page.mdx              ← CLI reference documentation page
│   │   ├── contributing/
│   │   │   └── page.mdx              ← Contributing documentation page
│   │   ├── getting-started/
│   │   │   └── page.mdx              ← Getting started documentation page
│   │   ├── layout.tsx                ← Docs layout: DocsHeader, DocsSidebar, Footer, article container
│   │   └── page.mdx                  ← Docs introduction page ("/docs")
│   ├── favicon.ico                   ← App favicon
│   ├── globals.css                   ← Global stylesheet
│   ├── layout.tsx                    ← Root layout: Geist/Geist_Mono fonts, ThemeProvider, metadata
│   └── page.tsx                      ← Landing page: Navbar, Hero, Features, HowItWorks, QuickStart, Roadmap, Footer
└── components/
    ├── docs/
    │   ├── Authors.tsx               ← Author byline component (props: authors[])
    │   ├── DocsHeader.tsx            ← Docs top header with Logo, ThemeToggle, GitHub link
    │   ├── DocsSidebar.tsx           ← Docs navigation sidebar (usePathname, static nav array)
    │   └── PlatformInstall.tsx       ← Platform-specific install cards (Windows/macOS/Linux) with copy
    ├── features/
    │   └── Features.tsx              ← Landing section: feature grid with framer-motion
    ├── footer/
    │   └── Footer.tsx                ← Site footer with links and License line
    ├── galaxy/
    │   └── Galaxy.tsx                ← React Three Fiber Canvas with 4 point layers (StarField, SpiralNebula, GalacticCore, BlueStreaks)
    ├── hero/
    │   └── Hero.tsx                  ← Landing hero: dynamic Galaxy import, scroll transforms, terminal mock
    ├── how-it-works/
    │   └── HowItWorks.tsx            ← Landing section: install/run/chat steps
    ├── navbar/
    │   └── Navbar.tsx                ← Fixed navbar with scroll state, ThemeToggle, GitHub, Get Started
    ├── quickstart/
    │   └── QuickStart.tsx            ← Landing section: /genesis terminal output mock
    ├── roadmap/
    │   └── Roadmap.tsx               ← Landing section: Now/Next/Later phases
    ├── theme/
    │   ├── index.ts                  ← Exports ThemeProvider, useTheme, ThemeToggle
    │   ├── ThemeProvider.tsx         ← Context provider for dark/light, localStorage "aether-theme"
    │   └── ThemeToggle.tsx           ← Button toggling theme with sun/moon icons
    └── ui/
        ├── Badge.tsx                 ← Badge component with variant styles
        ├── Button.tsx                ← Button/Link component with variant/size
        ├── Card.tsx                  ← Card, CardHeader, CardTitle, CardDescription
        ├── index.ts                  ← Exports Button, Card(+subcomponents), Badge
        └── Logo.tsx                  ← Theme-aware logo img (aether_logo_no_bg variants)
```

## Naming Conventions

- Route segments under `src/app/` use lowercase with hyphens (e.g. `getting-started/`, `cli-reference/`).
- Each route segment uses a `page.mdx` or `page.tsx` file for the route (per `next.config.ts` `pageExtensions: ["ts","tsx","md","mdx"]`).
- Component folders group by domain: `docs/`, `features/`, `footer/`, `galaxy/`, `hero/`, `how-it-works/`, `navbar/`, `quickstart/`, `roadmap/`, `theme/`, `ui/`.
- Component files use PascalCase for React components (e.g. `DocsSidebar.tsx`, `ThemeProvider.tsx`).
- Barrel files `index.ts` exist in `src/components/theme/` and `src/components/ui/` to re-export components.
- Static assets in `public/` use lowercase with underscores (e.g. `aether_logo_no_bg_dark.png`, `topbar_logo_light.png`).

## Key Files

- `package.json` — Defines name `aether-docs`, scripts (`dev`, `build`, `start`, `lint`), and dependencies including `next@16.2.10`, `react@19.2.4`, `@next/mdx`, `@react-three/fiber`, `@react-three/drei`, `three`, `framer-motion`, `lucide-react`, `remark-gfm`.
- `next.config.ts` — Configures `output: "export"` (static export), `images.unoptimized`, MDX via `createMDX` with `remark-gfm`, and `pageExtensions` including `mdx`.
- `mdx-components.tsx` — Exports `useMDXComponents` mapping MDX elements (h1, h2, p, code, pre, a, table, etc.) to styled React components using CSS variables.
- `tsconfig.json` — Sets `paths` `@/*` → `./src/*`, `jsx: react-jsx`, `strict: true`, `moduleResolution: bundler`.
- `src/app/layout.tsx` — Root layout wrapping children in `ThemeProvider`, loading Geist fonts, setting metadata and `<html lang="en" className="dark">`.
- `src/app/page.tsx` — Landing page composition importing Navbar, Hero, Features, HowItWorks, QuickStart, Roadmap, Footer.
- `src/app/docs/layout.tsx` — Docs layout rendering DocsHeader, DocsSidebar, Footer, and `children` in an article main.
- `src/components/theme/ThemeProvider.tsx` — Provides theme context, reads/writes `localStorage` key `aether-theme`, toggles `dark`/`light` class on `document.documentElement`.
- `src/components/galaxy/Galaxy.tsx` — Default export `Galaxy` rendering a `<Canvas>` with four `Points` layers using `@react-three/fiber` and `@react-three/drei`.
- `postcss.config.mjs` — PostCSS plugin config using `@tailwindcss/postcss` (tailwindcss ^4).
- `eslint.config.mjs` — ESLint flat config (eslint ^9 with eslint-config-next).