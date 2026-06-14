import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { SITE, websiteJsonLd } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Visionary FIFA — FIFA World Cup 2026 Live Hub",
    template: "%s · Visionary FIFA",
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    "FIFA World Cup 2026", "World Cup 2026", "FIFA 2026", "WC 2026",
    "live scores", "standings", "fixtures", "schedule", "predictions",
    "player stats", "teams", "groups", "Messi", "Mbappé", "Haaland",
    "Bellingham", "Vinicius", "Visionary FIFA",
  ],
  authors: [{ name: "Visionary FIFA" }],
  alternates: { canonical: SITE.url },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: "Visionary FIFA — FIFA World Cup 2026 Live Hub",
    description: SITE.description,
    url: SITE.url,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Visionary FIFA — FIFA World Cup 2026" }],
  },
  twitter: {
    card: "summary_large_image",
    site: SITE.twitter,
    title: "Visionary FIFA — FIFA World Cup 2026 Live Hub",
    description: SITE.description,
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  verification: { google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION ?? "" },
};

export const viewport: Viewport = {
  themeColor: "#05060f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: any;
}) {
  return (
    <html lang="en" className={`${inter.variable} dark`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://r2.thesportsdb.com" />
        <link rel="preconnect" href="https://www.thesportsdb.com" />
        <link rel="dns-prefetch" href="https://flagcdn.com" />
      </head>
      <body className="min-h-screen font-sans">
        {websiteJsonLd().map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
