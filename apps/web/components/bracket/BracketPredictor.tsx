"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, RotateCcw, ChevronRight, Share2, Check } from "lucide-react";
import Flag from "@/components/ui/Flag";

type Team = { name: string; iso2: string };

const R32: [Team, Team][] = [
  [{ name: "Argentina", iso2: "ar" }, { name: "Morocco", iso2: "ma" }],
  [{ name: "France", iso2: "fr" }, { name: "Senegal", iso2: "sn" }],
  [{ name: "Brazil", iso2: "br" }, { name: "Australia", iso2: "au" }],
  [{ name: "Spain", iso2: "es" }, { name: "Japan", iso2: "jp" }],
  [{ name: "Germany", iso2: "de" }, { name: "Colombia", iso2: "co" }],
  [{ name: "Netherlands", iso2: "nl" }, { name: "Mexico", iso2: "mx" }],
  [{ name: "Portugal", iso2: "pt" }, { name: "USA", iso2: "us" }],
  [{ name: "Belgium", iso2: "be" }, { name: "South Korea", iso2: "kr" }],
  [{ name: "England", iso2: "gb-eng" }, { name: "Iran", iso2: "ir" }],
  [{ name: "Croatia", iso2: "hr" }, { name: "Canada", iso2: "ca" }],
  [{ name: "Uruguay", iso2: "uy" }, { name: "Ecuador", iso2: "ec" }],
  [{ name: "Switzerland", iso2: "ch" }, { name: "Turkey", iso2: "tr" }],
  [{ name: "Denmark", iso2: "dk" }, { name: "Ghana", iso2: "gh" }],
  [{ name: "Serbia", iso2: "rs" }, { name: "Saudi Arabia", iso2: "sa" }],
  [{ name: "Poland", iso2: "pl" }, { name: "Cameroon", iso2: "cm" }],
  [{ name: "Austria", iso2: "at" }, { name: "Chile", iso2: "cl" }],
];

const ALL_TEAMS = R32.flat();
const ROUND_NAMES = ["Round of 32", "Round of 16", "Quarter-Finals", "Semi-Finals", "Final"];
const ROUND_COUNTS = [16, 8, 4, 2, 1];

function findIso(name: string) {
  return ALL_TEAMS.find((t) => t.name === name)?.iso2 ?? "un";
}

function buildMatchups(picks: string[][], round: number): [Team, Team][] {
  if (round === 0) return R32;
  const prev = picks[round - 1];
  const out: [Team, Team][] = [];
  for (let i = 0; i < prev.length; i += 2) {
    const a = prev[i] ?? "";
    const b = prev[i + 1] ?? "";
    out.push([
      { name: a || "TBD", iso2: findIso(a) },
      { name: b || "TBD", iso2: findIso(b) },
    ]);
  }
  return out;
}

