import Image from "next/image";
import type { ReactNode } from "react";
import Button from "../ui/Button";
import { Container } from "./Primitives";

/**
 * Full-bleed closing band: a large statement set against photography, with
 * optional supporting facts and a CTA row. Replaces the bare statement blocks,
 * which read as empty space on wide screens.
 */
export default function StatementBand({
  image,
  alt,
  eyebrow,
  lines,
  lead,
  facts,
  actions,
  align = "left",
}: {
  image: string;
  alt: string;
  eyebrow?: string;
  lines: ReactNode[];
  lead?: string;
  facts?: { k: string; v: string }[];
  actions?: { href: string; label: string; solid?: boolean }[];
  align?: "left" | "center";
}) {
  return (
    <section className="relative isolate overflow-hidden bg-ink py-24 text-paper lg:py-32">
      <Image src={image} alt={alt} fill sizes="100vw" className="object-cover opacity-40" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-ink/55" />
      <div className="grain pointer-events-none absolute inset-0" />

      <Container className="relative">
        <div className={align === "center" ? "text-center" : ""}>
          {eyebrow && (
            <p className="eyebrow eyebrow-light mb-6" data-anim="fade">
              {eyebrow}
            </p>
          )}
          {/* max-width lives on the heading itself so `ch` resolves against the
              display font size, not the 16px body size. */}
          <h2
            data-split
            className={`display-caps text-[clamp(1.5rem,4.2vw,3.4rem)] leading-[1.18] ${
              align === "center" ? "mx-auto max-w-[20ch]" : "max-w-[22ch]"
            }`}
          >
            {lines.map((l, i) => (
              <span key={i} className="block overflow-hidden">
                <span className="split-line-inner block">{l}</span>
              </span>
            ))}
          </h2>
        </div>

        {lead && (
          <p
            data-anim="fade-up"
            className={`body-lg measure mt-8 text-paper/65 ${align === "center" ? "mx-auto text-center" : ""}`}
          >
            {lead}
          </p>
        )}

        {facts && (
          <div
            data-stagger
            className="mt-14 grid border-l border-t border-paper/15 sm:grid-cols-2 lg:grid-cols-4"
          >
            {facts.map((f) => (
              <div key={f.k} data-anim="fade-up" className="border-b border-r border-paper/15 px-6 py-8">
                <p className="display text-[clamp(1.5rem,3vw,2.4rem)] leading-none text-bronze-light">{f.v}</p>
                <p className="eyebrow eyebrow-light mt-3">{f.k}</p>
              </div>
            ))}
          </div>
        )}

        {actions && (
          <div
            className={`mt-12 flex flex-wrap gap-2.5 ${align === "center" ? "justify-center" : ""}`}
            data-stagger
          >
            {actions.map((a) => (
              <Button key={a.href + a.label} href={a.href} variant={a.solid ? "solid" : "light"} data-anim="fade-up">
                {a.label}
              </Button>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
