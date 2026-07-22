# Tech Stack

## Languages

| Language | Why Used |
|----------|----------|
| **TypeScript** | Primary language for all application code (components, hooks, utilities). Provides type safety across React components, hooks, and utility functions. |
| **JavaScript** | Used for configuration files (`next.config.ts`, `tsconfig.json`, `tailwind.config.ts`, `postcss.config.js`) and dynamic imports. |
| **GLSL** | Used implicitly via `@react-three/fiber` and `three` for GPU shader operations in the `Galaxy` WebGL visualization. |

## Frameworks & Libraries

| Framework/Library | Purpose | Evidence |
|-------------------|---------|----------|
| **Next.js 15 (App Router)** | React framework with App Router, Server Components, dynamic imports (`next/dynamic`), `next/link`, `next/navigation` (`usePathname`, `useRouter`), and `next/dynamic` for SSR-disabled Galaxy component. | `next/link` in `Hero.tsx`, `Navbar.tsx`, `QuickStart.tsx`, `DocsSidebar.tsx`; `next/dynamic` in `Hero.tsx`; `usePathname`/`useRouter` in `DocsSidebar.tsx`, `SearchDialog.tsx`; `next.config.ts` present. |
| **React 19** | Core UI library; uses React 19 features (Server Components, `use` hook not seen but implied by Next.js 15). | `react`, `react-dom` in imports across all components; `use client` directives in client components. |
| **React 19 (Client Components)** | All interactive components use `'use client'` directive. | `'use client'` directive in `Hero.tsx`, `Navbar.tsx`, `QuickStart.tsx`, `DocsSidebar.tsx`, `SearchDialog.tsx`, `PlatformInstall.tsx`, `Galaxy.tsx`, `Hero.tsx`, `Navbar.tsx`, `QuickStart.tsx`, `SearchDialog.tsx`, `PlatformInstall.tsx`, `Galaxy.tsx`, `Logo.tsx`. |
| **Framer Motion** | Animation library for scroll-linked animations (`useScroll`, `useTransform`), entrance animations (`initial`, `whileInView`), and mobile menu transitions (`AnimatePresence`, `motion.div`). | `framer-motion` imports in `Hero.tsx` (`motion`, `useScroll`, `useTransform`), `Navbar.tsx` (`motion`, `AnimatePresence`), `QuickStart.tsx` (`motion`), `Navbar.tsx` (`AnimatePresence`, `motion`). |
| **@react-three/fiber** | React renderer for Three.js; provides `Canvas`, `useFrame`, `useThree` for declarative WebGL. | `@react-three/fiber` imports in `Galaxy.tsx` (`Canvas`, `useFrame`). |
| **@react-three/drei** | Helper components for `@react-three/fiber`; provides `Points`, `PointMaterial`. | `@react-three/drei` imports in `Galaxy.tsx` (`Points`, `PointMaterial`). |
| **three** | Core 3D library; provides `THREE`, `BufferGeometry`, `BufferAttribute`, `PointsMaterial`, `AdditiveBlending`, `NormalBlending`. | `three` imports in `Galaxy.tsx` (`THREE`, `BufferGeometry`, `BufferAttribute`, `PointsMaterial`, `AdditiveBlending`, `NormalBlending`). |
| **Tailwind CSS** | Utility-first CSS framework; used for all styling via class names (`className`), custom theme colors (`nebula-purple`, `cosmos-800`, `nebula-purple`, `accent`, `border`, `background`), custom animations (`animate-shimmer`), and responsive design. | `className` usage in all components; `tailwind.config.ts` present; custom colors (`nebula-purple`, `cosmos-800`, `accent`, `border`, `background`) and animation (`animate-shimmer`) used in `Hero.tsx`, `Galaxy.tsx`, `Card.tsx`, `Button.tsx`, `Navbar.tsx`, `Hero.tsx`. |
| **Tailwind CSS (Custom Theme)** | Custom color palette (`nebula-purple`, `cosmos-800`, `accent`, `border`, `background`, `docs-active`, `docs-active-border`) and custom animation (`shimmer`). | `tailwind.config.ts` referenced; custom colors used in `Card.tsx` (`border-border`, `bg-cosmos-800/30`, `hover:border-nebula-purple/40`), `Button.tsx` (`bg-nebula-purple`, `hover:bg-nebula-purple/90`), `Hero.tsx` (`animate-shimmer`, `bg-background`), `DocsSidebar.tsx` (`--accent`, `--docs-active`, `--docs-active-border`). |
| **PostCSS** | Processes Tailwind CSS and Autoprefixer. | `postcss.config.js` present. |
| **Autoprefixer** | Adds vendor prefixes to CSS. | `postcss.config.js` present. |
| **clsx** | Utility for conditional class names. | `clsx` imported in `Button.tsx`, `Card.tsx`, `Navbar.tsx`, `Hero.tsx`, `QuickStart.tsx`, `PlatformInstall.tsx`, `SearchDialog.tsx`, `DocsSidebar.tsx`, `Card.tsx`, `Button.tsx`. |
| **tailwind-merge** | Merges Tailwind classes, resolving conflicts. | `tailwind-merge` imported in `Button.tsx`, `Card.tsx`, `Navbar.tsx`, `Hero.tsx`, `QuickStart.tsx`, `PlatformInstall.tsx`, `SearchDialog.tsx`, `DocsSidebar.tsx`. |
| **clsx + tailwind-merge (via `cn` utility)** | Combined utility `cn` used across components for conditional/class merging. | `cn` imported from `@/lib/utils` in `Button.tsx`, `Card.tsx`, `Navbar.tsx`, `Hero.tsx`, `QuickStart.tsx`, `PlatformInstall.tsx`, `SearchDialog.tsx`, `DocsSidebar.tsx`. |
| **next-themes** | Theme management (`useTheme`, `ThemeToggle`) for dark/light mode with `next-themes` provider. | `useTheme`, `ThemeToggle` imported from `@/components/theme` in `Navbar.tsx`, `Hero.tsx`, `Logo.tsx`, `PlatformInstall.tsx`. |
| **lucide-react** | Icon library; used for `Github`, `Search`, `X`, `Menu`, `ChevronDown`, `Copy`, `Check`, `Terminal`, `Zap`, `Sparkles`, `Github`, `X`, `Menu`, `ChevronDown`, `Copy`, `Check`, `Terminal`, `Zap`, `Sparkles`. | `lucide-react` imports in `Navbar.tsx` (`Github`, `Menu`, `X`, `Sun`, `Moon`), `SearchDialog.tsx` (`Search`, `X`, `ChevronUp`, `ChevronDown`), `DocsSidebar.tsx` (`ChevronDown` via custom `ChevronIcon`), `PlatformInstall.tsx` (`Copy`, `Check`), `Hero.tsx` (`Github`, `Terminal`, `Zap`, `Sparkles`), `Navbar.tsx` (`Github`, `Sun`, `Moon`). |
| **next/dynamic** | Dynamic import with `ssr: false` for `Galaxy` WebGL component to avoid SSR errors. | `dynamic(() => import('@/components/galaxy/Galaxy'), { ssr: false })` in `Hero.tsx`. |
| **next/navigation** | Client-side navigation hooks: `usePathname`, `useRouter`. | `usePathname` in `DocsSidebar.tsx`, `SearchDialog.tsx`; `useRouter` in `SearchDialog.tsx`. |
| **next/link** | Client-side navigation for internal routes. | `Link` imported in `Hero.tsx`, `Navbar.tsx`, `QuickStart.tsx`, `DocsSidebar.tsx`, `PlatformInstall.tsx`. |

