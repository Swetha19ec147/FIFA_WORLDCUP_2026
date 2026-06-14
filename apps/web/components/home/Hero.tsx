"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CalendarDays, Globe2, MapPin, PlayCircle, Sparkles, Star, Users } from "lucide-react";
import TrophyCup from "@/components/ui/TrophyCup";
import Flag from "@/components/ui/Flag";
import TrendingChips from "@/components/ui/TrendingChips";
import { hostNations, tournamentMeta } from "@/lib/data";

const FINAL = new Date(tournamentMeta.finalDate).getTime();

function useCountdown() {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, FINAL - Date.now());
      setT({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff / 3600000) % 24),
        m: Math.floor((diff / 60000) % 60),
        s: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}

const stats = [
  { icon: MapPin, label: "16 Host Cities" },
  { icon: Users, label: "48 Teams" },
  { icon: CalendarDays, label: tournamentMeta.dateLabel },
  { icon: Globe2, label: "104 Matches" },
  { icon: Star, label: "One Legendary Tournament" },
];

/** Night city skyline + stadium glow — the poster's backdrop. */
function CityBackdrop() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#060b1e] via-[#091233] to-[#05060f]" />
      <div className="absolute left-1/2 top-10 h-72 w-[44rem] -translate-x-1/2 rounded-full bg-neon-blue/15 blur-[140px]" />
      <div className="absolute right-10 top-24 h-64 w-64 rounded-full bg-neon-purple/15 blur-[120px]" />
      {/* faint grid */}
      <div className="absolute inset-0 bg-grid-faint bg-[size:64px_64px] opacity-[0.12]" />
      {/* skyline */}
      <svg
        className="absolute inset-x-0 bottom-0 h-48 w-full"
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
        fill="none"
        aria-hidden
      >
        <g fill="#0b1430" stroke="#16224a" strokeWidth="1">
          <rect x="30" y="120" width="44" height="80" />
          <rect x="84" y="90" width="34" height="110" />
          <rect x="128" y="135" width="50" height="65" />
          <rect x="190" y="70" width="30" height="130" />
          <rect x="232" y="110" width="40" height="90" />
          <rect x="286" y="140" width="60" height="60" />
          <rect x="360" y="95" width="34" height="105" />
          <rect x="408" y="125" width="48" height="75" />
          <rect x="470" y="80" width="28" height="120" />
          <rect x="512" y="115" width="44" height="85" />
          <rect x="572" y="138" width="56" height="62" />
          <rect x="644" y="60" width="32" height="140" />
          <rect x="690" y="105" width="40" height="95" />
          <rect x="744" y="130" width="52" height="70" />
          <rect x="812" y="88" width="30" height="112" />
          <rect x="856" y="120" width="46" height="80" />
          <rect x="916" y="142" width="58" height="58" />
          <rect x="990" y="74" width="32" height="126" />
          <rect x="1036" y="112" width="42" height="88" />
          <rect x="1092" y="134" width="54" height="66" />
          <rect x="1160" y="92" width="34" height="108" />
          <rect x="1208" y="124" width="46" height="76" />
          <rect x="1268" y="100" width="36" height="100" />
          <rect x="1318" y="136" width="58" height="64" />
          <rect x="1388" y="116" width="40" height="84" />
        </g>
        {/* lit windows */}
        <g fill="#22e1ff" opacity="0.5">
          {Array.from({ length: 60 }).map((_, i) => (
            <rect key={i} x={40 + (i * 137) % 1380} y={90 + ((i * 53) % 90)} width="3" height="3" />
          ))}
        </g>
      </svg>
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink-900 to-transparent" />
    </div>
  );
}

function fade(delay: number) {
  return {
    initial: { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
  };
}

export default function Hero() {
  const { d, h, m, s } = useCountdown();

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-16">
      <CityBackdrop />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-12 lg:gap-6 lg:px-8">
        {/* Left — identity */}
        <motion.div {...fade(0)} className="lg:col-span-4">
          <span className="text-sm font-semibold uppercase tracking-[0.3em] text-neon-cyan">
            United by 3 Nations
          </span>
          <h1 className="mt-3 text-4xl font-black uppercase leading-[0.95] tracking-tight text-white sm:text-5xl">
            FIFA World Cup
            <span className="mt-1 block text-gradient-gold text-5xl sm:text-7xl">2026</span>
          </h1>

          {/* host flags */}
          <div className="mt-6 flex flex-wrap gap-4">
            {hostNations.map((n) => (
              <div key={n.iso2} className="flex items-center gap-2">
                <Flag code={n.iso2} name={n.name} size="md" />
                <span className="text-sm font-semibold text-slate-200">{n.name}</span>
              </div>
            ))}
          </div>

          {/* tagline */}
          <div className="mt-8 space-y-0.5 text-2xl font-black uppercase leading-tight tracking-tight sm:text-3xl">
            <p className="text-white">One Game.</p>
            <p className="text-gradient-gold">One World.</p>
            <p className="text-slate-400">One Cup.</p>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/schedule" className="btn-primary">
              <PlayCircle className="h-5 w-5" /> Explore Matches
            </Link>
            <Link href="/predictions" className="btn-ghost">
              <Sparkles className="h-5 w-5 text-neon-purple" /> AI Predictions
            </Link>
          </div>
        </motion.div>

        {/* Center — trophy with "26" */}
        <motion.div
          {...fade(0.15)}
          className="relative flex items-center justify-center lg:col-span-4"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute select-none text-[12rem] font-black leading-none text-white/[0.04] sm:text-[16rem]"
          >
            26
          </span>
          <TrophyCup glow podium className="relative h-72 w-auto sm:h-96 lg:h-[34rem]" />
        </motion.div>

        {/* Right — facts + countdown */}
        <motion.div {...fade(0.3)} className="lg:col-span-4">
          <ul className="space-y-3">
            {stats.map((st) => (
              <li
                key={st.label}
                className="glass glass-hover flex items-center gap-3 px-4 py-3"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-neon-gold/15 text-neon-gold">
                  <st.icon className="h-4 w-4" />
                </span>
                <span className="font-semibold text-white">{st.label}</span>
              </li>
            ))}
          </ul>

          {/* countdown */}
          <div className="glass mt-4 p-4">
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neon-cyan">
              Countdown to the Final
            </span>
            <div className="mt-3 grid grid-cols-4 gap-2 text-center">
              {[
                [d, "Days"],
                [h, "Hrs"],
                [m, "Min"],
                [s, "Sec"],
              ].map(([v, l]) => (
                <div key={l as string} className="rounded-xl bg-white/5 py-2">
                  <div className="text-2xl font-black tabular-nums text-white">
                    {String(v).padStart(2, "0")}
                  </div>
                  <div className="text-[9px] font-semibold uppercase tracking-[0.15em] text-slate-400">
                    {l}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Trending bar pinned to bottom of hero */}
      <div className="absolute inset-x-0 bottom-0 border-t border-white/[0.06] bg-ink-900/60 backdrop-blur-sm px-4 py-2 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <TrendingChips />
        </div>
      </div>
    </section>
  );
}
