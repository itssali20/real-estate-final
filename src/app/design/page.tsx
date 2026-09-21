import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import Reveal from "@/components/Reveal";
import Accordion from "@/components/sections/Accordion";
import Marquee from "@/components/sections/Marquee";
import Button from "@/components/ui/Button";
import { Container, Eyebrow, SectionTitle, Rule, Figure, NumberedList, Statement } from "@/components/sections/Primitives";
import { ARCHITECTURAL_LANGUAGES, MODERN_FEATURES, GEOGRAPHIES, TECHNICAL_TEAM, LOCAL_EXECUTION } from "@/lib/site";

export const metadata: Metadata = {
  title: "Architecture & Design",
  description:
    "One standard of quality. Many architectural expressions. World-class architectural talent from the United States and internationally, coordinated with California execution requirements.",
};

export default function DesignPage() {
  return (
    <>
      <PageHero
        index="07 / 11"
        eyebrow="Architecture & Design"
        title={[<>One standard of quality.</>, <span key="a" className="italic text-bronze-light">Many expressions.</span>]}
        lead="We do not believe every development should look the same. Each location deserves an architectural response appropriate to its setting, residents and market."
        image="/images/interior-living.webp"
        alt="Warm modern living space opening onto a terrace"
      />

      <Reveal className="relative bg-paper py-20 lg:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <div className="lg:sticky lg:top-[calc(var(--nav-h)+4rem)] lg:self-start">
              <Eyebrow className="tabular-nums">07 — Architectural Diversity</Eyebrow>
              <SectionTitle className="mt-5" lines={[<>Our developments</>, <>may incorporate</>]} />
              <p className="body measure-sm mt-6 text-ink/60" data-anim="fade-up">
                Architecture is fundamental to the identity and long-term desirability of every development we create.
              </p>
              <div className="mt-8"><Figure src="/images/hero-04-sketch.webp" alt="Architect’s elevation sketch of a hillside residence" ratio="aspect-[16/10]" parallax={7} /></div>
            </div>
            <div><Accordion items={ARCHITECTURAL_LANGUAGES} /></div>
          </div>
        </Container>
      </Reveal>

      <Marquee items={["Contemporary", "Warm Modern", "California Contemporary", "Modern Mediterranean", "European Contemporary", "Timeless / Transitional", "Custom Concepts"]} />

      <Reveal className="relative overflow-hidden bg-ink py-20 text-paper lg:py-28">
        <div className="grain pointer-events-none absolute inset-0" />
        <Container className="relative">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <div>
              <Eyebrow light className="tabular-nums">08 — Modern Design</Eyebrow>
              <SectionTitle light className="mt-5" lines={[<>Contemporary architecture</>, <span key="b" className="italic text-bronze-light">for contemporary living.</span>]} />
              <p className="body-lg measure-sm mt-7 text-paper/65" data-anim="fade-up">
                Modern architecture is an important part of our residential design strategy. The objective is
                architecture that feels sophisticated and enduring rather than merely fashionable.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Figure src="/images/interior-kitchen.webp" alt="Luxury kitchen with book-matched marble island" ratio="aspect-[4/5]" parallax={9} sizes="(max-width:1024px) 45vw, 24vw" />
              <Figure src="/images/hero-05-model.webp" alt="Architectural massing model on a dark plinth" ratio="aspect-[4/5]" className="mt-12" parallax={-7} sizes="(max-width:1024px) 45vw, 24vw" />
            </div>
          </div>
          <Rule light className="my-14" />
          <div><NumberedList items={MODERN_FEATURES} light /></div>
        </Container>
      </Reveal>

      <Reveal className="relative bg-paper-2 py-20 lg:py-28">
        <Container>
          <Eyebrow className="tabular-nums">09 — World-Class Architecture</Eyebrow>
          <SectionTitle className="mt-5 max-w-[20ch]" lines={[<>Global perspective.</>, <span key="c" className="italic text-bronze">Distinctive design.</span>]} />
          <p className="body-lg measure mt-7 text-ink/65" data-anim="fade-up">
            Our vision is to collaborate with exceptional and award-winning architectural talent from the
            United States and internationally.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5" data-stagger>
            {GEOGRAPHIES.map((g, i) => (
              <article key={g.c} data-anim="fade-up" className="group border-t border-ink/12 pt-5">
                <div className="flex items-baseline justify-between">
                  <h3 className="display text-[clamp(1.2rem,2.2vw,1.7rem)] transition-colors duration-500 group-hover:text-bronze">{g.c}</h3>
                  <span className="eyebrow tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <p className="body mt-3 text-ink/55">{g.d}</p>
                <p className="eyebrow mt-4 text-bronze">{g.tags.join(" · ")}</p>
              </article>
            ))}
          </div>

          <div className="mt-16 border-t border-ink/12 pt-10">
            <Statement className="max-w-[26ch]">
              One project. One location.{" "}
              <span className="text-bronze">One distinctive architectural identity.</span>
            </Statement>
            <p className="body measure mt-6 text-ink/60" data-anim="fade-up">
              Not every architect is right for every property. Our objective is to identify architectural talent whose
              vision, experience and design language fit the individual development.
            </p>
          </div>
        </Container>
      </Reveal>

      <Reveal className="relative bg-paper py-20 lg:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <Eyebrow className="tabular-nums">10 — International Design & Technical Team</Eyebrow>
              <SectionTitle className="mt-5" lines={[<>Talent without</>, <span key="d" className="italic text-bronze">borders.</span>]} />
              <p className="body measure-sm mt-6 text-ink/60" data-anim="fade-up">
                Our extended development platform is designed to draw upon dynamic and talented professionals in the
                United States and internationally. International design resources work in coordination with appropriately
                licensed U.S. and local professionals where required.
              </p>
              <p className="display-caps mt-7 text-[0.95rem] text-bronze" data-anim="fade-up">
                Find the right talent for the project — wherever that talent is located.
              </p>
            </div>
            <div>
              <div className="grid gap-x-8 sm:grid-cols-2" data-stagger>
                {TECHNICAL_TEAM.map((t, i) => (
                  <div key={t} data-anim="fade-up" className="flex items-baseline gap-4 border-b border-ink/10 py-3">
                    <span className="eyebrow tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                    <span className="display-caps text-[0.82rem] text-ink/80">{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Reveal>

      <Reveal className="relative overflow-hidden bg-ink py-20 text-paper lg:py-28">
        <div className="grain pointer-events-none absolute inset-0" />
        <Container className="relative">
          <Eyebrow light className="tabular-nums">11 — Global Design. Local Execution.</Eyebrow>
          <SectionTitle light className="mt-5 max-w-[22ch]" lines={[<>International vision must</>, <>become a building that can</>, <span key="e" className="italic text-bronze-light">be permitted and built.</span>]} />
          <p className="body-lg measure mt-7 text-paper/65" data-anim="fade-up">
            Our development teams coordinate design with the applicable California requirements from the outset.
          </p>
          <div className="mt-12"><NumberedList items={LOCAL_EXECUTION} light /></div>
          <div className="mt-12 border-t border-paper/12 pt-10">
            <Statement light>Global design. <span className="text-bronze-light">Built for California.</span></Statement>
            <div className="mt-8"><Button href="/sourcing" variant="light">Global Material Sourcing</Button></div>
          </div>
        </Container>
      </Reveal>
    </>
  );
}
