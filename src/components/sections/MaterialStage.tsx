"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { prefersReduced } from "@/lib/gsap";
import { Container } from "./Primitives";

/**
 * Storyboard 15 — PREMIUM MATERIALS. "Quality you can see. Quality you can feel."
 *
 * A real-time Three.js scene: a beveled material slab lit by three studio
 * lights, rendered with a physically-based material whose roughness, metalness
 * and clearcoat change per sample. Drag or move the pointer to orbit it. This
 * is genuine WebGL geometry and lighting — not a video or an image sequence.
 */
const SAMPLES = [
  { name: "Book-Matched Marble", map: "/images/mat-counter.webp", roughness: 0.10, metalness: 0.0, clearcoat: 1.0, note: "Natural stone · honed & polished" },
  { name: "Rift-Sawn White Oak", map: "/images/tex-grain.webp", roughness: 0.66, metalness: 0.0, clearcoat: 0.2, note: "Premium wood · matte hardwax oil" },
  { name: "Architectural Bronze", map: "/images/det-lever.webp", roughness: 0.30, metalness: 0.95, clearcoat: 0.5, note: "Architectural metal · brushed" },
  { name: "Herringbone Stone & Tile", map: "/images/tex-herring.webp", roughness: 0.24, metalness: 0.04, clearcoat: 0.75, note: "Large format · patterned" },
];

