export default function Marquee({ items, light = false }: { items: readonly string[]; light?: boolean }) {
  const row = [...items, ...items];
  return (
    <div className={`relative overflow-hidden border-y py-5 ${light ? "border-paper/12 bg-ink" : "border-ink/10 bg-paper-2"}`}>
      <div className="marquee-track flex w-max items-center gap-10 whitespace-nowrap will-change-transform">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className={`display-caps text-[clamp(0.95rem,1.9vw,1.6rem)] ${light ? "text-paper/70" : "text-ink/60"}`}>{t}</span>
            <span className="block h-1 w-1 rotate-45 bg-bronze" />
          </span>
        ))}
      </div>
    </div>
  );
}
