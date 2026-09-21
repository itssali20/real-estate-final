import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { BRAND } from "@/lib/site";

export const metadata: Metadata = {
  title: "Investor Login",
  description: "Secure investor portal access.",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <section className="relative grid min-h-[100svh] lg:grid-cols-2">
      <div className="relative hidden pt-[var(--nav-h)] lg:block">
        <Image src="/images/pan-dusk.webp" alt="" fill sizes="50vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-ink/45" />
        <div className="grain absolute inset-0" />
        <div className="absolute bottom-0 left-0 p-12 text-paper">
          <p className="display-caps text-[clamp(1.1rem,2vw,1.6rem)]">{BRAND.mark}<span className="text-bronze">, Corp.</span></p>
          <p className="display mt-4 max-w-[18ch] text-[clamp(1.4rem,2.6vw,2.2rem)]">
            Your investment. Your development. <span className="italic text-bronze-light">Your information.</span>
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center bg-paper px-6 py-24">
        <div className="w-full max-w-[420px]">
          <p className="eyebrow">Secure Investor Portal</p>
          <h1 className="display mt-4 text-[clamp(1.8rem,4vw,2.8rem)]">Investor Login</h1>
          <p className="body mt-4 text-ink/55">
            The secure investor environment is in preparation. Registered investors will receive access credentials
            directly from investor relations.
          </p>

          <form className="mt-10 space-y-6" action="/api/contact" method="post">
            <div>
              <label htmlFor="email" className="eyebrow mb-1.5 block">Email</label>
              <input id="email" name="email" type="email" required
                className="w-full border-b border-ink/18 bg-transparent py-3 text-[0.95rem] font-light outline-none transition-colors focus:border-bronze" />
            </div>
            <div>
              <label htmlFor="password" className="eyebrow mb-1.5 block">Password</label>
              <input id="password" name="password" type="password" required
                className="w-full border-b border-ink/18 bg-transparent py-3 text-[0.95rem] font-light outline-none transition-colors focus:border-bronze" />
            </div>
            <button
              type="submit"
              data-cursor="hover"
              className="group relative mt-4 inline-flex w-full items-center justify-center gap-3 overflow-hidden bg-ink px-8 py-4 label-caps text-paper"
            >
              <span className="absolute inset-0 origin-bottom scale-y-0 bg-bronze transition-transform duration-[650ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-y-100" />
              <span className="relative z-10">Sign In</span>
            </button>
          </form>

          <div className="mt-10 border-t border-ink/12 pt-6 text-sm text-ink/55">
            <p>
              Not yet registered?{" "}
              <Link href="/contact?type=investor" className="link-underline text-bronze">Request investment information</Link>
            </p>
            <p className="mt-2">
              Need help? <a href={`mailto:${BRAND.email.investors}`} className="link-underline text-bronze">{BRAND.email.investors}</a>
            </p>
          </div>

          <p className="mt-8 text-[0.72rem] leading-relaxed text-ink/35">
            Nothing on this website constitutes an offer to sell or a solicitation of an offer to buy any security.
          </p>
        </div>
      </div>
    </section>
  );
}
