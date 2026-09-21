"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { PRODUCT_TYPES } from "@/lib/site";
import { Container, Chain } from "./Primitives";

export default function ProductTypes() {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  /** IntersectionObserver drives the sticky image — lighter than a ScrollTrigger per panel. */
  useEffect(() => {
    const panels = Array.from(root.current?.querySelectorAll<HTMLElement>(".pt-panel") ?? []);
    if (!panels.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (!visible.length) return;
        const best = visible.reduce((a, b) => (a.intersectionRatio >= b.intersectionRatio ? a : b));
        const i = panels.indexOf(best.target as HTMLElement);
        if (i >= 0) setActive(i);
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    panels.forEach((p) => io.observe(p));
    return () => io.disconnect();
  }, []);

  return (
    <div ref={root} className="relative bg-paper py-20 lg:py-28">
      <Container>
        <div className="flex items-center gap-4">
          <span className="eyebrow tabular-nums">05</span>
          <span className="h-px w-10 bg-bronze" />
          <span className="eyebrow">What We Develop</span>
        </div>
        <h2 data-split className="display mt-6 text-[clamp(1.9rem,4.6vw,3.9rem)]">
          <span className="block overflow-hidden"><span className="split-line-inner block">Distinctive residential</span></span>
          <span className="block overflow-hidden"><span className="split-line-inner block italic text-bronze">real estate.</span></span>
        </h2>

        <div className="mt-14 grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <div className="relative hidden lg:block">
            <div className="sticky top-[calc(var(--nav-h)+3rem)] aspect-[3/2] overflow-hidden bg-paper-3">
              {PRODUCT_TYPES.map((p, i) => (
                <Image
                  key={p.id}
                  src={p.image}
                  alt={p.label}
                  fill
                  sizes="45vw"
                  className={`object-cover transition-[opacity,transform] duration-[1100ms] ease-[cubic-bezier(.22,1,.36,1)] ${
                    active === i ? "scale-100 opacity-100" : "scale-[1.06] opacity-0"
                  }`}
                />
              ))}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/45 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 flex items-center gap-3 p-6">
                {PRODUCT_TYPES.map((p, i) => (
                  <span key={p.id} className={`h-px flex-1 transition-colors duration-700 ${active === i ? "bg-bronze-light" : "bg-paper/25"}`} />
                ))}
              </div>
            </div>
          </div>

          <div>
            {PRODUCT_TYPES.map((p, i) => (
              <article key={p.id} className="pt-panel border-t border-ink/10 py-10 first:border-t-0 first:pt-0 lg:py-14">
                <div className="mb-5 lg:hidden">
                  <div data-img-reveal className="relative aspect-[16/10] overflow-hidden bg-paper-3">
                    <Image src={p.image} alt={p.label} fill sizes="100vw" className="object-cover" />
                  </div>
                </div>
                <div className="flex items-baseline gap-4">
                  <span className="eyebrow tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="display text-[clamp(1.5rem,3vw,2.5rem)]" data-anim="fade-up">{p.label}</h3>
                </div>
                <p className="display-caps mt-4 text-[0.95rem] text-bronze" data-anim="fade-up">{p.line}</p>
                <p className="body measure mt-4 text-ink/70" data-anim="fade-up">{p.body}</p>
                <div className="mt-6"><Chain steps={p.chain} /></div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
