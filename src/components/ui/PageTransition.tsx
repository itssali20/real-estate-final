"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap, prefersReduced, refreshScroll } from "@/lib/gsap";
import { BRAND } from "@/lib/site";

/**
 * Enter-side route curtain. Runs on pathname change only (never on first
 * paint, where the preloader already covers the handoff).
 */
export default function PageTransition() {
  const pathname = usePathname();
  const first = useRef(true);
  const curtain = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (first.current) { first.current = false; return; }
    const el = curtain.current;
    if (!el || prefersReduced()) return;

    window.scrollTo(0, 0);
    window.__lenis?.scrollTo(0, { immediate: true });

    const tl = gsap.timeline({ onComplete: () => { gsap.set(el, { display: "none" }); refreshScroll(); } });
    tl.set(el, { display: "block", yPercent: 0 })
      .fromTo(el.querySelector(".pt-mark"), { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" })
      .to(el.querySelector(".pt-mark"), { opacity: 0, duration: 0.3, ease: "power2.in" }, ">0.15")
      .to(el, { yPercent: -100, duration: 0.95, ease: "expo.inOut" }, ">-0.1");

    return () => { tl.kill(); };
  }, [pathname]);

  return (
    <div
      ref={curtain}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[9000] hidden bg-ink"
    >
      <div className="grain absolute inset-0" />
      <div className="relative flex h-full items-center justify-center">
        <span className="pt-mark display-caps text-[clamp(1rem,2.4vw,1.8rem)] text-paper opacity-0">
          {BRAND.mark}
          <span className="text-bronze">, Corp.</span>
        </span>
      </div>
    </div>
  );
}
