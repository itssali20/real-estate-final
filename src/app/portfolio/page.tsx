import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/sections/PageHero";
import Reveal from "@/components/Reveal";
import PortfolioMap from "@/components/sections/PortfolioMap";
import Counter from "@/components/sections/Counter";
import Button from "@/components/ui/Button";
import { Container, Eyebrow, SectionTitle, Statement } from "@/components/sections/Primitives";
import { PROJECTS, PORTFOLIO, INVESTOR_JOURNEY } from "@/lib/site";

export const metadata: Metadata = {
  title: "Experience & Portfolio",
  description:
    "Principal and partnership experience across office, retail, residential, multifamily, medical office, hospitality and mixed-use real estate in California, Washington and Nevada.",
};

export default function PortfolioPage() {
  return (
    <>
      <PageHero
        index="20 / 26"
        eyebrow="Experience Before The Platform"
        title={[<>Before asking investors to</>, <>participate in the future,</>, <span key="a" className="italic text-bronze-light">we show the past.</span>]}
        lead="Our principals bring experience across ground-up residential development, luxury home development, commercial real estate, property ownership, construction, leasing, asset management, joint ventures, real-estate law and capital strategy."
        image="/images/ref-interior-great-room.webp"
        alt="Double-height great room with skyline views at dusk"
      />

      <Reveal className="relative bg-paper py-20 lg:py-28">
        <Container>
          <div className="grid gap-8 sm:grid-cols-3" data-stagger>
            <div data-anim="fade-up">
              <p className="display text-[clamp(2.2rem,5vw,3.8rem)] text-bronze"><Counter to={1.5} decimals={1} suffix="M+" /></p>
              <p className="eyebrow mt-2">Square Feet — Historically Reported</p>
            </div>
            <div data-anim="fade-up">
              <p className="display text-[clamp(2.2rem,5vw,3.8rem)] text-bronze"><Counter to={12} /></p>
              <p className="eyebrow mt-2">Selected Properties</p>
            </div>
            <div data-anim="fade-up">
              <p className="display text-[clamp(2.2rem,5vw,3.8rem)] text-bronze"><Counter to={3} /></p>
              <p className="eyebrow mt-2">States — California · Washington · Nevada</p>
            </div>
          </div>
        </Container>
      </Reveal>

      <Reveal className="relative bg-paper-2 py-20 lg:py-28">
        <Container>
          <Eyebrow className="tabular-nums">21 / 23 — Principal Development Experience</Eyebrow>
          <SectionTitle className="mt-5 max-w-[20ch]" lines={[<>Ground-up residential</>, <span key="b" className="italic text-bronze">development.</span>]} />

          <div className="mt-12 grid gap-8 lg:grid-cols-3" data-stagger>
            {PROJECTS.map((p, i) => (
              <Link key={p.slug} href={`/developments/${p.slug}`} data-cursor="view" data-anim="fade-up" className="group block">
                <div data-img-reveal className="relative aspect-[4/3] overflow-hidden bg-paper-3">
                  <div className="absolute inset-0 transition-transform duration-[1200ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.06]">
                    <Image src={p.image} alt={p.name} fill sizes="(max-width:1024px) 92vw, 30vw" className="object-cover" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent opacity-80" />
                  <span className="absolute right-5 top-5 eyebrow eyebrow-light tabular-nums">{String(i + 21)}</span>
                  <div className="absolute bottom-0 left-0 p-6 text-paper">
                    <p className="eyebrow eyebrow-light">{p.place}</p>
                    <h3 className="display mt-2 text-[clamp(1.25rem,2.2vw,1.8rem)]">{p.name}</h3>
                  </div>
                </div>
                <p className="display-caps mt-4 text-[0.8rem] text-bronze">{p.headline}</p>
              </Link>
            ))}
          </div>
        </Container>
      </Reveal>

      <Reveal id="cardinal" className="relative bg-paper py-20 lg:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div className="lg:sticky lg:top-[calc(var(--nav-h)+4rem)] lg:self-start">
              <Eyebrow className="tabular-nums">24 / 25 — Peter Cohen / Cardinal Equities</Eyebrow>
              <SectionTitle className="mt-5" lines={[<>Decades of principal</>, <span key="c" className="italic text-bronze">real-estate experience.</span>]} />
              <p className="body measure-sm mt-6 text-ink/60" data-anim="fade-up">
                Peter Cohen is the founder and principal of Cardinal Equities, a Beverly Hills-based private real-estate
                investment and development business. Through holding companies, partnerships and joint ventures,
                Peter&rsquo;s publicly reported experience encompasses a historically reported portfolio exceeding
                1.5 million square feet across multiple real-estate categories and markets.
              </p>
              <p className="body measure-sm mt-4 text-ink/55" data-anim="fade-up">
                Experience across office, retail, residential, multifamily, medical office, hospitality, mixed-use,
                acquisition, leasing, repositioning and asset management.
              </p>
              <div className="mt-8"><Button href="/leadership">Meet the Principals</Button></div>
            </div>

            <div data-stagger>
              {PORTFOLIO.slice(0, 9).map((p, i) => (
                <article key={p.name} data-anim="fade-up" className="group grid grid-cols-[auto_1fr] gap-5 border-t border-ink/10 py-6 last:border-b">
                  <span className="eyebrow tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <div className="flex flex-wrap items-baseline justify-between gap-3">
                      <h3 className="display text-[clamp(1.15rem,2.2vw,1.65rem)] transition-colors duration-500 group-hover:text-bronze">{p.name}</h3>
                      <span className="eyebrow text-bronze">{p.type}</span>
                    </div>
                    <p className="eyebrow mt-1.5">{p.place}</p>
                    <p className="body mt-2.5 text-ink/55">{p.detail}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </Reveal>

      <PortfolioMap />

      <Reveal className="relative bg-paper-2 py-20 lg:py-28">
        <Container>
          <Eyebrow className="tabular-nums">45 — Investor Website Journey</Eyebrow>
          <SectionTitle className="mt-5 max-w-[22ch]" lines={[<>What an investor</>, <span key="d" className="italic text-bronze">should understand.</span>]} />
          <div className="mt-12 grid gap-x-12 lg:grid-cols-2" data-stagger>
            {INVESTOR_JOURNEY.map((t, i) => (
              <div key={t} data-anim="fade-up" className="flex items-baseline gap-5 border-b border-ink/10 py-4">
                <span className="eyebrow tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <span className="display-caps text-[0.85rem] leading-relaxed text-ink/80">{t}</span>
              </div>
            ))}
          </div>
          <div className="mt-14">
            <Statement className="max-w-[26ch]">
              Access. Transparency. Real assets.{" "}
              <span className="text-bronze">Experienced execution.</span>
            </Statement>
            <div className="mt-9 flex flex-wrap gap-2.5">
              <Button href="/investors#opportunities" variant="solid">Explore Opportunities</Button>
              <Button href="/contact?type=call">Request a Call</Button>
            </div>
          </div>
        </Container>
      </Reveal>
    </>
  );
}
