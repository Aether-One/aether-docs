# Modules Overview

This document provides an overview of the major modules/directories in the codebase, their purposes, key files, exports, dependencies, and data flows.

---

## 1. `src/components/hero`

### Purpose
Renders the hero section of the landing page with animated background, hero content, and terminal demo.

### Key Files
| File | Role |
|------|------|
| `Hero.tsx` | Main hero component with scroll animations, galaxy background, hero content, and terminal demo |

### Exports
- `Hero()` — default export, React client component

### Dependencies
| Module | Used For |
|--------|----------|
| `framer-motion` | Scroll animations (`useScroll`, `useTransform`, `motion`) |
| `next/dynamic` | Dynamic import of `Galaxy` with SSR disabled |
| `next/link` | Navigation links |
| `@/components/theme` | `useTheme` hook for theme detection |
| `@/components/ui/Logo` | Logo component with theme-aware variants |
| `@/components/galaxy/Galaxy` | Dynamic galaxy background (dynamic import) |
| `next/link` | Navigation links |

### Flow
1. `Hero` mounts, reads theme via `useTheme()`
2. `Galaxy` dynamically imported (SSR disabled), receives `isDark` prop
3. `useScroll` tracks scroll progress on container ref
3. `useTransform` maps scroll progress to `y` translation and `opacity`
3. Animated `motion.div` wraps hero content (logo, headline, CTAs, terminal demo)
4. Terminal demo renders static simulated terminal output

---

## 2. `src/components/galaxy`

### Purpose
Renders an interactive 3D galaxy background using Three.js via React Three Fiber.

### Key Files
| File | Role |
|------|------|
| `Galaxy.tsx` | Main galaxy component with Canvas and four particle systems |

### Exports
- `Galaxy({ isDark?: boolean })` — default export, React component

### Dependencies
| Module | Used For |
|--------|----------|
| `@react-three/fiber` | `Canvas`, `useFrame` |
| `@react-three/drei` | `Points`, `PointMaterial` |
| `three` | `THREE` namespace for geometry/math |

### Internal Components (internal to `Galaxy.tsx`)
| Component | Points | Behavior |
|-----------|--------|----------|
| `StarField` | 8000 | Spherical distribution, slow rotation |
| `SpiralNebula` | 4000 | 3-arm spiral, medium rotation |
| `GalacticCore` | 2000 | Dense core, fast reverse rotation |
| `BlueStreaks` | 1500 | Spiral streaks, fast rotation |

### Flow
1. `Galaxy` receives `isDark` prop (default `true`)
2. Renders `Canvas` with camera at `[0, 8, 18]`, FOV 55
3. Four particle systems render as `Points` with `BufferGeometry` positions generated in `useMemo`
4. `useFrame` rotates each system on Y-axis at different speeds
4. Materials adapt color/size/opacity/blending based on `isDark`

---

## 3. `src/components/navbar`

### Purpose
Responsive navigation bar with theme toggle, navigation links, and mobile menu.

### Key Files
| File | Role |
|------|------|
| `Navbar.tsx` | Main navbar component with desktop/mobile layouts |

### Exports
- `Navbar()` — default export, React client component

### Dependencies
| Module | Used For |
|--------|----------|
| `framer-motion` | Mobile menu animation (`AnimatePresence`, `motion`) |
| `next/link` | Internal navigation (`/docs`) |
| `next/navigation` | Not directly used (imported but unused in visible code) |
| `@/components/theme` | `useTheme`, `ThemeToggle` |
| `next/link` | Navigation links |

### State & Effects
| State/Effect | Purpose |
|--------------|---------|
| `scrolled` | Tracks `window.scrollY > 20` for scrolled styling |
| `mobileOpen` | Toggles mobile menu |
| `scroll` listener | Updates `scrolled` on scroll |
| `resize` listener | Closes mobile menu on desktop resize |
| `mobileOpen` effect | Locks body scroll when mobile menu open |

### Flow
1. Mounts listeners for scroll/resize
2. Renders logo (theme-aware image), desktop nav links, theme toggle, GitHub link, Get Started button
3. Mobile menu button toggles `mobileOpen`
4. `AnimatePresence` animates mobile menu slide-in
5. Links close mobile menu on click

---

