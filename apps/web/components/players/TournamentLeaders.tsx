"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Goal, Handshake, Shield, Star } from "lucide-react";
import Flag from "@/components/ui/Flag";
import PlayerAvatar from "@/components/ui/PlayerAvatar";
import { leaders, type PlayerPro } from "@/lib/players";

type Metric = "goals" | "assists" | "cleanSheets" | "rating";

const cards: {
  title: string;
  icon: typeof Goal;
  list: PlayerPro[];
  metric: Metric;
  label: string;
}[] = [
  { title: "Top Scorers", icon: Goal, list: leaders.scorers, metric: "goals", label: "Goals" },
  { title: "Top Assists", icon: Handshake, list: leaders.assists, metric: "assists", label: "Assists" },
  { title: "Most Clean Sheets", icon: Shield, list: leaders.cleanSheets, metric: "cleanSheets", label: "Clean Sheets" },
  { title: "Highest Ratings", icon: Star, list: leaders.rated, metric: "rating", label: "Avg Rating" },
];

function value(p: PlayerPro, metric: Metric) {
  return metric === "rating" ? p.rating.toFixed(1) : String(p[metric]);
}

export default function TournamentLeaders() {
  return (
    <section>
      <span className="eyebrow">Tournament Leaders</span>
      <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
        Top Player Statistics
      </h2>

      <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card, ci) => {
          const [top, ...rest] = card.list;
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: ci * 0.08 }}
              className="glass glass-hover flex flex-col p-5"
            >
              <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-neon-cyan">
                <card.icon className="h-4 w-4" /> {card.title}
              </h3>

              {/* leader spotlight */}
              {top && (
                <Link
                  href={`/player/${top.slug}`}
                  className="group mb-3 flex items-center gap-3 rounded-xl bg-gradient-to-r from-neon-blue/10 to-transparent p-3 ring-1 ring-white/5"
                >
                  <PlayerAvatar name={top.name} image={top.image} size="lg" />
                  <div className="min-w-0 flex-1">
                    <p className="flex items-center gap-1.5 truncate font-bold text-white group-hover:text-neon-cyan">
                      <Flag code={top.iso2} name={top.country} size="sm" className="!h-3.5 !w-5" />
                      {top.name}
                    </p>
                    <p className="text-xs text-slate-400">{top.club} · {top.pos}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-black text-neon-gold">
                      {value(top, card.metric)}
                    </div>
                    <div className="text-[9px] uppercase tracking-wider text-slate-500">
                      {card.label}
                    </div>
                  </div>
                </Link>
              )}

              {/* the chasing pack */}
              <ul className="space-y-1">
                {rest.map((p, i) => (
                  <li key={p.slug}>
                    <Link
                      href={`/player/${p.slug}`}
                      className="flex items-center gap-3 rounded-lg px-1.5 py-2 transition-colors hover:bg-white/[0.04]"
                    >
                      <span className="w-4 text-center text-xs font-bold text-slate-500">
                        {i + 2}
                      </span>
                      <PlayerAvatar name={p.name} image={p.image} size="sm" />
                      <div className="min-w-0 flex-1">
                        <p className="flex items-center gap-1.5 truncate text-sm font-semibold text-white">
                          <Flag code={p.iso2} name={p.country} size="sm" className="!h-3 !w-4" />
                          {p.name}
                        </p>
                        <p className="truncate text-[11px] text-slate-500">{p.club}</p>
                      </div>
                      <span className="text-sm font-bold text-neon-cyan">
                        {value(p, card.metric)}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
