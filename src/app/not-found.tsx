import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { NAV } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-ink text-paper">
      <Image src="/images/pan-dusk.webp" alt="" fill sizes="100vw" className="object-cover opacity-30" />
      <div className="grain absolute inset-0" />
      <div className="relative mx-auto w-full max-w-[1680px] px-5 py-32 sm:px-8 lg:px-12">
        <p className="eyebrow eyebrow-light">Error 404</p>
        <h1 className="display mt-6 text-[clamp(2.4rem,8vw,7rem)]">
          This page <span className="italic text-bronze-light">doesn&rsquo;t exist yet.</span>
        </h1>
        <p className="body-lg measure mt-7 text-paper/65">
          But we develop what should exist next. Let us take you somewhere that does.
        </p>
        <div className="mt-10 flex flex-wrap gap-2.5">
          <Button href="/" variant="solid">Return Home</Button>
          <Button href="/developments" variant="light">View Developments</Button>
        </div>
        <div className="mt-16 flex flex-wrap gap-x-8 gap-y-3 border-t border-paper/12 pt-8">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="link-underline label-caps text-paper/55 hover:text-paper">
              {n.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
