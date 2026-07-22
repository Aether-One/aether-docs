# Contributing to Aether

Welcome! This guide explains how to set up, develop, and submit changes to the Aether codebase. It reflects the conventions and tooling actually present in the repository today.

---

## 1. Development Setup

The project is a **Next.js 15** application (App Router, React 19, TypeScript) with a React Three Fiber galaxy background, Framer Motion animations, and a Tailwind CSS + custom CSS variable design system.

**Prerequisites**
- Node.js 18+ (the project uses Next.js 15 which requires Node 18+)
- pnpm (recommended) or npm/yarn

**Quick start**
```bash
# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

The dev server runs at `http://localhost:3000`. The app uses the App Router (`src/app`), with client components in `src/components` and shared utilities in `src/lib`.

For a full getting-started walkthrough (installing the CLI, running the galaxy background locally, etc.), see the [Getting Started guide](/docs/getting-started).

---

## 2. Project Conventions

These conventions are derived from the actual codebase structure and configuration files present in the repo.

### Tech Stack & Tooling
| Area | Choice | Evidence |
|------|--------|----------|
| Framework | Next.js 15 (App Router) | `package.json` dependencies, `src/app` structure |
| Language | TypeScript (strict) | `tsconfig.json` (strict mode), `.tsx` files throughout |
| Styling | Tailwind CSS + CSS variables | `tailwind.config.ts`, `src/app/globals.css` with CSS custom properties |
| Animations | Framer Motion | `framer-motion` in `package.json`, used in `Hero.tsx`, `Navbar.tsx`, `QuickStart.tsx` |
| 3D Background | React Three Fiber + Drei | `@react-three/fiber`, `@react-three/drei`, `three` in `package.json`; used in `Galaxy.tsx` |
| UI Components | Custom components in `src/components/ui` | `Button.tsx`, `Card.tsx`, `Logo.tsx`, `Button.tsx` with Tailwind + CSS variables |
| Search | Custom fuzzy search (no external lib) | `src/lib/search-data.ts`, `SearchDialog.tsx` with custom `fuzzyMatch` |
| Icons | Inline SVG components | `Navbar.tsx`, `PlatformInstall.tsx`, `DocsSidebar.tsx` |
| Theme | Custom `useTheme` hook + CSS variables | `src/components/theme/ThemeProvider.tsx`, `globals.css` CSS variables |

### Code Style & Conventions
| Convention | Evidence |
|------------|----------|
| **TypeScript strict mode** | `tsconfig.json` has `"strict": true` |
| **Component structure** | Client components marked with `'use client'` at top of file (`Hero.tsx`, `Navbar.tsx`, `Galaxy.tsx`, etc.) |
| **Component organization** | Feature-based folders under `src/components/` (`hero/`, `navbar/`, `galaxy/`, `docs/`, `ui/`, `benchmarks/`, `quickstart/`) |
| **UI components** | Composable, polymorphic where needed (`Button` renders `<button>` or `<a>` via `href` prop), styled with Tailwind + CSS variables (`--nebula-purple`, `--cosmos-800`, etc.) |
| **Icons** | Inline SVG components (see `Navbar.tsx`, `PlatformInstall.tsx`, `DocsSidebar.tsx`) |
| **Theme-aware assets** | `Logo.tsx` and `Navbar.tsx` switch image `src` based on `useTheme()` hook |
| **3D components** | Built with `@react-three/fiber` canvas, custom `Points` geometries, `useFrame` for animation (`Galaxy.tsx`) |
| **Search** | Custom fuzzy search in `SearchDialog.tsx` with keyboard navigation (Cmd/Ctrl+K, arrows, Enter, Esc) |
| **Animations** | Framer Motion `motion` components, `useScroll`/`useTransform` for scroll-linked animations (`Hero.tsx`, `QuickStart.tsx`) |
| **Forms/Interactions** | Custom clipboard copy with toast feedback (`PlatformInstall.tsx`), keyboard shortcuts (`SearchDialog.tsx`) |
| **Styling tokens** | CSS custom properties in `globals.css` (`--nebula-purple`, `--cosmos-950`, `--accent`, `--docs-active`, etc.) used throughout Tailwind classes |

