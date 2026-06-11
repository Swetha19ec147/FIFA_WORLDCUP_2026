"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Brain, ChevronRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Flag from "@/components/ui/Flag";
import { predictions } from "@/lib/predictions";

function Bar({ label, pct, color }: { label: string; pct: number; color: string }) {
  return (
    <div>
      <div className="mb-1 flex justify-between text-xs">
        <span className="text-slate-400">{label}</span>
        <span className="font-semibold text-white">{pct}%</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
        <motion.div
          className={`h-full rounded-full ${color}`}
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

export default function AIPredictions({ initialPredictions = [] }: { initialPredictions?: any[] }) {
  const featured = initialPredictions.slice(0, 3);

  return (
    <section className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Powered by Visionary AI"
        title="Match Predictions &amp; Analysis"
        description="Deep pre-match analysis with score predictions, tactical breakdowns, predicted lineups and win probability — published 4–5 hours before every kickoff."
        href="/predictions"
        cta="All predictions"
      />

      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        {featured.map((pred, i) => (
          <Reveal key={pred.slug} delay={i}>
            <Link
              href={`/predictions/${pred.slug}`}
              className="glass glass-hover group flex h-full flex-col rounded-2xl p-5"
            >
              {/* Stage badge */}
              <div className="mb-3 flex items-center justify-between">
                <span className="rounded-full bg-neon-purple/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-neon-purple">
                  {pred.stage}
                </span>
                <span className="flex items-center gap-1 text-[10px] font-semibold text-neon-gold">
                  <Brain className="h-3 w-3" /> AI Pick
                </span>
              </div>

              {/* Teams */}
              <div className="mb-4 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <Flag code={pred.homeIso2} name={pred.homeTeam} size="sm" />
                  <span className="text-sm font-bold text-white truncate">{pred.homeTeam}</span>
                </div>
                <div className="shrink-0 rounded-xl border border-neon-cyan/20 bg-neon-cyan/5 px-3 py-1.5 text-center">
                  <p className="text-[9px] text-slate-600 uppercase tracking-wider">Predicted</p>
                  <p className="text-lg font-black text-neon-cyan tabular-nums">{pred.predictedScore}</p>
                </div>
                <div className="flex items-center justify-end gap-2 min-w-0">
                  <span className="text-sm font-bold text-white truncate text-right">{pred.awayTeam}</span>
                  <Flag code={pred.awayIso2} name={pred.awayTeam} size="sm" />
                </div>
              </div>

              {/* Probability bars */}
              <div className="space-y-2.5 flex-1">
                <Bar label={pred.homeTeam.split(" ").slice(-1)[0]} pct={pred.homePct} color="bg-neon-cyan" />
                <Bar label="Draw" pct={pred.drawPct} color="bg-slate-500" />
                <Bar label={pred.awayTeam.split(" ").slice(-1)[0]} pct={pred.awayPct} color="bg-neon-purple" />
              </div>

              {/* Verdict teaser */}
              <p className="mt-3 text-xs text-slate-500 leading-relaxed line-clamp-2">{pred.verdict}</p>

              {/* CTA */}
              <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3">
                <span className="text-[10px] text-slate-600 uppercase tracking-wider">{pred.confidence}% confidence</span>
                <span className="flex items-center gap-1 text-xs font-semibold text-neon-cyan group-hover:gap-2 transition-all">
                  Full Analysis <ChevronRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>

      <div className="mt-6 text-center">
        <Link href="/predictions" className="btn-ghost inline-flex">
          <Brain className="h-4 w-4 text-neon-purple" />
          View All Match Predictions
        </Link>
      </div>
    </section>
  );
}
