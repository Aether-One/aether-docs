# System Overview: aether-docs

## Goal
This project is the official documentation site and landing page for **Aether** — an open-source CLI that transforms any codebase into an AI-native workspace. It serves as a static documentation portal with interactive components, built with Next.js 16 (App Router) and deployed to GitHub Pages.

---

## Architecture
**Frontend-only static site** — no backend, database, or authentication system detected.

| Layer | Technology | Evidence |
|-------|------------|----------|
| Framework | Next.js 16 (App Router, Static Export) | `package.json`, `next.config.ts`, `README.md` |
| Language | TypeScript | `tsconfig.json`, all `.tsx`/`.ts` files |
| Styling | Tailwind CSS 4 | `package.json`, `postcss.config.mjs` |
| Animations | Framer Motion 12 | `package.json`, multiple components |
| 3D Graphics | React Three Fiber + Drei + Three.js | `package.json`, `src/components/galaxy/Galaxy.tsx` |
| Content | MDX with remark-gfm | `package.json`, `src/app/docs/**/*.mdx`, `mdx-components.tsx` |
| Deployment | GitHub Pages via GitHub Actions | `README.md` (references `.github/workflows/deploy.yml`) |

**No backend, database, storage, or communication layer detected.**

---

## System Components

### Landing Page (`src/app/page.tsx`)
- Entry point rendering hero, features, how-it-works, quickstart, roadmap, benchmarks sections
- Composes: `Hero`, `Features`, `HowItWorks`, `QuickStart`, `Roadmap`, `Benchmarks` (via `src/app/benchmarks/page.tsx`)

### Documentation Section (`src/app/docs/`)
- **Layout**: `src/app/docs/layout.tsx` — provides `DocsSidebar` and `DocsHeader`
- **Pages**: MDX files under:
  - `getting-started/page.mdx`
  - `cli-reference/` (9 command pages: `config`, `genesis`, `sync`, `prompt`, `ask`, `clean`, `exclude`, `cleancode`, index)
  - `changelog/` (12 version pages: v0.1.0–v0.2.1)
  - `contributing/page.mdx`
  - `page.mdx` (docs index)

### Core UI Components (`src/components/`)
| Component | Role |
|-----------|------|
| `Hero` | Landing hero with 3D galaxy background, animated headline, CTAs, terminal demo |
| `Galaxy` | Three.js particle system (star field, spiral nebula, core, blue streaks) — theme-aware |
| `Features` | Animated grid of 7 feature cards with hover effects |
| `HowItWorks` | 3-step install/run/chat process with code snippets |
| `QuickStart` | Static terminal simulation of `aether genesis` output |
| `Roadmap` | 3-phase timeline (Now/Next/Later) with active indicator |
| `Navbar` | Responsive navigation with theme toggle, mobile menu, scroll-aware styling |
| `Footer` | Links to docs sections, GitHub, copyright |
| `DocsHeader` | Sticky docs header with logo, search trigger, theme toggle, GitHub link |
| `DocsSidebar` | Collapsible navigation tree (Getting Started, CLI Reference, Changelog, etc.) |
| `SearchDialog` | Cmd/Ctrl+K fuzzy search over 27 indexed items (titles, keywords, descriptions) |
| `PlatformInstall` | Copy-to-clipboard install scripts for Windows/macOS/Linux |
| `ThemeProvider` / `ThemeToggle` | Dark/light mode via localStorage + document class |
| `Badge`, `Button`, `Card`, `Logo` | Reusable UI primitives with nebula-purple accent theme |

### Benchmarks (`src/components/benchmarks/`)
- `data.ts`: 5 benchmark tasks against `axios/axios` repo with token/turn/cost metrics for raw vs prompt modes
- `scale.ts`: Logarithmic scale utilities (100K–10M) for chart axis
- `format.ts`: Token/USD`, `BenchmarkChart`, `BenchmarkTable`, `BenchmarkStats`, `BenchmarkTasks`, `BenchmarkMethodology`, `BenchmarkCaveats`, `BenchmarkChangelog`, `BenchmarkCTA`, `BenchmarkHero` — render benchmark report

### Search Index (`src/lib/search-data.ts`)
- 27 `SearchItem` entries across 4 categories: Getting Started (2), CLI Reference (10), Changelog (12), Community (1)
- Powers `SearchDialog` fuzzy matching

---

## Communication Patterns
**No inter-component communication layer detected.** All components are React client/server components communicating via:
- Props and composition (standard React)
- React Context (`ThemeContext` in `ThemeProvider.tsx`)
- Next.js `Link` for client-side navigation
- `next/navigation` hooks (`usePathname`, `useRouter`) for routing awareness
- Browser APIs: `localStorage` (theme), `navigator.clipboard` (copy), `window` events (scroll, resize, keydown)

**No REST, WebSocket, GraphQL, or event bus detected.**

---

## Authentication & Authorization
**Not detected.** No auth providers, middleware, session handling, or protected routes in the provided context.

---

## Deployment
- **Target**: GitHub Pages (static export)
- **Trigger**: Push to `main` branch via GitHub Actions (`.github/workflows/deploy.yml` referenced in `README.md`)
- **Build command**: `npm run build` → outputs to `out/`
- **Static export**: Implied by `README.md` ("Static Export") and GitHub Pages deployment
- **No Docker, Vercel, Netlify, or other platform configs detected.**