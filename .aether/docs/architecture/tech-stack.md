# Tech Stack

All technologies listed below are verified from `package.json`, `tsconfig.json`, `next.config.ts`, `eslint.config.mjs`, `postcss.config.mjs`, or import statements in the provided source files.

## Languages
- **TypeScript** — Used as the primary language for all `.ts`/`.tsx` files; configured via `tsconfig.json` (`"jsx": "react-jsx"`, `strict: true`) and listed in `devDependencies` (`typescript: "^5"`).
- **MDX** — Used for documentation pages (`src/app/docs/**/page.mdx`); enabled via `@next/mdx` and `@mdx-js/loader` in `package.json` and `next.config.ts` (`pageExtensions: ["ts", "tsx", "md", "mdx"]`).

## Frameworks
- **Next.js 16** (`next: "16.2.10"`) — App Router framework used for the site; `src/app/layout.tsx`, `src/app/page.tsx`, and `next.config.ts` use Next APIs (`Metadata`, `next/font/google`, `output: "export"`).
- **React 19** (`react: "19.2.4"`, `react-dom: "19.2.4"`) — UI library used in all client components (e.g. `src/components/hero/Hero.tsx`, `src/components/navbar/Navbar.tsx`).
- **React Three Fiber** (`@react-three/fiber: "^9.6.1"`) — Used in `src/components/galaxy/Galaxy.tsx` (`Canvas`, `useFrame`) to render the 3D galaxy background.
- **@react-three/drei** (`@react-three/drei: "^10.7.7"`) — Used in `Galaxy.tsx` (`Points`, `PointMaterial`) for Three.js point helpers.
- **three** (`three: "^0.185.1"`) — Imported in `Galaxy.tsx` (`import * as THREE from "three"`) for 3D math and blending modes.
- **Framer Motion** (`framer-motion: "^12.42.2"`) — Used in client components (e.g. `Features.tsx`, `Hero.tsx`, `Navbar.tsx`) for animations (`motion`, `useScroll`, `useTransform`).
- **Tailwind CSS 4** (`tailwindcss: "^4"`, `@tailwindcss/postcss: "^4"`) — Utility CSS framework; configured via `postcss.config.mjs` and used in class strings across components (e.g. `Features.tsx`, `Footer.tsx`).
- **lucide-react** (`lucide-react: "^1.25.0"`) — Listed in `package.json` dependencies; no explicit import found in provided files.

## Build Tools
- **Next.js build** (`next build`, `next dev`, `next start` scripts in `package.json`) — Primary bundler/dev server for the project.
- **@next/mdx** (`@next/mdx: "^16.2.10"`) — Integrates MDX with Next.js; used in `next.config.ts` via `createMDX`.
- **@mdx-js/loader** (`@mdx-js/loader: "^3.1.1"`) — MDX loader for webpack/Next; dependency of the MDX pipeline.
- **remark-gfm** (`remark-gfm: "^4.0.1"`) — GitHub-flavored markdown plugin passed to MDX in `next.config.ts` (`remarkPlugins: [["remark-gfm"]]`).
- **TypeScript compiler** (`typescript: "^5"`) — Type-checking and `.tsbuildinfo` generation (`tsconfig.tsbuildinfo` present).
- **PostCSS** (`@tailwindcss/postcss`) — CSS processing pipeline via `postcss.config.mjs`.

## Testing
- Not detected from provided context.

## Development Tools
- **ESLint** (`eslint: "^9"`, `eslint-config-next: "16.2.10"`) — Linter; `lint` script (`"lint": "eslint"`) and `eslint.config.mjs` present.
- **TypeScript type defs** (`@types/node`, `@types/react`, `@types/react-dom`, `@types/three`, `@types/mdx`) — Dev dependencies for type checking, listed in `package.json`.

## Infrastructure
- **Static Export** — `next.config.ts` sets `output: "export"` for static site generation.
- **GitHub Pages deployment** — Referenced in `README.md` ("auto-deploys to GitHub Pages on push to `main` via GitHub Actions") and mentions `.github/workflows/deploy.yml`; that workflow file is NOT present in the provided directory structure, so only the README claim is documented as intent, not verified source.
- **Vercel** — `README.md` links to `https://aether-docs-sigma.vercel.app/` as the official docs site (intent/reference only; no Vercel config in provided files).

## Key Dependencies
| Dependency | Why used (verified) |
|------------|---------------------|
| `next` | App Router site, static export, MDX integration (`next.config.ts`, `src/app/*`). |
| `react` / `react-dom` | Component model for all UI (`src/components/**`). |
| `@react-three/fiber` + `@react-three/drei` + `three` | Render animated 3D galaxy in `src/components/galaxy/Galaxy.tsx`, consumed by `Hero.tsx`. |
| `framer-motion` | Scroll/entrance animations in `Hero.tsx`, `Features.tsx`, `Roadmap.tsx`, etc. |
| `@next/mdx` + `@mdx-js/loader` + `@mdx-js/react` + `remark-gfm` | Author docs in MDX with GFM support; styled via `mdx-components.tsx`. |
| `tailwindcss` + `@tailwindcss/postcss` | Styling system used in all components. |
| `lucide-react` | Listed as dependency for icons (no import shown in provided files). |