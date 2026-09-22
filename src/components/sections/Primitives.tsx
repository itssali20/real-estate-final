import Image from "next/image";
import type { ReactNode } from "react";
import SplitLines from "../ui/SplitLines";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1680px] px-5 sm:px-8 lg:px-12 ${className}`}>{children}</div>;
}

export function Eyebrow({ children, light = false, className = "" }: { children: ReactNode; light?: boolean; className?: string }) {
  return (
    <p className={`eyebrow ${light ? "eyebrow-light" : ""} ${className}`} data-anim="fade">
      {children}
    </p>
  );
}

export function SectionTitle({
  lines, className = "", light = false,
}: { lines: ReactNode[]; className?: string; light?: boolean }) {
  return (
    <SplitLines
      lines={lines}
      className={`display text-[clamp(1.85rem,4.6vw,3.9rem)] ${light ? "text-paper" : "text-ink"} ${className}`}
    />
  );
}

export function Rule({ light = false, className = "" }: { light?: boolean; className?: string }) {
  return <div data-anim="line" className={`h-px w-full origin-left ${light ? "bg-paper/18" : "bg-ink/12"} ${className}`} />;
}

export function Figure({
  src, alt, ratio = "aspect-[4/5]", className = "", parallax, sizes = "(max-width:768px) 100vw, 45vw", priority, animate,
}: {
  src: string; alt: string; ratio?: string; className?: string; parallax?: number; sizes?: string; priority?: boolean; animate?: boolean;
}) {
  return (
    <div data-img-reveal className={`relative overflow-hidden bg-paper-3 ${ratio} ${className}`}>
      <div className="absolute inset-0" {...(parallax ? { "data-parallax": String(parallax) } : {})}>
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={`object-cover ${animate ? "kenburns" : ""}`} />
      </div>
    </div>
  );
}

export function NumberedList({ items, light = false }: { items: string[]; light?: boolean }) {
  return (
    <ul data-stagger className="grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((t, i) => (
        <li
          key={t}
          data-anim="fade-up"
          className={`group flex items-baseline gap-4 border-b py-3.5 ${light ? "border-paper/12" : "border-ink/10"}`}
        >
          <span className={`eyebrow tabular-nums ${light ? "eyebrow-light" : ""}`}>{String(i + 1).padStart(2, "0")}</span>
          <span className={`display-caps text-[0.9rem] transition-colors duration-500 ${light ? "text-paper/85 group-hover:text-bronze-light" : "text-ink/85 group-hover:text-bronze"}`}>
            {t}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function Statement({ children, light = false, className = "" }: { children: ReactNode; light?: boolean; className?: string }) {
  return (
    <p
      data-anim="fade-up"
      className={`display-caps text-[clamp(1.05rem,2.5vw,2rem)] leading-[1.32] ${light ? "text-paper" : "text-ink"} ${className}`}
    >
      {children}
    </p>
  );
}

export function Chain({ steps, light = false }: { steps: readonly string[]; light?: boolean }) {
  return (
    <div data-stagger className="flex flex-wrap items-center gap-x-3 gap-y-2.5">
      {steps.map((s, i) => (
        <span key={s} className="flex items-center gap-3" data-anim="fade">
          <span className={`label-caps ${light ? "text-paper/70" : "text-ink/65"}`}>{s}</span>
          {i < steps.length - 1 && <span className={`block h-px w-5 ${light ? "bg-bronze/60" : "bg-bronze/50"}`} />}
        </span>
      ))}
    </div>
  );
}
