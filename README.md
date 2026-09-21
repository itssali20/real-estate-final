# Concord Pacific, Corp. — Luxury Residential Development & Investment Platform

A production-ready marketing and investor-relations website built from the
*Complete Master Website Storyboard*. Every one of the storyboard's 49 sections
is represented across ten routes.

> **We Develop What Should Exist Next.**
> Exceptional Locations · World-Class Design · Disciplined Development · Enduring Value

---

## Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 16** (App Router, React 19, TypeScript) | Static prerendering for every marketing route, one serverless function for the contact API. Vercel-native. |
| Styling | **Tailwind CSS v4** (CSS-first `@theme` tokens) | The whole palette and type scale live in `globals.css`; no config file to drift. |
| Palette | **Graphite · Cool White · Terracotta** | `#121416` graphite, `#F7F7F6` cool white, `#C0674A` terracotta. Defined once in `@theme`. |
| Scroll | **Lenis** | Smooth inertial scroll driven off the GSAP ticker, so scroll and animation share one clock. |
| Animation | **GSAP 3.13 + ScrollTrigger + ScrollToPlugin** | Pinning, scrubbing, timelines, `matchMedia` breakpoints. |
| WebGL | **Three.js** | Custom GLSL shader for the cinematic hero sequence. |
| Fonts | **Self-hosted** Cormorant Garamond + Jost (`next/font/local`) | No Google Fonts request, no CLS, GDPR-friendly. |
| Runtime | **Node 22** | Pinned in `engines`. |

Zero UI libraries. Every component is hand-built.

---

## Security

- **Next.js 16.3.5.** Patched against `CVE-2025-66478` / `CVE-2025-55182`
  (React Server Components RCE, CVSS 10.0) and the related
  `CVE-2025-55183` / `CVE-2025-55184` / `CVE-2025-67779` advisories.
  Verified with Vercel's own scanner: `npx fix-react2shell-next`.
- `npm audit` reports **0 vulnerabilities**.
- Node is pinned to `22.x` so a future major release cannot silently change the
  runtime under you.
- `vercel.json` sets HSTS, `X-Content-Type-Options`, `X-Frame-Options`,
  `Referrer-Policy` and a restrictive `Permissions-Policy`.

> If you deployed an earlier build and had any environment variables set on it,
> rotate those secrets. The RCE advisory above was exploited in the wild.
> A deployment with no environment variables configured has nothing to rotate.

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

## Deploy to Vercel

1. Push this folder to a Git repository.
2. In Vercel: **Add New → Project → Import** the repo.
3. Framework preset is detected as **Next.js** — no settings to change.
4. *(Optional)* add the environment variables from `.env.example` so contact
   submissions are routed somewhere. Without them the API validates, logs and
   returns success, so the UI works out of the box.
5. Deploy.

`vercel.json` ships sensible security headers and immutable caching for
`/images/*`.

Or from the CLI:

```bash
npm i -g vercel
vercel        # preview
vercel --prod # production
```

---

## Routes

| Route | Storyboard sections |
|---|---|
| `/` | 01 Home · 02 Vision · 03 Strategy · 04 Why Development · 05 What We Develop · 06 Residences · 20 Track Record · 29 Opportunities · 44 Global Visual Story · 47 Brand Pillars |
| `/strategy` | 02 · 03 · 04 · 19 Quality as Investment Strategy · 28 One Integrated Platform · 47 |
| `/design` | 07 Architectural Diversity · 08 Modern Design · 09 World-Class Architecture · 10 International Team · 11 Global Design, Local Execution |
| `/sourcing` | 12 Global Material Sourcing · 13 Direct Procurement · 14 Global Advantage · 15 Premium Materials · 16 Distinctive Features · 17 Safety & Resilience · 18 Intelligent Technology |
| `/developments` | 05 · 06 · 21–23 Principal Development Experience |
| `/developments/[slug]` | 21 Roscomare · 22 Croft · 23 Orum · 32 Development Timeline |
| `/portfolio` | 20 · 24 Peter Cohen / Cardinal Equities · 25 Selected Portfolio · 26 Legacy (interactive map) · 45 Investor Journey |
| `/leadership` | 27 Leadership · 28 One Integrated Platform |
| `/investors` | 04 · 29 · 30 Broader Community · 31 How to Invest · 32 Follow the Build · 33 Dashboard · 34 Investor Relations · 48 Regulatory Architecture |
| `/investors/login` | 33 Investor Login |
| `/contact` | 35 Development Opportunities · 36 Smart Contact Center · 37 Investor Inquiry · 38 Submit a Property · 39 Request a Call |
| `/legal/[slug]` | 42 Footer legal · 49 Portfolio Attribution & Disclosure |

