import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/sections/PageHero";
import Reveal from "@/components/Reveal";
import DevTimeline from "@/components/sections/DevTimeline";
import Marquee from "@/components/sections/Marquee";
import Button from "@/components/ui/Button";
import { Container, Eyebrow, SectionTitle, Rule, Figure, Statement, Chain } from "@/components/sections/Primitives";
import { INVEST_STEPS, DASHBOARD_ITEMS, VALUE_CHAIN, BRAND } from "@/lib/site";

export const metadata: Metadata = {
  title: "Investor Relations",
  description:
    "Invest in the creation of real estate. Access to carefully selected residential development opportunities through appropriately structured offerings.",
};

export default function InvestorsPage() {
  return (
    <>
      <PageHero
        index="29 / 34"
        eyebrow="Investment Opportunities"
        title={[<>Invest in the</>, <span key="a" className="italic text-bronze-light">creation of real estate.</span>]}
        lead="Our objective is to provide eligible investors with access to carefully selected residential development opportunities."
        image="/images/hero-07-completed.webp"
        alt="Completed residence and infinity pool above Los Angeles at blue hour"
      />

      <Reveal id="why" className="relative bg-paper py-20 lg:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
            <div>
              <Eyebrow className="tabular-nums">04 — Why Development?</Eyebrow>
              <SectionTitle className="mt-5" lines={[<>We don&rsquo;t simply</>, <>buy real estate.</>, <span key="b" className="italic text-bronze">We create it.</span>]} />
              <p className="body-lg measure mt-7 text-ink/65" data-anim="fade-up">
                Traditional real-estate investment often begins after a property has already been developed.
                Our strategy begins earlier. We seek opportunities where development expertise can transform land or
                underutilized properties into fundamentally different residential assets.
              </p>
              <Rule className="my-10" />
              <Eyebrow>Our Value-Creation Process</Eyebrow>
              <div className="mt-5"><Chain steps={VALUE_CHAIN} /></div>
              <p className="body measure mt-8 text-ink/50" data-anim="fade-up">
                Development involves substantial risks. Our objective is to manage those risks through disciplined
                underwriting, experienced execution, thoughtful project selection and active oversight.
              </p>
            </div>
            <Figure src="/images/hero-06-construction.webp" alt="Residence under construction at dusk" ratio="aspect-[16/9]" parallax={8} />
          </div>
        </Container>
      </Reveal>

      <Reveal id="opportunities" className="relative overflow-hidden bg-ink py-20 text-paper lg:py-28">
        <div className="grain pointer-events-none absolute inset-0" />
        <Container className="relative">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <Eyebrow light className="tabular-nums">29 / 30 — A Broader Investor Community</Eyebrow>
              <SectionTitle light className="mt-5" lines={[<>Access to</>, <span key="c" className="italic text-bronze-light">real-estate development.</span>]} />
              <p className="body-lg measure-sm mt-7 text-paper/65" data-anim="fade-up">
                Rather than simply contributing capital to an existing building, investors may have the opportunity to
                participate in the development process through appropriately structured offerings.
              </p>
              <p className="body measure-sm mt-5 text-paper/50" data-anim="fade-up">
                Our objective is to evaluate investment structures capable of providing access to a broader community of
                eligible investors, potentially including accredited and non-accredited investors where permitted by
                applicable law and the structure of the offering. Investment availability, minimum investment amounts,
                eligibility requirements and applicable investment limits will depend upon each offering.
              </p>
              <div className="mt-9 flex flex-wrap gap-2.5">
                <Button href="/contact?type=investor" variant="solid">Request Investment Information</Button>
                <Button href="/investors/login" variant="light">Investor Login</Button>
              </div>
            </div>

            <div>
              <p className="eyebrow eyebrow-light">Each opportunity page can present</p>
              <div className="mt-6 grid gap-x-8 sm:grid-cols-2" data-stagger>
                {["The Property", "The Vision", "Investment Thesis", "Business Plan", "Project Status", "The Team", "Offering Information", "Development Progress"].map((t, i) => (
                  <div key={t} data-anim="fade-up" className="flex items-baseline gap-4 border-b border-paper/10 py-3.5">
                    <span className="eyebrow eyebrow-light tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                    <span className="display-caps text-[0.85rem] text-paper/85">{t}</span>
                  </div>
                ))}
              </div>
              <div className="mt-10 border border-paper/15 p-7">
                <p className="eyebrow eyebrow-light">Current Status</p>
                <p className="display mt-3 text-[clamp(1.2rem,2.4vw,1.8rem)]">
                  Offerings are in preparation. <span className="text-bronze-light">Register interest to be notified.</span>
                </p>
                <p className="body mt-4 text-paper/50">
                  Nothing on this page constitutes an offer to sell or a solicitation of an offer to buy any security.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Reveal>

      <Marquee items={["Access", "Transparency", "Real Assets", "Experienced Execution"]} />

      <Reveal id="how" className="relative bg-paper py-20 lg:py-28">
        <Container>
          <Eyebrow className="tabular-nums">31 — How to Invest</Eyebrow>
          <SectionTitle className="mt-5 max-w-[20ch]" lines={[<>From interest</>, <span key="d" className="italic text-bronze">to investment.</span>]} />

          <div className="mt-14 grid gap-x-12 lg:grid-cols-2" data-stagger>
            {INVEST_STEPS.map((s) => (
              <div key={s.n} data-anim="fade-up" className="group grid grid-cols-[auto_1fr] gap-6 border-b border-ink/10 py-7">
                <span className="display text-[clamp(1.6rem,3vw,2.3rem)] text-bronze/40 transition-colors duration-500 group-hover:text-bronze">{s.n}</span>
                <div>
                  <h3 className="display text-[clamp(1.15rem,2.2vw,1.6rem)]">{s.t}</h3>
                  <p className="body mt-2 text-ink/60">{s.d}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap gap-2.5">
            <Button href="/contact?type=investor" variant="solid">Start Investing</Button>
            <Button href="/contact?type=investor">Request Information</Button>
            <Button href="/contact?type=call">Request a Call</Button>
          </div>
        </Container>
      </Reveal>

      <DevTimeline />

      <Reveal id="dashboard" className="relative bg-paper-2 py-20 lg:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div className="lg:sticky lg:top-[calc(var(--nav-h)+4rem)] lg:self-start">
              <Eyebrow className="tabular-nums">33 — Investor Dashboard</Eyebrow>
              <SectionTitle className="mt-5" lines={[<>Your investment.</>, <>Your development.</>, <span key="e" className="italic text-bronze">Your information.</span>]} />
              <p className="body measure-sm mt-6 text-ink/60" data-anim="fade-up">
                The secure investor portal is envisioned to provide a complete view of your participation — from capital
                contributions through distributions and tax documents.
              </p>
              <div className="mt-8"><Button href="/investors/login" variant="solid">Investor Login</Button></div>
            </div>

            <div className="grid gap-x-8 sm:grid-cols-2" data-stagger>
              {DASHBOARD_ITEMS.map((d, i) => (
                <div key={d} data-anim="fade-up" className="flex items-baseline gap-4 border-b border-ink/10 py-3.5">
                  <span className="eyebrow tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  <span className="display-caps text-[0.82rem] text-ink/80">{d}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Reveal>

      <Reveal id="relations" className="relative overflow-hidden bg-ink py-20 text-paper lg:py-28">
        <Image
          src="/images/investor-relations-boardroom.webp"
          alt="Concord Pacific leadership meeting with investors"
          fill
          sizes="100vw"
          className="object-cover opacity-35"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-ink/60" />
        <div className="grain pointer-events-none absolute inset-0" />
        <Container className="relative">
          <Eyebrow light className="tabular-nums">34 — Investor Relations</Eyebrow>
          <SectionTitle light className="mt-5 max-w-[18ch]" lines={[<>Let&rsquo;s talk</>, <span key="f" className="italic text-bronze-light">about investing.</span>]} />
          <div className="mt-10 flex flex-wrap gap-2.5" data-stagger>
            <Button href="/investors#opportunities" variant="solid" data-anim="fade-up">Explore Investment Opportunities</Button>
            <Button href="/contact?type=investor" variant="light" data-anim="fade-up">Request Investment Information</Button>
            <Button href="/contact?type=call" variant="light" data-anim="fade-up">Request a Call</Button>
            <Button href="/investors/login" variant="light" data-anim="fade-up">Investor Login</Button>
          </div>
          <p className="mt-8 body text-paper/55" data-anim="fade-up">
            Email investor relations directly at{" "}
            <a href={`mailto:${BRAND.email.investors}`} className="link-underline text-bronze-light">{BRAND.email.investors}</a>
          </p>

          <div className="mt-16 border-t border-paper/12 pt-10">
            <Eyebrow light className="tabular-nums">48 — Regulatory & Offering Architecture</Eyebrow>
            <div className="mt-7 grid gap-10 lg:grid-cols-2">
              <div data-anim="fade-up">
                <p className="display-caps text-[0.95rem] text-bronze-light">Public Corporate Website</p>
                <p className="body mt-3 text-paper/55">
                  Company · Leadership · Development Strategy · Architecture &amp; Design · Global Sourcing ·
                  Track Record · Principal Experience · Portfolio · Educational Content · Investor Relations · Contact
                </p>
              </div>
              <div data-anim="fade-up">
                <p className="display-caps text-[0.95rem] text-bronze-light">Investment / Offering Environment</p>
                <p className="body mt-3 text-paper/55">
                  Available Opportunities · Investor Registration · Eligibility · Offering Materials · Risk Factors ·
                  Financial Information · Subscription Documentation · Electronic Signatures · Secure Funding ·
                  Investor Reporting · Tax Documents
                </p>
              </div>
            </div>
            <p className="mt-8 text-[0.8rem] leading-relaxed text-paper/35">
              The corporate website and the regulated investment environment remain clearly separated. The precise
              investor experience, public communications, eligibility requirements and investment limits must conform to
              the securities exemption or registration framework applicable to each offering.
            </p>
          </div>

          <div className="mt-14">
            <Statement light className="max-w-[24ch]">
              Access. Transparency. Real assets.{" "}
              <span className="text-bronze-light">Experienced execution.</span>
            </Statement>
          </div>
        </Container>
      </Reveal>
    </>
  );
}