## 3. `src/components/quickstart`

### Purpose
Renders the "Quick Start" section with a simulated terminal demo of `aether genesis`.

### Key Files
| File | Role |
|------|------|
| `QuickStart.tsx` | Quick start section with animated terminal demo |

### Exports
- `QuickStart()` — default export, React client component

### Dependencies
| Module | Used For |
|--------|----------|
| `framer-motion` | Scroll-triggered animations (`motion.div`, `whileInView`) |
| `next/link` | CTA link to docs |

### Flow
1. Section mounts with `id="quickstart"`
2. `motion.div` animates on scroll into view (`whileInView`, `viewport={{ once: true }}`)
3. Renders static terminal simulation with simulated `aether genesis` output
4. CTA link navigates to `/docs/getting-started`

---

## 4. `src/components/docs`

### Purpose
Documentation-specific components: sidebar navigation, search dialog, platform install cards.

### Key Files
| File | Role |
|------|------|
| `DocsSidebar.tsx` | Collapsible sidebar navigation for docs |
| `SearchDialog.tsx` | Command-palette search dialog (Cmd/Ctrl+K) |
| `PlatformInstall.tsx` | Platform-specific install cards (Windows/macOS/Linux) |

### Exports
| File | Exports |
|------|---------|
| `DocsSidebar.tsx` | `DocsSidebar` (default) |
| `SearchDialog.tsx` | `SearchDialog` (default) |
| `PlatformInstall.tsx` | `PlatformInstall` (default) |

### Dependencies
| Module | Used By |
|--------|---------|
| `next/navigation` | `usePathname`, `useRouter` (sidebar, search) |
| `next/link` | Navigation links (sidebar, platform install) |
| `framer-motion` | Animations (sidebar, search dialog) |
| `@/lib/search-data` | `searchData`, `SearchItem` (search dialog) |
| `next/link` | Links in sidebar and platform cards |

### `DocsSidebar` Flow
1. Reads `pathname` via `usePathname()`
2. Defines `navigation` structure (sections with links)
3. Computes `isChildActive`, `isCollapsible` per section
3. Initializes `expanded` state per collapsible section based on active child
4. Renders collapsible sections with chevron toggle, highlights active link

### `SearchDialog` Flow
1. Opens on `Cmd/Ctrl+K` (global listener) or `open` prop
2. `fuzzyMatch` + scoring ranks `searchData` items
3. Results grouped by `category`, rendered in modal
4. Keyboard navigation: `↑/↓` select, `Enter` navigate, `Esc` close
5. Click outside closes dialog

### `PlatformInstall` Flow
1. Defines three platforms (Windows, macOS, Linux) with install scripts
2. Renders `PlatformCard` per platform with copy-to-clipboard button
3. Copy shows "✓ Copied" for 2s via `copied` state

---

## 5. `src/components/benchmarks`

### Purpose
Formatting utilities for benchmark metrics display.

### Key Files
| File | Role |
|------|------|
| `format.ts` | Formatting utilities for tokens, USD, percentages |

### Exports
| Function | Purpose |
|----------|---------|
| `formatTokens(n)` | Formats token counts as `X.XXM` or `XXXK` |
| `formatUsd(n)` | Formats USD as `$X.XX` |
| `formatPct(n)` | Formats percentage as `-XX%` or `+XX%` |

### Dependencies
- None (pure functions)

---

## 6. `src/components/ui`

### Purpose
Reusable UI primitives: Button, Card, Logo, ThemeToggle.

### Key Files
| File | Role |
|------|------|
| `Button.tsx` | Polymorphic button (`<button>` or `<a>`) with variants/sizes |
| `Card.tsx` | Card container with header/title/description sub-components |
| `Logo.tsx` | Theme-aware logo image |
| `ThemeToggle.tsx` | Theme toggle button (icon-only) |

### Exports
| File | Exports |
|------|---------|
| `Button.tsx` | `Button` (default), `variantStyles`, `sizeStyles` |
| `Card.tsx` | `Card`, `CardHeader`, `CardTitle`, `CardDescription` (all named) |
| `Logo.tsx` | `Logo` (default) |
| `ThemeToggle.tsx` | `ThemeToggle` (default) |

