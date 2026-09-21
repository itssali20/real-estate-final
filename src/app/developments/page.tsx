import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/sections/PageHero";
import Reveal from "@/components/Reveal";
import ProductTypes from "@/components/sections/ProductTypes";
import Button from "@/components/ui/Button";
import { Container, Eyebrow, SectionTitle, NumberedList, Statement } from "@/components/sections/Primitives";
import { PROJECTS, RESIDENCE_QUALITIES } from "@/lib/site";

export const metadata: Metadata = {
  title: "Developments",
  description:
    "Distinctive residential real estate: luxury condominiums, upscale multifamily and select estate residences developed from the ground up.",
};

export default function DevelopmentsPage() {
  return (
    <>
      <PageHero
        index="05 / 06"
        eyebrow="What We Develop"
        title={[<>Distinctive by design.</>, <span key="a" className="italic text-bronze-light">Exceptional by execution.</span>]}
        lead="Our objective is not simply to construct another building. We create properties with an identity."
        image="/images/interior-kitchen.webp"
        alt="Luxury kitchen and dining space with a city view at dusk"
      />

      <ProductTypes />

      <Reveal className="relative overflow-hidden bg-ink py-20 text-paper lg:py-28">
        <div className="grain pointer-events-none absolute inset-0" />
        <Container className="relative">
          <Eyebrow light className="tabular-nums">06 — Each development is envisioned as</Eyebrow>
          <SectionTitle light className="mt-5 max-w-[22ch]" lines={[<>A distinctive</>, <span key="b" className="italic text-bronze-light">residential experience.</span>]} />
          <div className="mt-12"><NumberedList items={RESIDENCE_QUALITIES} light /></div>
        </Container>
      </Reveal>

      <Reveal id="track-record" className="relative bg-paper py-20 lg:py-28">
        <Container>
          <Eyebrow className="tabular-nums">21 / 23 — Principal Development Experience</Eyebrow>
          <SectionTitle className="mt-5 max-w-[22ch]" lines={[<>Developed, built,</>, <span key="c" className="italic text-bronze">owned and operated.</span>]} />

          <div className="mt-14 space-y-4" data-stagger>
            {PROJECTS.map((p, i) => (
              <Link
                key={p.slug}
                href={`/developments/${p.slug}`}
                data-cursor="view"
                data-cursor-text="View"
                data-anim="fade-up"
                className="group grid items-center gap-6 border-t border-ink/12 py-8 md:grid-cols-[auto_1fr_auto_auto] md:gap-10"
              >
                <span className="eyebrow tabular-nums">{String(i + 21)}</span>
                <div>
                  <h3 className="display text-[clamp(1.5rem,3.6vw,2.9rem)] transition-colors duration-500 group-hover:text-bronze">{p.name}</h3>
                  <p className="eyebrow mt-2">{p.place}</p>
                </div>
                <p className="display-caps max-w-[22ch] text-[0.8rem] text-ink/60">{p.headline}</p>
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-paper-3 md:w-[240px]">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="(max-width:768px) 100vw, 240px"
                    className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.08]"
                  />
                </div>
              </Link>
            ))}
            <div className="border-t border-ink/12" />
          </div>

          <div className="mt-14">
            <Statement className="max-w-[26ch]">
              We don&rsquo;t seek to build commodity housing.{" "}
              <span className="text-bronze">We seek to develop distinctive residential real estate.</span>
            </Statement>
            <div className="mt-9 flex flex-wrap gap-2.5">
              <Button href="/portfolio">Principal & Partnership Portfolio</Button>
              <Button href="/contact?type=development" variant="solid">Submit a Property</Button>
            </div>
          </div>
        </Container>
      </Reveal>
    </>
  );
}
