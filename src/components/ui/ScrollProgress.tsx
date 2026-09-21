"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap, prefersReduced } from "@/lib/gsap";

export default function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const el = bar.current;
    if (!el || prefersReduced()) return;
    const set = gsap.quickSetter(el, "scaleX");
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      set(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-[600] h-px">
      <div ref={bar} className="h-full w-full origin-left scale-x-0 bg-bronze" />
    </div>
  );
}
