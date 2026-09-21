import Link from "next/link";
import type { ReactNode } from "react";
import Magnetic from "./Magnetic";

type Variant = "solid" | "outline" | "ghost" | "light";

const base =
  "group relative inline-flex items-center justify-center gap-3 overflow-hidden px-7 py-4 label-caps transition-colors duration-500";

const styles: Record<Variant, string> = {
  solid: "bg-ink text-paper",
  outline: "border border-ink/25 text-ink hover:border-ink/60",
  light: "border border-paper/30 text-paper hover:border-paper/70",
  ghost: "text-ink",
};

export default function Button({
  href, children, variant = "outline", className = "", magnetic = true, ...rest
}: {
  href: string; children: ReactNode; variant?: Variant; className?: string; magnetic?: boolean;
} & Omit<React.ComponentProps<typeof Link>, "href" | "children" | "className">) {
  const inner = (
    <Link href={href} className={`${base} ${styles[variant]} ${className}`} data-cursor="hover" {...rest}>
      <span
        aria-hidden
        className={`absolute inset-0 -z-0 origin-bottom scale-y-0 transition-transform duration-[650ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-y-100 ${
          variant === "solid" ? "bg-bronze" : variant === "light" ? "bg-paper" : "bg-ink"
        }`}
      />
      <span
        className={`relative z-10 transition-colors duration-500 ${
          variant === "outline" ? "group-hover:text-paper" : variant === "light" ? "group-hover:text-ink" : ""
        }`}
      >
        {children}
      </span>
      <span
        aria-hidden
        className={`relative z-10 block h-px w-6 transition-all duration-500 group-hover:w-9 ${
          variant === "solid" ? "bg-paper/60" : variant === "light" ? "bg-paper/60 group-hover:bg-ink/60" : "bg-ink/40 group-hover:bg-paper/70"
        }`}
      />
    </Link>
  );
  return magnetic ? <Magnetic>{inner}</Magnetic> : inner;
}
