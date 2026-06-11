"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import StandingsTable from "@/components/ui/StandingsTable";
import Reveal from "@/components/ui/Reveal";
import { groupIds } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function GroupStandings({ initialStandings }: { initialStandings?: any }) {
  const [group, setGroup] = useState(groupIds[0]);
  const currentStandings = initialStandings?.[group] || [];

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="The Race to the Knockouts"
        title="Group Standings"
        description="All 12 groups of the first 48-team World Cup. Top two qualify; the best third-placed teams join them."
        href="/standings"
        cta="Full standings"
      />

      <Reveal className="mt-8">
        <div className="glass p-2 sm:p-3">
          {/* Group tabs */}
          <div className="flex flex-wrap gap-1.5 border-b border-white/5 p-2">
            {groupIds.map((g) => (
              <button
                key={g}
                onClick={() => setGroup(g)}
                className={cn(
                  "relative rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors",
                  group === g
                    ? "text-ink-900"
                    : "text-slate-400 hover:text-white",
                )}
              >
                {group === g && (
                  <motion.span
                    layoutId="group-pill"
                    className="absolute inset-0 rounded-lg bg-gradient-to-r from-neon-cyan to-neon-blue"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative">Group {g}</span>
              </button>
            ))}
          </div>

          <div className="p-3 sm:p-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={group}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <StandingsTable rows={currentStandings} />
              </motion.div>
            </AnimatePresence>

            <div className="mt-4 flex flex-wrap gap-4 border-t border-white/5 pt-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-neon-cyan" /> Qualified
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-neon-gold" /> Best-third contention
              </span>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
