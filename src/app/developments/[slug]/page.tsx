import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/sections/PageHero";
import Reveal from "@/components/Reveal";
import DevTimeline from "@/components/sections/DevTimeline";
import Button from "@/components/ui/Button";
import { Container, Eyebrow, SectionTitle, Chain, Figure } from "@/components/sections/Primitives";
import { PROJECTS } from "@/lib/site";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = PROJECTS.find((x) => x.slug === slug);
  if (!p) return { title: "Development" };
  return {
    title: `${p.name} — ${p.place}`,
    description: p.summary,
    openGraph: { title: p.name, description: p.summary, images: [{ url: p.image }] },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = PROJECTS.find((x) => x.slug === slug);
  if (!p) notFound();
  const others = PROJECTS.filter((x) => x.slug !== slug);

  return (
    <>
      <PageHero
        index={String(PROJECTS.indexOf(p) + 21)}
        eyebrow={p.place}
        title={[<>{p.name}</>]}
        lead={p.headline}
        image={p.image}
        alt={`${p.name}, ${p.place}`}
        chain={p.chain}
      />

      <Reveal className="relative bg-paper py-20 lg:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
            <div>
              <Eyebrow>Project Overview</Eyebrow>
              <SectionTitle className="mt-5" lines={[<>{p.headline}</>]} />
              <p className="body-lg measure mt-7 text-ink/65" data-anim="fade-up">{p.summary}</p>
              <p className="body measure mt-5 text-ink/55" data-anim="fade-up">{p.note}</p>
              <div className="mt-10 grid grid-cols-2 gap-x-8" data-stagger>
                {p.stats.map((s) => (
                  <div key={s.k} data-anim="fade-up" className="border-t border-ink/12 py-5">
                    <p className="eyebrow">{s.k}</p>
                    <p className="display mt-1.5 text-[clamp(1.2rem,2.6vw,1.9rem)] text-bronze">{s.v}</p>
                  </div>
                ))}
              </div>
            </div>
            <Figure src={p.gallery[0]} alt={`${p.name} interior`} ratio="aspect-[3/2]" parallax={8} />
          </div>

          <div className="mt-16 grid grid-cols-2 gap-4 lg:grid-cols-3" data-stagger>
            {p.gallery.slice(1).map((g, i) => (
              <Figure key={g} src={g} alt={`${p.name} detail ${i + 1}`} ratio="aspect-[4/3]" sizes="(max-width:1024px) 45vw, 30vw" />
            ))}
          </div>

          <div className="mt-14 border-t border-ink/12 pt-10">
            <Eyebrow>Development Path</Eyebrow>
            <div className="mt-5"><Chain steps={p.chain} /></div>
          </div>
        </Container>
      </Reveal>

      <DevTimeline />

      <Reveal className="relative bg-paper-2 py-20 lg:py-28">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionTitle lines={[<>More principal</>, <span key="a" className="italic text-bronze">experience.</span>]} />
            <Button href="/developments">All Developments</Button>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2" data-stagger>
            {others.map((o) => (
              <Link key={o.slug} href={`/developments/${o.slug}`} data-cursor="view" data-anim="fade-up" className="group block">
                <div data-img-reveal className="relative aspect-[16/10] overflow-hidden bg-paper-3">
                  <div className="absolute inset-0 transition-transform duration-[1200ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.06]">
                    <Image src={o.image} alt={o.name} fill sizes="(max-width:640px) 100vw, 45vw" className="object-cover" />
                  </div>
                </div>
                <h3 className="display mt-5 text-[clamp(1.25rem,2.4vw,1.9rem)] transition-colors duration-500 group-hover:text-bronze">{o.name}</h3>
                <p className="eyebrow mt-2">{o.place}</p>
              </Link>
            ))}
          </div>
        </Container>
      </Reveal>
    </>
  );
}
