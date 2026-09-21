import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import { Container, Eyebrow } from "@/components/sections/Primitives";
import { BRAND } from "@/lib/site";

const DOCS: Record<string, { title: string; index: string; blocks: { h?: string; p: string[] }[] }> = {
  disclosures: {
    title: "Investment Disclosures",
    index: "49",
    blocks: [
      { p: [
        "Nothing contained on this website constitutes an offer to sell, or a solicitation of an offer to buy, any security. Any such offer or solicitation will be made only through definitive offering documents and only in jurisdictions where permitted by applicable law.",
      ]},
      { h: "Portfolio Attribution", p: [
        "Properties presented as Principal Development & Investment Experience may include properties historically or currently developed, acquired, built, owned, operated or invested in by Roman Alexander, Peter Cohen, Cardinal Equities, affiliated entities, partnerships and/or joint ventures.",
        "These properties are presented as evidence of principal experience. They should not be represented as assets of, collateral for, guarantees of, or investments held by the investment platform unless that is specifically true and disclosed in applicable definitive offering documents.",
        "Historical property specifications, transaction amounts, ownership interests, professional credentials, development roles and other material factual claims should be independently verified against appropriate records before public publication.",
      ]},
      { h: "Forward-Looking Statements", p: [
        "Statements describing intended strategy, anticipated development activity, project pipelines, technology, materials, sourcing approaches or expected outcomes are forward-looking and subject to risk and uncertainty. Actual results may differ materially.",
      ]},
      { h: "Development Risk", p: [
        "Real-estate development involves substantial risks, including entitlement risk, construction risk, cost escalation, schedule delay, financing risk, market risk and the potential loss of invested capital. Past performance of principals or affiliated entities is not indicative of future results.",
      ]},
      { h: "Eligibility", p: [
        "Investment availability, minimum investment amounts, eligibility requirements and applicable investment limits depend upon each offering and the securities exemption or registration framework applicable to it.",
      ]},
    ],
  },
  privacy: {
    title: "Privacy Policy",
    index: "42",
    blocks: [
      { p: ["This policy explains what information we collect through this website and how it is used."] },
      { h: "Information We Collect", p: [
        "We collect information you provide directly through our contact and enquiry forms, including your name, email address, telephone number, location, professional details and the content of your message or submitted documents.",
        "We also collect limited technical information automatically, such as browser type, device type and pages visited, in order to operate and improve the website.",
      ]},
      { h: "How We Use It", p: [
        "Submissions are routed internally to the appropriate team and may be stored in our customer relationship management system so that we can respond to your enquiry and maintain a record of our correspondence.",
        "We do not sell personal information.",
      ]},
      { h: "Your Rights", p: [
        `You may request access to, correction of, or deletion of the personal information we hold about you by contacting ${BRAND.email.general}.`,
      ]},
    ],
  },
  terms: {
    title: "Terms of Use",
    index: "42",
    blocks: [
      { p: ["By accessing this website you agree to these terms."] },
      { h: "Informational Purpose", p: [
        "The content of this website is provided for general informational purposes only and does not constitute investment, legal, tax or accounting advice. You should consult your own advisers before making any investment decision.",
      ]},
      { h: "Intellectual Property", p: [
        `All content, imagery, marks and design elements on this website are the property of ${BRAND.name} or its licensors and may not be reproduced without written permission.`,
      ]},
      { h: "No Warranty", p: [
        "The website is provided on an “as is” basis. While we seek to keep information accurate and current, we make no warranty as to its completeness or accuracy.",
      ]},
    ],
  },
  accessibility: {
    title: "Accessibility",
    index: "42",
    blocks: [
      { p: [
        `${BRAND.name} is committed to making this website accessible to the widest possible audience, regardless of technology or ability.`,
      ]},
      { h: "Our Approach", p: [
        "This site is built to target WCAG 2.1 Level AA. It supports full keyboard navigation, provides visible focus states, maintains text contrast ratios, uses semantic landmarks and headings, and includes descriptive alternative text for meaningful imagery.",
        "All motion and scroll animation respects the operating-system “reduce motion” preference. When that preference is enabled, animation is disabled and content is presented statically.",
      ]},
      { h: "Feedback", p: [
        `If you encounter an accessibility barrier on this site, please contact ${BRAND.email.general} and we will work to resolve it.`,
      ]},
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(DOCS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const d = DOCS[slug];
  return d ? { title: d.title, description: d.blocks[0].p[0].slice(0, 160) } : { title: "Legal" };
}

export default async function LegalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const d = DOCS[slug];
  if (!d) notFound();

  return (
    <Reveal className="relative bg-paper pb-24 pt-[calc(var(--nav-h)+6rem)]">
      <Container>
        <div className="flex items-center gap-4">
          <Eyebrow className="tabular-nums">{d.index}</Eyebrow>
          <span className="h-px w-10 bg-bronze" />
          <Eyebrow>Legal</Eyebrow>
        </div>
        <h1 data-split className="display mt-6 text-[clamp(2rem,5.4vw,4.2rem)]">
          <span className="block overflow-hidden"><span className="split-line-inner block">{d.title}</span></span>
        </h1>

        <div className="mt-14 max-w-[70ch]" data-stagger>
          {d.blocks.map((b, i) => (
            <div key={i} data-anim="fade-up" className="border-t border-ink/10 py-8 first:border-t-0 first:pt-0">
              {b.h && <h2 className="display text-[clamp(1.25rem,2.4vw,1.8rem)]">{b.h}</h2>}
              {b.p.map((t, j) => (
                <p key={j} className={`body text-ink/65 ${b.h ? "mt-4" : ""} ${j > 0 ? "mt-4" : ""}`}>{t}</p>
              ))}
            </div>
          ))}
        </div>

        <p className="mt-12 eyebrow">Last updated — {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}</p>
      </Container>
    </Reveal>
  );
}
