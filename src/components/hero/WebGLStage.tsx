"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { prefersReduced } from "@/lib/gsap";

const VERT = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;

/**
 * Liquid dissolve between two photographs.
 *
 * The transition is driven by fractal Brownian motion, so the boundary between
 * the outgoing and incoming frame is an organic, turbulent edge rather than a
 * straight wipe. Along that edge the UVs are pushed apart, which reads as the
 * two images physically displacing each other. A terracotta bloom traces the
 * moving front, and the cursor drags a soft lens warp across the whole plane.
 */
const FRAG = /* glsl */ `
precision highp float;
varying vec2 vUv;

uniform sampler2D uFrom;
uniform sampler2D uTo;
uniform vec2  uResFrom;
uniform vec2  uResTo;
uniform vec2  uPlane;
uniform float uProgress;
uniform float uTime;
uniform vec2  uMouse;
uniform float uScroll;
uniform vec3  uAccent;

vec2 cover(vec2 uv, vec2 res, vec2 plane) {
  float rP = plane.x / plane.y;
  float rI = res.x / res.y;
  vec2 s = rP > rI ? vec2(1.0, rI / rP) : vec2(rP / rI, 1.0);
  return (uv - 0.5) * s + 0.5;
}

vec2 hash(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
}

float gnoise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(dot(hash(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)),
                 dot(hash(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
             mix(dot(hash(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
                 dot(hash(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++) { v += a * gnoise(p); p *= 2.02; a *= 0.5; }
  return v;
}

float rand(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }

void main() {
  float aspect = uPlane.x / uPlane.y;
  vec2 auv = vec2(vUv.x * aspect, vUv.y);

  // --- turbulent dissolve front -------------------------------------------
  vec2 np = auv * 2.1 + uTime * 0.03;
  float n = fbm(np);
  float sweep = vUv.x * 0.62 + vUv.y * 0.38;
  float field = sweep + n * 0.30;
  float w = 0.34;
  float p = uProgress * (1.0 + w * 2.0) - w;
  // Reversed edges: mask is 0 (outgoing frame) at progress 0, 1 (incoming) at 1.
  float mask = smoothstep(p + w, p, field);

  // edge intensity: 1 at the moving boundary, 0 away from it
  float edge = smoothstep(0.0, 0.5, mask) * smoothstep(1.0, 0.5, mask);

  // --- cursor lens ---------------------------------------------------------
  vec2 mp = uMouse * 0.5 + 0.5;
  float md = distance(vec2(auv.x / aspect, auv.y), mp);
  float lens = exp(-md * md * 9.0);
  vec2 lensPush = normalize(vec2(vUv.x, vUv.y) - mp + 1e-5) * lens * 0.028;

  // --- displacement --------------------------------------------------------
  // True central-difference gradient of the noise field. Sampling the *value*
  // at two offsets (rather than the position) produced vertical streaking.
  float e = 0.02;
  vec2 grad = vec2(
    fbm(np + vec2(e, 0.0)) - fbm(np - vec2(e, 0.0)),
    fbm(np + vec2(0.0, e)) - fbm(np - vec2(0.0, e))
  ) / (2.0 * e);
  vec2 disp = clamp(grad, -1.0, 1.0) * edge * 0.055;

  float z = 1.0 - uScroll * 0.09;
  vec2 drift = vec2(uMouse.x * 0.012, uMouse.y * -0.012 + uScroll * 0.06);

  vec2 base = (vUv - 0.5) * z + 0.5 + drift + lensPush;
  vec2 uvF = cover(base + disp, uResFrom, uPlane);
  vec2 uvT = cover(base - disp, uResTo, uPlane);

  // slight chromatic split along the front, so the edge reads as energy
  vec3 a = vec3(
    texture2D(uFrom, uvF + vec2(0.0014, 0.0) * edge).r,
    texture2D(uFrom, uvF).g,
    texture2D(uFrom, uvF - vec2(0.0014, 0.0) * edge).b
  );
  vec3 b = vec3(
    texture2D(uTo, uvT + vec2(0.0014, 0.0) * edge).r,
    texture2D(uTo, uvT).g,
    texture2D(uTo, uvT - vec2(0.0014, 0.0) * edge).b
  );

  vec3 col = mix(a, b, mask);

  // terracotta bloom tracing the dissolve front
  col += uAccent * edge * 0.22;
  // cursor lift, so the WebGL layer is legible as interactive
  col += uAccent * lens * 0.05;

  // cinematic grade
  float d = distance(vUv, vec2(0.5));
  col *= smoothstep(1.05, 0.25, d) * 0.20 + 0.88;
  col += (rand(vUv * 900.0 + fract(uTime)) - 0.5) * 0.030;

  gl_FragColor = vec4(col, 1.0);
}`;

