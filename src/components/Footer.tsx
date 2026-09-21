import Image from "next/image";
import Link from "next/link";
import { BRAND, FOOTER } from "@/lib/site";
import SplitLines from "./ui/SplitLines";
import Button from "./ui/Button";
import Reveal from "./Reveal";

export default function Footer() {
  return (
    <Reveal as="footer" className="relative overflow-hidden bg-ink text-paper">
      <div className="grain pointer-events-none absolute inset-0" />

      <div className="relative mx-auto max-w-[1680px] px-5 pb-10 pt-24 sm:px-8 lg:px-12 lg:pt-32">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <div>
            <p className="eyebrow eyebrow-light mb-7" data-anim="fade">Final Brand Experience</p>
            <SplitLines
              className="display text-[clamp(2rem,5.2vw,4.4rem)]"
              lines={[
                <>Great real estate</>,
                <>doesn&rsquo;t simply exist.</>,
                <span key="c" className="text-bronze-light italic">Someone has to create it.</span>,
              ]}
            />
            <p className="eyebrow eyebrow-light mt-8 leading-[2.2]" data-anim="fade-up">
              Location × Vision × Architecture × Capital × Global Sourcing × Construction × Execution
            </p>
            <div className="mt-9 flex flex-wrap gap-3" data-stagger>
              <Button href="/investors#opportunities" variant="light" data-anim="fade-up">Explore Opportunities</Button>
              <Button href="/contact?type=call" variant="light" data-anim="fade-up">Request a Call</Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3" data-stagger>
            {FOOTER.map((col) => (
              <div key={col.h} data-anim="fade-up">
                <p className="eyebrow eyebrow-light mb-4">{col.h}</p>
                <ul className="space-y-2">
                  {col.links.map((l) => (
                    <li key={l.l + l.h}>
                      <Link href={l.h} data-cursor="hover" className="link-underline text-[0.85rem] text-paper/60 transition-colors hover:text-paper">
                        {l.l}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="rule-dark my-12" data-anim="line" />

        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <Image src="/images/logo-white.png" alt={BRAND.mark} width={424} height={287} className="h-16 w-auto object-contain" />
            <p className="mt-4 text-sm text-paper/45">{BRAND.address}</p>
            <div className="mt-4 flex flex-wrap gap-x-7 gap-y-1.5 text-sm text-paper/60">
              <a href={`mailto:${BRAND.email.investors}`} className="link-underline">{BRAND.email.investors}</a>
              <a href={`mailto:${BRAND.email.development}`} className="link-underline">{BRAND.email.development}</a>
            </div>
          </div>
          <div className="lg:text-right">
            <p className="text-[0.8rem] leading-relaxed text-paper/40">
              Nothing on this website constitutes an offer to sell or a solicitation of an offer to buy any security.
              Any investment offering will be subject to applicable securities laws, eligibility requirements,
              definitive offering documents and risk disclosures.{" "}
              <Link href="/legal/disclosures" className="link-underline text-paper/70">Read full disclosures</Link>.
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line-dark pt-6 text-[0.72rem] uppercase tracking-[0.2em] text-paper/35 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</p>
          <p className="text-bronze/70">Development · Investment · Design · Construction · Capital</p>
        </div>
      </div>

      <div className="relative select-none overflow-hidden px-2 pb-2">
        <p className="display-caps whitespace-nowrap text-center text-[8.4vw] leading-[0.9] text-paper/[0.06]">
          Invest in what&rsquo;s next
        </p>
      </div>
    </Reveal>
  );
}
