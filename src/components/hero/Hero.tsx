"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { gsap, prefersReduced, refreshScroll } from "@/lib/gsap";
import { BRAND } from "@/lib/site";

/** HERO VISUAL — one fixed image, no auto-rotating slideshow. */
const HERO_IMAGE = "/images/hero-coastal-resort.webp";

const SIDE_LIST = ["People", "Places", "Possibilities", "For A Brighter", "Tomorrow"];

const PILLARS = [
  {
    t: "Acquire",
    d: "Strategic Opportunities",
    icon: "M4 21V9l6-3v15M10 21V4l10 4v13M3 21h18M13 10h1M16 10h1M13 14h1M16 14h1M13 18h1M16 18h1M6 12h1M6 16h1",
  },
  {
    t: "Develop",
    d: "Distinctive Communities",
    icon: "M6 21V4M6 4h14M6 4l4 4M10 4v4M17 4v4M15.5 8h3v3h-3zM3 21h7",
  },
  {
    t: "Build",
    d: "Lasting Value",
    icon: "M12 21v-8M12 13l-3-2.5M12 15l3-2.5M7.5 10.5a4.5 4.5 0 1 1 9 0c0 2.2-2 3.5-4.5 3.5s-4.5-1.3-4.5-3.5zM8 21h8",
  },
  {
    t: "Create",
    d: "Generational Wealth",
    icon: "M4 21h16M6.5 18v-4M11 18V9.5M15.5 18V6",
  },
];

export default function Hero() {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (prefersReduced()) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });
      tl.to(".hero-line", { y: "0%", duration: 1.4, stagger: 0.08, ease: "expo.out" })
        .to(".hero-rule", { scaleX: 1, duration: 1.3, ease: "expo.out" }, "-=0.95")
        .to(".hero-meta", { opacity: 1, y: 0, duration: 1, stagger: 0.06, ease: "expo.out" }, "-=1.0");

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
    <div ref={root} className="relative isolate w-full overflow-hidden bg-ink">
      <Image
        src={HERO_IMAGE}
        alt="Coastal residential towers and an infinity pool above the marina at sunset"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[70%_50%] lg:object-center"
      />

      {/* light veil — just enough for the text to sit on, the sunset stays close to full color */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-2/3 bg-gradient-to-b from-ink/55 via-ink/15 to-transparent" />

      <div className="hero-fade relative z-10 flex min-h-svh flex-col px-5 pb-10 pt-[calc(var(--nav-h)+1.5rem)] text-center [text-shadow:0_1px_3px_rgba(0,0,0,0.55),0_6px_28px_rgba(0,0,0,0.4)] sm:px-8 lg:px-12">
        {/* ── brand block ─────────────────────────────────────────────────── */}
        <div className="hero-meta mx-auto flex translate-y-3 flex-col items-center opacity-0">
          <Image src="/images/logo-white.png" alt={BRAND.mark} width={424} height={287} className="h-12 w-auto object-contain sm:h-16" />
          <p className="display-caps mt-3 text-[clamp(1.15rem,2.6vw,1.6rem)] text-paper">
            {BRAND.mark}<span className="text-bronze-light">, Corp.</span>
          </p>
          <p className="eyebrow eyebrow-light mt-2 text-[0.6rem] sm:text-[0.68rem]">
            Vision &nbsp;|&nbsp; Development &nbsp;|&nbsp; Value &nbsp;|&nbsp; A Better Tomorrow
          </p>
          <div className="hero-rule mt-6 h-px w-24 origin-center scale-x-0 bg-paper/30" />
        </div>

        {/* ── fund headline ───────────────────────────────────────────────── */}
        <div className="mx-auto mt-8 max-w-3xl">
          <h1 className="display text-paper text-[clamp(2.4rem,9vw,4.6rem)]">
            <span className="block overflow-hidden">
              <span className="hero-line block translate-y-full">Real Estate</span>
            </span>
          </h1>
          <p className="hero-meta mt-1 translate-y-3 display-caps text-bronze-light text-[clamp(1rem,3.2vw,1.7rem)] opacity-0">
            Investment &amp; Development Fund
          </p>
          <p className="hero-meta mx-auto mt-5 max-w-[34ch] translate-y-3 font-display text-[clamp(1rem,2.6vw,1.25rem)] italic text-paper/90 opacity-0">
            Building Exceptional Properties. Creating Enduring Value.
          </p>
        </div>

        {/* ── side promise list — left on desktop, centered under the tagline on mobile ── */}
        <div className="hero-meta absolute left-5 top-[46%] hidden translate-y-3 flex-col gap-1 opacity-0 sm:left-8 lg:left-12 lg:flex">
          {SIDE_LIST.map((s) => (
            <span key={s} className="label-caps text-left text-paper/80">{s}</span>
          ))}
          <div className="mt-2 h-px w-10 bg-paper/30" />
        </div>
        <div className="hero-meta mx-auto mt-6 flex translate-y-3 flex-wrap justify-center gap-x-2 gap-y-1 opacity-0 lg:hidden">
          {SIDE_LIST.map((s, i) => (
            <span key={s} className="label-caps text-paper/75">
              {s}{i < SIDE_LIST.length - 1 && <span className="text-paper/35">&nbsp;·</span>}
            </span>
          ))}
        </div>

        {/* pushes the brand card to the bottom of the viewport */}
        <div className="flex-1" />

        {/* ── brand promise card — the poster's navy footer, reproduced as a real section ── */}
        <div className="hero-meta mx-auto w-full max-w-4xl translate-y-3 border-t border-paper/15 pt-6 opacity-0 [text-shadow:none] sm:pt-8">
          <ul className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-4 sm:gap-x-6">
            {PILLARS.map((p) => (
              <li key={p.t} className="flex flex-col items-center text-center">
                <svg viewBox="0 0 24 24" className="h-7 w-7 text-bronze-light" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d={p.icon} />
                </svg>
                <span className="display-caps mt-2 text-[0.78rem] tracking-[0.1em] text-paper">{p.t}</span>
                <span className="mt-1 text-[0.68rem] leading-tight text-paper/60">{p.d}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col items-center gap-6 border-t border-paper/10 pt-6 sm:flex-row sm:items-end sm:justify-between sm:text-left">
            <p className="eyebrow eyebrow-light text-[0.62rem] sm:text-[0.68rem]">
              Exceptional Locations &middot; World-Class Design &middot; Enduring Value
            </p>
            <div className="flex max-w-full flex-col items-center sm:items-end">
              <span className="font-signature text-[clamp(1.5rem,4.5vw,2.4rem)] leading-none text-bronze-light">Roman Alexander</span>
              <span className="mt-1 text-[0.8rem] text-paper">Roman Alexander</span>
              <span className="text-[0.7rem] text-paper/55">Founder &amp; Chief Executive Officer</span>
              <span className="text-[0.7rem] text-paper/55">{BRAND.mark}, Corp.</span>
            </div>
          </div>

          <p className="mt-8 border-t border-paper/10 pt-5 text-center label-caps text-paper/40">
            A Stronger Tomorrow. Together.
          </p>
        </div>
      </div>
    </div>
  );
}
