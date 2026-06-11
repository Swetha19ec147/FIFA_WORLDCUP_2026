"use client";

import { motion } from "framer-motion";
import type { Player } from "@/lib/data";
import Flag from "./Flag";
import PlayerAvatar from "./PlayerAvatar";

type Metric = "goals" | "assists" | "rating" | "cleanSheets";

export default function PlayerTable({
  players,
  metric,
  metricLabel,
}: {
  players: Player[];
  metric: Metric;
  metricLabel: string;
}) {
  return (
    <ul className="space-y-1">
      {players.map((p, i) => (
        <motion.li
          key={p.name}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.06 }}
          className="flex items-center gap-3 rounded-xl px-2 py-2.5 transition-colors hover:bg-white/[0.03]"
        >
          <span className="w-5 text-center text-sm font-bold text-slate-500">
            {i + 1}
          </span>
          <PlayerAvatar name={p.name} image={p.image} size="md" />
          <div className="min-w-0 flex-1">
            <p className="truncate font-semibold text-white">{p.name}</p>
            <p className="flex items-center gap-1.5 text-xs text-slate-500">
              <Flag code={p.team.iso2} name={p.team.name} size="sm" className="!h-3.5 !w-5" />
              {p.team.name} · {p.position}
            </p>
          </div>
          <span className="rounded-lg bg-white/5 px-3 py-1.5 text-sm font-bold text-neon-cyan">
            {p[metric]}
            <span className="ml-1 text-[10px] font-medium uppercase text-slate-500">
              {metricLabel}
            </span>
          </span>
        </motion.li>
      ))}
    </ul>
  );
}