Plus `sitemap.xml`, `robots.txt`, a designed `404`, and JSON-LD `Organization`
structured data.

---

## Where the WebGL is

Two real Three.js scenes, both written from scratch — no video, no image sequence.

**1. The homepage hero — a GLSL liquid dissolve.** `src/components/hero/WebGLStage.tsx`.
A full-screen `ShaderMaterial` cross-fades the seven-shot cinematic sequence. The
boundary between the outgoing and incoming photograph is driven by fractal
Brownian motion, so it dissolves along a turbulent organic front rather than a
straight wipe. Along that front the UVs of the two images are pushed apart by the
true gradient of the noise field, which reads as one photograph physically
displacing the other, and a terracotta bloom plus a slight chromatic split trace
the moving edge. **Move your cursor across the hero** — a lens warp follows it,
and the plane drifts and zooms against scroll. Watch for ~5 seconds and the
dissolve fires; it is most obvious mid-transition.

**2. `/sourcing` — an interactive material slab.** `src/components/sections/MaterialStage.tsx`.
A beveled slab lit by a three-point studio rig (key, fill, and a terracotta rim),
rendered with `MeshPhysicalMaterial`. Hover the four samples on the left and the
slab's texture map, roughness, metalness and clearcoat all change in real time —
the readout under it prints the live R/M values. **Drag the slab** to orbit it;
the thickness, perspective and specular highlights make the geometry obvious.

Both scenes fall back gracefully: if WebGL is unavailable or the OS asks for
reduced motion, the hero shows a `next/image` still and the slab section renders
as plain content. Both pause when scrolled out of view or when the tab is hidden.

Both scenes are driven by **elapsed time, not frame count**, so the sequence runs
at the same speed on a 60Hz panel, a 120Hz panel and a throttled background tab.
The hero holds each frame for 4.6s and dissolves over 1.8s.

> **Two testing notes.**
> 1. A WebGL canvas has no `preserveDrawingBuffer` in production, so headless
>    screenshots capture an empty backbuffer and appear black. Append
>    `?capture=1` to any URL to turn it on for automated visual testing.
> 2. Callbacks passed into `WebGLStage` are held in refs and deliberately kept
>    out of the effect's dependency array. Putting one back — or passing an
>    inline arrow from the parent — makes React tear down and rebuild the whole
>    renderer on every render, which reads as a flickering black hero. The
>    regression test counts `getContext('webgl')` calls and asserts exactly one.

## The animation system

Everything is **declarative**. Add a data attribute in any server or client
component and `RevealEngine` (mounted once in the root layout) wires it up on
every route change:

```tsx
<h2 data-split>…</h2>                       {/* masked line-by-line heading  */}
<div data-img-reveal><Image …/></div>       {/* clip-path wipe + scale settle */}
<p data-anim="fade-up">…</p>                {/* fade-up | fade | clip | line  */}
<div data-stagger>…</div>                   {/* groups children for stagger   */}
<div data-parallax="12">…</div>             {/* scrubbed vertical drift       */}
```

Bespoke pieces:

