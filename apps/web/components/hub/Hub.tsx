"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Table, CalendarDays } from "lucide-react";
import StandingsTable from "@/components/ui/StandingsTable";
import MatchCard from "@/components/ui/MatchCard";
import { groupIds } from "@/lib/data";
import { cn } from "@/lib/utils";

type Tab = "standings" | "schedule";

const tabs: { id: Tab; label: string; icon: typeof Table }[] = [
  { id: "standings", label: "Standings", icon: Table },
  { id: "schedule", label: "Schedule", icon: CalendarDays },
];

// ---- Schedule sub-view -----------------------------------------------------

function Schedule({ matches }: { matches: any[] }) {
  return (
    <div>
      <div className="mb-5 flex items-center gap-2">
        <span className="h-2 w-2 animate-pulse rounded-full bg-neon-cyan" />
        <span className="text-xs font-bold uppercase tracking-widest text-neon-cyan">Matches</span>
      </div>

      {matches.length ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {matches.map((m, i) => (
            <motion.div
              key={m.id || i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <MatchCard match={m} />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="glass flex flex-col items-center justify-center py-16 text-center">
          <CalendarDays className="mb-3 h-10 w-10 text-slate-600" />
          <p className="font-semibold text-white">No matches scheduled today</p>
          <p className="mt-1 text-sm text-slate-400">Check back when the next round begins.</p>
        </div>
      )}
    </div>
  );
}

// ---- Standings sub-view ----------------------------------------------------

function Standings({ standings }: { standings: any }) {
  return (
    <div id="groups" className="grid gap-5 lg:grid-cols-2">
      {groupIds.map((g) => (
        <div key={g} className="glass p-5">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Group {g}
            </h3>
            <span className="text-xs text-slate-500">Matchday 2</span>
          </div>
          <StandingsTable rows={standings?.[g] || []} />
        </div>
      ))}
    </div>
  );
}

export default function Hub({ defaultTab = "standings", initialStandings, initialMatches }: { defaultTab?: Tab, initialStandings?: any, initialMatches?: any[] }) {
  const [tab, setTab] = useState<Tab>(defaultTab);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Tab bar */}
      <div className="mb-8 inline-flex rounded-2xl border border-white/10 bg-white/5 p-1.5 backdrop-blur">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              "relative flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors sm:px-5",
              tab === t.id ? "text-ink-900" : "text-slate-300 hover:text-white",
            )}
          >
            {tab === t.id && (
              <motion.span
                layoutId="hub-tab"
                className="absolute inset-0 rounded-xl bg-gradient-to-r from-neon-cyan to-neon-blue"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <t.icon className="relative h-4 w-4" />
            <span className="relative">{t.label}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
        >
          {tab === "standings" && <Standings standings={initialStandings} />}
          {tab === "schedule" && <Schedule matches={initialMatches || []} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
