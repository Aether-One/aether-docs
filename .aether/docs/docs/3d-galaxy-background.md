# 3D Galaxy Background

## Overview

The 3D galaxy background is rendered by `src/components/galaxy/Galaxy.tsx` and loaded inside the landing page hero (`src/components/hero/Hero.tsx`). It is composed of four independent particle layers built with React Three Fiber and `@react-three/drei` primitives.

## Technologies (verified from context)

| Technology | Evidence |
|------------|----------|
| `@react-three/fiber` | Listed in `package.json` dependencies; imported as `Canvas, useFrame` in `Galaxy.tsx` |
| `@react-three/drei` | Listed in `package.json` dependencies; imported as `Points, PointMaterial` in `Galaxy.tsx` |
| `three` | Listed in `package.json` dependencies; imported as `THREE` in `Galaxy.tsx` |
| Dynamic import with `ssr: false` | Used in `Hero.tsx` via `next/dynamic` to load `Galaxy` |

## Layer Composition

`Galaxy.tsx` defines four internal components, each rendering a `Points` object with `PointMaterial`. All are placed inside a single `<Canvas>` in the default-exported `Galaxy` component.

| Layer Component | Particle Count | Color (dark) | Rotation Behavior (`useFrame`) |
|-----------------|---------------|--------------|-------------------------------|
| `StarField` | 8,000 | `#e8e0ff` | `rotation.y += delta * 0.008`, `rotation.x += delta * 0.003` |
| `SpiralNebula` | 4,000 | `#a78bfa` | `rotation.y += delta * 0.025` |
| `GalacticCore` | 2,000 | `#ddd6fe` | `rotation.y -= delta * 0.04` |
| `BlueStreaks` | 1,500 | `#60a5fa` | `rotation.y += delta * 0.035` |

Each layer:
- Generates positions in a `useMemo` `Float32Array` (stride 3 per point).
- Uses `<Points ref={ref} positions={positions} stride={3} frustumCulled={false}>`.
- Uses `<PointMaterial>` with `transparent`, `sizeAttenuation`, `depthWrite={false}`, and `blending` set to `THREE.AdditiveBlending` (dark) or `THREE.NormalBlending` (light).
- Accepts an `isDark` prop that switches color and blending mode.

The `Galaxy` component accepts `isDark` (default `true`) and renders:
```tsx
<Canvas camera={{ position: [0, 8, 18], fov: 55 }} dpr={[1, 2]} gl={{ antialias: false, alpha: true }}>
  <StarField isDark={isDark} />
  <SpiralNebula isDark={isDark} />
  <GalacticCore isDark={isDark} />
  <BlueStreaks isDark={isDark} />
</Canvas>
```

## Dynamic Loading in Hero

In `src/components/hero/Hero.tsx`:
- `Galaxy` is imported via `dynamic(() => import("@/components/galaxy/Galaxy"), { ssr: false, loading: () => <div className="absolute inset-0 bg-background" /> })`.
- `Hero` reads `theme` from `useTheme()` and passes `isDark={theme === "dark"}` to `<Galaxy isDark={isDark} />`.
- The `Galaxy` is wrapped in a `<div className="absolute inset-0 z-0">` inside the hero `<section>`.

## Theme Coupling

`Galaxy` does not read theme directly; `Hero` computes `isDark` from `useTheme()` (from `src/components/theme`) and passes it down. `Galaxy.tsx` uses `isDark` only to select `color` and `blending` for each `PointMaterial`.