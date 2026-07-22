# Aether Docs — Onboarding Guide

Welcome to the documentation site for **Aether**, the open-source CLI that turns any codebase into an AI-native workspace. This guide is for developers who want to understand, extend, or fix the site itself — not just read it.

---

## 1. Why This Project Exists

Aether (the CLI) solves a real problem: LLMs are powerful, but they don't know your codebase. Feeding an entire repo into a prompt is slow, expensive, and often hits context limits. Aether builds a **structured, searchable knowledge base** from your code — summaries, symbols, relationships — so an AI can answer questions, write docs, or refactor with actual context.

**This repository (`aether-docs`)** is the public face of that tool. It serves three audiences:

- **New users** — land on the hero, understand the value prop in seconds, and get to a working install.
- **Daily users** — browse CLI reference, changelogs, and contribution guides.
- **Contributors** — find the contributing guide and understand the project's direction.

The site is **static-first** (Next.js App Router + `output: 'export'`), deployed to GitHub Pages. No server, no database, no auth. Just fast, cacheable HTML/CSS/JS.

---

## 2. Mental Model: How the Pieces Fit Together

Think of the site as **three layers** stacked on top of each other:

### Layer 1: The Landing Page (`src/app/page.tsx`)
A single, scrollable page that tells the whole story:
- **Hero** — 3D galaxy background (React Three Fiber), animated headline, terminal demo.
- **Features** — 7 animated cards explaining what Aether does.
- **How It Works** — 3-step install/run/chat flow.
- **Roadmap** — Three phases (Now/Next/Later) with pulsing "active" indicator.
- **Benchmarks** — Real data from running Aether on `axios/axios` with Claude Sonnet 5, showing token/cost reduction.

All of these are **client components** (they use `framer-motion`, `three.js`, or browser APIs like `localStorage`). The page itself composes them.

### Layer 2: Documentation (`src/app/docs/`)
Pure **MDX files** — one per page — rendered through a shared layout (`src/app/docs/layout.tsx`). That layout provides:
- **Sidebar** (`DocsSidebar`) — collapsible navigation, auto-highlights current page.
- **Header** (`DocsHeader`) — logo, search (Cmd/Ctrl+K), theme toggle, GitHub link.
- **Authors** — optional byline at the bottom of each doc page.

The sidebar structure is **hardcoded in `DocsSidebar.tsx`** (not generated from the filesystem). If you add a new doc page, you must add its link there.

### Layer 3: Shared UI & Infrastructure
- **Theme system** (`src/components/theme/`) — dark/light via CSS custom properties, persisted in `localStorage`, no flash on load.
- **UI primitives** (`src/components/ui/`) — `Button`, `Card`, `Badge`, `Logo` — styled with Tailwind 4 and custom design tokens (`nebula-purple`, `cosmos-800`, etc.).
- **Search** (`src/components/docs/SearchDialog.tsx` + `src/lib/search-data.ts`) — client-side fuzzy search over a static index of 27 items. No server, no Algolia.
- **Galaxy** (`src/components/galaxy/Galaxy.tsx`) — a `Canvas` with four layered particle systems (stars, spiral nebula, core, blue streaks), each rotating at different speeds. Colors adapt to theme.

---

## 3. Where Things Live — "I Want to Change X → Look in Y"

| Goal | File(s) to Touch |
|------|------------------|
| **Add a new doc page** | 1. Create `.mdx` under `src/app/docs/<section>/`<br>2. Add link in `src/components/docs/DocsSidebar.tsx` (`navigation` array) |
| **Change sidebar structure/order** | `src/components/docs/DocsSidebar.tsx` — edit the `navigation` constant |
| **Update CLI reference content** | `src/app/docs/cli-reference/<command>/page.mdx` |
| **Add a changelog entry** | Create `src/app/docs/changelog/vX.Y.Z/page.mdx` + add link in `DocsSidebar` (Changelog section) |
| **Modify the hero/terminal demo** | `src/components/hero/Hero.tsx` |
| **Adjust galaxy visuals** | `src/components/galaxy/Galaxy.tsx` — particle counts, colors, rotation speeds |
| **Change theme colors/tokens** | `src/app/globals.css` (CSS custom properties) + Tailwind config (if any) |
| **Add a search result** | `src/lib/search-data.ts` — add to `searchData` array |
| **Tweak benchmark data** | `src/components/benchmarks/data.ts` — `TASKS`, `REPO`, `MODEL`, `TOTALS` |
| **Modify feature cards** | `src/components/features/Features.tsx` — `features` array |
| **Update roadmap phases** | `src/components/roadmap/Roadmap.tsx` — `phases` array |
| **Change footer links/copyright** | `src/components/footer/Footer.tsx` |
| **Adjust platform install scripts** | `src/components/docs/PlatformInstall.tsx` — `platforms` array |

---

## 4. Key Decisions & Reasoning

### Static Export + GitHub Pages
**Decision:** `next.config.ts` uses `output: 'export'` (implied by README "Static Export" and deploy workflow).  
**Why:** Zero hosting cost, global CDN, no server maintenance. The site is content-heavy, interaction-light — perfect for static.

### MDX for Docs, Not a CMS
**Decision:** Documentation lives as `.mdx` files in the repo.  
**Why:** Version-controlled, reviewable in PRs, no external dependency. Authors write in Markdown with React components when needed (via `mdx-components.tsx`).

### Client-Side Search Only
**Decision:** `SearchDialog` filters a static `searchData` array in the browser.  
**Why:** 27 items is tiny. No need for a search service, indexing pipeline, or API keys. Fuzzy matching is fast enough.

