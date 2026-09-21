"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger, prefersReduced, refreshScroll } from "@/lib/gsap";

/**
 * One scroll-reveal engine for the whole document.
 *
 * Scans for declarative hooks after every route change so that *any* section —
 * server- or client-rendered — animates identically:
 *   [data-split]       masked line-by-line heading reveal
 *   [data-img-reveal]  clip-path wipe + scale settle on the inner element
 *   [data-anim]        fade-up | fade | clip | line
 *   [data-stagger]     groups children for a natural stagger
 *   [data-parallax]    scrubbed vertical drift
 */
export default function RevealEngine() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    document.documentElement.classList.add("js");
    if (prefersReduced()) return;

    let ctx: gsap.Context | null = null;
    let raf = 0;

    /**
     * An element with no layout box (inside a `display:none` responsive block)
     * resolves its trigger position to the top of the document, so a `once`
     * ScrollTrigger fires and kills itself during init — which corrupts
     * ScrollTrigger's internal list. Such elements are snapped straight to
     * their final state instead, so they are never stuck invisible if a
     * breakpoint later reveals them.
     */
    const laidOut = (el: HTMLElement) => {
      const r = el.getBoundingClientRect();
      return r.width > 0 || r.height > 0;
    };

    const settle = (el: HTMLElement) => {
      gsap.set(el, { opacity: 1, y: 0, scaleX: 1, clipPath: "none" });
      el.querySelectorAll<HTMLElement>(".split-line-inner").forEach((l) => gsap.set(l, { y: "0%" }));
      const inner = el.firstElementChild as HTMLElement | null;
      if (inner && el.hasAttribute("data-img-reveal")) gsap.set(inner, { scale: 1 });
    };

    const build = () => {
      ctx = gsap.context(() => {
      document.querySelectorAll<HTMLElement>("[data-split]").forEach((el) => {
        const lines = el.querySelectorAll<HTMLElement>(".split-line-inner");
        if (!lines.length) return;
        if (!laidOut(el)) { settle(el); return; }
        gsap.to(lines, {
          y: "0%",
          duration: 1.25,
          ease: "expo.out",
          stagger: 0.085,
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
        });
      });

      document.querySelectorAll<HTMLElement>("[data-img-reveal]").forEach((el) => {
        if (!laidOut(el)) { settle(el); return; }
        const inner = el.firstElementChild;
        const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 90%", once: true } });
        tl.to(el, { clipPath: "inset(0 0 0% 0)", duration: 1.35, ease: "expo.out" });
        if (inner) tl.to(inner, { scale: 1, duration: 1.7, ease: "expo.out" }, 0);
      });

      const groups = new Map<Element, HTMLElement[]>();
      document.querySelectorAll<HTMLElement>("[data-anim]").forEach((el) => {
        if (!laidOut(el)) { settle(el); return; }
        const parent = el.closest("[data-stagger]") ?? el.parentElement ?? document.body;
        if (!groups.has(parent)) groups.set(parent, []);
        groups.get(parent)!.push(el);
      });

      groups.forEach((els) => {
        const byType: Record<string, HTMLElement[]> = {};
        els.forEach((el) => { (byType[el.dataset.anim || "fade-up"] ||= []).push(el); });
        Object.entries(byType).forEach(([type, list]) => {
          /* Cap the total stagger span. A 17-item list at a flat 0.07s each took
             over two seconds to finish, so the tail lagged behind a fast scroll. */
          const vars: gsap.TweenVars = {
            scrollTrigger: { trigger: list[0], start: "top 94%", once: true },
            stagger: list.length > 1 ? { amount: Math.min(list.length * 0.07, 0.55) } : 0,
            duration: 1.05,
            ease: "expo.out",
          };
          if (type === "fade-up") gsap.to(list, { ...vars, opacity: 1, y: 0 });
          else if (type === "fade") gsap.to(list, { ...vars, opacity: 1 });
          else if (type === "clip") gsap.to(list, { ...vars, clipPath: "inset(0 0 0% 0)", duration: 1.3 });
          else if (type === "line") gsap.to(list, { ...vars, scaleX: 1, duration: 1.5 });
        });
      });

        document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
          if (!laidOut(el)) return;
          const amt = parseFloat(el.dataset.parallax || "12");
          gsap.fromTo(el, { yPercent: -amt / 2 }, {
            yPercent: amt / 2,
            ease: "none",
            scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom top", scrub: true },
          });
        });
      });
      refreshScroll(180);
    };

    /**
     * Creating a ScrollTrigger while ScrollTrigger is mid-refresh corrupts its
     * internal trigger list, so wait for any in-flight refresh to finish first.
     */
    const start = () => {
      if ((ScrollTrigger as unknown as { isRefreshing?: boolean }).isRefreshing) {
        const once = () => { ScrollTrigger.removeEventListener("refresh", once); build(); };
        ScrollTrigger.addEventListener("refresh", once);
      } else {
        build();
      }
    };
    raf = requestAnimationFrame(start);

    return () => { cancelAnimationFrame(raf); ctx?.revert(); };
  }, [pathname]);

  return null;
}
