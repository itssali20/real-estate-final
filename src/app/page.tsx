import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/hero/Hero";
import Reveal from "@/components/Reveal";
import Marquee from "@/components/sections/Marquee";
import StatementBand from "@/components/sections/StatementBand";
import ValueChain from "@/components/sections/ValueChain";
import ProductTypes from "@/components/sections/ProductTypes";
import Counter from "@/components/sections/Counter";
import Button from "@/components/ui/Button";
import {
  Container, Eyebrow, SectionTitle, Rule, Figure, NumberedList, Statement, Chain,
} from "@/components/sections/Primitives";
import {
  PLATFORM, MARKET_CRITERIA, VALUE_LEVERS, RESIDENCE_QUALITIES, PROJECTS,
  BRAND_PILLARS, GLOBAL_FLOW, GEOGRAPHIES, BRAND, INVEST_STEPS,
} from "@/lib/site";

export default function Home() {
  return (
    <>
      <Hero />

      {/* 01 — Platform */}
      <Reveal className="relative bg-paper py-20 lg:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <div className="lg:sticky lg:top-[calc(var(--nav-h)+4rem)] lg:self-start">
              <div className="flex items-center gap-4">
                <Eyebrow className="tabular-nums">01</Eyebrow>
                <span className="h-px w-10 bg-bronze" />
                <Eyebrow>One Integrated Platform</Eyebrow>
              </div>
              <SectionTitle
                className="mt-6"
                lines={[<>Decades of principal</>, <>experience, brought</>, <span key="a" className="italic text-bronze">together.</span>]}
              />
              <p className="body-lg measure-sm mt-7 text-ink/65" data-anim="fade-up">
                Our platform brings together development, investment, construction, architecture, global procurement,
                capital and asset management under a single discipline.
              </p>
              <div className="mt-9" data-anim="fade-up">
                <Button href="/strategy">Explore Our Platform</Button>
              </div>
            </div>

            <div data-stagger>
              {PLATFORM.map((p) => (
                <div key={p.k} data-anim="fade-up" className="group grid grid-cols-[auto_1fr] gap-5 border-t border-ink/10 py-7 last:border-b sm:grid-cols-[auto_0.9fr_1.1fr] sm:gap-8">
                  <span className="eyebrow tabular-nums">{p.k}</span>
                  <h3 className="display-caps text-[0.98rem] leading-snug transition-colors duration-500 group-hover:text-bronze">{p.t}</h3>
                  <p className="body col-span-2 text-ink/55 sm:col-span-1">{p.d}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Reveal>

      <Marquee items={["Exceptional Locations", "World-Class Design", "Global Resources", "Disciplined Procurement", "Experienced Execution", "Enduring Value"]} />

      {/* 02 — Vision */}
      <Reveal className="relative overflow-hidden bg-ink py-20 text-paper lg:py-28">
        <div className="grain pointer-events-none absolute inset-0" />
        <Container className="relative">
          <div className="flex items-center gap-4">
            <Eyebrow light className="tabular-nums">02</Eyebrow>
            <span className="h-px w-10 bg-bronze" />
            <Eyebrow light>Our Vision</Eyebrow>
          </div>

          <SectionTitle
            light
            className="mt-6 max-w-[20ch]"
            lines={[<>Exceptional real estate</>, <>begins with exceptional</>, <span key="b" className="italic text-bronze-light">locations.</span>]}
          />

          <div className="mt-14 grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
            <div>
              <p className="body-lg measure text-paper/70" data-anim="fade-up">
                Our objective is to identify properties with unrealized potential and transform them into sophisticated
                residential developments distinguished by architecture, materials, technology, quality and execution.
              </p>
              <Rule light className="my-10" />
              <Eyebrow light>We seek markets characterised by</Eyebrow>
              <div className="mt-6"><NumberedList items={MARKET_CRITERIA} light /></div>
              <p className="body mt-10 text-paper/50 measure" data-anim="fade-up">
                Our principals&rsquo; experience includes Beverly Hills, Bel-Air and other premier communities throughout
                Los Angeles and Southern California. Future developments may extend into other California markets and
                select locations that meet our investment and development criteria.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Figure src="/images/interior-living.webp" alt="Warm modern living room opening to a terrace" ratio="aspect-[16/10]" parallax={10} sizes="(max-width:1024px) 45vw, 24vw" />
              <Figure src="/images/hero-02-beverly-hills.webp" alt="Aerial over Beverly Hills at golden hour" ratio="aspect-[16/10]" className="mt-10" parallax={-8} sizes="(max-width:1024px) 45vw, 24vw" />
              <Figure src="/images/hero-01-coastline.webp" alt="The California coastline at golden hour" ratio="aspect-[16/9]" className="col-span-2" parallax={6} sizes="(max-width:1024px) 92vw, 48vw" />
            </div>
          </div>
        </Container>
      </Reveal>

      {/* 03 — Strategy */}
      <Reveal className="relative bg-paper-2 py-20 lg:py-28">
        <Container>
          <div className="flex items-center gap-4">
            <Eyebrow className="tabular-nums">03</Eyebrow>
            <span className="h-px w-10 bg-bronze" />
            <Eyebrow>Investment &amp; Development Strategy</Eyebrow>
          </div>
          <SectionTitle className="mt-6 max-w-[18ch]" lines={[<>Developing value in</>, <span key="c" className="italic text-bronze">exceptional locations.</span>]} />

          <div className="mt-12 grid gap-10 lg:grid-cols-3 lg:gap-8" data-stagger>
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

      <StatementBand
        image="/images/hero-03-bel-air.webp"
        alt="Contemporary residence opening onto a hillside terrace"
        eyebrow="03 — Investment & Development Strategy"
        lines={[<>Exceptional locations.</>, <>Disciplined development.</>, <span key="a" className="text-bronze-light">Enduring value.</span>]}
        lead="We specialize in the ground-up development of luxury multifamily and condominium properties in premier, supply-constrained markets — then hold, operate and realize value with the same discipline."
        facts={[
          { k: "Square Feet — Historically Reported", v: "1.5M+" },
          { k: "Years Construction Experience", v: "25+" },
          { k: "Disciplines Under One Platform", v: "7" },
          { k: "Steps In The Value Chain", v: "12" },
        ]}
        actions={[{ href: "/strategy", label: "Our Full Strategy" }, { href: "/developments", label: "What We Develop" }]}
      />

      {/* 04 — Value chain (pinned horizontal) */}
      <ValueChain />

      {/* 05 — What we develop */}
      <ProductTypes />

      {/* 06 — Residences */}
      <Reveal className="relative overflow-hidden bg-ink py-20 text-paper lg:py-28">
        <div className="grain pointer-events-none absolute inset-0" />
        <Container className="relative">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <div>
              <div className="flex items-center gap-4">
                <Eyebrow light className="tabular-nums">06</Eyebrow>
                <span className="h-px w-10 bg-bronze" />
                <Eyebrow light>The Residences We Create</Eyebrow>
              </div>
              <SectionTitle light className="mt-6" lines={[<>Distinctive by design.</>, <span key="d" className="italic text-bronze-light">Exceptional by execution.</span>]} />
              <p className="body-lg measure-sm mt-7 text-paper/65" data-anim="fade-up">
                Our objective is not simply to construct another building. We create properties with an identity —
                each development envisioned as a distinctive residential experience.
              </p>
              <p className="body measure-sm mt-6 text-paper/45" data-anim="fade-up">
                From the first architectural concept through final material selection, we seek residences that
                distinguish themselves through design, quality, functionality and attention to detail.
              </p>
            </div>
            <Figure src="/images/interior-kitchen.webp" alt="Luxury kitchen and dining space with city views" ratio="aspect-[16/10]" parallax={9} sizes="(max-width:1024px) 92vw, 46vw" />
          </div>

          <div className="mt-14"><NumberedList items={RESIDENCE_QUALITIES} light /></div>
        </Container>
      </Reveal>

      {/* Global flow */}
      <Reveal className="relative bg-paper py-20 lg:py-28">
        <Container>
          <div className="flex items-center gap-4">
            <Eyebrow className="tabular-nums">44</Eyebrow>
            <span className="h-px w-10 bg-bronze" />
            <Eyebrow>Global Visual Story</Eyebrow>
          </div>
          <SectionTitle className="mt-6 max-w-[20ch]" lines={[<>The world&rsquo;s resources.</>, <span key="e" className="italic text-bronze">Brought to one development.</span>]} />

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

          <div className="mt-14 border-t border-ink/12 pt-8"><Chain steps={GLOBAL_FLOW} /></div>
        </Container>
      </Reveal>

      {/* Track record */}
      <Reveal className="relative bg-paper-2 py-20 lg:py-28">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-4">
                <Eyebrow className="tabular-nums">20</Eyebrow>
                <span className="h-px w-10 bg-bronze" />
                <Eyebrow>Experience Before The Platform</Eyebrow>
              </div>
              <SectionTitle className="mt-6 max-w-[22ch]" lines={[<>Before asking investors to</>, <>participate in the future, we show</>, <span key="f" className="italic text-bronze">what our principals have done.</span>]} />
            </div>
            <Button href="/developments" className="mb-2">All Developments</Button>
          </div>

          <div className="mt-14 grid gap-8 lg:grid-cols-3" data-stagger>
            {PROJECTS.map((p, i) => (
              <Link key={p.slug} href={`/developments/${p.slug}`} data-cursor="view" data-anim="fade-up" className="group block">
                <div data-img-reveal className="relative aspect-[4/3] overflow-hidden bg-paper-3">
                  <div className="absolute inset-0 transition-transform duration-[1200ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.06]">
                    <Image src={p.image} alt={p.name} fill sizes="(max-width:1024px) 100vw, 33vw" className="object-cover" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-0 left-0 p-6 text-paper">
                    <p className="eyebrow eyebrow-light">{p.place}</p>
                    <h3 className="display mt-2 text-[clamp(1.25rem,2.2vw,1.8rem)]">{p.name}</h3>
                  </div>
                  <span className="absolute right-5 top-5 eyebrow eyebrow-light tabular-nums">{String(i + 21)}</span>
                </div>
                <p className="display-caps mt-4 text-[0.82rem] text-bronze">{p.headline}</p>
                <p className="body mt-2 text-ink/55">{p.summary}</p>
              </Link>
            ))}
          </div>

          <div className="mt-16 grid gap-8 border-t border-ink/12 pt-10 sm:grid-cols-3" data-stagger>
            <div data-anim="fade-up">
              <p className="display text-[clamp(2rem,4.6vw,3.4rem)] text-bronze"><Counter to={1.5} decimals={1} suffix="M+" /></p>
              <p className="eyebrow mt-1">Square Feet — Historically Reported</p>
            </div>
            <div data-anim="fade-up">
              <p className="display text-[clamp(2rem,4.6vw,3.4rem)] text-bronze"><Counter to={25} suffix="+" /></p>
              <p className="eyebrow mt-1">Years Construction Experience</p>
            </div>
            <div data-anim="fade-up">
              <p className="display text-[clamp(2rem,4.6vw,3.4rem)] text-bronze"><Counter to={3} /></p>
              <p className="eyebrow mt-1">Complementary Disciplines</p>
            </div>
          </div>
        </Container>
      </Reveal>

      {/* Investors */}
      <Reveal className="relative overflow-hidden bg-ink py-20 text-paper lg:py-28">
        <div className="grain pointer-events-none absolute inset-0" />
        <Container className="relative">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <div>
              <div className="flex items-center gap-4">
                <Eyebrow light className="tabular-nums">29</Eyebrow>
                <span className="h-px w-10 bg-bronze" />
                <Eyebrow light>Investment Opportunities</Eyebrow>
              </div>
              <SectionTitle light className="mt-6" lines={[<>Invest in the</>, <span key="g" className="italic text-bronze-light">creation of real estate.</span>]} />
              <p className="body-lg measure-sm mt-7 text-paper/65" data-anim="fade-up">
                Rather than simply contributing capital to an existing building, investors may have the opportunity to
                participate in the development process through appropriately structured offerings.
              </p>
              <div className="mt-9 flex flex-wrap gap-2.5" data-stagger>
                <Button href="/investors#opportunities" variant="solid" data-anim="fade-up">Explore Opportunities</Button>
                <Button href="/investors/login" variant="light" data-anim="fade-up">Investor Login</Button>
              </div>
            </div>

            <div data-stagger>
              {INVEST_STEPS.slice(0, 4).map((s) => (
                <div key={s.n} data-anim="fade-up" className="group flex items-baseline gap-6 border-t border-paper/12 py-6 last:border-b">
                  <span className="eyebrow eyebrow-light tabular-nums">{s.n}</span>
                  <div>
                    <h3 className="display-caps text-[0.95rem] transition-colors duration-500 group-hover:text-bronze-light">{s.t}</h3>
                    <p className="body mt-1.5 text-paper/55">{s.d}</p>
                  </div>
                </div>
              ))}
              <Link href="/investors#how" className="mt-7 inline-flex items-center gap-3 label-caps text-bronze-light link-underline" data-cursor="hover">
                See all eight steps
                <span className="block h-px w-8 bg-bronze-light" />
              </Link>
            </div>
          </div>
        </Container>
      </Reveal>

      {/* Brand pillars */}
      <Reveal className="relative bg-paper py-20 lg:py-28">
        <Container>
          <div className="flex items-center gap-4">
            <Eyebrow className="tabular-nums">47</Eyebrow>
            <span className="h-px w-10 bg-bronze" />
            <Eyebrow>Brand Pillars</Eyebrow>
          </div>
          <div className="mt-10 grid gap-x-10 gap-y-0 lg:grid-cols-2" data-stagger>
            {BRAND_PILLARS.map((p, i) => (
              <div key={p.t} data-anim="fade-up" className="group grid grid-cols-[auto_1fr] gap-6 border-b border-ink/10 py-7">
                <span className="eyebrow tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="display text-[clamp(1.3rem,2.6vw,2rem)] transition-colors duration-500 group-hover:text-bronze">{p.t}</h3>
                  <p className="body measure mt-2 text-ink/60">{p.d}</p>
                </div>
              </div>
            ))}
          </div>

        </Container>
      </Reveal>

      <StatementBand
        image="/images/hero-07-completed.webp"
        alt="Completed luxury residence at dusk"
        align="center"
        eyebrow={BRAND.disciplines.join("  —  ")}
        lines={[<>Great real estate</>, <>doesn&rsquo;t simply exist.</>, <span key="b" className="text-bronze-light">Someone has to create it.</span>]}
        lead="Location × Vision × Architecture × Capital × Global Sourcing × Construction × Execution. We develop what should exist next."
        actions={[
          { href: "/investors#opportunities", label: "Invest in What's Next", solid: true },
          { href: "/contact?type=development", label: "Submit a Property" },
          { href: "/contact?type=call", label: "Request a Call" },
        ]}
      />
    </>
  );
}
