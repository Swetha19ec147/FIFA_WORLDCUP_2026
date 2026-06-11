import type { Metadata } from "next";
import Link from "next/link";
import { Brain, Clock, ChevronRight, TrendingUp, Target } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import Flag from "@/components/ui/Flag";
import JsonLd from "@/components/ui/JsonLd";
import { pageMeta, faqJsonLd } from "@/lib/seo";
import { predictions } from "@/lib/predictions";

export const metadata: Metadata = pageMeta({
  title: "FIFA World Cup 2026 Predictions — Match Analysis, Score Predictions & Previews",
  description:
    "Expert FIFA World Cup 2026 match predictions with deep analysis — team form, head-to-head, predicted lineups, tactical breakdown and AI-powered score predictions for every fixture.",
  path: "/predictions",
  keywords: [
    "FIFA World Cup 2026 predictions", "World Cup 2026 match prediction",
    "World Cup 2026 preview", "World Cup 2026 score prediction",
    "FIFA 2026 analysis", "World Cup match analysis 2026",
    "World Cup 2026 preview today", "FIFA prediction expert",
  ],
});

const faq = faqJsonLd([
  { q: "Where can I find FIFA World Cup 2026 match predictions?", a: "Visionary FIFA publishes deep match predictions 4–5 hours before every World Cup 2026 kickoff, including score predictions, team form analysis, predicted lineups, and tactical breakdowns." },
  { q: "How are World Cup 2026 predictions calculated?", a: "Our AI model analyses team form (last 5 matches), head-to-head history, squad strength, tactical systems, injury reports, and statistical xG data to generate win probability and score predictions." },
  { q: "Who will win FIFA World Cup 2026?", a: "Our model currently rates Argentina, France, Brazil, Spain, Germany and England as the six most likely winners based on squad depth, recent form and tournament draw." },
]);

