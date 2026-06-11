"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, SlidersHorizontal, X, Users } from "lucide-react";
import PlayerGridCard from "./PlayerGridCard";
import { players, countries, clubs, positions, type PosGroup } from "@/lib/players";
import { cn } from "@/lib/utils";

type SortKey = "rating" | "goals" | "assists";
const PAGE_SIZE = 12;

const sortKeys: { key: SortKey; label: string }[] = [
  { key: "rating", label: "Rating" },
  { key: "goals", label: "Goals" },
  { key: "assists", label: "Assists" },
];

function Select({ label, value, onChange, options }: {
  label: string; value: string; onChange: (v: string) => void; options: string[];
}) {
  return (
    <label className="relative block">
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full cursor-pointer appearance-none rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white outline-none transition-colors hover:border-white/20 focus:border-neon-cyan/50 [&>option]:bg-ink-800"
      >
        <option value="">{label}: All</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
      <SlidersHorizontal className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-500" />
    </label>
  );
}

export default function PlayersExplorer() {
  const [query, setQuery]       = useState("");
  const [country, setCountry]   = useState("");
  const [position, setPosition] = useState("");
  const [club, setClub]         = useState("");
  const [sort, setSort]         = useState<SortKey>("rating");
  const [page, setPage]         = useState(1);

  const hasFilters = query.trim() || country || position || club;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return players
      .filter((p) => {
        if (q && !`${p.name} ${p.country} ${p.club} ${p.pos}`.toLowerCase().includes(q)) return false;
        if (country && p.country !== country) return false;
        if (position && p.posGroup !== (position as PosGroup)) return false;
        if (club && p.club !== club) return false;
        return true;
      })
      .sort((a, b) => b[sort] - a[sort]);
  }, [query, country, position, club, sort]);

  const visible = filtered.slice(0, page * PAGE_SIZE);
  const hasMore = visible.length < filtered.length;

  const clearAll = () => {
    setQuery(""); setCountry(""); setPosition(""); setClub(""); setPage(1);
  };

  const handleQueryChange = (v: string) => { setQuery(v); setPage(1); };
  const handleFilter = (setter: (v: string) => void) => (v: string) => { setter(v); setPage(1); };

  return (
    <section>
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <span className="eyebrow">Squad Explorer</span>
          <h2 className="mt-0.5 text-2xl font-bold text-white sm:text-3xl">Search Players</h2>
        </div>
        {hasFilters && (
          <span className="text-sm text-slate-400">{filtered.length} result{filtered.length !== 1 ? "s" : ""}</span>
        )}
      </div>

      {/* search + filters */}
      <div className="glass mb-8 space-y-4 p-4">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            placeholder="Search by name, country, club or position…"
            className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-sm text-white placeholder:text-slate-500 outline-none transition-colors focus:border-neon-cyan/50"
          />
          {query && (
            <button onClick={() => handleQueryChange("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white">
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <Select label="Country" value={country} onChange={handleFilter(setCountry)} options={countries} />
          <Select label="Position" value={position} onChange={handleFilter(setPosition)} options={positions} />
          <Select label="Club" value={club} onChange={handleFilter(setClub)} options={clubs} />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Sort by</span>
          {sortKeys.map((s) => (
            <button key={s.key} onClick={() => setSort(s.key)}
              className={cn("rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all",
                sort === s.key
                  ? "bg-gradient-to-r from-neon-blue to-neon-cyan text-ink-900"
                  : "border border-white/10 bg-white/5 text-slate-300 hover:border-white/20")}
            >{s.label}</button>
          ))}
          {hasFilters && (
            <button onClick={clearAll} className="ml-auto inline-flex items-center gap-1 text-xs font-semibold text-slate-400 hover:text-white">
              <X className="h-3.5 w-3.5" /> Clear all
            </button>
          )}
        </div>
      </div>

      {/* empty state — no filters applied */}
      {!hasFilters ? (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass flex flex-col items-center justify-center py-20 text-center"
        >
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5">
            <Users className="h-8 w-8 text-slate-500" />
          </div>
          <p className="text-lg font-bold text-white">Find any player</p>
          <p className="mt-2 max-w-xs text-sm text-slate-400">
            Search from <span className="font-semibold text-neon-cyan">200+ players</span> participating in FIFA World Cup 2026 and major tournaments worldwide.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {["Lionel Messi", "Kylian Mbappé", "Erling Haaland", "Jude Bellingham"].map((name) => (
              <button key={name} onClick={() => handleQueryChange(name.split(" ")[1] ?? name)}
                className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-slate-300 transition-colors hover:border-neon-cyan/40 hover:text-white">
                {name}
              </button>
            ))}
          </div>
        </motion.div>
      ) : filtered.length === 0 ? (
        <div className="glass flex flex-col items-center justify-center py-16 text-center">
          <Search className="mb-3 h-10 w-10 text-slate-600" />
          <p className="font-semibold text-white">No players found</p>
          <p className="mt-1 text-sm text-slate-400">Try adjusting your search or filters</p>
          <button onClick={clearAll} className="mt-3 text-sm font-semibold text-neon-cyan hover:underline">Clear filters</button>
        </div>
      ) : (
        <>
          <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {visible.map((p) => <PlayerGridCard key={p.slug} player={p} />)}
            </AnimatePresence>
          </motion.div>

          {hasMore && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => setPage((n) => n + 1)}
                className="rounded-xl border border-white/10 bg-white/5 px-8 py-3 text-sm font-semibold text-white transition-all hover:border-neon-cyan/40 hover:bg-white/10"
              >
                Load more ({filtered.length - visible.length} remaining)
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
