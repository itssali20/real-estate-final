"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { gsap, prefersReduced, refreshScroll } from "@/lib/gsap";
import { BRAND } from "@/lib/site";

const WebGLStage = dynamic(() => import("./WebGLStage"), { ssr: false });

/** Storyboard 01 — HERO VISUAL. `focus` is the horizontal focal point kept in frame on narrow screens. */
const SEQUENCE = [
  { src: "/images/hero-coastal-resort.webp", label: "Coastal Residences", focus: 0.7 },
  { src: "/images/hero-02-beverly-hills.webp", label: "Beverly Hills" },
  { src: "/images/hero-03-bel-air.webp", label: "Bel-Air Aerial" },
  { src: "/images/hero-04-sketch.webp", label: "Architectural Sketch" },
  { src: "/images/hero-05-model.webp", label: "Development Model" },
  { src: "/images/hero-06-construction.webp", label: "Construction" },
  { src: "/images/hero-07-completed.webp", label: "Completed Residence" },
];

const SRCS = SEQUENCE.map((s) => s.src);
const FOCUS = SEQUENCE.map((s) => s.focus ?? 0.5);

const PILLARS = [
  { t: "Acquire", d: "Strategic Opportunities", icon: "M4 21V9l6-3v15M10 21V4l10 4v13M3 21h18M13 10h1M16 10h1M13 14h1M16 14h1M13 18h1M16 18h1M6 12h1M6 16h1" },
  { t: "Develop", d: "Distinctive Communities", icon: "M6 21V4M6 4h14M6 4l4 4M10 4v4M17 4v4M15.5 8h3v3h-3zM3 21h7" },
  { t: "Build", d: "Lasting Value", icon: "M12 21v-8M12 13l-3-2.5M12 15l3-2.5M7.5 10.5a4.5 4.5 0 1 1 9 0c0 2.2-2 3.5-4.5 3.5s-4.5-1.3-4.5-3.5zM8 21h8" },
  { t: "Create", d: "Generational Wealth", icon: "M4 21h16M6.5 18v-4M11 18V9.5M15.5 18V6" },
];

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
      className="relative isolate h-[100svh] min-h-[560px] w-full overflow-hidden bg-ink"
    >
      <Image
        src={SRCS[0]}
        alt="Coastal residential towers and an infinity pool above the marina at sunset"
        fill
        priority
        sizes="100vw"
        className={`object-cover object-[70%_50%] transition-opacity duration-[1200ms] lg:object-center ${ready ? "opacity-0" : "opacity-100"}`}
      />
      <WebGLStage images={SRCS} focus={FOCUS} onReady={onReady} onIndex={onIndex} />

      {/* scrims — top for the header everywhere */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink/75 to-transparent" />
      {/* mobile: headline sits over the sky, pillars over the foreground, the view stays open in between */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[55%] bg-gradient-to-b from-ink/55 via-ink/20 to-transparent lg:hidden" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-ink via-ink/70 to-transparent lg:hidden" />
      {/* desktop: bottom and left for the copy */}
      <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-t from-ink/90 via-ink/10 to-transparent lg:block" />
      <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-ink/70 via-ink/15 to-transparent lg:block" />

      <div className="hero-fade relative z-10 mx-auto flex h-full max-w-[1680px] flex-col px-5 pb-5 pt-[calc(var(--nav-h)+0.75rem)] [text-shadow:0_2px_20px_rgba(0,0,0,0.35)] sm:px-8 lg:px-12 lg:pb-6 lg:pt-[var(--nav-h)]">
        <div className="flex min-h-0 flex-1 flex-col lg:justify-center lg:py-4">
          <div className="text-center lg:text-left">
            <p className="hero-meta mb-[clamp(0.75rem,1.6vh,1.5rem)] translate-y-3 font-sans text-[0.62rem] font-medium uppercase tracking-[0.2em] text-paper/75 opacity-0 lg:text-[0.75rem] lg:tracking-[0.24em] lg:text-paper/70">
              {BRAND.disciplines.join("  ·  ")}
            </p>

            <h1 className="display text-paper text-[clamp(2.25rem,min(11.5vw,7svh),3.6rem)] lg:text-[clamp(2rem,min(6.6vw,10.2vh),6.2rem)]">
              {["We Develop", "What Should", <span key="x" className="italic text-bronze-light">Exist Next.</span>].map(
                (l, i) => (
                  <span key={i} className="block overflow-hidden">
                    <span className="hero-line block translate-y-full">{l}</span>
                  </span>
                )
              )}
            </h1>

            <div className="hero-rule mx-auto my-[clamp(1rem,2.6vh,2.25rem)] h-px w-20 origin-center scale-x-0 bg-bronze-light/70 lg:mx-0 lg:w-full lg:origin-left lg:bg-paper/20" />

            <p className="hero-meta translate-y-3 opacity-0 font-display text-[1.2rem] font-medium italic leading-snug text-paper/90 lg:hidden">
              Building exceptional properties.
              <br />
              Creating enduring value.
            </p>
          </div>

          <div className="flex-1 lg:hidden" />

          <div className="grid items-end gap-[clamp(1rem,2.4vh,2rem)] lg:grid-cols-[1.05fr_auto]">
            <p className="hero-meta hidden max-w-[56ch] translate-y-3 text-[clamp(0.85rem,min(1.05vw,1.9vh),1.05rem)] font-light leading-[1.65] text-paper/75 opacity-0 lg:block">
              We develop distinctive luxury condominiums, upscale apartment communities and select estate
              residences in premier, supply-constrained markets. We don&rsquo;t simply acquire existing
              properties — we create value by developing exceptional real estate from the ground up.
            </p>

            <div className="hero-meta flex translate-y-3 flex-wrap justify-center gap-2 opacity-0 lg:justify-end">
              {[
                { h: "/strategy", l: "Explore Our Platform", m: "Our Platform" },
                { h: "/portfolio", l: "View Our Experience", desktop: true },
                { h: "/investors#opportunities", l: "Invest in What's Next", m: "Invest Now", solid: true },
              ].map((b) => (
                <Link
                  key={b.h}
                  href={b.h}
                  data-cursor="hover"
                  className={`group relative flex-1 overflow-hidden border px-4 py-3 text-center label-caps [text-shadow:none] transition-colors duration-500 sm:flex-none lg:px-5 ${
                    b.desktop ? "hidden lg:inline-block" : ""
                  } ${b.solid ? "border-bronze bg-bronze text-paper" : "border-paper/40 bg-ink/25 text-paper backdrop-blur-sm hover:border-paper/70 lg:bg-transparent lg:backdrop-blur-none"}`}
                >
                  <span
                    aria-hidden
                    className="absolute inset-0 origin-bottom scale-y-0 bg-paper transition-transform duration-[650ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-y-100"
                  />
                  <span className="relative z-10 transition-colors duration-500 group-hover:text-ink">
                    {b.m ? (
                      <>
                        <span className="lg:hidden">{b.m}</span>
                        <span className="hidden lg:inline">{b.l}</span>
                      </>
                    ) : (
                      b.l
                    )}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* ── mobile: the four-step promise, as on the fund overview ─────── */}
        <ul className="hero-meta mt-5 grid shrink-0 translate-y-3 grid-cols-4 divide-x divide-paper/15 border-t border-paper/15 pt-4 text-center opacity-0 lg:hidden">
          {PILLARS.map((p) => (
            <li key={p.t} className="flex flex-col items-center px-1">
              <svg viewBox="0 0 24 24" className="h-6 w-6 text-bronze-light" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d={p.icon} />
              </svg>
              <span className="display-caps mt-2 text-[0.72rem] tracking-[0.12em] text-paper">{p.t}</span>
              <span className="mt-1 text-[0.62rem] leading-tight text-paper/60">{p.d}</span>
            </li>
          ))}
        </ul>

        {/* ── desktop: sequence indicator ─────────────────────────────────── */}
        <div className="hero-meta hidden shrink-0 translate-y-3 border-t border-paper/15 pt-3 opacity-0 lg:block">
          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <span className="relative flex h-7 w-4 items-start justify-center rounded-full border border-paper/30 p-[3px]">
                <span className="block h-1.5 w-px animate-bounce bg-paper/70" />
              </span>
              <span className="eyebrow eyebrow-light">Scroll</span>
            </div>

            <div className="flex min-w-0 flex-1 items-center justify-end gap-2">
              <span className="eyebrow text-bronze-light truncate">
                {SEQUENCE[chapter]?.label}
              </span>
              <div className="flex items-center gap-1.5">
                {SEQUENCE.map((s, i) => (
                  <span key={s.src} className="relative block h-px w-9 bg-paper/25">
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