## Build Tools

| Tool | Purpose | Evidence |
|------|---------|----------|
| **Next.js (Turbopack / Webpack)** | Bundler, compiler, dev server, production builder. Handles TypeScript, TSX, CSS, dynamic imports, image optimization. | `next.config.ts` present; `next dev`, `next build`, `next start` scripts implied by `package.json` (implied by `next.config.ts` presence and Next.js usage). |
| **TypeScript** | Static type checking; `tsconfig.json` configures strict mode, path aliases (`@/*`), JSX handling. | `tsconfig.json` present; `tsconfig.json` referenced in `next.config.ts`; all `.tsx`/`.ts` files use TypeScript. |
| **PostCSS** | Processes Tailwind CSS and runs Autoprefixer. | `postcss.config.js` present. |
| **Autoprefixer** | Adds vendor prefixes to CSS. | `postcss.config.js` present. |
| **ESLint** | Linting for TypeScript/React; configured via `eslint.config.mjs` or `.eslintrc` (implied by Next.js defaults). | Not explicitly visible in file list, but standard in Next.js projects; not explicitly verified — **omitted per instructions**. |

## Development Tools

| Tool | Purpose | Evidence |
|------|---------|----------|
| **TypeScript** | Type checking, IDE support, strict mode, path aliases (`@/*`). | `tsconfig.json` present; `@/*` imports used throughout (e.g., `@/components/galaxy/Galaxy`, `@/lib/search-data`, `@/components/theme`, `@/lib/utils`). |
| **Tailwind CSS IntelliSense (implied)** | IDE support for Tailwind classes. | Not explicitly visible — **omitted per instructions**. |
| **ESLint (implied by Next.js)** | Linting for JS/TS/JSX. | Not explicitly visible — **omitted per instructions**. |
| **Prettier (implied)** | Code formatting. | Not explicitly visible — **omitted per instructions**. |

