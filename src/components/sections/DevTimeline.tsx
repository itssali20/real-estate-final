"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, prefersReduced } from "@/lib/gsap";
import { DEV_TIMELINE } from "@/lib/site";
import { Container } from "./Primitives";

export default function DevTimeline() {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (prefersReduced()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".tl-progress", { scaleY: 0 }, {
        scaleY: 1, ease: "none",
        scrollTrigger: { trigger: ".tl-list", start: "top 72%", end: "bottom 78%", scrub: 0.6 },
      });
      gsap.utils.toArray<HTMLElement>(".tl-item").forEach((el) => {
        gsap.fromTo(el, { opacity: 0.22, x: -14 }, {
          opacity: 1, x: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 80%", once: true },
        });
        gsap.fromTo(el.querySelector(".tl-dot"), { scale: 0.4, backgroundColor: "rgba(247,247,246,0.25)" }, {
          scale: 1, backgroundColor: "#C0674A", duration: 0.6,
          scrollTrigger: { trigger: el, start: "top 78%", once: true },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative overflow-hidden bg-ink py-20 text-paper lg:py-28">
      <div className="grain pointer-events-none absolute inset-0" />
      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div className="lg:sticky lg:top-[calc(var(--nav-h)+4rem)] lg:self-start">
            <div className="flex items-center gap-4">
              <span className="eyebrow eyebrow-light tabular-nums">32</span>
              <span className="h-px w-10 bg-bronze" />
              <span className="eyebrow eyebrow-light">Development You Can Follow</span>
            </div>
            <h2 className="display mt-6 text-[clamp(1.8rem,4.2vw,3.3rem)]">
              Don&rsquo;t just invest in the development. <span className="italic text-bronze-light">Follow it being built.</span>
            </h2>
            <p className="body measure-sm mt-6 text-paper/60">
              Each active project can provide investors with a visual development timeline. Milestones may include
              construction photography, drone video, development updates, budget information, schedule updates and
              team commentary.
            </p>
          </div>

          <div className="tl-list relative pl-8">
            <span className="absolute left-0 top-2 h-[calc(100%-1rem)] w-px bg-paper/12" />
            <span className="tl-progress absolute left-0 top-2 h-[calc(100%-1rem)] w-px origin-top bg-bronze" />
            {DEV_TIMELINE.map((s, i) => (
              <div key={s} className="tl-item relative flex items-baseline gap-5 py-4">
                <span className="tl-dot absolute -left-8 top-[1.45rem] block h-1.5 w-1.5 -translate-x-[2.5px] rounded-full bg-paper/25" />
                <span className="eyebrow eyebrow-light tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <span className="display-caps text-[clamp(0.95rem,2vw,1.35rem)]">{s}</span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
