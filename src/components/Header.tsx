"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { BRAND, NAV } from "@/lib/site";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [onDark, setOnDark] = useState(true);
  const menu = useRef<HTMLDivElement>(null);
  const last = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setSolid(y > 40);
      setHidden(y > 420 && y > last.current);
      last.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  /** Reads the luminance of whatever the page opens on, so the bar inverts correctly per route. */
  useEffect(() => {
    const first = document.querySelector<HTMLElement>("#main > *");
    if (!first) { setOnDark(false); return; }
    const bg = getComputedStyle(first).backgroundColor;
    const m = bg.match(/\d+(\.\d+)?/g);
    if (!m || (m[3] !== undefined && Number(m[3]) === 0)) { setOnDark(false); return; }
    const [r, g, b] = m.map(Number);
    setOnDark((0.2126 * r + 0.7152 * g + 0.0722 * b) / 255 < 0.5);
  }, [pathname]);

  useEffect(() => {
    const el = menu.current;
    if (!el) return;
    const items = el.querySelectorAll(".menu-item");
    const meta = el.querySelectorAll(".menu-meta");
    if (open) {
      document.body.style.overflow = "hidden";
      window.__lenis?.stop();
      gsap.set(el, { display: "block" });
      gsap.fromTo(el, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 0.95, ease: "expo.inOut" });
      gsap.fromTo(items, { y: 56, opacity: 0 }, { y: 0, opacity: 1, duration: 0.95, stagger: 0.055, ease: "expo.out", delay: 0.25 });
      gsap.fromTo(meta, { opacity: 0 }, { opacity: 1, duration: 0.8, stagger: 0.06, delay: 0.55 });
    } else {
      document.body.style.overflow = "";
      window.__lenis?.start();
      gsap.to(el, {
        clipPath: "inset(0 0 100% 0)", duration: 0.7, ease: "expo.inOut",
        onComplete: () => { gsap.set(el, { display: "none" }); },
      });
    }
  }, [open]);

  // Every page opens on a dark, full-bleed hero — the header inverts until the user scrolls past it.
  const dark = open || (onDark && !solid);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[500] transition-[transform,background-color,border-color] duration-500 ${
          hidden && !open ? "-translate-y-full" : "translate-y-0"
        } ${solid && !open ? "border-b border-line bg-paper/85 backdrop-blur-xl" : "border-b border-transparent"}`}
      >
        <div className="mx-auto flex h-[var(--nav-h)] max-w-[1680px] items-center justify-between gap-6 px-5 sm:px-8 lg:px-12">
          <Link href="/" data-cursor="hover" className="flex shrink-0 items-center">
            <Image
              src="/images/logo.png"
              alt={BRAND.mark}
              width={424}
              height={287}
              className="h-11 w-auto object-contain sm:h-14"
              priority
            />
          </Link>

          <nav className="hidden items-center gap-6 2xl:flex">
            {NAV.map((i) => (
              <Link
                key={i.href}
                href={i.href}
                data-cursor="hover"
                className={`link-underline label-caps whitespace-nowrap transition-colors duration-500 ${
                  pathname.startsWith(i.href) ? "text-bronze" : dark ? "text-paper/80 hover:text-paper" : "text-ink/70 hover:text-ink"
                }`}
              >
                {i.label}
              </Link>
            ))}
          </nav>

          {/* Condensed set between 1280px and 1536px — the full list lives in the overlay menu. */}
          <nav className="hidden items-center gap-6 xl:flex 2xl:hidden">
            {NAV.filter((i) => ["/developments", "/portfolio", "/strategy", "/investors"].includes(i.href)).map((i) => (
              <Link
                key={i.href}
                href={i.href}
                data-cursor="hover"
                className={`link-underline label-caps whitespace-nowrap transition-colors duration-500 ${
                  pathname.startsWith(i.href) ? "text-bronze" : dark ? "text-paper/80 hover:text-paper" : "text-ink/70 hover:text-ink"
                }`}
              >
                {i.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <Link
              href="/investors#opportunities"
              data-cursor="hover"
              className={`hidden whitespace-nowrap px-5 py-2.5 label-caps transition-colors duration-500 hover:bg-bronze hover:text-paper sm:inline-block ${
                dark ? "bg-paper text-ink" : "bg-ink text-paper"
              }`}
            >
              Invest
            </Link>
            <Link
              href="/investors/login"
              data-cursor="hover"
              className={`hidden whitespace-nowrap border px-5 py-2.5 label-caps transition-colors duration-500 sm:inline-block ${
                dark ? "border-paper/40 text-paper hover:bg-paper hover:text-ink" : "border-ink/25 text-ink hover:bg-ink hover:text-paper"
              }`}
            >
              Investor Login
            </Link>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              data-cursor="hover"
              className={`relative ml-1 flex h-11 w-11 items-center justify-center border transition-colors duration-500 xl:hidden ${
                dark ? "border-paper/30" : "border-ink/20"
              }`}
            >
              <span className={`absolute h-px w-5 transition-all duration-500 ${dark ? "bg-paper" : "bg-ink"} ${open ? "rotate-45" : "-translate-y-1"}`} />
              <span className={`absolute h-px w-5 transition-all duration-500 ${dark ? "bg-paper" : "bg-ink"} ${open ? "-rotate-45" : "translate-y-1"}`} />
            </button>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              data-cursor="hover"
              className={`ml-2 hidden items-center gap-3 label-caps transition-colors duration-500 xl:flex ${dark ? "text-paper" : "text-ink"}`}
            >
              {open ? "Close" : "Menu"}
              <span className="flex h-3 w-5 flex-col justify-between">
                <span className={`h-px w-full transition-all duration-500 ${dark ? "bg-paper" : "bg-ink"} ${open ? "translate-y-[5px] rotate-45" : ""}`} />
                <span className={`h-px w-full transition-all duration-500 ${dark ? "bg-paper" : "bg-ink"} ${open ? "opacity-0" : ""}`} />
                <span className={`h-px w-full transition-all duration-500 ${dark ? "bg-paper" : "bg-ink"} ${open ? "-translate-y-[5px] -rotate-45" : ""}`} />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div ref={menu} className="fixed inset-0 z-[400] hidden bg-ink text-paper">
        <div className="grain absolute inset-0 overflow-hidden" />
        <div className="relative mx-auto flex h-full max-w-[1680px] flex-col justify-between px-5 pb-10 pt-[var(--nav-h)] sm:px-8 lg:px-12">
          <nav className="mt-8 flex flex-1 flex-col gap-0 overflow-y-auto no-scrollbar [justify-content:safe_center]">
            {NAV.map((i, idx) => (
              <Link
                key={i.href}
                href={i.href}
                className="menu-item group flex items-baseline gap-5 border-b border-line-dark py-3 sm:py-4"
                data-cursor="hover"
              >
                <span className="eyebrow eyebrow-light w-8 shrink-0">{String(idx + 1).padStart(2, "0")}</span>
                <span className="display-caps text-[clamp(1.6rem,5.2vw,3.6rem)] transition-colors duration-500 group-hover:text-bronze-light">
                  {i.label}
                </span>
              </Link>
            ))}
          </nav>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            <div className="menu-meta">
              <p className="eyebrow eyebrow-light mb-2">Quick Access</p>
              <div className="flex flex-col gap-1.5 text-sm text-paper/70">
                <Link href="/contact?type=development" className="link-underline">Development Opportunities</Link>
                <Link href="/contact?type=call" className="link-underline">Request a Call</Link>
                <Link href="/investors/login" className="link-underline">Investor Login</Link>
              </div>
            </div>
            <div className="menu-meta">
              <p className="eyebrow eyebrow-light mb-2">Contact</p>
              <a href={`mailto:${BRAND.email.general}`} className="link-underline block text-sm text-paper/70">{BRAND.email.general}</a>
              <p className="mt-1 text-sm text-paper/45">{BRAND.address}</p>
            </div>
            <div className="menu-meta self-end sm:text-right">
              <p className="display-caps text-sm text-paper/70">{BRAND.promise}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
