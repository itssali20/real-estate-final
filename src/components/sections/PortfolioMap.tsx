"use client";

import { useMemo, useState } from "react";
import { PORTFOLIO } from "@/lib/site";
import { Container } from "./Primitives";

/** California, equirectangular projection of the state border into a 0–100 box. */
const CA_PATH =
  "M 3.68 1.98 L 43.4 1.98 L 43.4 31.68 L 54.72 44.55 L 63.87 53.66 L 80.19 65.84 L 94.06 71.29 L 94.62 73.76 L 98.68 78.12 L 95.85 80.3 L 95 90.79 L 93.21 93.86 L 70.57 95.74 L 68.58 90.59 L 61.32 83.66 L 58.4 80.99 L 50.28 78.71 L 38.96 76.73 L 37.36 70 L 31.32 64.65 L 25.47 58.32 L 26.42 54.95 L 24.06 51.98 L 20.57 44.06 L 19.72 40.5 L 14.43 38.42 L 8.21 32.18 L 4.72 23.27 L 1.79 17.43 L 4.15 11.39 Z";

/** Reference cities, for orientation only. */
const CITIES = [
  { n: "San Francisco", x: 18.8, y: 44.1 },
  { n: "Los Angeles", x: 59.2, y: 80.6 },
  { n: "San Diego", x: 63.5, y: 84.5 },
];

/**
 * Several properties sit within a couple of miles of each other in Los Angeles.
 * At this scale their true points overlap, so co-located markers are fanned out
 * on a small ring around their shared centre — position stays indicative, and
 * every property stays individually selectable.
 */
function fanOut(items: { x: number; y: number }[]) {
  const R = 1.35;
  const seen = new Map<string, number[]>();
  items.forEach((p, i) => {
    const key = `${Math.round(p.x / 1.6)}:${Math.round(p.y / 1.6)}`;
    if (!seen.has(key)) seen.set(key, []);
    seen.get(key)!.push(i);
  });
  const out = items.map((p) => ({ ...p }));
  seen.forEach((idxs) => {
    if (idxs.length < 2) return;
    const cx = idxs.reduce((a, i) => a + items[i].x, 0) / idxs.length;
    const cy = idxs.reduce((a, i) => a + items[i].y, 0) / idxs.length;
    const r = R * (1 + (idxs.length - 2) * 0.22);
    idxs.forEach((i, k) => {
      const a = (k / idxs.length) * Math.PI * 2 - Math.PI / 2;
      out[i].x = cx + Math.cos(a) * r;
      out[i].y = cy + Math.sin(a) * r;
    });
  });
  return out;
}

const TYPES = ["All", "Residential Development", "Condominium Development", "Estate Development", "Office", "Retail", "Hospitality", "Medical Office", "Commercial"];

