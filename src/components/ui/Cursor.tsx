"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReduced } from "@/lib/gsap";

export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (prefersReduced()) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const html = document.documentElement;
    html.classList.add("has-cursor");

    const d = dot.current!, r = ring.current!, l = label.current!;
    gsap.set([d, r], { xPercent: -50, yPercent: -50, opacity: 0 });

    const xTo = gsap.quickTo(r, "x", { duration: 0.55, ease: "power3" });
    const yTo = gsap.quickTo(r, "y", { duration: 0.55, ease: "power3" });
    const xD = gsap.quickTo(d, "x", { duration: 0.12, ease: "power3" });
    const yD = gsap.quickTo(d, "y", { duration: 0.12, ease: "power3" });

    let shown = false;
    const move = (e: MouseEvent) => {
      if (!shown) { shown = true; gsap.to([d, r], { opacity: 1, duration: 0.4 }); }
      xTo(e.clientX); yTo(e.clientY); xD(e.clientX); yD(e.clientY);
    };

    const over = (e: MouseEvent) => {
      const t = (e.target as HTMLElement)?.closest?.("[data-cursor]") as HTMLElement | null;
      if (t) {
        const kind = t.dataset.cursor;
        const text = t.dataset.cursorText || "";
        l.textContent = text;
        gsap.to(r, {
          scale: text ? 3.1 : kind === "view" ? 2.6 : 1.9,
          borderColor: "rgba(192,103,74,0.9)",
          backgroundColor: text ? "rgba(18,20,22,0.94)" : "rgba(192,103,74,0.10)",
          duration: 0.45,
        });
        gsap.to(d, { scale: 0, duration: 0.3 });
        gsap.to(l, { opacity: text ? 1 : 0, duration: 0.35 });
      } else {
        gsap.to(r, { scale: 1, borderColor: "rgba(18,20,22,0.35)", backgroundColor: "transparent", duration: 0.45 });
        gsap.to(d, { scale: 1, duration: 0.3 });
        gsap.to(l, { opacity: 0, duration: 0.25 });
      }
    };

    const leave = () => gsap.to([d, r], { opacity: 0, duration: 0.3 });

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    document.addEventListener("mouseleave", leave);

    return () => {
      html.classList.remove("has-cursor");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[9999] hidden md:block">
      <div ref={dot} className="fixed left-0 top-0 h-1.5 w-1.5 rounded-full bg-ink" />
      <div
        ref={ring}
        className="fixed left-0 top-0 flex h-9 w-9 items-center justify-center rounded-full border border-ink/35"
      >
        <span ref={label} className="text-[9px] uppercase tracking-[0.18em] text-paper opacity-0" style={{ transform: "scale(0.34)" }} />
      </div>
    </div>
  );
}
