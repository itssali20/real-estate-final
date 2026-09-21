"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { gsap, prefersReduced, refreshScroll } from "@/lib/gsap";
import { BRAND } from "@/lib/site";

const WebGLStage = dynamic(() => import("./WebGLStage"), { ssr: false });

/** Storyboard 01 — HERO VISUAL, in the order the brief specifies. */
const SEQUENCE = [
  { src: "/images/hero-01-coastline.webp", label: "California Coastline" },
  { src: "/images/hero-02-beverly-hills.webp", label: "Beverly Hills" },
  { src: "/images/hero-03-bel-air.webp", label: "Bel-Air Aerial" },
  { src: "/images/hero-04-sketch.webp", label: "Architectural Sketch" },
  { src: "/images/hero-05-model.webp", label: "Development Model" },
  { src: "/images/hero-06-construction.webp", label: "Construction" },
  { src: "/images/hero-07-completed.webp", label: "Completed Residence" },
];

const SRCS = SEQUENCE.map((s) => s.src);

export default function Hero() {
  const root = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [chapter, setChapter] = useState(0);

  /* The shader reports progress every animation frame. Pushing that into React
     state would re-render this component ~60x a second, so progress is written
     straight to the DOM instead and only the chapter index — which changes
     seven times a cycle — lives in state. */
  const bars = useRef<(HTMLSpanElement | null)[]>([]);
  const chapterRef = useRef(0);

  const onIndex = useCallback((i: number, p: number) => {
    if (i !== chapterRef.current) {
      chapterRef.current = i;
      setChapter(i);
    }
    for (let b = 0; b < bars.current.length; b++) {
      const el = bars.current[b];
      if (el) el.style.width = b < i ? "100%" : b === i ? `${Math.round(p * 100)}%` : "0%";
    }
  }, []);

  const onReady = useCallback(() => setReady(true), []);

  useLayoutEffect(() => {
    if (prefersReduced()) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });
      tl.to(".hero-line", { y: "0%", duration: 1.4, stagger: 0.08, ease: "expo.out" })
        .to(".hero-rule", { scaleX: 1, duration: 1.3, ease: "expo.out" }, "-=0.95")
        .to(".hero-meta", { opacity: 1, y: 0, duration: 1, stagger: 0.07, ease: "expo.out" }, "-=1.0");

      /* Fade the hero out on scroll. No upward translation — that is what used
         to push the headline up behind the fixed header. */
      gsap.to(".hero-fade", {
        opacity: 0,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "70% top", scrub: true },
      });
    }, root);

    refreshScroll(300);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={root}
      className="relative isolate h-[100svh] min-h-[600px] w-full overflow-hidden bg-ink"
    >
      <Image
        src={SRCS[0]}
        alt="Contemporary hillside residence overlooking Los Angeles"
        fill
        priority
        sizes="100vw"
        className={`object-cover transition-opacity duration-[1200ms] ${ready ? "opacity-0" : "opacity-100"}`}
      />
      <WebGLStage images={SRCS} onReady={onReady} onIndex={onIndex} />

      {/* scrims: top for the header, bottom for the copy */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink/75 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/25 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/15 to-transparent lg:via-transparent" />

      <div className="hero-fade relative z-10 mx-auto flex h-full max-w-[1680px] flex-col px-5 pb-6 pt-[var(--nav-h)] sm:px-8 lg:px-12">
        {/* ── headline block, vertically centred in the space below the nav ── */}
        <div className="flex min-h-0 flex-1 flex-col justify-center py-4">
          <p className="hero-meta translate-y-3 opacity-0 eyebrow eyebrow-light mb-[clamp(0.75rem,1.6vh,1.5rem)]">
            {BRAND.disciplines.join("  ·  ")}
          </p>

          <h1 className="display text-paper text-[clamp(2rem,min(6.6vw,10.2vh),6.2rem)]">
            {["We Develop", "What Should", <span key="x" className="italic text-bronze-light">Exist Next.</span>].map(
              (l, i) => (
                <span key={i} className="block overflow-hidden">
                  <span className="hero-line block translate-y-full">{l}</span>
                </span>
              )
            )}
          </h1>

          <div className="hero-rule my-[clamp(1rem,2.6vh,2.25rem)] h-px w-full origin-left scale-x-0 bg-paper/20" />

          <div className="grid items-end gap-[clamp(1rem,2.4vh,2rem)] lg:grid-cols-[1.05fr_auto]">
            <p className="hero-meta max-w-[56ch] translate-y-3 text-[clamp(0.85rem,min(1.05vw,1.9vh),1.05rem)] font-light leading-[1.65] text-paper/75 opacity-0">
              We develop distinctive luxury condominiums, upscale apartment communities and select estate
              residences in premier, supply-constrained markets. We don&rsquo;t simply acquire existing
              properties — we create value by developing exceptional real estate from the ground up.
            </p>

            <div className="hero-meta flex translate-y-3 flex-wrap gap-2 opacity-0 lg:justify-end">
              {[
                { h: "/strategy", l: "Explore Our Platform" },
                { h: "/portfolio", l: "View Our Experience" },
                { h: "/investors#opportunities", l: "Invest in What's Next", solid: true },
              ].map((b) => (
                <Link
                  key={b.h}
                  href={b.h}
                  data-cursor="hover"
                  className={`group relative overflow-hidden border px-5 py-3 label-caps transition-colors duration-500 ${
                    b.solid ? "border-bronze bg-bronze text-paper" : "border-paper/30 text-paper hover:border-paper/70"
                  }`}
                >
                  <span
                    aria-hidden
                    className={`absolute inset-0 origin-bottom scale-y-0 transition-transform duration-[650ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-y-100 ${
                      b.solid ? "bg-paper" : "bg-paper"
                    }`}
                  />
                  <span className="relative z-10 transition-colors duration-500 group-hover:text-ink">{b.l}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* ── sequence indicator ─────────────────────────────────────────── */}
        <div className="hero-meta shrink-0 translate-y-3 border-t border-paper/15 pt-3 opacity-0">
          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <span className="relative flex h-7 w-4 items-start justify-center rounded-full border border-paper/30 p-[3px]">
                <span className="block h-1.5 w-px animate-bounce bg-paper/70" />
              </span>
              <span className="eyebrow eyebrow-light hidden sm:block">Scroll</span>
            </div>

            <div className="flex min-w-0 flex-1 items-center justify-end gap-2">
              <span className="eyebrow text-bronze-light hidden truncate md:block">
                {SEQUENCE[chapter]?.label}
              </span>
              <div className="flex items-center gap-1.5">
                {SEQUENCE.map((s, i) => (
                  <span key={s.src} className="relative block h-px w-6 bg-paper/25 sm:w-9">
                    <span
                      ref={(el) => { bars.current[i] = el; }}
                      className="absolute inset-y-0 left-0 bg-bronze-light"
                      style={{ width: "0%" }}
                    />
                  </span>
                ))}
              </div>
              <span className="eyebrow eyebrow-light tabular-nums">
                {String(chapter + 1).padStart(2, "0")}/{String(SEQUENCE.length).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
