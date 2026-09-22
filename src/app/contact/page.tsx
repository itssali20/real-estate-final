import type { Metadata } from "next";
import { Suspense } from "react";
import PageHero from "@/components/sections/PageHero";
import Reveal from "@/components/Reveal";
import ContactCenter from "@/components/sections/ContactCenter";
import { Container, Eyebrow, SectionTitle, Statement } from "@/components/sections/Primitives";
import { BRAND } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start the right conversation. Investor enquiries, development and property opportunities, broker introductions, media and general enquiries.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        index="35 / 39"
        eyebrow="Contact"
        title={[<>Have a property</>, <span key="a" className="italic text-bronze-light">we should see?</span>]}
        lead="We welcome introductions from property owners, brokers, developers, architects, capital partners and real-estate professionals."
        image="/images/ref-condo-rooftop-pool.webp"
        alt="Rooftop terrace and pool overlooking the city at dusk"
      />

      <Suspense fallback={<div className="min-h-[60vh] bg-paper" />}>
        <ContactCenter />
      </Suspense>

      <Reveal className="relative overflow-hidden bg-ink py-20 text-paper lg:py-28">
        <div className="grain pointer-events-none absolute inset-0" />
        <Container className="relative">
          <div className="grid gap-10 sm:grid-cols-3" data-stagger>
            <div data-anim="fade-up">
              <Eyebrow light>Investor Relations</Eyebrow>
              <a href={`mailto:${BRAND.email.investors}`} className="link-underline display mt-3 block text-[clamp(1.05rem,2vw,1.4rem)] text-bronze-light">
                {BRAND.email.investors}
              </a>
            </div>
            <div data-anim="fade-up">
              <Eyebrow light>Development Team</Eyebrow>
              <a href={`mailto:${BRAND.email.development}`} className="link-underline display mt-3 block text-[clamp(1.05rem,2vw,1.4rem)] text-bronze-light">
                {BRAND.email.development}
              </a>
            </div>
            <div data-anim="fade-up">
              <Eyebrow light>Office</Eyebrow>
              <p className="display mt-3 text-[clamp(1.05rem,2vw,1.4rem)]">{BRAND.address}</p>
            </div>
          </div>

          <div className="mt-16 border-t border-paper/12 pt-12">
            <SectionTitle light className="max-w-[20ch]" lines={[<>We develop what</>, <span key="b" className="italic text-bronze-light">should exist next.</span>]} />
            <Statement light className="mt-8 max-w-[30ch]">
              Exceptional locations. World-class architecture. Premium materials. Global sourcing.
              Intelligent technology. Experienced construction. <span className="text-bronze-light">Disciplined capital.</span>
            </Statement>
          </div>
        </Container>
      </Reveal>
    </>
  );
}
