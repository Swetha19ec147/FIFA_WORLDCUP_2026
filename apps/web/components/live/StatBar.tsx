"use client";

import { motion } from "framer-motion";

export default function StatBar({
  label,
  home,
  away,
  unit = "",
}: {
  label: string;
  home: number;
  away: number;
  unit?: string;
}) {
  const total = home + away || 1;
  const homePct = (home / total) * 100;
  const homeLeads = home >= away;

  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-sm">
        <span className={homeLeads ? "font-bold text-neon-cyan" : "text-slate-300"}>
          {home}
          {unit}
        </span>
        <span className="text-xs uppercase tracking-wider text-slate-500">{label}</span>
        <span className={!homeLeads ? "font-bold text-neon-purple" : "text-slate-300"}>
          {away}
          {unit}
        </span>
      </div>
      <div className="flex h-2 overflow-hidden rounded-full bg-white/5">
        <motion.div
          className="h-full rounded-l-full bg-gradient-to-r from-neon-cyan to-neon-blue"
          initial={{ width: 0 }}
          whileInView={{ width: `${homePct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        />
        <div className="h-full flex-1 bg-gradient-to-r from-neon-purple/80 to-neon-purple" />
      </div>
    </div>
  );
}
