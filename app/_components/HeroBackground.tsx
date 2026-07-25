"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* ---- Glowing particle field with subtle mouse parallax ---- */
function ParticleField({ count = 900 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const { viewport } = useThree();

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // distribute in a wide, shallow slab
      arr[i * 3] = (Math.random() - 0.5) * 22;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return arr;
  }, [count]);

  // soft circular sprite for a glow dot
  const sprite = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 64;
    const ctx = c.getContext("2d")!;
    const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, "rgba(147,197,253,1)");
    g.addColorStop(0.4, "rgba(96,165,250,0.55)");
    g.addColorStop(1, "rgba(37,99,235,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 64, 64);
    const tex = new THREE.CanvasTexture(c);
    return tex;
  }, []);

  useFrame((state, delta) => {
    const p = pointsRef.current;
    if (!p) return;
    p.rotation.y += delta * 0.035;
    p.rotation.x += delta * 0.012;
    // gentle parallax toward the pointer
    const mx = (state.pointer.x * viewport.width) / 26;
    const my = (state.pointer.y * viewport.height) / 26;
    p.position.x += (mx - p.position.x) * 0.04;
    p.position.y += (my - p.position.y) * 0.04;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.14}
        map={sprite}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.9}
      />
    </points>
  );
}

/* ---- Slowly rotating wireframe solids for depth ---- */
function FloatingSolid({
  position,
  scale,
  speed,
  geometry,
}: {
  position: [number, number, number];
  scale: number;
  speed: number;
  geometry: "ico" | "octa" | "torus";
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    const m = ref.current;
    if (!m) return;
    m.rotation.x += delta * speed;
    m.rotation.y += delta * speed * 0.7;
  });

  return (
    <mesh ref={ref} position={position} scale={scale}>
      {geometry === "ico" && <icosahedronGeometry args={[1, 0]} />}
      {geometry === "octa" && <octahedronGeometry args={[1, 0]} />}
      {geometry === "torus" && <torusGeometry args={[1, 0.34, 12, 32]} />}
      <meshBasicMaterial
        color="#3b82f6"
        wireframe
        transparent
        opacity={0.22}
      />
    </mesh>
  );
}

function Scene() {
  // Position the solids as fractions of the current viewport so they stay
  // on screen on narrow/tall aspect ratios instead of falling outside the frustum.
  const { viewport } = useThree();
  const hw = viewport.width / 2;
  const hh = viewport.height / 2;

  return (
    <>
      <ParticleField />
      <FloatingSolid position={[-hw * 0.85, hh * 0.5, -2]} scale={1.5} speed={0.25} geometry="ico" />
      <FloatingSolid position={[hw * 0.9, -hh * 0.45, -1]} scale={1.1} speed={0.3} geometry="octa" />
      <FloatingSolid position={[hw * 0.65, hh * 0.6, -3]} scale={0.9} speed={0.2} geometry="torus" />
    </>
  );
}

export default function HeroBackground() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Respect reduced motion + skip on very small screens for perf
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce) setEnabled(true);
  }, []);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none absolute inset-0 bg-radial-fade">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 60 }}
        dpr={[1, 1.6]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
