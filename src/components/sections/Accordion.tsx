"use client";

import { useRef, useState } from "react";
import Image from "next/image";

export default function Accordion({
  items, startOpen = 0,
}: { items: { t: string; d: string; image?: string }[]; startOpen?: number }) {
  const [open, setOpen] = useState<number | null>(startOpen);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  return (
    <div className="border-t border-ink/10">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={it.t} className="border-b border-ink/10">
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              data-cursor="hover"
              aria-expanded={isOpen}
              className="group flex w-full items-center justify-between gap-6 py-6 text-left"
            >
              <span className="flex items-baseline gap-5">
                <span className="eyebrow tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <span className={`display text-[clamp(1.2rem,2.8vw,2.1rem)] transition-colors duration-500 ${isOpen ? "text-bronze" : "text-ink group-hover:text-bronze"}`}>
                  {it.t}
                </span>
              </span>
              <span className="relative block h-3.5 w-3.5 shrink-0">
                <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-ink/50" />
                <span className={`absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-ink/50 transition-transform duration-500 ${isOpen ? "scale-y-0" : "scale-y-100"}`} />
              </span>
            </button>
            <div
              ref={(el) => { refs.current[i] = el; }}
              style={{ height: isOpen ? (refs.current[i]?.scrollHeight ?? 0) || "auto" : 0 }}
              className="overflow-hidden transition-[height] duration-[700ms] ease-[cubic-bezier(.22,1,.36,1)]"
            >
              <div className="grid gap-6 pb-8 sm:grid-cols-[1.4fr_1fr] sm:items-start">
                <p className="body measure text-ink/65">{it.d}</p>
                {it.image && (
                  <div className="relative aspect-[16/10] overflow-hidden bg-paper-3">
                    <Image src={it.image} alt={it.t} fill sizes="(max-width:640px) 100vw, 32vw" className="object-cover" />
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
