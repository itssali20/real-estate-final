"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger, prefersReduced, refreshScroll } from "@/lib/gsap";
import { BRAND } from "@/lib/site";

export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const done = () => { el.style.display = "none"; refreshScroll(); };

    if (prefersReduced()) { done(); return; }
    if (sessionStorage.getItem("cp-preloaded")) { done(); return; }

    document.documentElement.classList.add("lenis-stopped");
    document.body.style.overflow = "hidden";

    const counter = { v: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem("cp-preloaded", "1");
        document.documentElement.classList.remove("lenis-stopped");
        document.body.style.overflow = "";
        window.__lenis?.start();
        refreshScroll();
      },
    });

    tl.to(counter, {
      v: 100, duration: 2.1, ease: "power2.inOut",
      onUpdate: () => { if (count.current) count.current.textContent = String(Math.round(counter.v)).padStart(3, "0"); },
    })
      .to(".pl-logo", { opacity: 1, scale: 1, duration: 1, ease: "power2.out" }, 0.15)
      .to(".pl-bar", { scaleX: 1, duration: 2.1, ease: "power2.inOut" }, 0)
      .to(".pl-inner, .pl-logo", { opacity: 0, y: -18, duration: 0.6, ease: "power2.in" }, ">-0.15")
      .to(el, { yPercent: -100, duration: 1.15, ease: "expo.inOut" }, ">-0.1")
      .set(el, { display: "none" });

    return () => { tl.kill(); };
  }, []);

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-ink px-6 text-paper"
    >
      <div className="pl-logo mb-[8vh] w-[220px] scale-[0.97] opacity-0 sm:w-[300px]">
        <Image src="/images/logo.png" alt={BRAND.mark} width={424} height={287} className="h-auto w-full object-contain" priority />
      </div>
      <div className="pl-inner w-full max-w-[min(90vw,900px)]">
        <div className="relative h-px w-full bg-paper/15">
          <div className="pl-bar absolute inset-0 origin-left scale-x-0 bg-bronze" />
        </div>
        <div className="mt-5 flex items-baseline justify-between">
          <span ref={count} className="eyebrow eyebrow-light tabular-nums">000</span>
          <p className="text-[10px] uppercase tracking-[0.3em] text-paper/40">
            Exceptional Locations · World-Class Design · Enduring Value
          </p>
        </div>
      </div>
    </div>
  );
}
