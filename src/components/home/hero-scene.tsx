"use client";

import * as React from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* decision: the hero uses @react-three/fiber + three only. drei is installed for
   future use but is not imported here to keep the lazy hero chunk small. */

const POINT_COUNT = 1500;
const PURPLE_77 = "#6E4D94";
const ORANGE = "#FF5E3A";

/** Deterministic PRNG (mulberry32) so the field is identical on every render. */
function seeded(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildPositions(): Float32Array {
  const rand = seeded(51237);
  const arr = new Float32Array(POINT_COUNT * 3);
  // A loose torus with jitter, so it reads as a soft ring/sphere, not a grid.
  const R = 2.4;
  const r = 0.9;
  for (let i = 0; i < POINT_COUNT; i++) {
    const u = rand() * Math.PI * 2;
    const v = rand() * Math.PI * 2;
    const rr = r * (0.55 + rand() * 0.8);
    const x = (R + rr * Math.cos(v)) * Math.cos(u);
    const y = (R + rr * Math.cos(v)) * Math.sin(u) * 0.55;
    const z = rr * Math.sin(v);
    arr[i * 3] = x + (rand() - 0.5) * 0.25;
    arr[i * 3 + 1] = y + (rand() - 0.5) * 0.25;
    arr[i * 3 + 2] = z + (rand() - 0.5) * 0.25;
  }
  return arr;
}

/* Computed once at module load; this module is only ever loaded on the client. */
const POSITIONS = buildPositions();

function PointField({ pointer }: { pointer: React.RefObject<{ x: number; y: number }> }) {
  const group = React.useRef<THREE.Group>(null);
  const positions = POSITIONS;
  const geometry = React.useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return g;
  }, [positions]);
  React.useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame((_, dt) => {
    const g = group.current;
    if (!g) return;
    g.rotation.y += dt * 0.08;
    // Mouse parallax, lerped.
    const p = pointer.current ?? { x: 0, y: 0 };
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, 0.35 + p.y * 0.15, 0.04);
    g.rotation.z = THREE.MathUtils.lerp(g.rotation.z, p.x * 0.1, 0.04);
  });

  return (
    <group ref={group} rotation={[0.35, 0, 0]}>
      <points geometry={geometry}>
        <pointsMaterial
          color={PURPLE_77}
          size={0.035}
          sizeAttenuation
          transparent
          opacity={0.6}
          depthWrite={false}
        />
      </points>
      <Torches />
    </group>
  );
}

/** Three small emissive spheres, a nod to the three torches on the SGA seal. */
function Torches() {
  const group = React.useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    const g = group.current;
    if (!g) return;
    const t = clock.getElapsedTime();
    g.children.forEach((m, i) => {
      const phase = t * 0.35 + (i * Math.PI * 2) / 3;
      m.position.set(
        Math.cos(phase) * 2.4,
        Math.sin(phase * 1.3) * 0.5,
        Math.sin(phase) * 1.2,
      );
      m.scale.setScalar(1 + Math.sin(t * 2 + i) * 0.12);
    });
  });
  return (
    <group ref={group}>
      {[0, 1, 2].map((i) => (
        <mesh key={i}>
          <sphereGeometry args={[0.09, 24, 24]} />
          <meshStandardMaterial
            color={ORANGE}
            emissive={ORANGE}
            emissiveIntensity={1.4}
            roughness={0.4}
            metalness={0}
          />
        </mesh>
      ))}
    </group>
  );
}

function Rig() {
  const { camera } = useThree();
  React.useEffect(() => {
    camera.position.set(0, 0.6, 6.2);
    camera.lookAt(0, 0, 0);
  }, [camera]);
  return null;
}

export default function HeroScene({ paused }: { paused: boolean }) {
  const pointer = React.useRef({ x: 0, y: 0 });

  React.useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      };
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <Canvas
      frameloop={paused ? "never" : "always"}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      camera={{ fov: 42, near: 0.1, far: 50 }}
      className="!pointer-events-none"
      aria-hidden
    >
      <Rig />
      <ambientLight intensity={0.9} />
      <pointLight position={[4, 4, 4]} intensity={6} />
      <PointField pointer={pointer} />
    </Canvas>
  );
}
