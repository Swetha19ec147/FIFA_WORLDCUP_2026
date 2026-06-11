"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import Flag from "@/components/ui/Flag";
import PlayerCutout from "@/components/ui/PlayerCutout";
import { starPlayers } from "@/lib/players";

export default function PlayersCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);

  const slide = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-slide]");
    const step = card ? card.offsetWidth + 20 : 300;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section>
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <span className="eyebrow">Stars &amp; Legends</span>
          <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
            Players to Watch
          </h2>
          <p className="mt-2 max-w-xl text-sm text-slate-400">
            Swipe through the icons of World Cup 2026 — tap a card for the full
            profile.
          </p>
        </div>
        <div className="hidden shrink-0 gap-2 sm:flex">
          <button
            onClick={() => slide(-1)}
            aria-label="Previous players"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-colors hover:border-neon-cyan/50 hover:bg-white/10"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => slide(1)}
            aria-label="Next players"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-colors hover:border-neon-cyan/50 hover:bg-white/10"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {starPlayers.map((p, i) => (
          <motion.div
            key={p.slug}
            data-slide
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: (i % 4) * 0.06 }}
            whileHover={{ y: -8 }}
            className="w-[240px] shrink-0 snap-start sm:w-[260px]"
          >
            <Link
              href={`/player/${p.slug}`}
              className="group relative block h-[360px] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] backdrop-blur-xl transition-all duration-300 hover:border-neon-cyan/40 hover:shadow-glow"
            >
              {/* glow */}
              <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-neon-blue/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              {/* shirt number */}
              <span className="absolute right-3 top-2 text-6xl font-black text-white/[0.06]">
                {p.number}
              </span>
              {/* rating chip */}
              <span className="absolute left-3 top-3 z-10 rounded-lg bg-neon-gold/15 px-2 py-1 text-sm font-black text-neon-gold ring-1 ring-neon-gold/30">
                {p.rating.toFixed(1)}
              </span>

              {/* cutout */}
              <PlayerCutout
                name={p.name}
                src={p.cutout}
                className="absolute inset-x-0 bottom-16 mx-auto h-60 w-full transition-transform duration-500 group-hover:scale-105"
              />

              {/* info */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-900 via-ink-900/90 to-transparent p-4 pt-10">
                <div className="flex items-center gap-2">
                  <Flag code={p.iso2} name={p.country} size="sm" />
                  <span className="text-xs text-slate-300">{p.club}</span>
                </div>
                <div className="mt-1 flex items-center justify-between">
                  <h3 className="text-lg font-bold leading-tight text-white">
                    {p.name}
                  </h3>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-500 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-neon-cyan" />
                </div>
                <p className="text-xs text-neon-cyan">{p.pos}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