### Dependencies
| Module | Used By |
|--------|---------|
| `next/link` | `Button` (for `href` prop) |
| `@/components/theme` | `Logo` (`useTheme`), `ThemeToggle` (`useTheme`, `ThemeProvider` context) |
| `next-themes` | `ThemeToggle` (`useTheme`) |

### `Button` Flow
1. Renders `<a>` if `href` prop present, else `<button>`
2. Applies `variantStyles[variant]` + `sizeStyles[size]`
3. Spreads remaining props

### `Card` Flow
1. Base `Card` applies base styles + optional hover
2. Sub-components (`CardHeader`, `CardTitle`, `CardDescription`) provide styled wrappers

### `Logo` Flow
1. `useTheme()` returns `theme`
2. Selects dark/light logo path
3. Renders `<img>` with dimensions

### `ThemeToggle` Flow
1. `useTheme()` from `next-themes`
2. Renders button with sun/moon icons toggled by `theme === 'dark'`

---

## 7. `src/components/theme`

### Purpose
Theme provider and context for light/dark mode.

### Key Files
| File | Role |
|------|------|
| `ThemeProvider.tsx` | Theme provider wrapper (client component) |
| `theme.ts` | Theme context, `useTheme` hook, `ThemeProvider` wrapper |

### Exports
| File | Exports |
|------|---------|
| `ThemeProvider.tsx` | `ThemeProvider` (default) |
| `theme.ts` | `ThemeProvider`, `useTheme`, `ThemeContext` |

### Dependencies
| Module | Used By |
|--------|---------|
| `next-themes` | `ThemeProvider` (wraps `NextThemesProvider`) |
| `react` | Context, `createContext`, `useContext` |

### Flow
1. `ThemeProvider` (in `ThemeProvider.tsx`) wraps `NextThemesProvider` with `attribute="class"`, `defaultTheme="dark"`, `enableSystem`
2. `theme.ts` creates `ThemeContext` and `useTheme` hook
3. Components consume `useTheme()` for `theme`, `setTheme`, `resolvedTheme`

---

## 8. `src/lib`

### Purpose
Shared utilities and data.

### Key Files
| File | Role |
|------|------|
| `search-data.ts` | Search index data for docs search |
| `utils.ts` | Utility functions (`cn` for classnames) |

### Exports
| File | Exports |
|------|---------|
| `search-data.ts` | `SearchItem` interface, `searchData: SearchItem[]` (27 items) |
| `utils.ts` | `cn(...inputs)` — `clsx` + `tailwind-merge` |

### `search-data.ts` Data
| Category | Count | Examples |
|----------|-------|----------|
| Getting Started | 2 | getting-started, quickstart |
| CLI Reference | 10 | config, genesis, sync, prompt, ask, clean, exclude, cleancode |
| Changelog | 12 | v0.2.1 down to v0.1.0 |
| Community | 1 | GitHub, Discord |

### Dependencies
| Module | Used By |
|--------|---------|
| `clsx` | `utils.ts` |
| `tailwind-merge` | `utils.ts` |

---

## 9. `src/app` (Next.js App Router)

### Purpose
Application routes and layouts.

### Key Files (inferred from imports)
| Route | Purpose |
|-------|---------|
| `app/layout.tsx` | Root layout (imports `ThemeProvider`, `Navbar`, fonts) |
| `app/page.tsx` | Home page (imports `Hero`, `QuickStart`) |
| `app/docs/layout.tsx` | Docs layout (imports `DocsSidebar`) |
| `app/docs/[...slug]/page.tsx` | Docs pages (likely uses `SearchDialog`) |

> **Note**: Only imports are visible in provided context. File contents not shown.

### Dependencies (from imports)
| Module | Used In |
|--------|---------|
| `@/components/theme/ThemeProvider` | `app/layout.tsx` |
| `@/components/navbar/Navbar` | `app/layout.tsx` |
| `@/components/hero/Hero` | `app/page.tsx` |
| `@/components/quickstart/QuickStart` | `app/page.tsx` |
| `@/components/docs/DocsSidebar` | `app/docs/layout.tsx` |
| `@/components/docs/SearchDialog` | Likely `app/docs/layout.tsx` or page |

---

## 10. `src/components/benchmarks/format.ts`

*(Covered in section 5)*

