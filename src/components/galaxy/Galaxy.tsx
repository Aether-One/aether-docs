"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

// Camada 1: Estrelas de fundo
function StarField({ isDark }: { isDark: boolean }) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const count = 8000;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = Math.random() * 30 + 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6;
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.008;
      ref.current.rotation.x += delta * 0.003;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={isDark ? "#e8e0ff" : "#1a1a2e"}
        size={0.025}
        sizeAttenuation
        depthWrite={false}
        blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending}
        opacity={isDark ? 0.7 : 0.4}
      />
    </Points>
  );
}

// Camada 2: Nebulosa espiral
function SpiralNebula({ isDark }: { isDark: boolean }) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const count = 4000;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const arm = Math.floor(Math.random() * 3);
      const armOffset = (arm / 3) * Math.PI * 2;
      const distance = Math.pow(Math.random(), 0.6) * 14;
      const angle = distance * 0.8 + armOffset;
      const spread = (Math.random() - 0.5) * (distance * 0.25);

      arr[i * 3] = Math.cos(angle) * distance + spread;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 1.5 * Math.exp(-distance * 0.1);
      arr[i * 3 + 2] = Math.sin(angle) * distance + spread;
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.025;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={isDark ? "#a78bfa" : "#2d1b69"}
        size={0.04}
        sizeAttenuation
        depthWrite={false}
        blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending}
        opacity={isDark ? 0.8 : 0.5}
      />
    </Points>
  );
}

// Camada 3: Core brilhante central
function GalacticCore({ isDark }: { isDark: boolean }) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const count = 2000;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = Math.abs(
        (Math.random() + Math.random() + Math.random()) / 3 - 0.5
      ) * 8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.3;
      arr[i * 3 + 2] = r * Math.cos(phi) * 0.5;
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y -= delta * 0.04;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={isDark ? "#ddd6fe" : "#0f0f23"}
        size={0.05}
        sizeAttenuation
        depthWrite={false}
        blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending}
        opacity={isDark ? 0.9 : 0.6}
      />
    </Points>
  );
}

// Camada 4: Streaks azuis/escuros
function BlueStreaks({ isDark }: { isDark: boolean }) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const count = 1500;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 12;
      const r = Math.pow(Math.random(), 0.4) * 12 + 3;
      const spread = (Math.random() - 0.5) * 2;
      arr[i * 3] = Math.cos(angle) * r + spread;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 0.8;
      arr[i * 3 + 2] = Math.sin(angle) * r + spread;
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.035;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={isDark ? "#60a5fa" : "#1e3a5f"}
        size={0.03}
        sizeAttenuation
        depthWrite={false}
        blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending}
        opacity={isDark ? 0.5 : 0.35}
      />
    </Points>
  );
}

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
  );
}
