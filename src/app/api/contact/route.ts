import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Payload = Record<string, unknown> & { type?: string };

/**
 * Per-instance throttle. This is a cheap first line of defence only — serverless
 * instances do not share memory, so put a real rate limit (Vercel WAF, Upstash
 * Redis, etc.) in front of this endpoint before a public launch.
 */
const RATE = new Map<string, { n: number; t: number }>();

function limited(ip: string) {
  const now = Date.now();
  const rec = RATE.get(ip);
  if (!rec || now - rec.t > 60_000) {
    if (RATE.size > 5000) RATE.clear();
    RATE.set(ip, { n: 1, t: now });
    return false;
  }
  rec.n += 1;
  return rec.n > 6;
}

/**
 * Routes each enquiry to the appropriate internal team / CRM pipeline.
 *
 * To go live, set one of:
 *   CRM_WEBHOOK_URL   — generic webhook (HubSpot, Salesforce, Zapier, Make…)
 *   RESEND_API_KEY + CONTACT_TO_EMAIL — transactional email via Resend
 * Without them the endpoint validates and logs, so the UI works out of the box.
 */
export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (limited(ip)) {
    return NextResponse.json({ ok: false, error: "Too many requests." }, { status: 429 });
  }

  let body: Payload;
  try { body = await req.json(); }
  catch { return NextResponse.json({ ok: false, error: "Invalid payload." }, { status: 400 }); }

  const type = String(body.type ?? "general");
  const email = String(body.email ?? "");
  if (type !== "call" && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "A valid email is required." }, { status: 400 });
  }

  const ROUTES: Record<string, string> = {
    investor: "Investor Relations",
    development: "Development Team",
    broker: "Broker Relations",
    media: "Communications",
    call: "Investor Relations",
    general: "General Enquiries",
  };

  const record = {
    receivedAt: new Date().toISOString(),
    pipeline: ROUTES[type] ?? ROUTES.general,
    type,
    source: req.headers.get("referer") ?? "direct",
    data: body,
  };

  const webhook = process.env.CRM_WEBHOOK_URL;
  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(record),
      });
    } catch { /* never block the visitor on CRM failure */ }
  }

  const resend = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (resend && to) {
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${resend}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: process.env.CONTACT_FROM_EMAIL ?? "website@concordpacificcorp.com",
          to: [to],
          subject: `[${record.pipeline}] New ${type} enquiry`,
          text: Object.entries(body).map(([k, v]) => `${k}: ${String(v)}`).join("\n"),
        }),
      });
    } catch { /* non-blocking */ }
  }

  if (!webhook && !resend) console.info("[contact]", JSON.stringify(record));

  return NextResponse.json({ ok: true, pipeline: record.pipeline });
}