export type StageHandle = { progress: number; index: number };

export default function WebGLStage({
  images,
  onReady,
  onIndex,
  holdSeconds = 4.6,
}: {
  images: string[];
  onReady?: () => void;
  onIndex?: (i: number, progress: number) => void;
  holdSeconds?: number;
}) {
  const host = useRef<HTMLDivElement>(null);

  /* Callbacks live in refs. If they sat in the effect's dependency array, a new
     inline function from the parent would tear down and rebuild the whole
     renderer — which is exactly what caused the hero to flicker black. */
  const onIndexRef = useRef(onIndex);
  const onReadyRef = useRef(onReady);
  const holdRef = useRef(holdSeconds);
  onIndexRef.current = onIndex;
  onReadyRef.current = onReady;
  holdRef.current = holdSeconds;

  /* A stable primitive key: the effect re-runs only if the image list changes. */
  const key = images.join("|");

  useEffect(() => {
    const el = host.current;
    const list = key.split("|");
    if (!el || prefersReduced() || list.length < 2) return;

    /* `?capture=1` keeps the drawing buffer so headless screenshots can read the
       canvas. It costs a little performance, so it is opt-in and off in normal use. */
    const capture = typeof location !== "undefined" && new URLSearchParams(location.search).has("capture");

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: false,
        alpha: false,
        powerPreference: "high-performance",
        preserveDrawingBuffer: capture,
      });
    } catch {
      return;
    }

    let disposed = false;
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5, 0, 1);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setSize(el.clientWidth, el.clientHeight);
    el.appendChild(renderer.domElement);
    Object.assign(renderer.domElement.style, { width: "100%", height: "100%", display: "block" });

    const uniforms = {
      uFrom: { value: null as THREE.Texture | null },
      uTo: { value: null as THREE.Texture | null },
      uResFrom: { value: new THREE.Vector2(1, 1) },
      uResTo: { value: new THREE.Vector2(1, 1) },
      uPlane: { value: new THREE.Vector2(el.clientWidth, el.clientHeight) },
      uProgress: { value: 0 },
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uScroll: { value: 0 },
      uAccent: { value: new THREE.Color("#C0674A") },
    };

    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(1, 1),
      new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG, uniforms })
    );
    scene.add(mesh);

    const loader = new THREE.TextureLoader();
    const textures: THREE.Texture[] = [];
    let idx = 0;
    let raf = 0;
    const clock = new THREE.Clock();
    const mouse = new THREE.Vector2(0, 0);
    const mouseTarget = new THREE.Vector2(0, 0);

    const load = (src: string) =>
      new Promise<THREE.Texture>((res, rej) =>
        loader.load(
          src,
          (t) => {
            t.colorSpace = THREE.SRGBColorSpace;
            t.minFilter = THREE.LinearFilter;
            t.generateMipmaps = false;
            res(t);
          },
          undefined,
          rej
        )
      );

    const setRes = (key: "uResFrom" | "uResTo", t: THREE.Texture) => {
      const i = t.image as HTMLImageElement;
      uniforms[key].value.set(i.naturalWidth || 1, i.naturalHeight || 1);
    };

    /* Everything below is driven by elapsed time, never by frame count, so the
       sequence runs at the same speed on a 60Hz panel, a 120Hz panel and a
       throttled background tab. */
    const TRANSITION = 1.8; // seconds for one dissolve
    const ease = (t: number) => t * t * t * (t * (t * 6 - 15) + 10); // smootherstep

    let raw = 0;        // linear 0..1 through the current dissolve
    let progress = 0;   // eased value handed to the shader
    let hold = 0;       // seconds spent on the current frame
    let transitioning = false;
    let running = false;

    /** Frame-rate independent exponential smoothing. */
    const approach = (current: number, goal: number, rate: number, dt: number) =>
      current + (goal - current) * (1 - Math.exp(-rate * dt));

    const tick = () => {
      if (disposed) return;
      raf = requestAnimationFrame(tick);
      const dt = Math.min(clock.getDelta(), 0.05);
      uniforms.uTime.value += dt;

      mouse.x = approach(mouse.x, mouseTarget.x, 4, dt);
      mouse.y = approach(mouse.y, mouseTarget.y, 4, dt);
      uniforms.uMouse.value.copy(mouse);

      const sc = Math.min(window.scrollY / (window.innerHeight || 1), 1.6);
      uniforms.uScroll.value = approach(uniforms.uScroll.value, sc, 5, dt);

      if (textures.length > 1) {
        if (!transitioning) {
          hold += dt;
          onIndexRef.current?.(idx, Math.min(1, hold / holdRef.current));
          if (hold >= holdRef.current) { transitioning = true; raw = 0; }
        } else {
          raw = Math.min(1, raw + dt / TRANSITION);
          progress = ease(raw);
          uniforms.uProgress.value = progress;
          onIndexRef.current?.(idx, progress);

          if (raw >= 1) {
            idx = (idx + 1) % textures.length;
            const next = textures[(idx + 1) % textures.length];
            uniforms.uFrom.value = textures[idx];
            setRes("uResFrom", textures[idx]);
            uniforms.uTo.value = next;
            setRes("uResTo", next);
            raw = 0;
            progress = 0;
            hold = 0;
            transitioning = false;
            uniforms.uProgress.value = 0;
            onIndexRef.current?.(idx, 0);
          }
        }
      }
      renderer.render(scene, camera);
    };

    (async () => {
      try {
        const first = await load(list[0]);
        if (disposed) return;
        textures.push(first);
        uniforms.uFrom.value = first;
        setRes("uResFrom", first);
        uniforms.uTo.value = first;
        setRes("uResTo", first);
        onReadyRef.current?.();
        running = true;
        tick();
        for (let i = 1; i < list.length; i++) {
          const t = await load(list[i]).catch(() => null);
          if (disposed) return;
          if (t) {
            textures.push(t);
            if (textures.length === 2) {
              uniforms.uTo.value = t;
              setRes("uResTo", t);
            }
          }
        }
      } catch {
        /* the static fallback stays visible */
      }
    })();

    const onResize = () => {
      renderer.setSize(el.clientWidth, el.clientHeight);
      uniforms.uPlane.value.set(el.clientWidth, el.clientHeight);
    };
    const onMouse = (e: MouseEvent) => {
      mouseTarget.set((e.clientX / window.innerWidth - 0.5) * 2, -(e.clientY / window.innerHeight - 0.5) * 2);
    };
    const onVis = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
        running = false;
      } else if (!running && textures.length) {
        // Never stack a second rAF loop on top of a live one.
        running = true;
        clock.getDelta();
        tick();
      }
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouse, { passive: true });
    document.addEventListener("visibilitychange", onVis);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouse);
      document.removeEventListener("visibilitychange", onVis);
      textures.forEach((t) => t.dispose());
      mesh.geometry.dispose();
      (mesh.material as THREE.Material).dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === el) el.removeChild(renderer.domElement);
    };
  }, [key]);

  return <div ref={host} className="absolute inset-0" aria-hidden />;
}
