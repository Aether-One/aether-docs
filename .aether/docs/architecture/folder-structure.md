# Folder Structure

## Overview

This is a **Next.js (App Router) + React + TypeScript** project for the Aether CLI documentation and marketing site. The codebase follows a **feature-based organization** under `src/components/` grouped by UI domain (hero, navbar, galaxy, docs, benchmarks, quickstart, etc.), with shared UI primitives in `src/components/ui/`, theme logic in `src/components/theme/`, and shared data/utilities in `src/lib/`. The app uses **Next.js App Router** (`app/` directory) for routing, **React Server Components** by default with `'use client'` directives for interactive components, **Tailwind CSS** for styling, **Framer Motion** for animations, and **React Three Fiber / Drei** for the 3D galaxy background.

---

## Root Structure

```
.
├── app/                    # Next.js App Router (routing, layouts, pages)
├── public/                 # Static assets (logos, logos, binaries referenced in install scripts)
├── src/                    # Application source code
│   ├── components/         # React components (feature-based + shared UI)
│   ├── lib/                # Shared data, utilities, types
│   └── ...                 # (other src/ directories not shown in context)
├── package.json            # Dependencies & scripts (inferred)
├── tsconfig.json           # TypeScript config (inferred)
├── tailwind.config.ts      # Tailwind config (inferred)
├── next.config.js          # Next.js config (inferred)
└── tsconfig.json           # TypeScript config (inferred)
```

> **Note**: Only directories and files explicitly referenced in the provided context are listed above. Configuration files (`package.json`, `tsconfig.json`, `tailwind.config.ts`, `next.config.js`) are inferred as standard for a Next.js/TS/Tailwind project but not explicitly shown in context.

---

## Source Structure (`src/`)

```
src/
├── components/
│   ├── benchmarks/
│   │   └── format.ts                    # Token/USD/percentage formatters for benchmarks
│   ├── docs/
│   │   ├── DocsSidebar.tsx              # Collapsible docs sidebar with navigation tree
│   │   ├── PlatformInstall.tsx          # Platform-specific install cards (Win/macOS/Linux)
│   │   └── SearchDialog.tsx             # Cmd+K search dialog with fuzzy search
│   ├── galaxy/
│   │   └── Galaxy.tsx                   # 3D galaxy background (React Three Fiber + Drei)
│   ├── galaxy/                          # (duplicate entry in context — same as above)
│   ├── hero/
│   │   └── Hero.tsx                     # Hero section with galaxy bg, terminal demo, CTAs
│   ├── hero/                            # (duplicate entry in context — same as above)
│   ├── navbar/
│   │   └── Navbar.tsx                   # Responsive navbar with theme toggle, mobile menu
│   ├── navbar/                          # (duplicate entry in context — same as above)
│   ├── quickstart/
│   │   └── QuickStart.tsx               # Quickstart terminal demo section
│   ├── quickstart/                      # (duplicate entry in context — same as above)
│   ├── theme/
│   │   ├── ThemeProvider.tsx            # Theme context provider (inferred from usage)
│   │   ├── ThemeToggle.tsx              # Theme toggle button (used in Navbar, SearchDialog)
│   │   └── useTheme.ts                  # useTheme hook (used in Hero, Logo, Galaxy)
│   ├── ui/
│   │   ├── Button.tsx                   # Polymorphic Button (button | a) with variants/sizes
│   │   ├── Card.tsx                     # Card + CardHeader/Title/Description subcomponents
│   │   └── Logo.tsx                     # Theme-aware logo (dark/light variants)
│   └── ui/                              # (duplicate entry in context — same as above)
├── lib/
│   └── search-data.ts                   # Search index (27 items) + types + fuzzy search utils
└── lib/                                 # (duplicate entry in context — same as above)
```

> **Note**: Duplicate directory entries in the context (e.g., `galaxy/`, `hero/`, `navbar/`, `quickstart/`, `ui/`, `lib/` listed twice) are consolidated above. Only unique directories/files are shown.

---

## Naming Conventions

| Pattern | Example | Context |
|--------|---------|---------|
| **Component files** | `PascalCase.tsx` | `Hero.tsx`, `Navbar.tsx`, `Galaxy.tsx`, `Button.tsx` |
| **Utility / data files** | `kebab-case.ts` | `format.ts`, `search-data.ts`, `useTheme.ts` |
| **Component directories** | `kebab-case/` | `hero/`, `navbar/`, `galaxy/`, `docs/`, `benchmarks/` |
| **Shared UI primitives** | `src/components/ui/` | `Button.tsx`, `Card.tsx`, `Logo.tsx` |
| **Feature-based grouping** | `src/components/<feature>/` | `hero/`, `navbar/`, `galaxy/`, `docs/`, `benchmarks/`, `quickstart/` |
| **Hooks** | `usePascalCase.ts` | `useTheme.ts` |
| **Types** | `PascalCase` in `.ts` files | `SearchItem`, `SearchItemProps`, `PlatformCardProps` |
| **Component exports** | `default export` (default) | All components use `export default function Name()` |
| **Subcomponents** | Named exports | `CardHeader`, `CardTitle`, `CardDescription` in `Card.tsx` |

