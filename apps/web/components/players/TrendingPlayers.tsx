"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { TrendingUp, ArrowUpRight } from "lucide-react";
import Flag from "@/components/ui/Flag";
import PlayerCutout from "@/components/ui/PlayerCutout";
import { trendingPlayers } from "@/lib/players";

export default function TrendingPlayers() {
  return (
    <section>
      <div className="mb-6 flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-neon-cyan/10 text-neon-cyan">
          <TrendingUp className="h-4 w-4" />
        </span>
        <div>
          <span className="eyebrow">Hot Right Now</span>
          <h2 className="mt-0.5 text-2xl font-bold text-white">Trending Players</h2>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {trendingPlayers.map((p, i) => (
          <motion.div
            key={p.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            whileHover={{ y: -6 }}
          >
            <Link
              href={`/player/${p.slug}`}
              className="group relative block overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] backdrop-blur-xl transition-all duration-300 hover:border-neon-cyan/40 hover:shadow-glow"
            >
              {/* top glow */}
              <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-neon-blue/25 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              {/* rating badge */}
              <span className="absolute left-3 top-3 z-10 rounded-lg bg-neon-gold/15 px-2 py-1 text-sm font-black text-neon-gold ring-1 ring-neon-gold/30">
                {p.rating.toFixed(1)}
              </span>

              {/* shirt number watermark */}
              <span className="absolute right-2 top-1 text-5xl font-black text-white/[0.05]">
                {p.number}
              </span>

              {/* player cutout */}
              <div className="relative mx-auto h-48 w-full">
                <PlayerCutout
                  name={p.name}
                  src={p.cutout}
                  className="h-48 w-full transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* info bar */}
              <div className="bg-gradient-to-t from-ink-900 via-ink-900/95 to-transparent px-3 pb-3 pt-2">
                <div className="flex items-center gap-1.5">
                  <Flag code={p.iso2} name={p.country} size="sm" />
                  <span className="truncate text-xs text-slate-400">{p.club}</span>
                </div>
                <div className="mt-0.5 flex items-center justify-between gap-1">
                  <span className="truncate text-sm font-bold text-white leading-tight">
                    {p.name.split(" ").slice(-1)[0]}
                  </span>
                  <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-slate-500 transition-all group-hover:text-neon-cyan group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-neon-cyan/80">
                  {p.pos}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
