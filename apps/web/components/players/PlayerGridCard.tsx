"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Flag from "@/components/ui/Flag";
import PlayerAvatar from "@/components/ui/PlayerAvatar";
import type { PlayerPro } from "@/lib/players";

function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="text-center">
      <div className={accent ? "text-base font-black text-neon-gold" : "text-base font-black text-white"}>
        {value}
      </div>
      <div className="text-[9px] font-semibold uppercase tracking-wider text-slate-500">
        {label}
      </div>
    </div>
  );
}

export default function PlayerGridCard({ player: p }: { player: PlayerPro }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35 }}
      whileHover={{ y: -6 }}
      className="glass glass-hover group flex flex-col p-5 hover:shadow-glow"
    >
      <div className="flex items-center gap-3">
        <PlayerAvatar name={p.name} image={p.image} size="lg" />
        <div className="min-w-0 flex-1">
          <span className="rounded-md bg-white/5 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-neon-cyan">
            {p.posGroup}
          </span>
          <h3 className="mt-1 truncate text-lg font-bold leading-tight text-white">
            {p.name}
          </h3>
          <p className="flex items-center gap-1.5 text-xs text-slate-400">
            <Flag code={p.iso2} name={p.country} size="sm" className="!h-3 !w-4" />
            {p.country}
          </p>
        </div>
        <span className="text-2xl font-black text-white/10">{p.number}</span>
      </div>

      <p className="mt-3 text-xs text-slate-400">
        {p.club} · {p.pos}
      </p>

      <div className="mt-4 grid grid-cols-3 gap-2 rounded-xl border border-white/5 bg-white/[0.02] py-3">
        <Stat label="Goals" value={String(p.goals)} />
        <Stat label="Assists" value={String(p.assists)} />
        <Stat label="Rating" value={p.rating.toFixed(1)} accent />
      </div>

      <Link
        href={`/player/${p.slug}`}
        className="mt-4 inline-flex items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-neon-cyan/50 hover:bg-neon-cyan/10 hover:text-neon-cyan"
      >
        View Profile
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </motion.div>
  );
}