- **`Hero`** — Three.js `ShaderMaterial` cross-fading a seven-image cinematic
  sequence with a diagonal wipe, edge displacement, a bronze bloom along the
  transition edge, mouse parallax and scroll-linked zoom. Falls back to a
  `next/image` still if WebGL is unavailable or motion is reduced.
- **`ValueChain`** — pinned, horizontally scrubbed twelve-step process. Each step
  is a photographed card that scales in and fills a terracotta rule as it enters,
  with a live step counter and a progress rail. The twelve images run the real
  development arc: coastline → Beverly Hills → Bel-Air → model → sketch →
  construction → completed residence. Horizontal on ≥768px via `gsap.matchMedia`,
  a native swipe rail below that.
- **`StatementBand`** — full-bleed closing bands: a large statement over
  photography, with a bordered fact grid and CTA row.
- **`ProductTypes`** — sticky image that cross-fades as panels enter, driven by
  `IntersectionObserver`.
- **`PortfolioMap`** — filterable SVG map of California drawn from an
  equirectangular projection of the real state border, with properties plotted
  from true latitude/longitude. Co-located Los Angeles properties are fanned
  onto a small ring so each stays selectable.
- **`DevTimeline`** — scrubbed progress rail with sequential milestone reveals.
- **`Preloader`, `PageTransition`, `Cursor`, `Magnetic`, `ScrollProgress`,
  `Marquee`** — the ambient layer.

### Accessibility

`prefers-reduced-motion: reduce` disables Lenis, the WebGL loop, every
ScrollTrigger, the preloader, the cursor and the route curtain, and renders all
content in its final state. Skip link, semantic landmarks, visible focus rings,
`aria-expanded` on disclosure controls, descriptive alt text throughout.

---

## Content

All copy, navigation, projects, portfolio, leadership and form schemas live in
**`src/lib/site.ts`** — one typed file. Rebranding, adding a development or
editing a disclosure is a single edit there, no component changes.

Rename the company by changing `BRAND.name` / `BRAND.mark` in that file.

---

## Imagery

`public/images/` holds nine commissioned 2560 × 1440 photographs that carry every
large frame on the site, plus 52 supporting detail shots extracted from the brand
boards, upscaled and colour-matched.

The nine principals, which follow the storyboard's own hero narrative:

| File | Shot |
|---|---|
| `hero-01-coastline.webp` | California coastline, golden hour |
| `hero-02-beverly-hills.webp` | Beverly Hills aerial |
| `hero-03-bel-air.webp` | Bel-Air hills toward downtown |
| `hero-04-sketch.webp` | Architect's elevation sketch |
| `hero-05-model.webp` | Massing model on a plinth |
| `hero-06-construction.webp` | Structure under construction at dusk |
| `hero-07-completed.webp` | Completed residence, blue hour |
| `interior-living.webp` | Warm modern living room |
| `interior-kitchen.webp` | Luxury kitchen, city view |

Every frame's aspect ratio is matched to its source so nothing is softly cropped.
To swap any image, drop a replacement into `public/images/` under the same
filename — it updates everywhere that image is used, with no code change.
`IMAGE-BRIEF.md` has the prompt used for each one.

---

## Contact API

`POST /api/contact` (Node runtime) validates, throttles per IP, tags the
submission with an internal pipeline —

| `type` | pipeline |
|---|---|
| `investor`, `call` | Investor Relations |
| `development` | Development Team |
| `broker` | Broker Relations |
| `media` | Communications |
| `general` | General Enquiries |

— then forwards to `CRM_WEBHOOK_URL` and/or emails via Resend. Both are
optional and failures never block the visitor.

The built-in throttle is per serverless instance, so it is a speed bump rather
than a real limit. Put Vercel WAF rate limiting (or Upstash Redis) in front of
this endpoint before a public launch.

---

## Legal note

This site presents principal experience and platform capability. It is **not**
an offering. `/legal/disclosures` carries the portfolio-attribution and
forward-looking-statement language from storyboard section 49. Verify all
historical property specifications, transaction amounts, ownership interests
and professional credentials against source records before going live.
