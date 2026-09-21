"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { gsap, prefersReduced } from "@/lib/gsap";
import { CONTACT_TYPES } from "@/lib/site";
import { Container } from "./Primitives";

type Field = {
  n: string; l: string; t?: "text" | "email" | "tel" | "date" | "time" | "textarea" | "select" | "file";
  o?: string[]; req?: boolean; half?: boolean;
};

const FORMS: Record<string, { title: string; lead: string; cta: string; fields: Field[] }> = {
  investor: {
    title: "Tell us about your investment interest.",
    lead: "Investment availability, minimum amounts, eligibility requirements and applicable investment limits depend upon each offering.",
    cta: "Request Investment Information",
    fields: [
      { n: "name", l: "Name", req: true, half: true },
      { n: "email", l: "Email", t: "email", req: true, half: true },
      { n: "phone", l: "Telephone", t: "tel", half: true },
      { n: "location", l: "City / State / Country", half: true },
      { n: "investorType", l: "Investor Type", t: "select", o: ["Individual", "Joint", "Trust", "Entity / LLC", "Family Office", "Institution", "Other"], half: true },
      { n: "range", l: "Anticipated Investment Range", t: "select", o: ["Under $50,000", "$50,000 – $100,000", "$100,000 – $250,000", "$250,000 – $500,000", "$500,000 – $1,000,000", "$1,000,000+"], half: true },
      { n: "accredited", l: "Accredited Investor Status", t: "select", o: ["Yes", "No", "Not Sure"], half: true },
      { n: "interests", l: "Investment Interests", t: "select", o: ["Luxury Multifamily", "Luxury Condominiums", "Individual Developments", "Portfolio or Fund Opportunities"], half: true },
      { n: "preferred", l: "Preferred Contact Method", t: "select", o: ["Email", "Telephone", "Either"], half: true },
      { n: "message", l: "Message", t: "textarea" },
    ],
  },
  development: {
    title: "Show us the property.",
    lead: "We welcome introductions from property owners, brokers, developers, architects, capital partners and real-estate professionals.",
    cta: "Submit Opportunity",
    fields: [
      { n: "name", l: "Name", req: true, half: true },
      { n: "company", l: "Company", half: true },
      { n: "email", l: "Email", t: "email", req: true, half: true },
      { n: "phone", l: "Telephone", t: "tel", half: true },
      { n: "relationship", l: "Relationship to Property", t: "select", o: ["Owner", "Broker", "Developer", "Attorney", "Lender", "Other"], half: true },
      { n: "address", l: "Property Address", half: true },
      { n: "city", l: "City / State", half: true },
      { n: "propertyType", l: "Property Type", t: "select", o: ["Land", "Multifamily", "Condominium", "Single-Family / Estate", "Commercial", "Mixed-Use", "Other"], half: true },
      { n: "lotSize", l: "Lot Size", half: true },
      { n: "buildingSize", l: "Existing Building Size", half: true },
      { n: "price", l: "Asking Price / Expected Value", half: true },
      { n: "zoning", l: "Current Zoning", half: true },
      { n: "entitlement", l: "Entitlement Information", t: "textarea" },
      { n: "description", l: "Opportunity Description", t: "textarea" },
      { n: "documents", l: "Offering Memorandum · Site Plans · Survey · Financials · Photographs", t: "file" },
    ],
  },
  broker: {
    title: "Introduce a site, a listing or a client.",
    lead: "We work with brokers across Los Angeles, Southern California and select markets that meet our development criteria.",
    cta: "Submit Introduction",
    fields: [
      { n: "name", l: "Name", req: true, half: true },
      { n: "brokerage", l: "Brokerage", half: true },
      { n: "email", l: "Email", t: "email", req: true, half: true },
      { n: "phone", l: "Telephone", t: "tel", half: true },
      { n: "license", l: "License Number", half: true },
      { n: "market", l: "Primary Market", half: true },
      { n: "message", l: "Message", t: "textarea" },
    ],
  },
  media: {
    title: "Editorial, press and speaking enquiries.",
    lead: "Please include your outlet, deadline and the nature of the request.",
    cta: "Send Enquiry",
    fields: [
      { n: "name", l: "Name", req: true, half: true },
      { n: "outlet", l: "Outlet", half: true },
      { n: "email", l: "Email", t: "email", req: true, half: true },
      { n: "deadline", l: "Deadline", t: "date", half: true },
      { n: "message", l: "Request", t: "textarea", req: true },
    ],
  },
  general: {
    title: "Start the right conversation.",
    lead: "Tell us how we can help and your enquiry will be routed to the appropriate team.",
    cta: "Send Message",
    fields: [
      { n: "name", l: "Name", req: true, half: true },
      { n: "email", l: "Email", t: "email", req: true, half: true },
      { n: "phone", l: "Telephone", t: "tel", half: true },
      { n: "subject", l: "Subject", half: true },
      { n: "message", l: "Message", t: "textarea", req: true },
    ],
  },
  call: {
    title: "Speak with our team.",
    lead: "Select a topic and a preferred time and a member of our team will be in touch.",
    cta: "Request a Call",
    fields: [
      { n: "topic", l: "Topic", t: "select", o: ["Investment", "Development Opportunity", "Broker Opportunity", "Existing Investment", "General Inquiry"], req: true, half: true },
      { n: "name", l: "Name", req: true, half: true },
      { n: "phone", l: "Telephone", t: "tel", req: true, half: true },
      { n: "email", l: "Email", t: "email", req: true, half: true },
      { n: "date", l: "Preferred Date", t: "date", half: true },
      { n: "time", l: "Preferred Time", t: "time", half: true },
      { n: "tz", l: "Time Zone", t: "select", o: ["Pacific (PT)", "Mountain (MT)", "Central (CT)", "Eastern (ET)", "GMT / UTC", "CET", "GST", "Other"], half: true },
      { n: "message", l: "Brief Message", t: "textarea" },
    ],
  },
};

