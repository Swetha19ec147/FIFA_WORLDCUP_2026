import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Brain, Clock, MapPin, Calendar, Users, Shield, Swords,
  TrendingUp, AlertTriangle, BarChart3, Target, ChevronLeft, Star
} from "lucide-react";
import Flag from "@/components/ui/Flag";
import JsonLd from "@/components/ui/JsonLd";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import ShareButtons from "@/components/ui/ShareButtons";
import { SITE, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import { fetchPrediction, fetchPredictions } from "@/lib/api";

export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const preds = await fetchPredictions();
    return preds.map((p: any) => ({ slug: p.slug }));
  } catch (error) {
    console.warn("Could not fetch predictions during build. Skipping static generation.");
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const pred = await fetchPrediction(slug);
  if (!pred) return { title: "Prediction not found" };

  const title = `${pred.homeTeam} vs ${pred.awayTeam} Prediction — FIFA World Cup 2026 Preview, Lineups & Analysis`;
  const description = `${pred.homeTeam} vs ${pred.awayTeam} prediction: Our AI tips ${pred.predictedScore} (${pred.confidence}% confidence). Full tactical analysis, predicted lineups, form guide, H2H history and score prediction for this ${pred.stage} FIFA World Cup 2026 clash.`;
  const url = `${SITE.url}/predictions/${slug}`;

  return {
    title,
    description,
    keywords: [
      `${pred.homeTeam} vs ${pred.awayTeam} prediction`,
      `${pred.homeTeam} vs ${pred.awayTeam} preview`,
      `${pred.homeTeam} vs ${pred.awayTeam} World Cup 2026`,
      `${pred.homeTeam} World Cup prediction`,
      `${pred.awayTeam} World Cup prediction`,
      `FIFA World Cup 2026 ${pred.stage} prediction`,
      "FIFA World Cup 2026 predictions",
      "World Cup 2026 match analysis",
      `${pred.homeTeam} lineup World Cup 2026`,
      `${pred.awayTeam} lineup World Cup 2026`,
    ],
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "article", images: [{ url: "/og.png", width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", title, description },
  };
}

function ResultBadge({ result }: { result: "W" | "D" | "L" }) {
  const styles = { W: "bg-green-500/20 text-green-400", D: "bg-slate-500/20 text-slate-400", L: "bg-red-500/20 text-red-400" };
  return <span className={`inline-flex h-7 w-7 items-center justify-center rounded-lg text-xs font-black ${styles[result]}`}>{result}</span>;
}

function Section({ icon: Icon, title, children }: { icon: typeof Brain; title: string; children: React.ReactNode }) {
  return (
    <section className="glass rounded-2xl p-6">
      <div className="mb-5 flex items-center gap-2.5">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-neon-cyan">
          <Icon className="h-4 w-4" />
        </span>
        <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-slate-300">{title}</h2>
      </div>
      {children}
    </section>
  );
}

export default async function PredictionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pred = await fetchPrediction(slug);
  if (!pred) notFound();

  const kickoffDate = new Date(pred.kickoff);
  const kickoffFormatted = kickoffDate.toLocaleDateString("en-US", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });
  const kickoffTime = kickoffDate.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true, timeZone: "UTC" }) + " UTC";

  const pageUrl = `${SITE.url}/predictions/${slug}`;
  const shareText = `${pred.homeTeam} vs ${pred.awayTeam} — My prediction: ${pred.predictedScore}. Full analysis 👇 #WC2026 #WorldCup2026`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${pred.homeTeam} vs ${pred.awayTeam} Prediction — FIFA World Cup 2026`,
    description: pred.overview,
    datePublished: pred.publishAt,
    url: pageUrl,
    publisher: { "@type": "Organization", name: "Visionary FIFA", url: SITE.url },
    about: { "@type": "SportsEvent", name: `${pred.homeTeam} vs ${pred.awayTeam}`, startDate: pred.kickoff, location: { "@type": "Place", name: pred.stadium, address: pred.city } },
  };

  const faq = faqJsonLd([
    { q: `What is the prediction for ${pred.homeTeam} vs ${pred.awayTeam}?`, a: `Our prediction is ${pred.homeTeam} ${pred.predictedScore} ${pred.awayTeam} with ${pred.confidence}% confidence. ${pred.verdict}` },
    { q: `What are the lineups for ${pred.homeTeam} vs ${pred.awayTeam}?`, a: `Predicted ${pred.homeTeam} lineup: ${pred.homeXI.join(", ")}. Predicted ${pred.awayTeam} lineup: ${pred.awayXI.join(", ")}.` },
    { q: `When is ${pred.homeTeam} vs ${pred.awayTeam}?`, a: `${pred.homeTeam} vs ${pred.awayTeam} kicks off on ${kickoffFormatted} at ${kickoffTime} at ${pred.stadium}, ${pred.city}.` },
    { q: `What is the head-to-head record between ${pred.homeTeam} and ${pred.awayTeam}?`, a: pred.h2hSummary },
  ]);

  return (
    <>
      <JsonLd data={structuredData} />
      <JsonLd data={faq} />
      <JsonLd data={breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Predictions", path: "/predictions" },
        { name: `${pred.homeTeam} vs ${pred.awayTeam}`, path: `/predictions/${slug}` },
      ])} />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <header className="relative overflow-hidden border-b border-white/10 pt-20">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink-800 to-ink-900" />
        <div className="absolute left-1/4 top-10 h-64 w-64 rounded-full bg-neon-purple/15 blur-[120px]" />
        <div className="absolute right-1/4 top-10 h-64 w-64 rounded-full bg-neon-blue/15 blur-[120px]" />

        <div className="mx-auto max-w-5xl px-4 pb-10 sm:px-6 lg:px-8">
          <Breadcrumbs items={[
            { name: "Home", path: "/" },
            { name: "Predictions", path: "/predictions" },
            { name: `${pred.homeTeam} vs ${pred.awayTeam}`, path: `/predictions/${slug}` },
          ]} />

          {/* Stage + meta */}
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-400">
            <span className="rounded-full bg-neon-purple/15 px-2.5 py-1 font-bold uppercase tracking-wider text-neon-purple">{pred.stage}</span>
            <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {kickoffFormatted}</span>
            <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {kickoffTime}</span>
            <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {pred.stadium}, {pred.city}</span>
          </div>

          <h1 className="mt-4 text-3xl font-black text-white sm:text-4xl lg:text-5xl">
            {pred.homeTeam} vs {pred.awayTeam}
          </h1>
          <p className="mt-1 text-base text-neon-cyan font-semibold">Prediction, Preview &amp; Full Match Analysis — FIFA World Cup 2026</p>

          {/* Score prediction card */}
          <div className="mt-8 glass rounded-2xl p-6">
            <div className="flex items-center gap-6">
              {/* Home */}
              <div className="flex flex-1 flex-col items-center gap-2 sm:flex-row sm:gap-4">
                <Flag code={pred.homeIso2} name={pred.homeTeam} size="xl" />
                <span className="text-xl font-black text-white text-center sm:text-left">{pred.homeTeam}</span>
              </div>

              {/* Score */}
              <div className="shrink-0 text-center">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">AI Prediction</p>
                <div className="text-5xl font-black text-neon-cyan tabular-nums sm:text-6xl">{pred.predictedScore}</div>
                <div className="mt-2 flex items-center justify-center gap-2">
                  <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider border ${
                    pred.confidence >= 65 ? "bg-green-500/10 text-green-400 border-green-500/20"
                    : pred.confidence >= 50 ? "bg-neon-gold/10 text-neon-gold border-neon-gold/20"
                    : "bg-orange-500/10 text-orange-400 border-orange-500/20"
                  }`}>
                    {pred.confidence}% confidence
                  </span>
                </div>
              </div>

              {/* Away */}
              <div className="flex flex-1 flex-col items-center gap-2 sm:flex-row-reverse sm:gap-4">
                <Flag code={pred.awayIso2} name={pred.awayTeam} size="xl" />
                <span className="text-xl font-black text-white text-center sm:text-right">{pred.awayTeam}</span>
              </div>
            </div>

            {/* Win probability */}
            <div className="mt-6 grid grid-cols-3 gap-3">
              {[
                { label: pred.homeTeam.split(" ").slice(-1)[0], pct: pred.homePct, color: "from-neon-cyan to-neon-blue" },
                { label: "Draw", pct: pred.drawPct, color: "from-slate-500 to-slate-600" },
                { label: pred.awayTeam.split(" ").slice(-1)[0], pct: pred.awayPct, color: "from-neon-purple to-violet-600" },
              ].map(({ label, pct, color }) => (
                <div key={label} className="text-center">
                  <p className="text-xs text-slate-500 mb-1.5">{label}</p>
                  <div className="h-2 overflow-hidden rounded-full bg-white/5 mb-1.5">
                    <div className={`h-full rounded-full bg-gradient-to-r ${color}`} style={{ width: `${pct}%` }} />
                  </div>
                  <p className="text-sm font-black text-white">{pct}%</p>
                </div>
              ))}
            </div>
          </div>

          {/* Share */}
          <div className="mt-4">
            <ShareButtons url={pageUrl} text={shareText} />
          </div>
        </div>
      </header>

      {/* ── Main content ──────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-5xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">

        {/* Match Overview */}
        <Section icon={Brain} title="Match Overview">
          <p className="text-base leading-relaxed text-slate-300">{pred.overview}</p>
        </Section>

        {/* Full Analysis */}
        <Section icon={TrendingUp} title="Full Pre-Match Analysis">
          <div className="space-y-4">
            {pred.fullAnalysis.map((para: string, i: number) => (
              <p key={i} className="text-sm leading-[1.8] text-slate-300">{para}</p>
            ))}
          </div>
        </Section>

        {/* Form Guide */}
        <Section icon={BarChart3} title="Team Form — Last 5 Matches">
          <div className="grid gap-6 sm:grid-cols-2">
            {[
              { team: pred.homeTeam, iso2: pred.homeIso2, form: pred.homeForm },
              { team: pred.awayTeam, iso2: pred.awayIso2, form: pred.awayForm },
            ].map(({ team, iso2, form }) => (
              <div key={team}>
                <div className="mb-3 flex items-center gap-2">
                  <Flag code={iso2} name={team} size="sm" />
                  <span className="text-sm font-bold text-white">{team}</span>
                  <div className="ml-auto flex gap-1">
                    {form.map((f: any, i: number) => <ResultBadge key={i} result={f.result} />)}
                  </div>
                </div>
                <div className="space-y-2">
                  {form.map((f: any, i: number) => (
                    <div key={i} className="flex items-center justify-between rounded-lg bg-white/[0.03] px-3 py-2 text-xs">
                      <span className="text-slate-400">{f.opponent}</span>
                      <span className="font-semibold text-white">{f.score}</span>
                      <span className="text-slate-600">{f.competition}</span>
                      <ResultBadge result={f.result} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Head to Head */}
        <Section icon={Swords} title="Head-to-Head History">
          <div className="grid gap-4 sm:grid-cols-3 mb-4">
            {[
              { label: pred.homeTeam.split(" ").slice(-1)[0] + " Wins", value: pred.h2hHome, color: "text-neon-cyan" },
              { label: "Draws", value: pred.h2hDraw, color: "text-slate-400" },
              { label: pred.awayTeam.split(" ").slice(-1)[0] + " Wins", value: pred.h2hAway, color: "text-neon-purple" },
            ].map(({ label, value, color }) => (
              <div key={label} className="rounded-xl bg-white/[0.03] p-4 text-center">
                <p className={`text-4xl font-black ${color}`}>{value}</p>
                <p className="mt-1 text-xs text-slate-500 uppercase tracking-wider">{label}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-slate-300 mb-3">{pred.h2hSummary}</p>
          <div className="rounded-lg border border-white/5 bg-white/[0.02] px-4 py-3 text-xs text-slate-400">
            <span className="font-semibold text-slate-300">Last Meeting: </span>{pred.lastMeeting}
          </div>
        </Section>

        {/* Key Players */}
        <Section icon={Star} title="Key Players to Watch">
          <div className="grid gap-6 sm:grid-cols-2">
            {[
              { team: pred.homeTeam, iso2: pred.homeIso2, players: pred.homeKeyPlayers },
              { team: pred.awayTeam, iso2: pred.awayIso2, players: pred.awayKeyPlayers },
            ].map(({ team, iso2, players }) => (
              <div key={team}>
                <div className="mb-3 flex items-center gap-2">
                  <Flag code={iso2} name={team} size="sm" />
                  <span className="text-sm font-bold text-white">{team}</span>
                </div>
                <div className="space-y-3">
                  {players.map((p: any) => (
                    <div key={p.name} className="rounded-xl border border-white/5 bg-white/[0.03] p-4">
                      <div className="mb-1.5 flex items-start justify-between gap-2">
                        <span className="font-bold text-white text-sm">{p.name}</span>
                        <span className="shrink-0 rounded-full bg-neon-cyan/10 px-2 py-0.5 text-[10px] font-semibold text-neon-cyan">{p.position}</span>
                      </div>
                      <p className="text-xs font-semibold text-neon-gold mb-1.5">{p.stat}</p>
                      <p className="text-xs leading-relaxed text-slate-400">{p.impact}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Tactical Breakdown */}
        <Section icon={Shield} title="Tactical Breakdown">
          <div className="grid gap-6 sm:grid-cols-2">
            {[
              { team: pred.homeTeam, iso2: pred.homeIso2, tactics: pred.homeTactics },
              { team: pred.awayTeam, iso2: pred.awayIso2, tactics: pred.awayTactics },
            ].map(({ team, iso2, tactics }) => (
              <div key={team} className="rounded-xl border border-white/5 bg-white/[0.03] p-5">
                <div className="mb-4 flex items-center gap-2">
                  <Flag code={iso2} name={team} size="sm" />
                  <span className="font-bold text-white">{team}</span>
                  <span className="ml-auto rounded-full bg-neon-purple/15 px-2.5 py-1 text-xs font-black text-neon-purple">{tactics.formation}</span>
                </div>
                <p className="text-xs text-slate-400 mb-4 leading-relaxed">{tactics.style}</p>
                <div className="space-y-3">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-green-400 mb-1.5">Strengths</p>
                    <ul className="space-y-1">
                      {tactics.strengths.map((s: string) => (
                        <li key={s} className="flex items-start gap-1.5 text-xs text-slate-300">
                          <span className="text-green-400 mt-0.5">+</span>{s}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-red-400 mb-1.5">Weaknesses</p>
                    <ul className="space-y-1">
                      {tactics.weaknesses.map((w: string) => (
                        <li key={w} className="flex items-start gap-1.5 text-xs text-slate-300">
                          <span className="text-red-400 mt-0.5">−</span>{w}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Key Battles */}
        <Section icon={Swords} title="Key Player Battles">
          <div className="space-y-4">
            {pred.battles.map((b: any, i: number) => (
              <div key={i} className="rounded-xl border border-white/5 bg-white/[0.03] p-4">
                <div className="flex items-center gap-3 mb-2">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-neon-purple/20 text-[11px] font-black text-neon-purple">{i + 1}</span>
                  <span className="font-bold text-white text-sm">{b.home}</span>
                  <span className="text-slate-600 text-xs">vs</span>
                  <span className="font-bold text-white text-sm">{b.away}</span>
                </div>
                <p className="text-xs leading-relaxed text-slate-400">{b.context}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Predicted Lineups */}
        <Section icon={Users} title="Predicted Lineups">
          <div className="grid gap-6 sm:grid-cols-2">
            {[
              { team: pred.homeTeam, iso2: pred.homeIso2, xi: pred.homeXI, formation: pred.homeTactics.formation },
              { team: pred.awayTeam, iso2: pred.awayIso2, xi: pred.awayXI, formation: pred.awayTactics.formation },
            ].map(({ team, iso2, xi, formation }) => (
              <div key={team}>
                <div className="mb-3 flex items-center gap-2">
                  <Flag code={iso2} name={team} size="sm" />
                  <span className="font-bold text-white text-sm">{team}</span>
                  <span className="ml-auto text-[10px] font-black text-neon-cyan">{formation}</span>
                </div>
                <div className="rounded-xl border border-white/5 bg-white/[0.03] p-3 space-y-1">
                  {xi.map((player: string, i: number) => (
                    <div key={player} className="flex items-center gap-2 px-1 py-1.5 rounded-lg hover:bg-white/[0.03]">
                      <span className="w-5 text-[10px] font-bold text-slate-600 text-right">{i + 1}</span>
                      <span className="text-sm text-white">{player}</span>
                      {i === 0 && <span className="ml-auto text-[9px] text-slate-600 uppercase tracking-wider">GK</span>}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Injuries & Suspensions */}
        {(pred.injuries.length > 0 || pred.suspensions.length > 0) && (
          <Section icon={AlertTriangle} title="Injuries &amp; Suspensions">
            {pred.injuries.length > 0 && (
              <div className="mb-4">
                <p className="text-[10px] font-bold uppercase tracking-wider text-orange-400 mb-2">Injuries</p>
                <div className="space-y-2">
                  {pred.injuries.map((inj: string) => (
                    <div key={inj} className="flex items-center gap-2 rounded-lg border border-orange-500/10 bg-orange-500/5 px-3 py-2 text-sm text-slate-300">
                      <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-orange-400" />{inj}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {pred.suspensions.length > 0 && (
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-red-400 mb-2">Suspensions</p>
                <div className="space-y-2">
                  {pred.suspensions.map((s: string) => (
                    <div key={s} className="flex items-center gap-2 rounded-lg border border-red-500/10 bg-red-500/5 px-3 py-2 text-sm text-slate-300">
                      <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-red-400" />{s}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {pred.suspensions.length === 0 && pred.injuries.length > 0 && (
              <p className="mt-3 text-xs text-slate-600">No suspensions for this fixture.</p>
            )}
          </Section>
        )}

        {/* Predicted Match Stats */}
        <Section icon={BarChart3} title="Predicted Match Statistics">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Expected Goals (xG)", home: pred.stats.homeXG.toFixed(1), away: pred.stats.awayXG.toFixed(1) },
              { label: "Possession", home: `${pred.stats.homePossession}%`, away: `${100 - pred.stats.homePossession}%` },
              { label: "Shots on Target", home: String(pred.stats.homeShotsOnTarget), away: String(pred.stats.awayShotsOnTarget) },
              { label: "Corner Kicks", home: String(pred.stats.homeCorners), away: String(pred.stats.awayCorners) },
            ].map(({ label, home, away }) => (
              <div key={label} className="rounded-xl border border-white/5 bg-white/[0.03] p-4 text-center">
                <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-3">{label}</p>
                <div className="flex items-center justify-around">
                  <div>
                    <p className="text-2xl font-black text-neon-cyan">{home}</p>
                    <p className="text-[10px] text-slate-600 mt-0.5">{pred.homeTeam.split(" ").slice(-1)[0]}</p>
                  </div>
                  <span className="text-slate-700 text-xs">vs</span>
                  <div>
                    <p className="text-2xl font-black text-neon-purple">{away}</p>
                    <p className="text-[10px] text-slate-600 mt-0.5">{pred.awayTeam.split(" ").slice(-1)[0]}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Key Factors */}
        <Section icon={Target} title="Key Factors That Will Decide This Match">
          <ul className="space-y-3">
            {pred.keyFactors.map((factor: string, i: number) => (
              <li key={i} className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.03] p-4">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-neon-gold/20 text-[11px] font-black text-neon-gold">{i + 1}</span>
                <span className="text-sm leading-relaxed text-slate-300">{factor}</span>
              </li>
            ))}
          </ul>
        </Section>

        {/* Tournament Implications */}
        <Section icon={TrendingUp} title="Tournament Implications">
          <p className="text-sm leading-relaxed text-slate-300">{pred.tournamentImplications}</p>
        </Section>

        {/* Expert Verdict */}
        <div className="glass rounded-2xl border border-neon-cyan/20 bg-neon-cyan/[0.03] p-6">
          <div className="mb-4 flex items-center gap-2.5">
            <Brain className="h-5 w-5 text-neon-cyan" />
            <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-neon-cyan">Visionary AI — Expert Verdict</h2>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <Flag code={pred.homeIso2} name={pred.homeTeam} size="lg" />
            <span className="text-4xl font-black text-neon-cyan">{pred.predictedScore}</span>
            <Flag code={pred.awayIso2} name={pred.awayTeam} size="lg" />
          </div>
          <p className="text-base leading-relaxed text-white font-medium">{pred.verdict}</p>
          <div className="mt-4">
            <ShareButtons url={pageUrl} text={shareText} />
          </div>
        </div>

        {/* Back to predictions */}
        <div className="flex items-center justify-between pt-4">
          <Link href="/predictions" className="flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-white transition">
            <ChevronLeft className="h-4 w-4" /> All Predictions
          </Link>
          <Link href="/bracket" className="btn-ghost text-xs !px-4 !py-2">
            Build Your Bracket →
          </Link>
        </div>
      </div>
    </>
  );
}
