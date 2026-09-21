"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import { gsap, prefersReduced, refreshScroll } from "@/lib/gsap";
import { VALUE_CHAIN_STEPS } from "@/lib/site";

/**
 * Storyboard 04 — the twelve-step value-creation process, pinned and scrubbed
 * horizontally on desktop, a native swipe rail on mobile.
 */
export default function ValueChain() {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(1);

  useLayoutEffect(() => {
    if (prefersReduced()) return;
    const ctx = gsap.context(() => {
      const t = track.current!;
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const dist = () => Math.max(0, t.scrollWidth - window.innerWidth + 96);
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${dist() + window.innerHeight * 0.55}`,
            pin: true,
            scrub: 0.7,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onUpdate: (self) =>
              setStep(Math.min(VALUE_CHAIN_STEPS.length, Math.floor(self.progress * VALUE_CHAIN_STEPS.length) + 1)),
          },
        });

        tl.to(t, { x: () => -dist() }, 0);
        tl.to(".vc-progress", { scaleX: 1 }, 0);

        gsap.utils.toArray<HTMLElement>(".vc-card").forEach((card, i) => {
          const at = (i / VALUE_CHAIN_STEPS.length) * 0.86;
          tl.fromTo(card.querySelector(".vc-bar"), { scaleX: 0 }, { scaleX: 1, duration: 0.1 }, at);
          tl.fromTo(card.querySelector(".vc-img"), { scale: 1.22, opacity: 0.35 }, { scale: 1, opacity: 1, duration: 0.14 }, at);
          tl.fromTo(card.querySelector(".vc-num"), { opacity: 0.2 }, { opacity: 1, duration: 0.1 }, at);
        });

        return () => { tl.scrollTrigger?.kill(); tl.kill(); };
      });
    }, root);

    const id = setTimeout(() => refreshScroll(), 300);
    return () => { clearTimeout(id); ctx.revert(); };
  }, []);

  return (
    <div ref={root} className="relative overflow-hidden bg-ink py-16 text-paper md:h-[100svh] md:py-0">
      <div className="grain pointer-events-none absolute inset-0" />

      <div className="relative flex h-full flex-col justify-center">
        <div className="mx-auto w-full max-w-[1680px] px-5 sm:px-8 lg:px-12">
          <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-5">
            <div className="max-w-[54ch]">
              <div className="flex items-center gap-4">
                <span className="eyebrow eyebrow-light tabular-nums">04</span>
                <span className="h-px w-10 bg-bronze" />
                <span className="eyebrow eyebrow-light">Our Value-Creation Process</span>
              </div>
              <h2 className="display mt-4 text-[clamp(1.6rem,3.6vw,3rem)]">
                We don&rsquo;t simply buy real estate. <span className="italic text-bronze-light">We create it.</span>
              </h2>
              <p className="body mt-4 text-[0.9rem] text-paper/55">
                Traditional real-estate investment begins after a property has already been developed.
                Ours begins earlier — twelve disciplines, applied in sequence.
              </p>
            </div>

            <div className="hidden items-baseline gap-3 md:flex">
              <span className="display text-[clamp(2.2rem,5vw,4rem)] leading-none text-bronze">
                {String(step).padStart(2, "0")}
              </span>
              <span className="eyebrow eyebrow-light">/ {VALUE_CHAIN_STEPS.length}</span>
            </div>
          </div>
        </div>

        <div className="mt-8 overflow-x-auto no-scrollbar md:mt-10 md:overflow-visible">
          <div ref={track} className="flex w-max items-stretch gap-5 px-5 sm:px-8 lg:px-12">
            {VALUE_CHAIN_STEPS.map((s, i) => (
              <article
                key={s.t}
                className="vc-card group relative flex w-[76vw] shrink-0 flex-col sm:w-[42vw] md:w-[28vw] lg:w-[21vw] xl:w-[18vw]"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-ink-soft">
                  <Image
                    src={s.image}
                    alt={s.t}
                    fill
                    sizes="(max-width:768px) 76vw, 22vw"
                    className="vc-img object-cover opacity-90 transition-transform duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.05]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/15 to-transparent" />
                  <span className="vc-num absolute left-4 top-4 display text-[clamp(1.5rem,2.4vw,2.2rem)] leading-none text-paper/85">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <span className="vc-bar block h-[2px] w-full origin-left bg-bronze" />

                <div className="flex flex-1 flex-col border-x border-b border-paper/10 px-4 py-5">
                  <h3 className="display-caps text-[clamp(0.85rem,1.2vw,1.05rem)] leading-tight">{s.t}</h3>
                  <p className="body mt-2.5 text-[0.8rem] leading-relaxed text-paper/50">{s.d}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-8 w-full max-w-[1680px] px-5 sm:px-8 lg:px-12">
          <div className="relative h-px w-full bg-paper/12">
            <span className="vc-progress absolute inset-0 origin-left scale-x-0 bg-bronze" />
          </div>
          <p className="body mt-4 max-w-[70ch] text-[0.82rem] text-paper/45">
            Development involves substantial risks. Our objective is to manage those risks through disciplined
            underwriting, experienced execution, thoughtful project selection and active oversight.
          </p>
        </div>
      </div>
    </div>
  );
}
