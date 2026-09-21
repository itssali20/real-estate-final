import Image from "next/image";
import type { ReactNode } from "react";
import { Container } from "./Primitives";

export default function PageHero({
  index, eyebrow, title, lead, image, alt, chain,
}: {
  index: string; eyebrow: string; title: ReactNode[]; lead?: string; image: string; alt: string; chain?: readonly string[];
}) {
  return (
    <header className="relative flex min-h-[74svh] items-end overflow-hidden bg-ink pb-14 pt-[calc(var(--nav-h)+5rem)] text-paper">
      <Image src={image} alt={alt} fill priority sizes="100vw" className="object-cover opacity-55" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/70" />
      <div className="grain pointer-events-none absolute inset-0" />
      <Container className="relative">
        <div className="flex items-center gap-4">
          <span className="eyebrow eyebrow-light tabular-nums">{index}</span>
          <span className="h-px w-10 bg-bronze" />
          <span className="eyebrow eyebrow-light">{eyebrow}</span>
        </div>
        <h1 data-split className="display mt-6 text-[clamp(2.1rem,6.2vw,5.4rem)]">
          {title.map((l, i) => (
            <span key={i} className="block overflow-hidden">
              <span className="split-line-inner block">{l}</span>
            </span>
          ))}
        </h1>
        {lead && <p className="body-lg measure mt-7 text-paper/70" data-anim="fade-up">{lead}</p>}
        {chain && (
          <div className="mt-9 flex flex-wrap items-center gap-x-3 gap-y-2" data-stagger>
            {chain.map((s, i) => (
              <span key={s} className="flex items-center gap-3" data-anim="fade">
                <span className="label-caps text-paper/60">{s}</span>
                {i < chain.length - 1 && <span className="block h-px w-5 bg-bronze/60" />}
              </span>
            ))}
          </div>
        )}
      </Container>
    </header>
  );
}
