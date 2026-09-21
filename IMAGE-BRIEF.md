# Image brief

## Status

The nine principal photographs are **installed**. They carry every large frame on
the site — the hero sequence, all page heroes, the value-chain narrative, the
product-type panels and the architectural-language accordion.

| File | Shot | Status |
|---|---|---|
| `hero-01-coastline.webp` | California coastline, golden hour | ✅ installed |
| `hero-02-beverly-hills.webp` | Beverly Hills aerial | ✅ installed |
| `hero-03-bel-air.webp` | Bel-Air hills toward downtown | ✅ installed |
| `hero-04-sketch.webp` | Architect's elevation sketch | ✅ installed |
| `hero-05-model.webp` | Massing model on a plinth | ✅ installed |
| `hero-06-construction.webp` | Structure under construction at dusk | ✅ installed |
| `hero-07-completed.webp` | Completed residence, blue hour | ✅ installed |
| `interior-living.webp` | Warm modern living room | ✅ installed |
| `interior-kitchen.webp` | Luxury kitchen, city view | ✅ installed |

## How to swap any image

Save the replacement under the **exact same filename** in `public/images/` and it
updates everywhere that image is used. No code change. Keep the aspect ratio so
the designed crop holds:

- Hero sequence and page heroes — **2560 × 1440 (16:9)**
- Interiors — **2560 × 1440 (16:9)**
- Detail and material shots — **4:3 or 3:2**

Save as `.webp` at quality 82–88. If you switch to `.jpg`, update the extension in
`src/lib/site.ts`.

---

## House style

Append this to any prompt so new images match the ones already in place:

> *Shot on a 35mm full-frame camera, architectural photography, natural light,
> photorealistic, editorial magazine quality, calm and uncluttered, no people,
> no text, no watermark, no signage.*

## Prompts used

1. **`hero-01-coastline`** — California coastline from the air at golden hour, Pacific Ocean meeting rugged cliffs, Highway 1 curving along the headland, soft marine haze, long low sun, deep blue water with white surf.
2. **`hero-02-beverly-hills`** — Aerial over Beverly Hills at golden hour, palm-lined streets in a neat grid, large estates with pools and mature landscaping, the Los Angeles basin hazy in the distance.
3. **`hero-03-bel-air`** — Aerial over the Bel-Air hills, winding canyon roads, modern hillside residences cantilevered over ravines, dense green canopy, downtown Los Angeles on the horizon.
4. **`hero-04-sketch`** — An architect's hand-drawn elevation sketch of a modern hillside residence, graphite and ink on warm white trace paper, a scale ruler and pencil resting on the sheet, overhead studio light.
5. **`hero-05-model`** — A white 3D architectural massing model of a modern residence on a dark plinth in a design studio, crisp directional spotlight, strong shadows, clean minimal background.
6. **`hero-06-construction`** — Concrete and steel structure of a luxury residence under construction at dusk, formwork and rebar visible, a tower crane against a deep blue sky, work lights glowing warm, no workers.
7. **`hero-07-completed`** — The finished residence at blue hour, floor-to-ceiling glass glowing warm from within, infinity pool reflecting the house, deep roof overhang, city lights far below.
8. **`interior-living`** — Warm modern living room, wide-plank white-oak floor, lime-plaster walls, a linear stone fireplace, low linen furniture, a full wall of glass opening to a terrace, late afternoon light.
9. **`interior-kitchen`** — Luxury open kitchen, book-matched marble island with a waterfall edge, rift-sawn oak cabinetry, integrated appliances, sculptural pendant lights, floor-to-ceiling glass onto a city view at dusk.

---

## Optional future additions

These currently use supporting shots cropped from the brand boards. They work,
but a commissioned original would sharpen them. Same house style, **1800 × 1200**.

| Filename | Used for | Prompt |
|---|---|---|
| `mat-counter.webp` | Value chain "Source"; the 3D marble sample | Close detail of a book-matched quartzite island with a waterfall edge, dramatic veining, a matte black faucet, soft window light. |
| `det-frame.webp` | Value chain "Engineer" | Detail of a slim black-framed window head meeting a plaster reveal, crisp shadow lines, strong geometry. |
| `tex-grain.webp` | The 3D white-oak sample | Flat-lay macro of rift-sawn white-oak flooring, matte hardwax oil finish, raking light across the grain. |
| `det-lever.webp` | The 3D bronze sample | Macro of a solid bronze lever handle on a dark walnut veneer door, brushed finish, shallow depth of field. |
| `ppl-view.webp` | Value chain "Capitalize"; `/portfolio` hero | Two people in tailored neutral clothing at a floor-to-ceiling window over a city at golden hour, seen from behind. |
| `ppl-lounge.webp` | `/leadership` hero | Professionals in conversation in a residential sales lounge, marble counter, warm lighting, candid, faces not the focus. |

Keep people incidental and unidentifiable — faces in focus would need releases
before publication.
