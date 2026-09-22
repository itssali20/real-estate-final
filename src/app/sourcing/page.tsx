import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/sections/PageHero";
import Reveal from "@/components/Reveal";
import Marquee from "@/components/sections/Marquee";
import MaterialStage from "@/components/sections/MaterialStage";
import Button from "@/components/ui/Button";
import { Container, Eyebrow, SectionTitle, Rule, Figure, NumberedList, Statement, Chain } from "@/components/sections/Primitives";
import { SOURCING_CATEGORIES, GLOBAL_FLOW, DISTINCTIVE_FEATURES, TECHNOLOGY } from "@/lib/site";

export const metadata: Metadata = {
  title: "Global Sourcing & Materials",
  description:
    "Quality without conventional procurement limitations. Direct global relationships with qualified manufacturers, fabricators and suppliers to enhance specification and control quality.",
};

export default function SourcingPage() {
  return (
    <>
      <PageHero
        index="12 / 18"
        eyebrow="Global Material Sourcing"
        title={[<>Quality without conventional</>, <span key="a" className="italic text-bronze-light">procurement limitations.</span>]}
        lead="Construction quality is determined not only by architecture and craftsmanship, but also by the materials and building components selected for each project."
        image="/images/hero-06-construction.webp"
        alt="Luxury residence under construction at dusk"
        chain={GLOBAL_FLOW}
      />

      <Reveal className="relative bg-paper py-20 lg:py-28">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-8">
            <div>
              <Eyebrow className="tabular-nums">12 — Depending upon the project, we may source</Eyebrow>
              <SectionTitle className="mt-5 max-w-[18ch]" lines={[<>Fifteen categories.</>, <span key="b" className="italic text-bronze">One standard.</span>]} />
            </div>
            <p className="body measure-sm text-ink/60" data-anim="fade-up">
              Our sourcing strategy evaluates qualified manufacturers and suppliers in the United States and internationally.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5" data-stagger>
            {SOURCING_CATEGORIES.map((c, i) => (
              <article key={c.t} data-anim="fade-up" data-cursor="view" className="group relative overflow-hidden bg-paper-3">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={c.image}
                    alt={c.t}
                    fill
                    sizes="(max-width:640px) 45vw, (max-width:1024px) 30vw, 18vw"
                    className="object-cover grayscale-[0.35] transition-all duration-[1100ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.07] group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <span className="eyebrow eyebrow-light tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="display-caps mt-1.5 text-[0.78rem] leading-snug text-paper">{c.t}</h3>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <p className="eyebrow mt-8" data-anim="fade">Also: Other Specialized Building Components</p>
        </Container>
      </Reveal>

      <Marquee items={["Natural Stone", "Premium Wood", "Architectural Metals", "High-Quality Doors", "Custom Millwork", "Designer Lighting", "Building-Envelope Systems"]} />

      <Reveal className="relative overflow-hidden bg-ink py-20 text-paper lg:py-28">
        <div className="grain pointer-events-none absolute inset-0" />
        <Container className="relative">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
            <div>
              <Eyebrow light className="tabular-nums">13 — Direct Global Procurement</Eyebrow>
              <SectionTitle light className="mt-5" lines={[<>Better use of every</>, <span key="c" className="italic text-bronze-light">development dollar.</span>]} />
              <p className="body-lg measure mt-7 text-paper/70" data-anim="fade-up">
                Traditional construction procurement can involve multiple layers of distributors, representatives,
                markups and intermediaries. Where appropriate, our strategy is to establish more direct relationships
                with qualified manufacturers, fabricators and suppliers.
              </p>
              <p className="body measure mt-5 text-paper/50" data-anim="fade-up">
                This approach is intended to reduce unnecessary procurement costs, enhance specification, access
                specialized products, create purchasing leverage and control quality.
              </p>
              <Rule light className="my-10" />
              <Statement light className="max-w-[24ch]">
                Our objective is not simply to build for less.{" "}
                <span className="text-bronze-light">It is to build more intelligently.</span>
              </Statement>
            </div>

            <div className="grid gap-4">
              <Figure src="/images/ref-materials-stone.webp" alt="Curated stone, wood and metal material samples" ratio="aspect-[4/3]" parallax={8} />
              <Figure src="/images/det-handle.webp" alt="Custom door hardware detail" ratio="aspect-[3/2]" className="ml-auto w-[86%]" parallax={-6} />
            </div>
          </div>

          <div className="mt-16 border-t border-paper/12 pt-12">
            <Eyebrow light className="tabular-nums">14 — The Global Advantage</Eyebrow>
            <SectionTitle light className="mt-5 max-w-[26ch]" lines={[<>Design excellence + procurement</>, <span key="d" className="italic text-bronze-light">discipline + local execution.</span>]} />
            <p className="body-lg measure mt-7 text-paper/65" data-anim="fade-up">
              Our development model combines global architectural talent, international design resources, global
              engineering capabilities, direct material sourcing, local construction management and quality control.
              The objective is to improve the relationship between cost × quality × design × execution.
            </p>
            <p className="display-caps mt-8 text-[clamp(1rem,2.2vw,1.6rem)] text-bronze-light" data-anim="fade-up">
              Better sourcing. Better design. Better use of capital.
            </p>
          </div>
        </Container>
      </Reveal>

      <MaterialStage />

      <Reveal className="relative bg-paper-2 py-20 lg:py-28">
        <Container>
          <Eyebrow className="tabular-nums">16 — Distinctive Residential Features</Eyebrow>
          <SectionTitle className="mt-5 max-w-[18ch]" lines={[<>More than</>, <span key="z" className="italic text-bronze">square footage.</span>]} />
          <div className="mt-12 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3" data-stagger>
            {DISTINCTIVE_FEATURES.map((f, i) => (
              <div key={f} data-anim="fade-up" className="group flex items-baseline gap-4 border-b border-ink/10 py-3.5">
                <span className="eyebrow tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <span className="display-caps text-[0.84rem] text-ink/80 transition-colors duration-500 group-hover:text-bronze">{f}</span>
              </div>
            ))}
          </div>
        </Container>
      </Reveal>

      <Reveal className="relative overflow-hidden bg-ink py-20 text-paper lg:py-28">
        <div className="grain pointer-events-none absolute inset-0" />
        <Container className="relative">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <div>
              <Eyebrow light className="tabular-nums">17 — Safety, Technology & Resilience</Eyebrow>
              <SectionTitle light className="mt-5" lines={[<>Designed to protect</>, <span key="f" className="italic text-bronze-light">what matters.</span>]} />
              <p className="body-lg measure-sm mt-7 text-paper/65" data-anim="fade-up">
                Luxury should encompass more than visible finishes. Our development philosophy considers advanced
                technologies intended to enhance life safety, early warning, security, resilience and long-term
                property protection.
              </p>
              <div className="mt-9 border-l border-bronze/50 pl-6">
                <p className="display-caps text-[0.95rem] text-bronze-light">Early Fire Detection</p>
                <p className="body mt-3 text-paper/55">
                  We intend to evaluate and incorporate advanced early-detection fire and smoke technologies, where
                  appropriate, alongside required fire and life-safety systems. Systems may include advanced smoke
                  detection, heat detection, early-warning sensor technology, central monitoring, automated alerts,
                  smart-building integration, fire alarm systems, fire sprinkler systems, emergency notification and
                  remote monitoring.
                </p>
                <p className="display-caps mt-5 text-[1.05rem] text-paper">Detect earlier. Respond faster.</p>
              </div>
              <p className="mt-6 text-[0.78rem] text-paper/35" data-anim="fade">
                All systems will be subject to applicable codes, approvals and professional design requirements.
              </p>
            </div>

            <div>
              <Eyebrow light className="tabular-nums">18 — Intelligent Residential Technology</Eyebrow>
              <p className="display-caps mt-4 text-[clamp(1.1rem,2.4vw,1.7rem)] text-paper" data-anim="fade-up">
                Developed for today. Designed for the future.
              </p>
              <div className="mt-8"><NumberedList items={TECHNOLOGY} light /></div>
              <p className="body mt-8 text-paper/50" data-anim="fade-up">
                Technology should enhance the residence without overwhelming the architecture.
              </p>
              <div className="mt-9"><Button href="/developments" variant="light">See What We Develop</Button></div>
            </div>
          </div>

          <div className="mt-16 border-t border-paper/12 pt-10"><Chain steps={GLOBAL_FLOW} light /></div>
        </Container>
      </Reveal>
    </>
  );
}
