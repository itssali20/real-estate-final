import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import Reveal from "@/components/Reveal";
import Button from "@/components/ui/Button";
import { Container, Eyebrow, SectionTitle, Statement, Figure } from "@/components/sections/Primitives";
import { LEADERSHIP, PLATFORM } from "@/lib/site";

export const metadata: Metadata = {
  title: "Leadership",
  description:
    "Three complementary disciplines. One development platform. Development & vision, investment & capital strategy, construction & project execution.",
};

const PORTRAIT = ["/images/ppl-model.webp", "/images/ppl-lounge.webp", "/images/ppl-view.webp"];

export default function LeadershipPage() {
  return (
    <>
      <PageHero
        index="27"
        eyebrow="Leadership"
        title={[<>Three complementary disciplines.</>, <span key="a" className="italic text-bronze-light">One development platform.</span>]}
        image="/images/ppl-lounge.webp"
        alt="Principals reviewing a development from a residence terrace"
      />

      <Reveal className="relative bg-paper py-20 lg:py-28">
        <Container>
          {LEADERSHIP.map((l, i) => (
            <article
              key={l.name}
              className={`grid gap-10 border-t border-ink/12 py-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 ${i === 0 ? "border-t-0 pt-0" : ""}`}
            >
              <div>
                <Figure src={l.photo ?? PORTRAIT[i % PORTRAIT.length]} alt={`${l.name}, ${l.role}`} ratio="aspect-[3/2]" parallax={6} sizes="(max-width:1024px) 92vw, 34vw" />
              </div>
              <div>
                <div className="flex items-center gap-4">
                  <span className="eyebrow tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  <span className="h-px w-10 bg-bronze" />
                  <span className="eyebrow">{l.role}</span>
                </div>
                <SectionTitle className="mt-5" lines={[<>{l.name}</>]} />
                <p className="display-caps mt-3 text-[0.95rem] text-bronze" data-anim="fade-up">{l.focus}</p>
                <p className="body-lg measure mt-7 text-ink/65" data-anim="fade-up">{l.bio}</p>
                <div className="mt-8 flex flex-wrap gap-2" data-stagger>
                  {l.tags.map((t) => (
                    <span key={t} data-anim="fade" className="border border-ink/15 px-3.5 py-2 label-caps text-ink/60">{t}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </Container>
      </Reveal>

      <Reveal className="relative overflow-hidden bg-ink py-20 text-paper lg:py-28">
        <div className="grain pointer-events-none absolute inset-0" />
        <Container className="relative">
          <Eyebrow light className="tabular-nums">28 — One Integrated Platform</Eyebrow>
          <SectionTitle light className="mt-5 max-w-[26ch]" lines={[<>Development + Investment + Design</>, <span key="b" className="italic text-bronze-light">+ Sourcing + Construction + Capital.</span>]} />
          <div className="mt-12 grid gap-x-12 lg:grid-cols-2" data-stagger>
            {PLATFORM.map((p) => (
              <div key={p.k} data-anim="fade-up" className="group grid grid-cols-[auto_1fr] gap-6 border-b border-paper/10 py-6">
                <span className="eyebrow eyebrow-light tabular-nums">{p.k}</span>
                <div>
                  <h3 className="display text-[clamp(1.2rem,2.4vw,1.75rem)] transition-colors duration-500 group-hover:text-bronze-light">{p.t}</h3>
                  <p className="body mt-2 text-paper/55">{p.d}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-14">
            <Statement light className="max-w-[24ch]">
              Great real estate doesn&rsquo;t simply exist.{" "}
              <span className="text-bronze-light">Someone has to create it.</span>
            </Statement>
            <div className="mt-9 flex flex-wrap gap-2.5">
              <Button href="/portfolio" variant="light">View Our Experience</Button>
              <Button href="/contact" variant="light">Contact the Team</Button>
            </div>
          </div>
        </Container>
      </Reveal>
    </>
  );
}
