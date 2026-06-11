import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import Reveal from "@/components/ui/Reveal";
import JsonLd from "@/components/ui/JsonLd";
import TrendingChips from "@/components/ui/TrendingChips";
import { pageMeta, newsArticleJsonLd } from "@/lib/seo";
import { news } from "@/lib/data";
import { shortDate } from "@/lib/utils";

export const metadata: Metadata = pageMeta({
  title: "News — FIFA World Cup 2026",
  description:
    "FIFA World Cup 2026 news, match reports, AI analysis and tournament storylines from Visionary FIFA.",
  path: "/news",
});

export default function NewsPage() {
  return (
    <>
      {news.map((n) => (
        <JsonLd
          key={n.id}
          data={newsArticleJsonLd({
            headline: n.title,
            description: n.excerpt,
            datePublished: n.date,
            path: `/news/${n.slug}`,
          })}
        />
      ))}

      <PageHeader
        eyebrow="From the Newsroom"
        title="Latest News"
        description="Match reports, analysis and the stories shaping World Cup 2026."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "News", path: "/news" },
        ]}
      />

      {/* Trending topics bar */}
      <div className="border-b border-white/[0.06] bg-ink-800/40">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <TrendingChips />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {news.map((n, i) => (
            <Reveal key={n.id} delay={i}>
              <article className="glass glass-hover group flex h-full flex-col p-6">
                <div className="mb-3 flex items-center justify-between">
                  <span className="rounded-full bg-neon-purple/15 px-2.5 py-1 text-[11px] font-semibold text-neon-purple">
                    {n.category}
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-slate-500 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-neon-cyan" />
                </div>
                <h2 className="text-lg font-bold leading-snug text-white transition-colors group-hover:text-neon-cyan">
                  {n.title}
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">
                  {n.excerpt}
                </p>
                <div className="mt-4 flex items-center gap-3 border-t border-white/5 pt-3 text-xs text-slate-500">
                  <span>{shortDate(n.date)}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {n.readTime}
                  </span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </>
  );
}
