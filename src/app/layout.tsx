import type { Metadata, Viewport } from "next";
import "lenis/dist/lenis.css";
import "./globals.css";
import { fraunces, switzer } from "@/lib/fonts";
import { Providers } from "./providers";
import { Nav } from "@/components/chrome/Nav";
import { Footer } from "@/components/chrome/Footer";
import { JsonLd, organizationJsonLd } from "@/lib/seo";
import { SITE, SITE_URL } from "@/content";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${SITE.name} | ${SITE.tagline}`, template: `%s | ${SITE.name}` },
  description: SITE.tagline,
  openGraph: { siteName: SITE.name, type: "website", locale: "en_IN" },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#E4E1D6",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${fraunces.variable} ${switzer.variable}`}>
      <body className="min-h-dvh tone-paper antialiased">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Providers>
          <Nav />
          <main id="main" className="pt-16">
            {children}
          </main>
          <Footer />
        </Providers>
        <JsonLd data={organizationJsonLd()} />
      </body>
    </html>
  );
}
