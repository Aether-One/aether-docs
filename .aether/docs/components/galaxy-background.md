# 3D Galaxy Background Implementation

## Overview

The Hero section uses a React Three Fiber particle system to render an animated galaxy background. The implementation lives in `src/components/galaxy/Galaxy.tsx` and is dynamically imported into the Hero section with SSR disabled.

## Architecture

```
src/components/hero/Hero.tsx
    └── dynamic import (ssr: false)
        └── src/components/galaxy/Galaxy.tsx
            ├── StarField (8000 points)
            ├── SpiralNebula (4000 points)
            ├── GalacticCore (2000 points)
            └── BlueStreaks (1500 points)
```

## Component Structure

### Galaxy.tsx — Main Component

**File:** `src/components/galaxy/Galaxy.tsx`

```tsx
export default function Galaxy({ isDark = true }: { isDark?: boolean }) {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 8, 18], fov: 55 }}
        dpr={[1, 2]}
        gl={{ antialias: false, alpha: true }}
      >
        <StarField isDark={isDark} />
        <SpiralNebula isDark={isDark} />
        <GalacticCore isDark={isDark} />
        <BlueStreaks isDark={isDark} />
      </Canvas>
    </div>
  )
}
```

**Canvas Configuration:**
| Property | Value |
|----------|-------|
| `camera.position` | `[0, 8, 18]` |
| `camera.fov` | `55` |
| `dpr` | `[1, 2]` |
| `gl.antialias` | `false` |
| `gl.alpha` | `true` |

**Dependencies:**
- `@react-three/fiber` — `Canvas`, `useFrame`
- `@react-three/drei` — `Points`, `PointMaterial`
- `three` — `THREE`

---

## Particle Systems

Each particle system is a separate component using `THREE.Points` with `THREE.BufferGeometry` and `THREE.PointsMaterial`. All use `useFrame` for continuous rotation animation.

### Common Pattern

```tsx
const positions = useMemo(() => {
  const arr = new Float32Array(count * 3)
  // ... populate positions ...
  return arr
}, [])

const pointsRef = useRef<THREE.Points>(null)

useFrame((_, delta) => {
  if (pointsRef.current) {
    pointsRef.current.rotation.y += speed * delta
    // optional additional rotation axes
  }
})

return (
  <Points ref={pointsRef}>
    <bufferGeometry attach="geometry">
      <bufferAttribute attach="attributes-position" args={[positions, 3]} />
    </bufferGeometry>
    <PointMaterial
      attach="material"
      color={color}
      size={size}
      opacity={opacity}
      blending={blending}
      transparent={true}
      depthWrite={false}
      sizeAttenuation={true}
    />
  </Points>
)
```

---

### 1. StarField — 8,000 Points

**Distribution:** Spherical shell, radius 5–35  
**Rotation:** Y += 0.008 × delta, X += 0.003 × delta

| Property | Dark Theme | Light Theme |
|----------|------------|-------------|
| Color | `#e8e0ff` | `#1a1a2e` |
| Size | `0.025` | `0.025` |
| Opacity | `0.7` | `0.4` |
| Blending | `AdditiveBlending` | `NormalBlending` |

**Position Generation:**
```ts
for (let i = 0; i < count; i++) {
  const radius = 5 + Math.random() * 30
  const theta = Math.random() * Math.PI * 2
  const phi = Math.acos(2 * Math.random() - 1)
  arr[i * 3]     = radius * Math.sin(phi) * Math.cos(theta)
  arr[i * 3 + 1] = radius * Math.cos(phi)
  arr[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta)
}
```

---

### 2. SpiralNebula — 4,000 Points

**Distribution:** 3 spiral arms, distance 0–14  
**Rotation:** Y += 0.025 × delta

| Property | Dark Theme | Light Theme |
|----------|------------|-------------|
| Color | `#a78bfa` | `#2d1b69` |
| Size | `0.04` | `0.04` |
| Opacity | `0.8` | `0.5` |
| Blending | `AdditiveBlending` | `AdditiveBlending` |

**Position Generation:**
```ts
for (let i = 0; i < count; i++) {
  const arm = i % 3
  const t = (i / count) * 12 * Math.PI + arm * (2 * Math.PI / 3)
  const distance = (i / count) * 14
  const noise = (Math.random() - 0.5) * 0.8
  arr[i * 3]     = Math.cos(t) * distance + noise
  arr[i * 3 + 1] = (Math.random() - 0.5) * 1.5
  arr[i * 3 + 2] = Math.sin(t) * distance + noise
}
```

