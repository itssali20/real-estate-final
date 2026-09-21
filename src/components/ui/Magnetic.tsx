"use client";

import { useRef, type ReactNode } from "react";
import { gsap, prefersReduced } from "@/lib/gsap";

export default function Magnetic({ children, strength = 0.32, className = "" }: {
  children: ReactNode; strength?: number; className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  const move = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el || prefersReduced()) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const r = el.getBoundingClientRect();
    gsap.to(el, {
      x: (e.clientX - (r.left + r.width / 2)) * strength,
      y: (e.clientY - (r.top + r.height / 2)) * strength,
      duration: 0.7,
      ease: "power3.out",
    });
  };
  const leave = () => {
    if (ref.current) gsap.to(ref.current, { x: 0, y: 0, duration: 1, ease: "elastic.out(1,0.35)" });
  };

  return (
    <span
      ref={ref}
      onMouseMove={move}
      onMouseLeave={leave}
      className={`inline-block ${className}`}
    >
      {children}
    </span>
  );
}
