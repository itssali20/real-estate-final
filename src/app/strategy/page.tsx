import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/sections/PageHero";
import Reveal from "@/components/Reveal";
import ValueChain from "@/components/sections/ValueChain";
import Marquee from "@/components/sections/Marquee";
import Button from "@/components/ui/Button";
import { Container, Eyebrow, SectionTitle, Rule, Figure, NumberedList, Statement } from "@/components/sections/Primitives";
import { MARKET_CRITERIA, VALUE_LEVERS, PLATFORM, BRAND_PILLARS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Strategy",
  description:
    "Ground-up development of luxury multifamily and condominium properties in premier, supply-constrained markets. Disciplined acquisition, thoughtful design, sophisticated capitalization.",
};

export default function StrategyPage() {
  return (
    <>
      <PageHero
        index="02 / 03"
        eyebrow="Our Vision & Strategy"
        title={[<>Developing value in</>, <span key="a" className="italic text-bronze-light">exceptional locations.</span>]}
        lead="We specialize in the ground-up development of luxury multifamily and condominium properties in premier, supply-constrained markets."
        image="/images/hero-03-bel-air.webp"
        alt="Aerial over the Bel-Air hills toward the Los Angeles skyline"
      />

      <Reveal className="relative bg-paper py-20 lg:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-20">
            <div>
              <Eyebrow>Exceptional real estate begins with exceptional locations</Eyebrow>
              <SectionTitle className="mt-5" lines={[<>Identify potential.</>, <span key="b" className="italic text-bronze">Transform it.</span>]} />
              <p className="body-lg measure mt-7 text-ink/65" data-anim="fade-up">
                Our objective is to identify properties with unrealized potential and transform them into sophisticated
                residential developments distinguished by architecture, materials, technology, quality and execution.
              </p>
              <p className="body measure mt-5 text-ink/55" data-anim="fade-up">
                Our strategy is to identify exceptional locations with strong fundamentals, high barriers to entry,
                limited new supply and enduring residential demand — and transform those opportunities into distinctive
                residential properties.
              </p>
              <Rule className="my-10" />
              <Eyebrow>We seek markets characterised by</Eyebrow>
              <div className="mt-6"><NumberedList items={MARKET_CRITERIA} /></div>
            </div>
            <div className="grid gap-4">
              <Figure src="/images/hero-02-beverly-hills.webp" alt="Aerial over Beverly Hills at golden hour" ratio="aspect-[16/9]" parallax={8} />
              <Figure src="/images/hero-07-completed.webp" alt="Completed residence and infinity pool at blue hour" ratio="aspect-[16/9]" className="ml-auto w-[88%]" parallax={-6} />
            </div>
          </div>
        </Container>
      </Reveal>

      <Marquee items={["Disciplined Acquisition", "Thoughtful Design", "Sophisticated Capitalization", "Rigorous Execution", "Global Procurement", "Construction Excellence", "Operational Discipline"]} />

      <Reveal id="levers" className="relative bg-paper-2 py-20 lg:py-28">
        <Container>
          <Eyebrow className="tabular-nums">03 — We seek to create value through</Eyebrow>
          <SectionTitle className="mt-5 max-w-[20ch]" lines={[<>Seven disciplines,</>, <span key="c" className="italic text-bronze">one execution standard.</span>]} />
          <div className="mt-12 grid gap-8 lg:grid-cols-3" data-stagger>
            {VALUE_LEVERS.map((v, i) => (
              <article key={v.t} data-anim="fade-up" className="group relative border-t border-ink/12 pt-6">
                <span className="absolute left-0 top-0 block h-px w-0 bg-bronze transition-[width] duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:w-full" />
                <span className="eyebrow tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="display mt-3 text-[clamp(1.15rem,2.2vw,1.65rem)]">{v.t}</h3>
                <p className="body mt-3 text-ink/60">{v.d}</p>
              </article>
            ))}
          </div>
        </Container>
      </Reveal>

      <div id="process"><ValueChain /></div>

      <Reveal className="relative bg-paper py-20 lg:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div className="lg:sticky lg:top-[calc(var(--nav-h)+4rem)] lg:self-start">
              <Eyebrow className="tabular-nums">28 — One Integrated Platform</Eyebrow>
              <SectionTitle className="mt-5" lines={[<>Development + Investment</>, <>+ Design + Global Sourcing</>, <span key="d" className="italic text-bronze">+ Construction + Capital.</span>]} />
              <div className="mt-9"><Button href="/leadership">Meet the Leadership</Button></div>
            </div>
            <div data-stagger>
              {PLATFORM.map((p) => (
                <div key={p.k} data-anim="fade-up" className="group grid grid-cols-[auto_1fr] gap-6 border-t border-ink/10 py-7 last:border-b">
                  <span className="eyebrow tabular-nums">{p.k}</span>
                  <div>
                    <h3 className="display-caps text-[0.95rem] transition-colors duration-500 group-hover:text-bronze">{p.t}</h3>
                    <p className="body mt-2 text-ink/55">{p.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Reveal>

      <Reveal className="relative overflow-hidden bg-ink py-20 text-paper lg:py-28">
        <Image
          src="/images/strategy-construction-golden.webp"
          alt="Framing crew working a high-rise construction site at golden hour"
          fill
          sizes="100vw"
          className="kenburns object-cover opacity-30"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/85 to-ink/70" />
        <div className="grain pointer-events-none absolute inset-0" />
        <Container className="relative">
          <Eyebrow light className="tabular-nums">19 — Quality as an Investment Strategy</Eyebrow>
          <SectionTitle light className="mt-5 max-w-[20ch]" lines={[<>Quality is part of</>, <span key="e" className="italic text-bronze-light">the business plan.</span>]} />
          <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-20">
            <p className="body-lg measure text-paper/70" data-anim="fade-up">
              In premium residential markets, we believe thoughtful architecture, carefully selected materials,
              desirable amenities and disciplined construction can differentiate a property within its competitive market.
            </p>
            <p className="body-lg measure text-paper/70" data-anim="fade-up">
              Our objective is to combine premium residential product with disciplined procurement and construction
              economics. We don&rsquo;t seek to build commodity housing — we seek to develop distinctive residential real estate.
            </p>
          </div>
          <div className="mt-12 border-t border-paper/12 pt-10">
            <Statement light className="max-w-[28ch]">
              Premium product. Disciplined procurement. Distinctive design.{" "}
              <span className="text-bronze-light">Experienced execution.</span>
            </Statement>
          </div>

          <div className="mt-14 grid gap-x-10 lg:grid-cols-2" data-stagger>
            {BRAND_PILLARS.map((p, i) => (
              <div key={p.t} data-anim="fade-up" className="group grid grid-cols-[auto_1fr] gap-6 border-b border-paper/10 py-6">
                <span className="eyebrow eyebrow-light tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="display text-[clamp(1.2rem,2.4vw,1.8rem)] transition-colors duration-500 group-hover:text-bronze-light">{p.t}</h3>
                  <p className="body measure mt-2 text-paper/55">{p.d}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Reveal>
    </>
  );
}