### Hardcoded Sidebar Navigation
**Decision:** `DocsSidebar.navigation` is a manual array, not auto-generated from the filesystem.  
**Why:** Explicit control over grouping, order, and collapsibility. Auto-generation would require conventions (frontmatter, folder naming) that add complexity. Trade-off: you must remember to update it when adding pages.

### Theme via CSS Custom Properties + `localStorage`
**Decision:** `ThemeProvider` reads/writes `localStorage`, toggles a class on `<html>`, and CSS variables do the rest.  
**Why:** No runtime CSS-in-JS, no flash of wrong theme (the `mounted` guard prevents SSR mismatch), works with Tailwind's `dark:` variant.

### Galaxy as a Separate Dynamic Import
**Decision:** `Hero` loads `Galaxy` via `next/dynamic({ ssr: false })`.  
**Why:** `react-three-fiber` uses `canvas` and WebGL — not available on the server. Disabling SSR avoids build errors.

### Benchmark Data as TypeScript, Not JSON
**Decision:** `data.ts` exports typed constants (`TASKS`, `TOTALS`, `REPO`, `MODEL`).  
**Why:** Type safety, IDE autocomplete, and the `reduction()` helper can be unit-tested. The data is small enough to inline.

### Design Tokens in CSS, Not Tailwind Config
**Decision:** Custom colors (`--nebula-purple`, `--cosmos-800`, etc.) live in `globals.css` as CSS variables.  
**Why:** Tailwind 4 uses CSS-first theming. Variables work in both Tailwind classes (`bg-[var(--nebula-purple)]`) and raw CSS (galaxy particle colors).

---

## 5. Making Your First Change — Walkthrough

**Task:** *Add a new CLI command reference page for `/analyze` (hypothetical).*

### Step 1: Create the MDX File
```bash
mkdir -p src/app/docs/cli-reference/analyze
```
Create `src/app/docs/cli-reference/analyze/page.mdx`:
```mdx
---
title: "/analyze"
description: "Analyze codebase structure and dependencies"
---

# /analyze

Analyzes your project and outputs a structural summary...
```

### Step 2: Add to Sidebar
Open `src/components/docs/DocsSidebar.tsx`. Find the `navigation` array, locate the `"CLI Reference"` section, and add:
```ts
{ title: "/analyze", href: "/docs/cli-reference/analyze" }
```
Place it alphabetically or logically among the other commands.

### Step 3: Add to Search Index
Open `src/lib/search-data.ts`. Add an entry to `searchData`:
```ts
{
  title: "/analyze",
  description: "Analyze codebase structure and dependencies",
  href: "/docs/cli-reference/analyze",
  category: "CLI Reference",
  keywords: ["analyze", "structure", "dependencies", "graph"]
}
```

### Step 4: Verify Locally
```bash
npm run dev
```
- Visit `http://localhost:3000/docs/cli-reference/analyze` — page renders.
- Open sidebar — `/analyze` appears under CLI Reference.
- Press `Cmd/Ctrl+K`, type "analyze" — result appears.

### Step 5: Build Check
```bash
npm run build
```
Ensures no TypeScript errors, no broken links, static export succeeds.

---

## 6. Gotchas — Things That Will Trip You Up

### 1. **Sidebar ≠ Filesystem**
Adding a `.mdx` file does **not** auto-appear in navigation. You *must* edit `DocsSidebar.tsx`. This is intentional (see Key Decisions), but easy to forget.

### 2. **Search Index Is Manual**
`searchData.ts` is not generated. If you add a page and don't add it there, Cmd+K won't find it.

### 3. **Theme Flash on First Load**
`ThemeProvider` uses a `mounted` state to avoid SSR mismatch. If you add a new client component that reads theme *before* mounting, you'll see a flash. Always use `useTheme()` hook — it handles the guard.

### 4. **Galaxy Requires `ssr: false`**
Any component using `react-three-fiber` *must* be dynamically imported with `ssr: false`. Don't import `Galaxy` directly in a server component.

### 5. **Tailwind 4 Uses CSS Variables, Not Config**
Don't look for `tailwind.config.js` — it doesn't exist. Custom colors are in `src/app/globals.css` as `--color-*` or semantic names (`--nebula-purple`). Use them via `bg-[var(--nebula-purple)]` or `@theme` in CSS.

### 6. **Benchmark Data Is Typed — Don't Drift**
`data.ts` exports `BenchmarkTask` interface. If you add a task, match the shape exactly (`id`, `title`, `short`, `prNumber`, `prTitle`, `prUrl`, `files`, `bug`, `raw`, `prompt`). The `BenchmarkTable` and `BenchmarkChart` components depend on it.

### 7. **Platform Install Scripts Are Hardcoded**
`PlatformInstall.tsx` contains literal shell commands for Windows/macOS/Linux. If Aether's release asset naming changes (e.g., `aether-win-x64.exe` → `aether-windows-amd64.exe`), update it here. There's no external config.

### 8. **Changelog Links Must Be Added in Two Places**
New version → new folder under `src/app/docs/changelog/vX.Y.Z/page.mdx` **AND** a link in `DocsSidebar.navigation` (Changelog section). The sidebar lists versions newest-first.

---

## Final Note

This site is **intentionally simple** — no database, no auth, no build-time data fetching. That's a feature. When you change something, ask: *"Does this keep the site static, fast, and easy to deploy?"* If yes, you're on the right track.

Happy contributing. 🚀