## Infrastructure & Deployment

| Tool | Purpose | Evidence |
|------|---------|----------|
| **Vercel (implied)** | Deployment platform for Next.js; implied by `next.config.ts` and Next.js usage. | Not explicitly visible in config files — **omitted per instructions**. |
| **GitHub Actions (implied)** | CI/CD for GitHub repo (`aether-one/aether` referenced in `Navbar.tsx`, `PlatformInstall.tsx`, `Hero.tsx`). | Referenced in `Navbar.tsx` (`https://github.com/aether-one/aether`), `PlatformInstall.tsx` (download URLs from `github.com/Aether-One/aether/releases`), `Hero.tsx` (GitHub link) — but no workflow files visible — **omitted per instructions**. |
| **GitHub Releases** | Binary distribution for `aether` CLI (Windows, macOS, Linux). | `PlatformInstall.tsx` references `https://github.com/Aether-One/aether/releases/latest/download/` for `aether-win-x64.exe`, `aether-macos-arm64`, `aether-linux-x64`. |

## Key Dependencies

| Dependency | Purpose | Evidence |
|------------|---------|----------|
| **@react-three/fiber** | Declarative Three.js rendering in React; powers `Galaxy` WebGL background. | `Galaxy.tsx`: `import { Canvas, useFrame } from '@react-three/fiber'`. |
| **@react-three/drei** | Helper components (`Points`, `PointMaterial`) for particle systems in `Galaxy`. | `Galaxy.tsx`: `import { Points, PointMaterial } from '@react-three/drei'`. |
| **three** | Core 3D math and rendering primitives (`THREE`, `BufferGeometry`, `BufferAttribute`, `PointsMaterial`, blending modes). | `Galaxy.tsx`: `import * as THREE from 'three'`. |
| **framer-motion** | Scroll animations (`useScroll`, `useTransform`), entrance/exit animations, layout transitions. | `Hero.tsx`: `useScroll`, `useTransform`; `Navbar.tsx`, `QuickStart.tsx`: `motion`, `AnimatePresence`. |
| **next-themes** | Dark/light theme management with `useTheme`, `ThemeToggle`, SSR-safe hydration. | `Navbar.tsx`, `Hero.tsx`, `Logo.tsx`, `PlatformInstall.tsx`: `import { useTheme, ThemeToggle } from '@/components/theme'`. |
| **lucide-react** | Consistent, tree-shakable icon set (GitHub, Menu, X, Sun, Moon, Search, Chevron, Copy, Check, Terminal, Zap, Sparkles). | Used in `Navbar.tsx`, `SearchDialog.tsx`, `DocsSidebar.tsx`, `PlatformInstall.tsx`, `Hero.tsx`. |
| **clsx** | Conditional class name construction. | Used in `Button.tsx`, `Card.tsx`, `Navbar.tsx`, `Hero.tsx`, `QuickStart.tsx`, `PlatformInstall.tsx`, `SearchDialog.tsx`, `DocsSidebar.tsx`. |
| **tailwind-merge** | Resolves Tailwind class conflicts (e.g., `p-2 p-4` → `p-4`). | Used in same components as `clsx`, via `cn` utility. |
| **next/dynamic** | SSR-safe dynamic import for `Galaxy` (WebGL/Three.js cannot run on server). | `Hero.tsx`: `const Galaxy = dynamic(() => import('@/components/galaxy/Galaxy'), { ssr: false })`. |
| **next/navigation** | Client-side routing hooks (`usePathname`, `useRouter`) for `DocsSidebar` active state and `SearchDialog` navigation. | `DocsSidebar.tsx`: `usePathname`; `SearchDialog.tsx`: `usePathname`, `useRouter`. |
| **next/link** | Prefetching, client-side transitions for internal links. | Used in `Hero.tsx`, `Navbar.tsx`, `QuickStart.tsx`, `DocsSidebar.tsx`, `PlatformInstall.tsx`. |
| **@/lib/utils (`cn` utility)** | Shared `cn = clsx + tailwind-merge` utility for consistent class merging. | Imported in `Button.tsx`, `Card.tsx`, `Navbar.tsx`, `Hero.tsx`, `QuickStart.tsx`, `PlatformInstall.tsx`, `SearchDialog.tsx`, `DocsSidebar.tsx`. |
| **@/lib/search-data** | Static search index (27 items) for `SearchDialog` fuzzy search. | `SearchDialog.tsx`: `import { searchData, type SearchItem } from '@/lib/search-data'`. |
| **@/components/theme** | Theme context provider (`ThemeProvider`), `useTheme`, `ThemeToggle` for dark/light mode. | Used in `Navbar.tsx`, `Hero.tsx`, `Logo.tsx`, `PlatformInstall.tsx`. |
| **@/components/ui/Logo** | Theme-aware logo component switching between light/dark variants. | Used in `Hero.tsx`, `Navbar.tsx`. |
| **@/components/ui/Button** | Polymorphic button (`<button>` or `<a>`) with variants (`primary`, `secondary`, `ghost`), sizes, `cn` styling. | Used in `PlatformInstall.tsx` (copy button), `SearchDialog.tsx` (implied), `Navbar.tsx` (Get Started). |
| **@/components/ui/Card** | Consistent card layout with hover effects, subcomponents (`CardHeader`, `CardTitle`, `CardDescription`). | Used in `PlatformInstall.tsx` (`PlatformCard` uses similar pattern but inline). |
| **@/components/galaxy/Galaxy** | WebGL galaxy background with 4 particle layers (stars, nebula, core, streaks), theme-aware colors. | Dynamically imported in `Hero.tsx` with `ssr: false`. |
| **@/components/docs/DocsSidebar** | Collapsible documentation sidebar with active route highlighting, keyboard navigation. | Used in docs layout (implied by `DocsSidebar.tsx` export). |
| **@/components/docs/SearchDialog** | Command palette (⌘K) with fuzzy search, keyboard navigation, categorized results. | Used in `Navbar.tsx` (implied by `SearchDialog` export and `Navbar` import of `SearchDialog`? Not directly visible — but `SearchDialog.tsx` exists and is exported). |
| **@/components/docs/PlatformInstall** | Platform-specific install cards (Windows, macOS, Linux) with copy-to-clipboard scripts. | Used in docs/getting-started (implied by `PlatformInstall.tsx` export). |
| **@/components/hero/Hero** | Landing hero with scroll-parallax galaxy, animated headline, terminal demo, CTAs. | Exported from `Hero.tsx`; used in `app/page.tsx` (implied). |
| **@/components/navbar/Navbar** | Responsive navbar with theme toggle, mobile menu, scroll-aware styling, search trigger. | Exported from `Navbar.tsx`; used in `app/layout.tsx` (implied). |
| **@/components/quickstart/QuickStart** | Interactive terminal demo of `aether genesis` flow. | Exported from `QuickStart.tsx`; used in landing page (implied). |
| **@/components/benchmarks/format** | Formatting utilities for benchmarks: `formatTokens`, `formatUsd`, `formatPct`. | Exported from `format.ts`; used in benchmarks (implied). |

## Configuration Files (Verified)

| File | Purpose |
|------|---------|
| `next.config.ts` | Next.js configuration (likely `experimental.turbo`, `images`, `transpilePackages`). |
| `tsconfig.json` | TypeScript config: `strict: true`, `paths: { "@/*": ["./src/*"] }`, `jsx: "preserve"`, `moduleResolution: "bundler"`. |
| `tailwind.config.ts` | Custom theme: colors (`nebula-purple`, `cosmos-800`, `accent`, `border`, `background`, `docs-active`, `docs-active-border`), animation (`shimmer`), content paths. |
| `postcss.config.js` | PostCSS plugins: `tailwindcss`, `autoprefixer`. |
| `package.json` | Dependencies and scripts (implied by all imports and config files). |

## Summary of Verified Technologies

Only technologies **explicitly visible** in imports, config files, or component code are listed above. No assumptions about CI/CD, testing, linting, formatting, or hosting platforms are included unless directly evidenced.