### File & Folder Conventions
```
src/
├── app/                    # Next.js App Router pages & layouts
├── components/
│   ├── ui/                 # Reusable UI primitives (Button, Card, Logo, Button)
│   ├── hero/               # Hero section with galaxy background
│   ├── navbar/             # Navigation bar with theme toggle
│   ├── galaxy/             # React Three Fiber galaxy background
│   ├── docs/               # Docs-specific components (Sidebar, SearchDialog, PlatformInstall)
│   ├── benchmarks/         # Benchmark formatting utilities
│   ├── quickstart/         # QuickStart terminal demo
│   └── theme/              # ThemeProvider, ThemeToggle, useTheme hook
├── lib/
│   └── search-data.ts      # Search index + types
└── app/globals.css         # Global CSS variables + Tailwind imports
```

### Naming Conventions
- **Components**: PascalCase (`Hero.tsx`, `SearchDialog.tsx`, `PlatformInstall.tsx`)
- **Hooks**: `use` prefix (`useTheme`, `useTheme.ts`)
- **Utilities**: camelCase files (`format.ts`, `search-data.ts`)
- **CSS variables**: kebab-case with semantic prefixes (`--nebula-purple`, `--cosmos-800`, `--docs-active-border`)

---

## 3. Quality Gates Before a PR

These are the **actual commands** defined in `package.json` scripts. Run them locally before opening a PR.

```bash
# Install dependencies (if not already done)
pnpm install

# Type-check (TypeScript strict mode)
pnpm type-check

# Lint (Next.js ESLint config)
pnpm lint

# Build production bundle (verifies no build errors)
pnpm build

# Start dev server for manual testing
pnpm dev
```

> **Note:** The repository does **not** have a `test` script configured in `package.json`, and no test framework (Jest, Vitest, Playwright, etc.) is present in `package.json` or config files. There is **no test suite to run** at this time. If you add tests, consider adding a `test` script and CI step.

### What runs in CI?
The repository does not include a `.github/workflows/` directory or other CI configuration in the provided context. **There is no automated CI pipeline documented in the repo today.** Run the commands above locally before pushing.

---

## 4. Commit & Branch Conventions

The repository does **not** contain:
- A `CONTRIBUTING.md` file
- A `.github/PULL_REQUEST_TEMPLATE.md` or `.github/CONTRIBUTING.md`
- A commit message convention (e.g., Conventional Commits) in config or docs
- A branch naming convention in docs or CI

**Practical guidance:**
- Use clear, descriptive commit messages (e.g., `feat: add galaxy background animation`, `fix: fix mobile menu close on resize`).
- Branch names like `feat/galaxy-background`, `fix/mobile-menu-resize`, `docs/quickstart-terminal` are reasonable.
- Keep commits focused; squash fixup commits before merging if needed.

---

## 5. Submitting Changes

Since there is no documented PR template, CI pipeline, or review process in the repository:

1. **Fork** the repository (if external) or create a feature branch.
2. **Develop** your change following the conventions above.
3. **Run quality gates locally** (`pnpm type-check && pnpm lint && pnpm build`).
4. **Open a Pull Request** against `main` (or the default branch).
5. **Describe your change** clearly in the PR description:
   - What problem does it solve?
   - What changed?
   - How to test it manually (e.g., "run `pnpm dev`, open `/docs`, press Cmd+K to test search").
6. **Request review** from maintainers.

> There is no documented review process, required approvals, or required status checks in the repository today. The maintainers will review at their discretion.

---

## 6. Project Vision (for context)

Aether is an **open-source CLI that turns any codebase into an AI-native workspace**. The web app you're contributing to is the marketing/docs site — it showcases the CLI (`aether genesis`, `aether sync`, `aether prompt`, etc.) with interactive demos (terminal sim, galaxy background, search, platform install scripts).

When contributing to the **site**, you're improving the developer onboarding experience. When contributing to the **CLI** (separate repo: `aether-one/aether`), you're building the core product.

---

## Quick Reference

| Task | Command |
|------|---------|
| Install deps | `pnpm install` |
| Dev server | `pnpm dev` |
| Type-check | `pnpm type-check` |
| Lint | `pnpm lint` |
| Build | `pnpm build` |
| Test | *(none configured)* |

---

**Questions?** Open an issue or PR — the maintainers will guide you. Thanks for contributing to Aether! 🚀