---

## Dependency Map

```mermaid
graph TD
    %% App Layout
    app_layout[app/layout.tsx] --> ThemeProvider
    app_layout --> Navbar
    app_page[app/page.tsx] --> Hero
    app_page --> QuickStart
    docs_layout[app/docs/layout.tsx] --> DocsSidebar
    docs_layout --> SearchDialog

    %% Theme System
    ThemeProvider[components/theme/ThemeProvider.tsx] --> next_themes[next-themes]
    theme_ctx[components/theme/theme.ts] --> ThemeProvider
    theme_ctx --> useTheme[useTheme hook]

    %% Theme Consumers
    Navbar --> useTheme
    Navbar --> ThemeToggle
    Hero --> useTheme
    Hero --> Logo
    Logo --> useTheme
    ThemeToggle --> useTheme
    Galaxy --> isDark[isDark prop from Hero]

    %% Hero & Galaxy
    Hero --> Galaxy[dynamic import]
    Hero --> Logo
    Hero --> Link[next/link]
    Galaxy --> r3f[@react-three/fiber]
    Galaxy --> drei[@react-three/drei]
    Galaxy --> three[three]

    %% Navbar
    Navbar --> Link[next/link]
    Navbar --> ThemeToggle
    Navbar --> motion[framer-motion]

    %% QuickStart
    QuickStart --> motion[framer-motion]
    QuickStart --> Link[next/link]

    %% Docs Components
    DocsSidebar --> usePathname[next/navigation]
    DocsSidebar --> useState[react]
    DocsSidebar --> motion[framer-motion]
    DocsSidebar --> Link[next/link]

    SearchDialog --> useRouter[next/navigation]
    SearchDialog --> useState[react]
    SearchDialog --> useEffect[react]
    SearchDialog --> searchData[lib/search-data.ts]
    SearchDialog --> motion[framer-motion]

    PlatformInstall --> useState[react]
    PlatformInstall --> navigator.clipboard[Web API]

    %% UI Primitives
    Button --> Link[next/link]
    Logo --> useTheme
    ThemeToggle --> useTheme
    Card --> --none--

    %% Utils
    utils[lib/utils.ts] --> clsx
    utils --> tailwind-merge
    search_data[lib/search-data.ts] --> --none--

    %% Benchmarks
    format[benchmarks/format.ts] --> --none--

    %% External
    next_themes[next-themes] --> ThemeProvider
    framer_motion[framer-motion] --> Hero
    framer_motion --> Navbar
    framer_motion --> QuickStart
    framer_motion --> DocsSidebar
    framer_motion --> SearchDialog
    r3f[@react-three/fiber] --> Galaxy
    drei[@react-three/drei] --> Galaxy
    three[three] --> Galaxy
```

---

## Summary of Module Relationships

| Layer | Modules |
|-------|---------|
| **App Routes** | `app/layout`, `app/page`, `app/docs/layout` |
| **Theme System** | `theme/ThemeProvider`, `theme/theme.ts` → consumed by `Navbar`, `Hero`, `Logo`, `ThemeToggle`, `Galaxy` |
| **Landing Page** | `Hero` → `Galaxy` (dynamic), `Logo`, `QuickStart` |
| **Navigation** | `Navbar` → `ThemeToggle`, `Link` |
| **Documentation** | `DocsSidebar`, `SearchDialog`, `PlatformInstall` → `search-data`, `navigation` |
| **UI Primitives** | `Button`, `Card`, `Logo`, `ThemeToggle` |
| **Utilities** | `lib/utils` (`cn`), `lib/search-data` (static data), `benchmarks/format` (formatters) |
| **3D Background** | `Galaxy` → `@react-three/fiber`, `@react-three/drei`, `three` |

---

## Notes
- All components are **React Client Components** (`"use client"`) except `ThemeProvider.tsx` which wraps `NextThemesProvider`.
- `Galaxy` is dynamically imported with `ssr: false` in `Hero`.
- `SearchDialog` registers a global `Cmd/Ctrl+K` listener.
- `Navbar` locks body scroll on mobile menu open.
- `lib/utils.ts` provides `cn()` (clsx + tailwind-merge) used across components (imports not shown but standard pattern).
- No server components or server actions visible in provided context.