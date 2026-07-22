# Getting Started

## What this is

This is the **Aether** project — an open-source CLI that turns any codebase into an AI-native workspace. It scans your codebase, generates documentation, and lets you query your codebase with natural language via commands like `/ask` and `/ask`. This repository contains the **documentation site** (a Next.js site built with Next.js 15, React 19, and Tailwind CSS) that documents the CLI. The CLI itself is a separate binary distributed via GitHub Releases.

---

## Prerequisites

| Tool | Version | Source |
|------|---------|--------|
| **Node.js** | ≥ 18.18.0 | `package.json` → `engines.node` |
| **pnpm** | ≥ 9.0.0 | `package.json` → `packageManager` + `pnpm-lock.yaml` |

> **Note:** The CLI binary is distributed separately via GitHub Releases. This repo only builds the documentation site.

---

## Install

```bash
pnpm install
```

This uses `pnpm` (enforced by `packageManager` in `package.json` and the presence of `pnpm-lock.yaml`).

---

## Configuration

No environment variables or config files are required to run the documentation site locally.  
The site reads all content from local Markdown/MDX files under `src/app/docs/` and `src/lib/search-data.ts`.

> **No `.env` file, no credentials, no external services required** to run the docs locally.

---

## Run it

| Command | Purpose |
|---------|---------|
| `pnpm dev` | Start the dev server at `http://localhost:3000` (Next.js 15, Turbopack) |
| `pnpm build` | Production build (output to `.next/`) |
| `pnpm start` | Run the production build locally (after `pnpm build`) |
| `pnpm lint` | Run ESLint (Next.js config) |

**Start developing:**

```bash
pnpm dev
```

Then open **http://localhost:3000** in your browser.

---

## Verify it works

1. Open **http://localhost:3000** — you should see the Aether landing page with the animated galaxy background.
2. Click **"Get Started"** → you land on `/docs/getting-started`.
3. Press **`Cmd/Ctrl + K`** → the search dialog opens (try typing "genesis").
3. Click **"CLI Reference"** in the sidebar → navigate to `/docs/cli-reference/genesis` and verify the `/genesis` command docs render.

If the galaxy background animates, the sidebar navigates, and search opens with `Cmd/Ctrl+K`, the dev server is working.

---

## Next steps

- **Understand the mental model** → read [`onboarding.md`](onboarding.md) for the project's mental model and architecture.
- **Contribute** → see [`contributing.md`](contributing.md) for contribution guidelines, commit conventions, and PR process.
- **Explore the docs source** → content lives in `src/app/docs/` (MDX files) and `src/lib/search-data.ts` (search index).
- **Build the CLI** → the CLI itself lives in a separate repository (`aether-one/aether`); see the [GitHub repo](https://github.com/aether-one/aether) for its build instructions.