export default function MaterialStage() {
  const host = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [live, setLive] = useState(false);
  const apply = useRef<((i: number) => void) | null>(null);

  useEffect(() => {
    const el = host.current;
    if (!el || prefersReduced()) return;

    const capture = typeof location !== "undefined" && new URLSearchParams(location.search).has("capture");

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        preserveDrawingBuffer: capture,
      });
    } catch {
      return;
    }

    let disposed = false;
    const w = () => el.clientWidth;
    const h = () => el.clientHeight;

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w(), h());
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    el.appendChild(renderer.domElement);
    Object.assign(renderer.domElement.style, { width: "100%", height: "100%", display: "block" });

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, w() / h(), 0.1, 100);
    camera.position.set(0, 0, 10.4);

    // ── beveled slab ────────────────────────────────────────────────────────
    const slab = new THREE.Group();
    scene.add(slab);

    const material = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0.3,
      metalness: 0,
      clearcoat: 0.6,
      clearcoatRoughness: 0.25,
      reflectivity: 0.5,
    });

    const geo = new THREE.BoxGeometry(3.0, 4.1, 0.34, 1, 1, 1);
    const mesh = new THREE.Mesh(geo, material);
    slab.add(mesh);

    // thin terracotta edge reveal behind the slab
    const edge = new THREE.Mesh(
      new THREE.BoxGeometry(3.22, 4.32, 0.02),
      new THREE.MeshBasicMaterial({ color: 0xc0674a, transparent: true, opacity: 0.5 })
    );
    edge.position.z = -0.22;
    slab.add(edge);

    // soft contact shadow — a radial-gradient sprite, so it has no hard edge
    const shadowCanvas = document.createElement("canvas");
    shadowCanvas.width = shadowCanvas.height = 256;
    const sctx = shadowCanvas.getContext("2d")!;
    const grd = sctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    grd.addColorStop(0, "rgba(0,0,0,0.55)");
    grd.addColorStop(0.45, "rgba(0,0,0,0.22)");
    grd.addColorStop(1, "rgba(0,0,0,0)");
    sctx.fillStyle = grd;
    sctx.fillRect(0, 0, 256, 256);
    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadow = new THREE.Mesh(
      new THREE.PlaneGeometry(6.2, 2.4),
      new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false })
    );
    shadow.position.set(0, -2.85, -0.9);
    shadow.rotation.x = -0.4;
    scene.add(shadow);

    // ── studio lighting ─────────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0xffffff, 0.55));
    const key = new THREE.DirectionalLight(0xffffff, 2.6);
    key.position.set(4, 5, 6);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0xc8d4e0, 1.1);
    fill.position.set(-6, 1, 3);
    scene.add(fill);
    const rim = new THREE.PointLight(0xc0674a, 24, 22);
    rim.position.set(-2.5, -2.5, -3.5);
    scene.add(rim);

    // ── textures ────────────────────────────────────────────────────────────
    const loader = new THREE.TextureLoader();
    const cache = new Map<string, THREE.Texture>();

    const setSample = (i: number) => {
      const s = SAMPLES[i];
      material.roughness = s.roughness;
      material.metalness = s.metalness;
      material.clearcoat = s.clearcoat;
      const cached = cache.get(s.map);
      if (cached) {
        material.map = cached;
        material.needsUpdate = true;
        return;
      }
      loader.load(s.map, (t) => {
        if (disposed) return;
        t.colorSpace = THREE.SRGBColorSpace;
        t.wrapS = t.wrapT = THREE.RepeatWrapping;
        cache.set(s.map, t);
        material.map = t;
        material.needsUpdate = true;
      });
    };
    apply.current = setSample;
    setSample(0);

    // ── interaction ─────────────────────────────────────────────────────────
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };

    const onPointer = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width - 0.5;
      const ny = (e.clientY - r.top) / r.height - 0.5;
      target.x = ny * 0.7;
      target.y = nx * 1.3;
    };
    const onLeave = () => { target.x = 0; target.y = 0; };

    el.addEventListener("pointermove", onPointer);
    el.addEventListener("pointerleave", onLeave);

    let raf = 0;
    const clock = new THREE.Clock();
    let visible = true;

    const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }, { threshold: 0.05 });
    io.observe(el);

    const tick = () => {
      if (disposed) return;
      raf = requestAnimationFrame(tick);
      if (!visible) return;
      const t = clock.getElapsedTime();
      current.x += (target.x - current.x) * 0.06;
      current.y += (target.y - current.y) * 0.06;
      slab.rotation.x = current.x + Math.sin(t * 0.38) * 0.09;
      slab.rotation.y = current.y + Math.sin(t * 0.27) * 0.42 - 0.12;
      slab.position.y = Math.sin(t * 0.5) * 0.1;
      shadow.scale.x = 1 + Math.sin(t * 0.27) * 0.06;
      rim.intensity = 18 + Math.sin(t * 0.9) * 6;
      renderer.render(scene, camera);
    };
    setLive(true);
    tick();

    const onResize = () => {
      renderer.setSize(w(), h());
      camera.aspect = w() / h();
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", onResize);
      el.removeEventListener("pointermove", onPointer);
      el.removeEventListener("pointerleave", onLeave);
      cache.forEach((t) => t.dispose());
      geo.dispose();
      material.dispose();
      edge.geometry.dispose();
      (edge.material as THREE.Material).dispose();
      shadow.geometry.dispose();
      (shadow.material as THREE.Material).dispose();
      shadowTex.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === el) el.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <section className="relative overflow-hidden bg-ink py-20 text-paper lg:py-28">
      <div className="grain pointer-events-none absolute inset-0" />
      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <div className="flex items-center gap-4">
              <span className="eyebrow eyebrow-light tabular-nums">15</span>
              <span className="h-px w-10 bg-bronze" />
              <span className="eyebrow eyebrow-light">Premium Materials</span>
            </div>

            <h2 data-split className="display mt-6 text-[clamp(1.8rem,4.2vw,3.3rem)]">
              <span className="block overflow-hidden"><span className="split-line-inner block">Quality you can see.</span></span>
              <span className="block overflow-hidden"><span className="split-line-inner block italic text-bronze-light">Quality you can feel.</span></span>
            </h2>

            <p className="body-lg measure mt-7 text-paper/65" data-anim="fade-up">
              Depending upon the development, our specifications may include natural stone, premium wood flooring,
              large-format porcelain and tile, custom cabinetry, premium windows and glazing, architectural metals,
              designer lighting and building-envelope systems.
            </p>

            <div className="mt-9 space-y-px border-t border-paper/12" data-stagger>
              {SAMPLES.map((s, i) => (
                <button
                  key={s.name}
                  onMouseEnter={() => { setActive(i); apply.current?.(i); }}
                  onFocus={() => { setActive(i); apply.current?.(i); }}
                  onClick={() => { setActive(i); apply.current?.(i); }}
                  data-cursor="hover"
                  data-anim="fade-up"
                  className={`flex w-full items-baseline justify-between gap-6 border-b border-paper/12 py-4 text-left transition-colors duration-500 ${
                    active === i ? "text-bronze-light" : "text-paper/60 hover:text-paper"
                  }`}
                >
                  <span className="flex items-baseline gap-4">
                    <span className="eyebrow eyebrow-light tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                    <span className="display-caps text-[0.88rem]">{s.name}</span>
                  </span>
                  <span className="eyebrow eyebrow-light hidden shrink-0 sm:block">{s.note}</span>
                </button>
              ))}
            </div>

            <p className="mt-6 text-[0.72rem] uppercase tracking-[0.2em] text-paper/30">
              {live ? "Live WebGL · drag to inspect" : "Rendering…"}
            </p>
          </div>

          <div className="relative">
            <div
              ref={host}
              className="relative aspect-[4/5] w-full cursor-grab active:cursor-grabbing"
              aria-label="Interactive 3D material sample"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between">
              <span className="eyebrow eyebrow-light">{SAMPLES[active].name}</span>
              <span className="eyebrow text-bronze-light">
                R {SAMPLES[active].roughness.toFixed(2)} · M {SAMPLES[active].metalness.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
