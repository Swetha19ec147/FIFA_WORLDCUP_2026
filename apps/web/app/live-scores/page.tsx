import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import MatchCard from "@/components/ui/MatchCard";
import Flag from "@/components/ui/Flag";
import Reveal from "@/components/ui/Reveal";
import { pageMeta } from "@/lib/seo";
import { fetchMatches } from "@/lib/api";

export const metadata: Metadata = pageMeta({
  title: "Live Scores — FIFA World Cup 2026",
  description:
    "Follow live FIFA World Cup 2026 scores, minute-by-minute, with results and upcoming kickoffs across all 16 host cities.",
  path: "/live-scores",
});

function Group({ title, matches }: { title: string; matches: any[] }) {
  if (!matches.length) return null;
  return (
    <section className="mt-12 first:mt-0">
      <h2 className="mb-5 text-sm font-semibold uppercase tracking-wider text-slate-400">
        {title}
      </h2>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {matches.map((m, i) => (
          <Reveal key={m.id || i} delay={i}>
            <MatchCard match={m} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export default async function LiveScoresPage() {
  const matches = await fetchMatches();
  const liveMatches = matches.filter((m: any) => m.status === 'LIVE' || m.status === 'HT');
  const upcomingMatches = matches.filter((m: any) => m.status === 'UPCOMING');
  const recentResults = matches.filter((m: any) => m.status === 'FT' || m.status === 'COMPLETED');
  const featuredMatch = liveMatches[0] || upcomingMatches[0] || recentResults[0];

  return (
    <>
      <PageHeader
        eyebrow="Live Now"
        title="Live Scores"
        description="Real-time scores, results and upcoming fixtures from across the tournament."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Live Scores", path: "/live-scores" },
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Featured match CTA */}
        {featuredMatch && (
          <Reveal>
            <Link
              href={`/match/${featuredMatch.slug}`}
              className="glass glass-hover group mb-12 flex flex-col items-center justify-between gap-4 p-6 shadow-glow sm:flex-row"
            >
              <div className="flex items-center gap-4">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500/15 px-2.5 py-1 text-[11px] font-bold uppercase text-red-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500" /> Featured Match
                </span>
                <span className="flex items-center gap-3 text-xl font-bold text-white">
                  <Flag code={featuredMatch.home.iso2} name={featuredMatch.home.name} size="md" />
                  {featuredMatch.homeScore}
                  <span className="text-slate-600">–</span>
                  {featuredMatch.awayScore}
                  <Flag code={featuredMatch.away.iso2} name={featuredMatch.away.name} size="md" />
                </span>
              </div>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-neon-cyan">
                Open match centre
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </Reveal>
        )}

        <Group title="● Live" matches={liveMatches} />
        <Group title="Upcoming" matches={upcomingMatches} />
        <Group title="Recent Results" matches={recentResults} />
      </div>
    </>
  );
}