export default function PortfolioMap() {
  const [filter, setFilter] = useState("All");
  const [active, setActive] = useState<number | null>(0);

  const items = useMemo(() => {
    const picked = PORTFOLIO.map((p, i) => ({ ...p, i })).filter((p) => filter === "All" || p.type === filter);
    const fanned = fanOut(picked);
    return picked.map((p, k) => ({ ...p, x: fanned[k].x, y: fanned[k].y }));
  }, [filter]);

  const current = active !== null ? PORTFOLIO[active] : null;

  return (
    <section id="map" className="relative overflow-hidden bg-ink py-20 text-paper lg:py-28">
      <div className="grain pointer-events-none absolute inset-0" />
      <Container className="relative">
        <div className="flex items-center gap-4">
          <span className="eyebrow eyebrow-light tabular-nums">26</span>
          <span className="h-px w-10 bg-bronze" />
          <span className="eyebrow eyebrow-light">The Cardinal Equities Legacy</span>
        </div>
        <h2 className="display mt-6 max-w-[16ch] text-[clamp(1.9rem,4.6vw,3.6rem)]">
          Investment experience across <span className="italic text-bronze-light">markets and asset classes.</span>
        </h2>

        <div className="mt-8 flex flex-wrap gap-2">
          {TYPES.map((t) => (
            <button
              key={t}
              onClick={() => { setFilter(t); setActive(null); }}
              data-cursor="hover"
              className={`border px-4 py-2 label-caps transition-all duration-500 ${
                filter === t ? "border-bronze bg-bronze/15 text-bronze-light" : "border-paper/18 text-paper/55 hover:border-paper/45 hover:text-paper"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_0.95fr] lg:gap-16">
          <div className="relative">
            <svg viewBox="-2 -2 104 104" className="h-auto w-full max-w-[520px]" role="img" aria-label="Map of principal experience across California">
              <path d={CA_PATH} fill="rgba(247,247,246,0.05)" stroke="rgba(247,247,246,0.24)" strokeWidth="0.45" strokeLinejoin="round" />
              {CITIES.map((c) => (
                <g key={c.n}>
                  <circle cx={c.x} cy={c.y} r="0.55" fill="rgba(247,247,246,0.28)" />
                  <text
                    x={c.x + 1.8}
                    y={c.y + 0.9}
                    fill="rgba(247,247,246,0.32)"
                    fontSize="2.3"
                    letterSpacing="0.28"
                    style={{ textTransform: "uppercase" }}
                  >
                    {c.n}
                  </text>
                </g>
              ))}
              {items.map((p) => (
                <g
                  key={p.name}
                  onMouseEnter={() => setActive(p.i)}
                  onClick={() => setActive(p.i)}
                  style={{ cursor: "pointer" }}
                  role="button"
                  tabIndex={0}
                  onFocus={() => setActive(p.i)}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setActive(p.i); }}
                  aria-label={`${p.name}, ${p.place}`}
                >
                  <circle cx={p.x} cy={p.y} r="3" fill="transparent" />
                  <circle
                    cx={p.x} cy={p.y}
                    r={active === p.i ? 1.7 : 1.05}
                    fill={active === p.i ? "#E0906F" : "rgba(247,247,246,0.7)"}
                    className="transition-all duration-500"
                  />
                  {active === p.i && (
                    <circle cx={p.x} cy={p.y} r="3" fill="none" stroke="#C0674A" strokeWidth="0.3" opacity="0.8">
                      <animate attributeName="r" values="2;5" dur="2.2s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.8;0" dur="2.2s" repeatCount="indefinite" />
                    </circle>
                  )}
                </g>
              ))}
            </svg>

            <div className="mt-6 grid max-w-[520px] grid-cols-3 gap-4 border-t border-paper/12 pt-6">
              <div><p className="display text-[clamp(1.4rem,3vw,2.2rem)] text-bronze-light">1.5M+</p><p className="eyebrow eyebrow-light mt-1">SF Reported</p></div>
              <div><p className="display text-[clamp(1.4rem,3vw,2.2rem)] text-bronze-light">3</p><p className="eyebrow eyebrow-light mt-1">States</p></div>
              <div><p className="display text-[clamp(1.4rem,3vw,2.2rem)] text-bronze-light">7+</p><p className="eyebrow eyebrow-light mt-1">Asset Classes</p></div>
            </div>
          </div>

          <div>
            <div className="min-h-[190px] border-l border-bronze/50 pl-6">
              {current ? (
                <div key={current.name}>
                  <p className="eyebrow eyebrow-light">{current.type}</p>
                  <h3 className="display mt-3 text-[clamp(1.35rem,2.8vw,2.1rem)]">{current.name}</h3>
                  <p className="label-caps mt-1.5 text-bronze-light">{current.place}</p>
                  <p className="body measure-sm mt-4 text-paper/60">{current.detail}</p>
                </div>
              ) : (
                <p className="body text-paper/40">Select a property to explore principal experience by geography and asset class.</p>
              )}
            </div>

            <ul className="mt-8 max-h-[340px] overflow-y-auto no-scrollbar">
              {items.map((p) => (
                <li key={p.name}>
                  <button
                    onMouseEnter={() => setActive(p.i)}
                    onClick={() => setActive(p.i)}
                    data-cursor="hover"
                    className={`flex w-full items-baseline justify-between gap-5 border-b border-paper/10 py-3 text-left transition-colors duration-400 ${
                      active === p.i ? "text-bronze-light" : "text-paper/60 hover:text-paper"
                    }`}
                  >
                    <span className="display-caps text-[0.82rem]">{p.name}</span>
                    <span className="eyebrow eyebrow-light shrink-0">{p.place}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-12 max-w-[92ch] text-[0.78rem] leading-relaxed text-paper/35">
          Properties presented as Principal Development &amp; Investment Experience may include properties historically
          or currently developed, acquired, built, owned, operated or invested in by Roman Alexander, Peter Cohen,
          Cardinal Equities, affiliated entities, partnerships and/or joint ventures. They are presented as evidence of
          principal experience and should not be represented as assets of, collateral for, guarantees of, or investments
          held by the investment platform unless specifically true and disclosed in applicable definitive offering documents.
        </p>
      </Container>
    </section>
  );
}
