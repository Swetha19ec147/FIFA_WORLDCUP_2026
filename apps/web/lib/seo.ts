import type { Metadata } from "next";

export const SITE = {
  name: "Visionary FIFA",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://visionaryfifa.com").replace(/\/$/, ""),
  description:
    "Visionary FIFA — live scores, AI predictions, standings, fixtures and player statistics for the FIFA World Cup 2026.",
  twitter: "@visionaryfifa",
};

const OG_IMAGE = { url: "/og.png", width: 1200, height: 630, alt: "Visionary FIFA — World Cup 2026" };

/** Build per-page metadata with Open Graph + canonical defaults. */
export function pageMeta(opts: {
  title: string;
  description?: string;
  path?: string;
  keywords?: string[];
}): Metadata {
  const description = opts.description ?? SITE.description;
  const url = `${SITE.url}${opts.path ?? "/"}`;
  return {
    title: opts.title,
    description,
    keywords: opts.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: opts.title,
      description,
      url,
      siteName: SITE.name,
      type: "website",
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description,
      site: SITE.twitter,
    },
  };
}

/** JSON-LD: WebSite + Organization combined. */
export function websiteJsonLd() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${SITE.url}/#website`,
      name: SITE.name,
      url: SITE.url,
      description: SITE.description,
      potentialAction: {
        "@type": "SearchAction",
        target: { "@type": "EntryPoint", urlTemplate: `${SITE.url}/players?q={search_term_string}` },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${SITE.url}/#organization`,
      name: SITE.name,
      url: SITE.url,
      logo: { "@type": "ImageObject", url: `${SITE.url}/og.png`, width: 1200, height: 630 },
      sameAs: [`https://twitter.com/visionaryfifa`],
    },
  ];
}

/** JSON-LD: a single SportsEvent (match). */
export function sportsEventJsonLd(opts: {
  homeTeam: string;
  awayTeam: string;
  startDate: string;
  location: string;
  city: string;
  path: string;
  homeScore?: number | null;
  awayScore?: number | null;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SportsEvent",
    "@id": `${SITE.url}${opts.path}#event`,
    name: `${opts.homeTeam} vs ${opts.awayTeam} — FIFA World Cup 2026`,
    sport: "Association Football",
    startDate: opts.startDate,
    url: `${SITE.url}${opts.path}`,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: opts.location,
      address: { "@type": "PostalAddress", addressLocality: opts.city },
    },
    homeTeam: { "@type": "SportsTeam", name: opts.homeTeam },
    awayTeam: { "@type": "SportsTeam", name: opts.awayTeam },
    organizer: { "@type": "Organization", name: "FIFA", url: "https://www.fifa.com" },
    isPartOf: { "@type": "SportsEvent", name: "FIFA World Cup 2026", url: SITE.url },
  };
}

/** JSON-LD: FAQ block. */
export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

/** JSON-LD: BreadcrumbList. */
export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE.url}${item.path}`,
    })),
  };
}

/** JSON-LD: NewsArticle. */
export function newsArticleJsonLd(opts: {
  headline: string;
  description: string;
  datePublished: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: opts.headline,
    description: opts.description,
    datePublished: opts.datePublished,
    url: `${SITE.url}${opts.path}`,
    publisher: {
      "@type": "Organization",
      "@id": `${SITE.url}/#organization`,
      name: SITE.name,
    },
    isPartOf: { "@type": "WebSite", "@id": `${SITE.url}/#website` },
  };
}