const TABS = [...CONTACT_TYPES, { id: "call", label: "Request a Call", blurb: "Speak with our team." }];

const inputCls =
  "w-full border-b border-ink/18 bg-transparent py-3 text-[0.95rem] font-light text-ink outline-none transition-colors duration-400 placeholder:text-ink/30 focus:border-bronze";

export default function ContactCenter() {
  const params = useSearchParams();
  const [tab, setTab] = useState("investor");
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = params.get("type");
    if (t && FORMS[t]) setTab(t);
  }, [params]);

  useEffect(() => {
    if (prefersReduced() || !panel.current) return;
    gsap.fromTo(
      panel.current.querySelectorAll(".f-row"),
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.035, ease: "power3.out" }
    );
  }, [tab]);

  const form = FORMS[tab];

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBusy(true);
    const fd = new FormData(e.currentTarget);
    const payload: Record<string, unknown> = { type: tab };
    fd.forEach((v, k) => { if (typeof v === "string") payload[k] = v; });
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch { /* handled below */ }
    setBusy(false);
    setSent(true);
  };

  return (
    <section id="contact" className="relative bg-paper py-20 lg:py-28">
      <Container>
        <div className="flex items-center gap-4">
          <span className="eyebrow tabular-nums">36</span>
          <span className="h-px w-10 bg-bronze" />
          <span className="eyebrow">Smart Contact Center</span>
        </div>
        <h2 className="display mt-6 text-[clamp(1.9rem,4.6vw,3.6rem)]">
          What are you <span className="italic text-bronze">contacting us about?</span>
        </h2>

        <div className="mt-9 flex flex-wrap gap-2">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => { setTab(t.id); setSent(false); }}
              data-cursor="hover"
              className={`border px-5 py-3 label-caps transition-all duration-500 ${
                tab === t.id ? "border-ink bg-ink text-paper" : "border-ink/18 text-ink/60 hover:border-ink/50 hover:text-ink"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div ref={panel} className="mt-12 grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <h3 className="display text-[clamp(1.4rem,3vw,2.3rem)]">{form.title}</h3>
            <p className="body measure-sm mt-5 text-ink/60">{form.lead}</p>
            <div className="mt-8 h-px w-full bg-ink/10" />
            <p className="body mt-6 text-ink/50">
              Each submission is automatically routed to the appropriate internal team and CRM pipeline.
            </p>
          </div>

          {sent ? (
            <div className="flex flex-col justify-center border border-ink/12 bg-paper-2 p-10">
              <span className="block h-1.5 w-1.5 rotate-45 bg-bronze" />
              <p className="display mt-6 text-[clamp(1.3rem,2.6vw,2rem)]">Thank you — your enquiry has been received.</p>
              <p className="body mt-4 text-ink/60">
                A member of the appropriate team will respond shortly. For urgent matters, contact us directly.
              </p>
              <button onClick={() => setSent(false)} className="mt-7 self-start label-caps text-bronze link-underline" data-cursor="hover">
                Submit another enquiry
              </button>
            </div>
          ) : (
            <form onSubmit={submit} className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
              {form.fields.map((f) => (
                <div key={f.n} className={`f-row ${f.half ? "sm:col-span-1" : "sm:col-span-2"} py-3`}>
                  <label htmlFor={f.n} className="eyebrow mb-1.5 block">
                    {f.l}{f.req && <span className="text-bronze"> *</span>}
                  </label>
                  {f.t === "textarea" ? (
                    <textarea id={f.n} name={f.n} rows={4} required={f.req} className={`${inputCls} resize-none`} />
                  ) : f.t === "select" ? (
                    <select id={f.n} name={f.n} required={f.req} defaultValue="" className={inputCls}>
                      <option value="" disabled>Select</option>
                      {f.o?.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  ) : f.t === "file" ? (
                    <input id={f.n} name={f.n} type="file" multiple className={`${inputCls} file:mr-4 file:border-0 file:bg-ink file:px-4 file:py-2 file:text-[0.7rem] file:uppercase file:tracking-[0.2em] file:text-paper`} />
                  ) : (
                    <input id={f.n} name={f.n} type={f.t || "text"} required={f.req} className={inputCls} />
                  )}
                </div>
              ))}

              <div className="f-row sm:col-span-2 mt-6">
                <label className="flex items-start gap-3 text-[0.8rem] leading-relaxed text-ink/55">
                  <input type="checkbox" required className="mt-1 h-3.5 w-3.5 shrink-0 accent-[#C0674A]" />
                  <span>
                    I understand that nothing on this website constitutes an offer to sell or a solicitation of an offer
                    to buy any security, and that any investment offering is subject to applicable securities laws,
                    eligibility requirements and definitive offering documents.
                  </span>
                </label>
              </div>

              <div className="f-row sm:col-span-2 mt-5">
                <button
                  type="submit"
                  disabled={busy}
                  data-cursor="hover"
                  className="group relative inline-flex items-center gap-3 overflow-hidden bg-ink px-8 py-4 label-caps text-paper disabled:opacity-60"
                >
                  <span className="absolute inset-0 origin-bottom scale-y-0 bg-bronze transition-transform duration-[650ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-y-100" />
                  <span className="relative z-10">{busy ? "Sending…" : form.cta}</span>
                  <span className="relative z-10 block h-px w-6 bg-paper/60 transition-all duration-500 group-hover:w-9" />
                </button>
              </div>
            </form>
          )}
        </div>
      </Container>
    </section>
  );
}