---

### 3. GalacticCore — 2,000 Points

**Distribution:** Concentrated core, radius 0–8  
**Rotation:** Y -= 0.04 × delta (reverse direction)

| Property | Dark Theme | Light Theme |
|----------|------------|-------------|
| Color | `#ddd6fe` | `#0f0f23` |
| Size | `0.05` | `0.05` |
| Opacity | `0.9` | `0.6` |
| Blending | `AdditiveBlending` | `AdditiveBlending` |

**Position Generation:**
```ts
for (let i = 0; i < count; i++) {
  const radius = Math.pow(Math.random(), 3) * 8
  const theta = Math.random() * Math.PI * 2
  const phi = Math.acos(2 * Math.random() - 1)
  arr[i * 3]     = radius * Math.sin(phi) * Math.cos(theta)
  arr[i * 3 + 1] = radius * Math.cos(phi)
  arr[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta)
}
```

---

### 4. BlueStreaks — 1,500 Points

**Distribution:** 12π spiral streaks, radius 3–15  
**Rotation:** Y += 0.035 × delta

| Property | Dark Theme | Light Theme |
|----------|------------|-------------|
| Color | `#60a5fa` | `#1e3a5f` |
| Size | `0.03` | `0.03` |
| Opacity | `0.5` | `0.35` |
| Blending | `AdditiveBlending` | `AdditiveBlending` |

**Position Generation:**
```ts
for (let i = 0; i < count; i++) {
  const t = (i / count) * 12 * Math.PI
  const radius = 3 + (i / count) * 12
  const noise = (Math.random() - 0.5) * 0.3
  arr[i * 3]     = Math.cos(t) * radius + noise
  arr[i * 3 + 1] = (Math.random() - 0.5) * 0.5
  arr[i * 3 + 2] = Math.sin(t) * radius + noise
}
```

---

## Hero Integration

**File:** `src/components/hero/Hero.tsx`

```tsx
const Galaxy = dynamic(() => import('@/components/galaxy/Galaxy'), { ssr: false })

// Inside component:
const { theme } = useTheme()
const isDark = theme === 'dark'

return (
  <section ref={containerRef} className="relative min-h-[110vh] bg-background">
    <Galaxy isDark={isDark} />
    {/* depth overlays, content, etc. */}
  </section>
)
```

**Key Integration Details:**
- Dynamic import with `ssr: false` — avoids SSR errors from Three.js
- Theme-aware: reads `theme` from `useTheme()` hook, passes `isDark` to `Galaxy`
- Rendered as absolute-positioned background (`absolute inset-0 z-0`) behind content
- Canvas `alpha: true` allows CSS background gradients to show through

---

## Theme Adaptation

All four particle systems receive `isDark` prop and select colors/blending/opacity per theme:

| System | Dark Color | Light Color | Dark Blending | Light Blending |
|--------|------------|-------------|---------------|----------------|
| StarField | `#e8e0ff` | `#1a1a2e` | Additive | Normal |
| SpiralNebula | `#a78bfa` | `#2d1b69` | Additive | Additive |
| GalacticCore | `#ddd6fe` | `#0f0f23` | Additive | Additive |
| BlueStreaks | `#60a5fa` | `#1e3a5f` | Additive | Additive |

Opacity and size remain constant across themes; only color and blending mode change.

---

## Performance Characteristics

| Metric | Value |
|--------|-------|
| Total Points | 15,500 |
| Draw Calls | 4 (one per Points mesh) |
| Geometry | Static `BufferGeometry` (created once via `useMemo`) |
| Animation | GPU-side rotation via `useFrame` (minimal JS overhead) |
| DPR | Clamped to `[1, 2]` |
| Antialiasing | Disabled (`antialias: false`) |
| Depth Write | Disabled (`depthWrite: false`) for all particles |

---

## Dependencies

| Package | Version Constraint | Usage |
|---------|-------------------|-------|
| `@react-three/fiber` | ^8.x | `Canvas`, `useFrame` |
| `@react-three/drei` | ^9.x | `Points`, `PointMaterial` |
| `three` | ^0.160.x | `THREE` namespace, `AdditiveBlending`, `NormalBlending` |

All three are declared in `package.json` (not shown in context but required for the imports to resolve).