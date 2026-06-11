import type { Metadata } from "next";
import { SITE } from "@/lib/seo";
import BracketPredictor from "@/components/bracket/BracketPredictor";

export const metadata: Metadata = {
  title: "FIFA World Cup 2026 Bracket Predictor — Pick Your Champion",
  description:
    "Pick your FIFA World Cup 2026 bracket! Choose winners from the Round of 32 all the way to the Final. Share your prediction on WhatsApp and Twitter. Who will lift the trophy?",
  keywords: [
    "FIFA World Cup 2026 bracket", "World Cup 2026 predictor", "WC2026 bracket",
    "World Cup 2026 bracket challenge", "predict World Cup 2026 winner",
    "World Cup 2026 knockout bracket",
  ],
  alternates: { canonical: `${SITE.url}/bracket` },
  openGraph: {
    title: "FIFA World Cup 2026 Bracket Predictor",
    description: "Pick your winners from R32 to the Final. Share your prediction!",
    url: `${SITE.url}/bracket`,
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "FIFA World Cup 2026 Bracket Predictor",
    description: "Pick your winners from R32 to the Final. Share your prediction!",
  },
};

export default function BracketPage() {
  return <BracketPredictor />;
}
