"use client";

import * as React from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Halftone photo: the group picture rendered as an ink dot screen that fades
 * into the page background, with a slow parallax drift. One restrained visual,
 * the way Marengo treats its hero image.
 */
const vertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragment = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D uTex;
  uniform vec2 uRes;        // canvas size in px
  uniform float uImgAspect; // image width / height
  uniform vec2 uOffset;     // parallax offset in uv
  uniform vec3 uInk;
  uniform float uCell;      // dot cell size in px

  float luma(vec3 c) { return dot(c, vec3(0.299, 0.587, 0.114)); }

  void main() {
    // object-fit: cover
    float canvasAspect = uRes.x / uRes.y;
    vec2 uv = vUv;
    if (canvasAspect > uImgAspect) {
      float s = uImgAspect / canvasAspect;
      uv.y = (uv.y - 0.5) * s + 0.5;
    } else {
      float s = canvasAspect / uImgAspect;
      uv.x = (uv.x - 0.5) * s + 0.5;
    }
    uv = (uv - 0.5) * 0.94 + 0.5 + uOffset;

    // Dot screen in pixel space
    vec2 px = vUv * uRes;
    vec2 cell = floor(px / uCell);
    vec2 center = (cell + 0.5) * uCell;
    vec2 cuv = center / uRes;
    // map center back through the same cover transform
    vec2 suv = cuv;
    if (canvasAspect > uImgAspect) { suv.y = (suv.y - 0.5) * (uImgAspect / canvasAspect) + 0.5; }
    else { suv.x = (suv.x - 0.5) * (canvasAspect / uImgAspect) + 0.5; }
    suv = (suv - 0.5) * 0.94 + 0.5 + uOffset;

    vec3 c = texture2D(uTex, suv).rgb;
    float l = luma(c);
    float dark = 1.0 - l;
    dark = smoothstep(0.18, 1.15, dark);
    float radius = dark * uCell * 0.5;
    float d = distance(px, center);
    float dot = 1.0 - smoothstep(radius - 0.9, radius + 0.9, d);

    // Fade the screen into the page: strong on the right, gone on the left and bottom.
    float fx = smoothstep(0.12, 0.72, vUv.x);
    float fy = smoothstep(0.0, 0.45, vUv.y);
    float ft = 1.0 - smoothstep(0.88, 1.0, vUv.y);
    float mask = fx * fy * ft;

    float a = dot * mask * 0.62;
    gl_FragColor = vec4(uInk, a);
  }
`;

function Halftone({
  pointer,
  src,
}: {
  pointer: React.RefObject<{ x: number; y: number }>;
  src: string;
}) {
  const tex = useLoader(THREE.TextureLoader, src);
  const mat = React.useRef<THREE.ShaderMaterial>(null);
  const { size, viewport } = useThree();
  const dpr = viewport.dpr;
  const uniforms = React.useMemo(
    () => ({
      uTex: { value: tex },
      uRes: { value: new THREE.Vector2(1, 1) },
      uImgAspect: { value: tex.image ? tex.image.width / tex.image.height : 16 / 9 },
      uOffset: { value: new THREE.Vector2(0, 0) },
      uInk: { value: new THREE.Color("#241a30") },
      uCell: { value: 7 },
    }),
    [tex],
  );
  const target = React.useRef(new THREE.Vector2());

  React.useEffect(() => {
    // three.js textures are configured by mutation after loading; this is the documented API.
    // eslint-disable-next-line react-hooks/immutability
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.minFilter = THREE.LinearFilter;
    tex.needsUpdate = true;
  }, [tex]);

  useFrame(() => {
    const m = mat.current;
    if (!m) return;
    (m.uniforms.uRes.value as THREE.Vector2).set(size.width * dpr, size.height * dpr);
    m.uniforms.uCell.value = Math.max(6, Math.round(7.5 * dpr));
    const p = pointer.current ?? { x: 0.5, y: 0.5 };
    target.current.set((p.x - 0.5) * 0.012, (0.5 - p.y) * 0.012);
    (m.uniforms.uOffset.value as THREE.Vector2).lerp(target.current, 0.04);
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={mat}
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

export default function HeroShader({ paused, src }: { paused: boolean; src: string }) {
  const pointer = React.useRef({ x: 0.5, y: 0.5 });
  React.useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <Canvas
      frameloop={paused ? "never" : "always"}
      dpr={[1, 2]}
      gl={{
        antialias: false,
        alpha: true,
        premultipliedAlpha: false,
        powerPreference: "high-performance",
      }}
      orthographic
      camera={{ position: [0, 0, 1], zoom: 1 }}
      className="!pointer-events-none"
      aria-hidden
    >
      <React.Suspense fallback={null}>
        <Halftone pointer={pointer} src={src} />
      </React.Suspense>
    </Canvas>
  );
}
