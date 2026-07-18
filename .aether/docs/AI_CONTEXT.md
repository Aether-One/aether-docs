# AI Context — aether-docs

You are working on `aether-docs`, the official documentation site and landing page for Aether (the open-source CLI described in `README.md` and `src/app/layout.tsx` metadata).

## 1. Project Identity
This project is the Next.js 16 + TypeScript documentation and landing page for Aether, an open-source CLI that transforms any codebase into an AI-native workspace, built with MDX docs and a React Three Fiber galaxy background.

## 2. Always Follow
- Use the App Router structure under `src/app/` as defined by `src/app/page.tsx` (landing) and `src/app/docs/layout.tsx` (docs shell with `DocsSidebar` + `DocsHeader` + `Footer`).
- Wrap all page content in `ThemeProvider` from `src/components/theme/ThemeProvider.tsx` (done in `src/app/layout.tsx`); respect the `dark`/`light` theme via `useTheme()` from `@/components/theme`.
- Use the MDX component map in `mdx-components.tsx` for all `.mdx` documentation pages; do not override its heading/paragraph/code/table styles outside that file.
- Use CSS variables for theming in components (e.g. `var(--docs-bg)`, `var(--accent)`, `var(--muted)`) as seen in `src/app/docs/layout.tsx`, `src/components/docs/DocsHeader.tsx`, and `mdx-components.tsx`.
- Use path alias `@/*` mapped to `./src/*` (per `tsconfig.json`) for all internal imports, as done in `src/app/page.tsx` and `src/components/navbar/Navbar.tsx`.
- Mark interactive/client components with `"use client"` (e.g. `src/components/navbar/Navbar.tsx`, `src/components/theme/ThemeToggle.tsx`, `src/components/galaxy/Galaxy.tsx`).
- Export reusable UI from `src/components/ui/index.ts` (`Button`, `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `Badge`) and theme utils from `src/components/theme/index.ts` (`ThemeProvider`, `useTheme`, `ThemeToggle`).
- Use `next.config.ts` MDX setup: `pageExtensions` includes `md`/`mdx` and `remark-gfm` is enabled; docs live as `page.mdx` under `src/app/docs/*/`.
- Use `output: "export"` (static export) from `next.config.ts`; do not add server-only runtime features (API routes, dynamic server rendering) that break static export.
- Use `lucide-react` is NOT used; icons are inline SVGs (see `DocsHeader.tsx`, `Navbar.tsx`, `PlatformInstall.tsx`). Do not introduce icon libraries not in `package.json`.
- Use `framer-motion` for animations in client components (`Features.tsx`, `HowItWorks.tsx`, `Roadmap.tsx`, `Hero.tsx`, `Navbar.tsx`) with `initial`/`whileInView`/`animate` patterns.
- Use `Galaxy` via `next/dynamic` with `ssr: false` in `src/components/hero/Hero.tsx`; never import it statically in a server component.

## 3. Never Do
- Never edit `next-env.d.ts` (stated in the file: "This file should not be edited").
- Never use `next/image` optimized images: `next.config.ts` sets `images.unoptimized: true` and components use plain `<img>` with `eslint-disable-next-line @next/next/no-img-element` (see `Logo.tsx`, `Navbar.tsx`, `Authors.tsx`).
- Never hardcode theme colors as literals where a CSS variable exists (e.g. docs components use `var(--docs-border)`, not `#ccc`).
- Never add a dependency not listed in `package.json` (only those shown: `@mdx-js/*`, `@next/mdx`, `@react-three/drei`, `@react-three/fiber`, `framer-motion`, `lucide-react` [present but unused in code], `next`, `react`, `react-dom`, `remark-gfm`, `three`, and dev deps).
- Never break the docs sidebar navigation contract in `src/components/docs/DocsSidebar.tsx` (sections: Getting Started, CLI Reference, Community) without updating that file.
- Never assume `lucide-react` is used in components — it is a dependency but no component imports it; do not reference it as a used pattern.
- Never use `localStorage` key other than `"aether-theme"` for theme persistence (`ThemeProvider.tsx`).

## 4. Key Decisions
- Static export via `output: "export"` in `next.config.ts` — site is deployed as static files (per `README.md` and config).
- MDX with `remark-gfm` for all documentation content (`next.config.ts`, `mdx-components.tsx`).
- Theme is client-side only via `ThemeProvider` + `localStorage`, default `"dark"`, `<html className="dark">` in `src/app/layout.tsx`.
- 3D background is `Galaxy` (React Three Fiber + drei `Points`/`PointMaterial`, four layers: `StarField`, `SpiralNebula`, `GalacticCore`, `BlueStreaks`) loaded client-only (`Hero.tsx`).
- Landing page composition is fixed in `src/app/page.tsx`: `Navbar`, `Hero`, `Features`, `HowItWorks`, `QuickStart`, `Roadmap`, `Footer`.
- Docs layout is fixed in `src/app/docs/layout.tsx`: `DocsHeader` + flex `DocsSidebar`/`main` + `Footer`.
- Logos swap by theme: `Logo.tsx` uses `/aether_logo_no_bg_dark.png` or `/aether_logo_no_bg.png`; `Navbar.tsx` uses `/topbar_logo_dark.png` or `/topbar_logo_light.png` from `public/`.

## 5. Conventions
- File naming: route segments are folders under `src/app/` with `page.tsx`/`page.mdx`; docs subpages are `src/app/docs/<slug>/page.mdx` (e.g. `getting-started/page.mdx`, `cli-reference/page.mdx`).
- Component files: one component per file in `src/components/<group>/<Name>.tsx` (e.g. `src/components/features/Features.tsx`).
- Barrel exports: `src/components/ui/index.ts` and `src/components/theme/index.ts` re-export components.
- TypeScript strict mode is on (`tsconfig.json` `"strict": true`); use explicit prop interfaces (e.g. `AuthorsProps` in `Authors.tsx`, `BadgeProps` in `Badge.tsx`).
- Use `Geist` and `Geist_Mono` from `next/font/google` in `src/app/layout.tsx` as `--font-geist-sans` / `--font-geist-mono`.
- Inline SVG GitHub icon is duplicated in `DocsHeader.tsx`, `Navbar.tsx`, `Hero.tsx`, `Footer.tsx` — keep consistent path if changed.
- Docs author byline: `Authors.tsx` takes `authors: Author[]` with `github` and optional `name`; links to `https://github.com/${github}`.

## 6. File Patterns
- New landing sections: add component in `src/components/<group>/` and include in `src/app/page.tsx` main tree.
- New docs pages: create `src/app/docs/<slug>/page.mdx`; add link to `navigation` array in `src/components/docs/DocsSidebar.tsx`.
- New UI primitive: add to `src/components/ui/` and export from `src/components/ui/index.ts`.
- New theme-related util: add to `src/components/theme/` and export from `src/components/theme/index.ts`.
- Static assets (logos): place in `public/` and reference by absolute path (`/filename.png`).
- MDX styling changes: only in `mdx-components.tsx` `useMDXComponents` return object.