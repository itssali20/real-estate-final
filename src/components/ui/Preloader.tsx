"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, prefersReduced, refreshScroll } from "@/lib/gsap";
import { BRAND } from "@/lib/site";

export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const [n, setN] = useState(0);

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
      onUpdate: () => setN(Math.round(counter.v)),
    })
      .to(".pl-mark", { opacity: 1, duration: 0.8 }, 0.2)
      .to(".pl-bar", { scaleX: 1, duration: 2.1, ease: "power2.inOut" }, 0)
      .to(".pl-inner", { opacity: 0, y: -18, duration: 0.6, ease: "power2.in" }, ">-0.15")
      .to(el, { yPercent: -100, duration: 1.15, ease: "expo.inOut" }, ">-0.1")
      .set(el, { display: "none" });

    return () => { tl.kill(); };
  }, []);

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[10000] flex items-end justify-center bg-ink text-paper"
    >
      <div className="pl-inner mb-[8vh] w-full max-w-[min(90vw,900px)] px-6">
        <div className="pl-mark mb-7 flex items-baseline justify-between opacity-0">
          <span className="display-caps text-[clamp(1.1rem,2.4vw,1.75rem)]">{BRAND.mark}</span>
          <span className="eyebrow eyebrow-light tabular-nums">{String(n).padStart(3, "0")}</span>
        </div>
        <div className="relative h-px w-full bg-paper/15">
          <div className="pl-bar absolute inset-0 origin-left scale-x-0 bg-bronze" />
        </div>
        <p className="mt-6 text-[10px] uppercase tracking-[0.3em] text-paper/40">
          Exceptional Locations · World-Class Design · Enduring Value
        </p>
      </div>
    </div>
  );
}