function WinBar({ label, pct, color }: { label: string; pct: number; color: string }) {
  return (
    <div className="flex-1">
      <div className="mb-1.5 flex justify-between text-xs">
        <span className="text-slate-400">{label}</span>
        <span className="font-bold text-white">{pct}%</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
        <div className={`h-full rounded-full transition-all ${color}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function ConfidenceBadge({ confidence }: { confidence: number }) {
  const color = confidence >= 65 ? "text-green-400 bg-green-500/10 border-green-500/20"
    : confidence >= 50 ? "text-neon-gold bg-neon-gold/10 border-neon-gold/20"
    : "text-orange-400 bg-orange-500/10 border-orange-500/20";
  return (
    <span className={`rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${color}`}>
      {confidence}% confidence
    </span>
  );
}

import { fetchPredictions } from "@/lib/api";

export default async function PredictionsPage() {
  const now = new Date();
  const predictions = await fetchPredictions();

  return (
    <>
      <JsonLd data={faq} />
      <PageHeader
        eyebrow="Deep Match Analysis"
        title="World Cup 2026 Predictions"
        description="Expert pre-match analysis published 4–5 hours before every kickoff — form, tactics, lineups, key battles and AI score predictions."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Predictions", path: "/predictions" },
        ]}
      />

      {/* How it works strip */}
      <div className="border-y border-white/[0.06] bg-ink-800/40">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-6 text-xs text-slate-400">
            <span className="flex items-center gap-1.5"><Brain className="h-3.5 w-3.5 text-neon-purple" /> AI-powered analysis</span>
            <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-neon-cyan" /> Published 4–5 hrs before kickoff</span>
            <span className="flex items-center gap-1.5"><Target className="h-3.5 w-3.5 text-neon-gold" /> Score + win probability</span>
            <span className="flex items-center gap-1.5"><TrendingUp className="h-3.5 w-3.5 text-green-400" /> Predicted lineups + tactics</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

        {/* Today's predictions section */}
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-neon-cyan">
            Upcoming Match Predictions
          </h2>
          <span className="text-xs text-slate-500">{predictions.length} predictions available</span>
        </div>

        <div className="space-y-4">
          {predictions.map((pred: any) => {
            const kickoff = pred.kickoff || pred.match?.kickoff;
            const kickoffDate = new Date(kickoff);
            const publishDate = new Date(pred.publishAt);
            const isLive = now >= publishDate;
            const kickoffStr = kickoffDate.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
            const kickoffTime = kickoffDate.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", timeZone: "UTC", hour12: true }) + " UTC";
            
            const stage = pred.stage || pred.match?.stage || 'Group Stage';
            const homeIso2 = pred.homeIso2 || pred.match?.home?.iso2;
            const homeTeam = pred.homeTeam || pred.match?.home?.name || 'Home';
            const awayIso2 = pred.awayIso2 || pred.match?.away?.iso2;
            const awayTeam = pred.awayTeam || pred.match?.away?.name || 'Away';
            const overview = pred.overview || pred.payload?.narrative || 'Full analysis available shortly.';
            const keyFactors = pred.keyFactors || pred.payload?.keyFactors || ['Tactical Battle', 'Key Players', 'Recent Form'];

            return (
              <Link
                key={pred.slug}
                href={`/predictions/${pred.slug}`}
                className="glass glass-hover group block rounded-2xl overflow-hidden"
              >
                <div className="p-5 sm:p-6">
                  {/* Stage + time row */}
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-neon-purple/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-neon-purple">
                        {stage}
                      </span>
                      <span className="text-xs text-slate-500">{kickoffStr} · {kickoffTime}</span>
                    </div>
                    <ConfidenceBadge confidence={pred.confidence} />
                  </div>

                  {/* Teams + score prediction */}
                  <div className="flex items-center gap-4">
                    <div className="flex flex-1 items-center gap-3 min-w-0">
                      <Flag code={homeIso2} name={homeTeam} size="lg" />
                      <span className="font-black text-white text-lg leading-tight truncate">{homeTeam}</span>
                    </div>

                    <div className="shrink-0 text-center">
                      <div className="glass rounded-xl px-5 py-2.5">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-1">Predicted</p>
                        <p className="text-2xl font-black text-neon-cyan tabular-nums">{pred.predictedScore}</p>
                      </div>
                    </div>

                    <div className="flex flex-1 items-center justify-end gap-3 min-w-0">
                      <span className="font-black text-white text-lg leading-tight truncate text-right">{awayTeam}</span>
                      <Flag code={awayIso2} name={awayTeam} size="lg" />
                    </div>
                  </div>

                  {/* Win probability bars */}
                  <div className="mt-5 flex gap-4">
                    <WinBar label={homeTeam.split(" ").slice(-1)[0]} pct={pred.homePct} color="bg-neon-cyan" />
                    <WinBar label="Draw" pct={pred.drawPct} color="bg-slate-500" />
                    <WinBar label={awayTeam.split(" ").slice(-1)[0]} pct={pred.awayPct} color="bg-neon-purple" />
                  </div>

                  {/* Overview teaser */}
                  <p className="mt-4 text-sm leading-relaxed text-slate-400 line-clamp-2">
                    {overview}
                  </p>

                  {/* CTA */}
                  <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-4">
                    <div className="flex flex-wrap gap-1.5">
                      {keyFactors.slice(0, 2).map((f: string, i: number) => (
                        <span key={i} className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-slate-500">
                          {f.length > 50 ? f.slice(0, 50) + "…" : f}
                        </span>
                      ))}
                    </div>
                    <span className="flex shrink-0 items-center gap-1 text-xs font-semibold text-neon-cyan group-hover:gap-2 transition-all">
                      Full Analysis <ChevronRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* What's inside each prediction */}
        <div className="mt-16 glass rounded-2xl p-6 sm:p-8">
          <h3 className="mb-6 text-sm font-bold uppercase tracking-[0.18em] text-neon-cyan">
            What's Inside Every Prediction
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Deep Tactical Analysis", desc: "Formation breakdown, pressing stats, playing styles and how each team's strengths match up" },
              { title: "Predicted Lineups", desc: "Expected starting XIs, formation, and key positional battles for each team" },
              { title: "Form & H2H", desc: "Last 5 results for both sides plus full head-to-head history and recent meetings" },
              { title: "Key Player Battles", desc: "3 pivotal individual matchups that will decide the outcome of the match" },
              { title: "Injury & Suspension News", desc: "Latest fitness updates, doubtful players, confirmed absences and return timelines" },
              { title: "xG & Match Stats", desc: "Expected goals, predicted possession, shots on target and corner forecasts" },
              { title: "Tournament Implications", desc: "How this result affects group standings, knockout seedings and World Cup paths" },
              { title: "Expert Verdict", desc: "Final prediction with reasoning, confidence rating, and recommended score" },
            ].map((item) => (
              <div key={item.title} className="rounded-xl bg-white/[0.03] p-4">
                <p className="mb-1.5 text-sm font-bold text-white">{item.title}</p>
                <p className="text-xs leading-relaxed text-slate-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