---

## Key Files

| File | Role | Key Details |
|------|------|-------------|
| `app/layout.tsx` | Root layout (inferred) | Wraps app with `ThemeProvider`, global styles, fonts (inferred from context usage) |
| `app/page.tsx` | Home page (inferred) | Composes `Hero`, `QuickStart`, likely `Navbar` and `Galaxy` (inferred from component usage) |
| `app/docs/**/*.tsx` | Docs pages (inferred) | Use `DocsSidebar`, `SearchDialog`, `PlatformInstall` (referenced in components) |
| `src/components/hero/Hero.tsx` | Hero section | Galaxy background, animated terminal demo, CTAs, theme-aware |
| `src/components/navbar/Navbar.tsx` | Main navigation | Responsive, theme toggle, mobile menu, scroll-aware styling |
| `src/components/galaxy/Galaxy.tsx` | 3D galaxy background | React Three Fiber + Drei; 4 particle systems; theme-aware colors |
| `src/components/docs/DocsSidebar.tsx` | Docs navigation | Collapsible sections, active route highlighting, keyboard accessible |
| `src/components/docs/SearchDialog.tsx` | Cmd+K search | Fuzzy search, keyboard nav, grouped results, focus management |
| `src/components/docs/PlatformInstall.tsx` | Install instructions | 3 platform cards with copy-to-clipboard install scripts |
| `src/components/quickstart/QuickStart.tsx` | Quickstart demo | Static terminal simulation of `aether genesis` flow |
| `src/components/benchmarks/format.ts` | Benchmark formatters | `formatTokens`, `formatUsd`, `formatPct` |
| `src/components/ui/Button.tsx` | Button primitive | Polymorphic (`button` \| `a`), 3 variants, 3 sizes, nebula-purple theme |
| `src/components/ui/Card.tsx` | Card primitive | Base + subcomponents (`CardHeader`, `CardTitle`, `CardDescription`) |
| `src/components/ui/Logo.tsx` | Logo component | Theme-aware (dark/light PNG), `useTheme` hook |
| `src/components/theme/useTheme.ts` | Theme hook | Provides `theme` (`'light' \| 'dark'`) and `toggleTheme` |
| `src/components/theme/ThemeProvider.tsx` | Theme context | Wraps app, manages theme state, persists to localStorage/cookie (inferred) |
| `src/components/theme/ThemeToggle.tsx` | Theme toggle button | Used in `Navbar`, `SearchDialog` |
| `src/lib/search-data.ts` | Search index + utils | 27 `SearchItem`s, `fuzzyMatch`, `searchItems`, `groupByCategory` |
| `public/aether_logo_no_bg_dark.png` | Dark logo | Used by `Logo` component in dark mode |
| `public/aether_logo_no_bg.png` | Light logo | Used by `Logo` component in light mode |
| `public/topbar_logo_dark.png` | Navbar dark logo | Used in `Navbar` |
| `public/topbar_light.png` | Navbar light logo | Used in `Navbar` |
| `public/aether-win-x64.exe` | Windows binary | Referenced in `PlatformInstall.tsx` install script |
| `public/aether-macos-arm64` | macOS binary | Referenced in `PlatformInstall.tsx` install script |
| `public/aether-linux-x64` | Linux binary | Referenced in `PlatformInstall.tsx` install script |

---

## App Router Structure (Inferred from Component Usage)

```
app/
├── layout.tsx                 # Root layout → ThemeProvider, Navbar, global styles
├── page.tsx                   # Home → Hero, QuickStart, (Galaxy background)
├── docs/
│   ├── layout.tsx             # Docs layout → DocsSidebar, SearchDialog
│   ├── page.tsx               # /docs → redirect or index
│   ├── getting-started/
│   │   └── page.tsx
│   ├── cli-reference/
│   │   ├── page.tsx
│   │   ├── config/page.tsx
│   │   ├── genesis/page.tsx
│   │   ├── sync/page.tsx
│   │   ├── prompt/page.tsx
│   │   ├── ask/page.tsx
│   │   ├── clean/page.tsx
│   │   ├── exclude/page.tsx
│   │   └── cleancode/page.tsx
│   ├── proof/
│   │   └── page.tsx
│   ├── changelog/
│   │   ├── page.tsx
│   │   ├── v0.2.1/page.tsx
│   │   ├── v0.2.0/page.tsx
│   │   └── ... (down to v0.1.0)
│   └── community/
│       └── page.tsx
├── benchmarks/
│   └── page.tsx               # Uses benchmarks/format.ts
└── ...                        # Other routes inferred from DocsSidebar navigation
```

> **Note**: The `app/` directory structure is **inferred** from component usage (`DocsSidebar` navigation links, `Hero` CTAs linking to `/docs/getting-started`, `Navbar` linking to `/docs`, `PlatformInstall` used in docs, `SearchDialog` used in docs layout). Only `src/` files are explicitly provided in context.