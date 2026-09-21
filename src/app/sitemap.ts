import type { MetadataRoute } from "next";
import { PROJECTS } from "@/lib/site";

const base = "https://concordpacificcorp.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "", "/strategy", "/design", "/sourcing", "/developments",
    "/portfolio", "/leadership", "/investors", "/contact",
    "/legal/disclosures", "/legal/privacy", "/legal/terms", "/legal/accessibility",
  ];
  const now = new Date();
  return [
    ...routes.map((r) => ({
      url: `${base}${r}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: r === "" ? 1 : 0.8,
    })),
    ...PROJECTS.map((p) => ({
      url: `${base}/developments/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
