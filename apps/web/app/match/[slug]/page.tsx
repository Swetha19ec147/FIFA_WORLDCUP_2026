import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MapPin, Brain, Users, Activity, History } from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Flag from "@/components/ui/Flag";
import StatBar from "@/components/live/StatBar";
import Timeline from "@/components/live/Timeline";
import Reveal from "@/components/ui/Reveal";
import JsonLd from "@/components/ui/JsonLd";
import { cn } from "@/lib/utils";
import { pageMeta, sportsEventJsonLd, faqJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import {
  findMatch,
  allMatches,
  matchTimeline,
  matchStats,
  headToHead,
  teamForm,
  keyPlayers,
} from "@/lib/data";

export function generateStaticParams() {
  return allMatches.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const match = findMatch(slug);
  if (!match) return pageMeta({ title: "Match not found" });
  const title = `${match.home.name} vs ${match.away.name} — FIFA World Cup 2026 Live Score, Prediction & Stats`;
  return pageMeta({
    title,
    description: `${match.home.name} vs ${match.away.name} live score, match stats, AI prediction and timeline at ${match.stadium}, ${match.city}. FIFA World Cup 2026 ${match.stage}.`,
    path: `/match/${match.slug}`,
    keywords: [
      `${match.home.name} vs ${match.away.name}`,
      `${match.home.name} vs ${match.away.name} prediction`,
      `${match.home.name} vs ${match.away.name} live score`,
      `${match.home.name} vs ${match.away.name} FIFA 2026`,
      `${match.home.name} vs ${match.away.name} analysis`,
      "FIFA World Cup 2026",
    ],
  });
}

function FormPills({ form }: { form: string[] }) {
  return (
    <div className="flex gap-1.5">
      {form.map((r, i) => (
        <span
          key={i}
          className={cn(
            "flex h-7 w-7 items-center justify-center rounded-md text-xs font-bold",
            r === "W" && "bg-neon-cyan/20 text-neon-cyan",
            r === "D" && "bg-white/10 text-slate-300",
            r === "L" && "bg-red-500/20 text-red-400",
          )}
        >
          {r}
        </span>
      ))}
    </div>
  );
}

export default async function MatchPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const match = findMatch(slug);
  if (!match) notFound();

  const live = match.status === "LIVE";

  return (
    <>
      <JsonLd data={sportsEventJsonLd({
        homeTeam: match.home.name,
        awayTeam: match.away.name,
        startDate: match.kickoff,
        location: match.stadium,
        city: match.city,
        path: `/match/${match.slug}`,
      })} />
      <JsonLd data={breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Live Scores", path: "/live-scores" },
        { name: `${match.home.name} vs ${match.away.name}`, path: `/match/${match.slug}` },
      ])} />
      <JsonLd data={faqJsonLd([
        { q: `What time is ${match.home.name} vs ${match.away.name}?`, a: `${match.home.name} vs ${match.away.name} kicks off at ${match.kickoff} at ${match.stadium}, ${match.city} in FIFA World Cup 2026 ${match.stage}.` },
        { q: `What is the prediction for ${match.home.name} vs ${match.away.name}?`, a: `AI analysis gives ${match.home.name} a 58% win probability versus ${match.away.name} (24% draw, 18% away win) based on form, xG and head-to-head records.` },
        { q: `Where is ${match.home.name} vs ${match.away.name} being played?`, a: `The match is played at ${match.stadium} in ${match.city}.` },
        { q: `What stage is ${match.home.name} vs ${match.away.name}?`, a: `This is a ${match.stage} match at the FIFA World Cup 2026.` },
      ])} />

      {/* Match banner */}
      <header className="relative overflow-hidden border-b border-white/10 pt-24">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink-800 to-ink-900" />
        <div className="absolute -top-16 left-1/4 h-64 w-64 animate-pulse-glow rounded-full bg-neon-cyan/20 blur-[110px]" />
        <div className="absolute -top-16 right-1/4 h-64 w-64 animate-pulse-glow rounded-full bg-neon-purple/20 blur-[110px]" />

        <div className="relative mx-auto max-w-5xl px-4 pb-12 sm:px-6">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Live Scores", path: "/live-scores" },
              { name: `${match.home.name} vs ${match.away.name}`, path: `/match/${match.slug}` },
            ]}
          />

          <h1 className="sr-only">
            {match.home.name} vs {match.away.name} — FIFA World Cup 2026 live
            score, timeline and stats
          </h1>

          <div className="mb-6 flex items-center justify-center gap-2 text-center">
            {live ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500/15 px-3 py-1 text-xs font-bold uppercase text-red-400">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
                </span>
                Live · {match.minute}&apos;
              </span>
            ) : (
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase text-slate-300">
                {match.status === "FT" ? "Full-time" : match.stage}
              </span>
            )}
          </div>

          <div className="grid grid-cols-3 items-center gap-4">
            <div className="flex flex-col items-center text-center sm:flex-row sm:justify-end sm:gap-4">
              <span className="sm:order-2">
                <Flag code={match.home.iso2} name={match.home.name} size="xl" />
              </span>
              <span className="mt-2 text-lg font-bold text-white sm:order-1 sm:mt-0">
                {match.home.name}
              </span>
            </div>

            <div className="text-center">
              <div className="text-5xl font-black tabular-nums text-white sm:text-6xl">
                <span className={live ? "text-neon-cyan" : ""}>
                  {match.homeScore ?? "–"}
                </span>
                <span className="mx-2 text-slate-600">:</span>
                <span className={live ? "text-neon-purple" : ""}>
                  {match.awayScore ?? "–"}
                </span>
              </div>
              <p className="mt-2 text-xs uppercase tracking-wider text-slate-500">
                {match.stage}
              </p>
            </div>

            <div className="flex flex-col items-center text-center sm:flex-row sm:justify-start sm:gap-4">
              <Flag code={match.away.iso2} name={match.away.name} size="xl" />
              <span className="mt-2 text-lg font-bold text-white sm:mt-0">
                {match.away.name}
              </span>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-1.5 text-sm text-slate-400">
            <MapPin className="h-4 w-4" />
            {match.stadium}, {match.city}
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-12 sm:px-6 lg:grid-cols-3 lg:px-8">
        {/* Left column: timeline + stats */}
        <div className="space-y-6 lg:col-span-2">
          <Reveal>
            <div className="glass p-6">
              <h2 className="mb-5 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-white">
                <Activity className="h-4 w-4 text-neon-cyan" /> Live Timeline
              </h2>
              <Timeline events={matchTimeline} />
            </div>
          </Reveal>

          <Reveal>
            <div className="glass p-6">
              <h2 className="mb-6 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-white">
                <Activity className="h-4 w-4 text-neon-purple" /> Match Statistics
              </h2>
              <div className="mb-6 flex items-center justify-between text-sm font-semibold">
                <span className="flex items-center gap-2 text-neon-cyan">
                  <Flag code={match.home.iso2} name={match.home.name} size="sm" /> {match.home.name}
                </span>
                <span className="flex items-center gap-2 text-neon-purple">
                  {match.away.name} <Flag code={match.away.iso2} name={match.away.name} size="sm" />
                </span>
              </div>
              <div className="space-y-5">
                {matchStats.map((s) => (
                  <StatBar key={s.label} {...s} />
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right column: AI, H2H, form, key players */}
        <div className="space-y-6">
          <Reveal>
            <div className="glass p-6 shadow-glow-purple">
              <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-white">
                <Brain className="h-4 w-4 text-neon-purple" /> AI Prediction
              </h2>
              <div className="space-y-3">
                {[
                  { label: match.home.name, pct: 58, color: "from-neon-cyan to-neon-blue" },
                  { label: "Draw", pct: 24, color: "from-slate-500 to-slate-400" },
                  { label: match.away.name, pct: 18, color: "from-neon-purple to-fuchsia-500" },
                ].map((o) => (
                  <div key={o.label}>
                    <div className="mb-1 flex justify-between text-xs">
                      <span className="text-slate-300">{o.label}</span>
                      <span className="font-bold text-white">{o.pct}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-white/5">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${o.color}`}
                        style={{ width: `${o.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-4 rounded-lg bg-white/5 p-3 text-xs leading-relaxed text-slate-400">
                <strong className="text-neon-cyan">Insight:</strong> {match.home.name}{" "}
                edge the xG battle and convert the higher-quality chances late.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div className="glass p-6">
              <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-white">
                <Activity className="h-4 w-4 text-neon-cyan" /> Team Form
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-300">{match.home.name}</span>
                  <FormPills form={teamForm.home} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-300">{match.away.name}</span>
                  <FormPills form={teamForm.away} />
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="glass p-6">
              <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-white">
                <History className="h-4 w-4 text-neon-gold" /> Head to Head
              </h2>
              <ul className="space-y-2.5">
                {headToHead.map((h, i) => (
                  <li
                    key={i}
                    className="flex items-center justify-between rounded-lg bg-white/[0.03] px-3 py-2 text-sm"
                  >
                    <span className="text-slate-400">{h.date} · {h.comp}</span>
                    <span className="font-bold text-white">{h.score}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal>
            <div className="glass p-6">
              <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-white">
                <Users className="h-4 w-4 text-neon-cyan" /> Key Players
              </h2>
              <ul className="space-y-3">
                {keyPlayers.map((p) => (
                  <li key={p.name} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-white">{p.name}</p>
                      <p className="text-xs text-slate-500">
                        {p.team === "home" ? match.home.name : match.away.name} · {p.role}
                      </p>
                    </div>
                    <span className="rounded-lg bg-white/5 px-2.5 py-1 text-xs font-bold text-neon-cyan">
                      {p.stat}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </>
  );
}
