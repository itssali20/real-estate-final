"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, prefersReduced } from "@/lib/gsap";

export default function Counter({
  to, prefix = "", suffix = "", decimals = 0, className = "",
}: { to: number; prefix?: string; suffix?: string; decimals?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReduced()) { el.textContent = `${prefix}${to.toFixed(decimals)}${suffix}`; return; }
    const o = { v: 0 };
    const tw = gsap.to(o, {
      v: to, duration: 2.2, ease: "power3.out",
      onUpdate: () => { el.textContent = `${prefix}${o.v.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}${suffix}`; },
      scrollTrigger: { trigger: el, start: "top 88%", once: true },
    });
    return () => { tw.kill(); };
  }, [to, prefix, suffix, decimals]);

  return <span ref={ref} className={`tabular-nums ${className}`}>{prefix}0{suffix}</span>;
}
