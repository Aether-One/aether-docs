# Getting Started

## What this is

`aether-docs` is the documentation site and landing page for Aether, an open-source CLI that turns any codebase into an AI-native workspace. This repository is a Next.js 16 application (App Router, static export) that renders a marketing landing page at the root and a set of MDX-based documentation pages under `/docs`. It is not the CLI itself — it describes and links to it.

## Prerequisites

The project's `package.json` does not declare an `engines` field, so no exact Node version is enforced by the config. Based on the toolchain present, you need:

- **Node.js** — compatible with Next.js 16 and the `npm` lockfile (`package-lock.json` is present, so npm is the package manager)
- **npm** — used via the committed `package-lock.json`

No other runtimes or toolchains (Rust, Docker, etc.) are referenced in this project's own config.

## Install

Because `package-lock.json` is in the tree, use npm to install dependencies:

```bash
npm install
```

## Configuration

No environment variables, `.env` files, or credential setup are referenced anywhere in this project's context. The site reads theme state from `localStorage` at runtime (see `ThemeProvider.tsx`) and links out to GitHub, but nothing needs to be configured before running locally. You can skip config and go straight to running it.

## Run it

The `scripts` block in `package.json` defines the following:

- **Development server** — starts Next.js in dev mode:
  ```bash
  npm run dev
  ```
- **Production build** — builds the static export (the config uses `output: "export"` in `next.config.ts`, so output goes to `out/`):
  ```bash
  npm run build
  ```
- **Start** — serves the built output:
  ```bash
  npm run start
  ```
- **Lint** — runs ESLint:
  ```bash
  npm run lint
  ```

The landing page is rendered from `src/app/page.tsx`, and docs pages live as MDX under `src/app/docs/` (e.g. `getting-started/page.mdx`). The docs layout (`src/app/docs/layout.tsx`) wraps those pages with `DocsSidebar` and `DocsHeader`.

## Verify it works

After `npm run dev`, open [http://localhost:3000](http://localhost:3000) in a browser. You should see the landing page with the 3D galaxy hero (`Hero.tsx` → `Galaxy.tsx`), followed by the Features, How It Works, Quick Start, and Roadmap sections. The documentation is available at [http://localhost:3000/docs](http://localhost:3000/docs), with the sidebar linking to Introduction, Installation, CLI Reference, Changelog, and Contributing.

For a production check, `npm run build` produces a static `out/` directory (per `next.config.ts` and the README), which `npm run start` can then serve.

## Next steps

For the mental model and how the pieces fit together, see the project's `onboarding.md` if present in your clone. To contribute changes, the `contributing.md` guide lives under `src/app/docs/contributing/page.mdx` and is also reachable from the docs sidebar.