export default function BracketPredictor() {
  const [picks, setPicks] = useState<string[][]>([[], [], [], [], []]);
  const [round, setRound] = useState(0);
  const [champion, setChampion] = useState<Team | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const s = localStorage.getItem("wc2026-bracket-v2");
      if (s) {
        const d = JSON.parse(s);
        setPicks(d.picks ?? [[], [], [], [], []]);
        setRound(d.round ?? 0);
        setChampion(d.champion ?? null);
      }
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem("wc2026-bracket-v2", JSON.stringify({ picks, round, champion }));
  }, [picks, round, champion]);

  const matchups = buildMatchups(picks, round);
  const currentPicks = picks[round] ?? [];
  const totalMatches = ROUND_COUNTS[round];
  const pickedCount = currentPicks.filter(Boolean).length;
  const allPicked = pickedCount === totalMatches;

  function pick(matchIdx: number, team: Team) {
    if (!team.name || team.name === "TBD") return;
    const next = picks.map((r) => [...r]);
    next[round][matchIdx] = team.name;
    for (let r = round + 1; r < 5; r++) next[r] = [];
    setPicks(next);
  }

  function advance() {
    if (round === 4) {
      const winner = picks[4][0];
      setChampion({ name: winner, iso2: findIso(winner) });
    } else {
      setRound((r) => r + 1);
    }
  }

  function reset() {
    setPicks([[], [], [], [], []]);
    setRound(0);
    setChampion(null);
    localStorage.removeItem("wc2026-bracket-v2");
  }

  const siteUrl = typeof window !== "undefined" ? window.location.origin : "https://visionaryfifa.com";
  const shareText = champion
    ? `🏆 My #WC2026 prediction: ${champion.name} wins the FIFA World Cup 2026! Make your own bracket 👇 #WorldCup2026 #FIFA`
    : `⚽ I'm predicting the FIFA World Cup 2026 bracket! Join me 👇 #WC2026 #WorldCup2026`;
  const shareUrl = `${siteUrl}/bracket`;

  async function handleShare() {
    if (navigator.share) {
      await navigator.share({ title: "My WC2026 Bracket", text: shareText, url: shareUrl });
    } else {
      await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  }

  // ── Champion screen ────────────────────────────────────────────────────────
  if (champion) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-4 pt-20 text-center">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 200 }}>
          <div className="text-7xl mb-4">🏆</div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-neon-cyan mb-2">Your Predicted Champion</p>
          <div className="flex items-center justify-center gap-4 my-6">
            <Flag code={champion.iso2} name={champion.name} size="xl" />
            <h1 className="text-5xl font-black text-white sm:text-6xl">{champion.name}</h1>
          </div>
          <p className="text-slate-400 mb-2">FIFA World Cup 2026 Winner — Your Prediction</p>
          <p className="text-xs text-slate-600 mb-10">Share to challenge your friends!</p>

          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <button onClick={handleShare} className="btn-primary">
              {copied ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
              {copied ? "Copied to clipboard!" : "Share My Prediction"}
            </button>
            <button onClick={reset} className="btn-ghost">
              <RotateCcw className="h-4 w-4" /> Start Over
            </button>
          </div>

          <div className="mt-6 flex justify-center gap-3">
            <a
              href={`https://wa.me/?text=${encodeURIComponent(shareText + "\n" + shareUrl)}`}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl border border-green-500/30 bg-green-600/15 px-4 py-2.5 text-sm font-semibold text-green-400 transition hover:bg-green-600/25"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
              WhatsApp
            </a>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}&hashtags=WC2026,WorldCup2026`}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl border border-sky-500/30 bg-sky-600/15 px-4 py-2.5 text-sm font-semibold text-sky-400 transition hover:bg-sky-600/25"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              Twitter / X
            </a>
          </div>
        </motion.div>
      </div>
    );
  }

  // ── Predictor ─────────────────────────────────────────────────────────────
  return (
    <>
      <header className="relative border-b border-white/10 bg-ink-800/60 pt-24 pb-8">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-neon-cyan">FIFA World Cup 2026</p>
          <div className="mt-2 flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-black text-white sm:text-4xl">Bracket Predictor</h1>
              <p className="mt-1 text-sm text-slate-400">Pick your winners — all the way to the final</p>
            </div>
            <button onClick={reset} className="btn-ghost shrink-0 !px-3 !py-2 text-xs">
              <RotateCcw className="h-3.5 w-3.5" /> Reset
            </button>
          </div>

          {/* Round tabs */}
          <div className="mt-5 flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {ROUND_NAMES.map((name, i) => (
              <button
                key={name}
                disabled={i > round}
                onClick={() => i < round && setRound(i)}
                className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                  i === round
                    ? "bg-neon-cyan text-ink-900"
                    : i < round
                    ? "bg-white/10 text-white hover:bg-white/20 cursor-pointer"
                    : "bg-white/5 text-slate-600 cursor-not-allowed"
                }`}
              >
                {i < round ? "✓ " : ""}{name}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
            {ROUND_NAMES[round]}
          </h2>
          <span className="text-xs text-slate-500">
            {pickedCount} / {totalMatches} picked
          </span>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {matchups.map(([teamA, teamB], idx) => {
              const winner = currentPicks[idx];
              return (
                <motion.div
                  key={`${round}-${idx}`}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.035, duration: 0.3 }}
                  className="glass overflow-hidden rounded-2xl"
                >
                  <div className="border-b border-white/5 px-4 py-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-600">
                      Match {idx + 1}
                    </span>
                  </div>
                  {[teamA, teamB].map((team) => {
                    const isWinner = winner === team.name;
                    const isLoser = !!winner && !isWinner;
                    const isTbd = !team.name || team.name === "TBD";
                    return (
                      <button
                        key={team.name}
                        disabled={isTbd}
                        onClick={() => pick(idx, team)}
                        className={`flex w-full items-center gap-3 border-b border-white/5 px-4 py-3.5 text-left transition last:border-0 ${
                          isWinner
                            ? "border-l-[3px] border-l-neon-cyan bg-neon-cyan/10"
                            : isLoser
                            ? "opacity-30"
                            : isTbd
                            ? "cursor-default opacity-40"
                            : "cursor-pointer hover:bg-white/5"
                        }`}
                      >
                        <Flag code={team.iso2} name={team.name} size="sm" />
                        <span className={`flex-1 text-sm font-semibold ${isWinner ? "text-neon-cyan" : "text-white"}`}>
                          {team.name}
                        </span>
                        {isWinner && <Check className="h-4 w-4 text-neon-cyan" />}
                      </button>
                    );
                  })}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {allPicked && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-10 flex flex-col items-center gap-3"
          >
            <button onClick={advance} className="btn-primary px-10 py-4 text-base">
              {round === 4 ? (
                <><Trophy className="h-5 w-5" /> Reveal My Champion!</>
              ) : (
                <>Advance to {ROUND_NAMES[round + 1]} <ChevronRight className="h-5 w-5" /></>
              )}
            </button>
            <p className="text-xs text-slate-600">
              You can go back and change picks anytime
            </p>
          </motion.div>
        )}
      </div>
    </>
  );
}
