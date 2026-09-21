import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { BRAND } from "@/lib/site";
import SmoothScroll from "@/components/SmoothScroll";
import RevealEngine from "@/components/RevealEngine";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Cursor from "@/components/ui/Cursor";
import Preloader from "@/components/ui/Preloader";
import PageTransition from "@/components/ui/PageTransition";
import ScrollProgress from "@/components/ui/ScrollProgress";

/* Self-hosted subsets — no external font requests, zero layout shift. */
const cormorant = localFont({
  src: [
    { path: "../fonts/cormorant-garamond-latin-300-normal.woff2", weight: "300", style: "normal" },
    { path: "../fonts/cormorant-garamond-latin-300-italic.woff2", weight: "300", style: "italic" },
    { path: "../fonts/cormorant-garamond-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/cormorant-garamond-latin-400-italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-cormorant",
  display: "swap",
  preload: true,
  fallback: ["Times New Roman", "serif"],
});

const jost = localFont({
  src: [
    { path: "../fonts/jost-latin-300-normal.woff2", weight: "300", style: "normal" },
    { path: "../fonts/jost-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/jost-latin-500-normal.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-jost",
  display: "swap",
  preload: true,
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

const url = "https://concordpacificcorp.com";

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: {
    default: `${BRAND.name} — We Develop What Should Exist Next`,
    template: `%s — ${BRAND.name}`,
  },
  description:
    "Luxury residential development and investment platform. We develop distinctive luxury condominiums, upscale apartment communities and select estate residences in premier, supply-constrained markets.",
  keywords: [
    "luxury real estate development", "Beverly Hills development", "Bel-Air luxury residences",
    "real estate investment platform", "ground-up development", "luxury condominiums Los Angeles",
  ],
  openGraph: {
    type: "website",
    url,
    siteName: BRAND.name,
    title: `${BRAND.name} — We Develop What Should Exist Next`,
    description: BRAND.tagline,
    images: [{ url: "/images/hero-panoramic.webp", width: 1809, height: 892, alt: BRAND.name }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  alternates: { canonical: url },
};

export const viewport: Viewport = {
  themeColor: "#121416",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: BRAND.name,
              url,
              slogan: BRAND.promise,
              address: {
                "@type": "PostalAddress",
                streetAddress: "9465 Wilshire Boulevard",
                addressLocality: "Beverly Hills",
                addressRegion: "CA",
                postalCode: "90212",
                addressCountry: "US",
              },
              email: BRAND.email.general,
            }),
          }}
        />
        <Preloader />
        <SmoothScroll />
        <RevealEngine />
        <Cursor />
        <PageTransition />
        <ScrollProgress />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[10001] focus:bg-ink focus:px-5 focus:py-3 focus:text-paper"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
