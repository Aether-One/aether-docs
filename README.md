# Aether Docs

[Official documentation](https://aethercli.com/) site and landing page for [Aether](https://github.com/aether-one/aether) — the open-source CLI that transforms any codebase into an AI-native workspace.

## Stack

- **Next.js 16** (App Router, Static Export)
- **TypeScript**
- **Tailwind CSS 4**
- **Framer Motion** (animations)
- **React Three Fiber** (3D galaxy background)
- **MDX** with remark-gfm (documentation pages)

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site.

## Project Structure

```
aether-docs/
├── src/
│   ├── app/
│   │   ├── page.tsx              ← Landing page
│   │   └── docs/                 ← Documentation (MDX)
│   └── components/
│       ├── hero/                 ← Hero with 3D galaxy
│       ├── galaxy/               ← Three.js particle system
│       ├── features/             ← Features section
│       ├── how-it-works/         ← How it works
│       ├── quickstart/           ← Quick start terminal
│       ├── roadmap/              ← Roadmap timeline
│       ├── navbar/               ← Navigation bar
│       ├── footer/               ← Footer
│       ├── docs/                 ← Docs sidebar & header
│       ├── theme/                ← Dark/light mode provider
│       └── ui/                   ← Reusable components
├── public/                       ← Static assets & logos
├── .github/workflows/deploy.yml  ← GitHub Pages deployment
└── mdx-components.tsx            ← MDX styling
```

## Deployment

The site auto-deploys to GitHub Pages on push to `main` via GitHub Actions.

To deploy manually:

```bash
npm run build
# Static files are in the `out/` directory
```

## License

MIT
