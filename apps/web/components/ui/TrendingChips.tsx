"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Flame } from "lucide-react";

export default function TrendingChips() {
  const [topics, setTopics] = useState<string[]>([]);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/trending")
      .then((r) => r.json())
      .then((d) => setTopics(d.topics ?? []))
      .catch(() => {});
  }, []);

  if (!topics.length) {
    return (
      <div className="flex items-center gap-3 overflow-hidden py-1">
        <div className="flex items-center gap-1.5 shrink-0">
          <Flame className="h-3.5 w-3.5 text-neon-cyan animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neon-cyan">Trending</span>
        </div>
        <div className="flex gap-2">
          {[80, 110, 90, 120, 95].map((w, i) => (
            <div key={i} className="h-6 animate-pulse rounded-full bg-white/5" style={{ width: w }} />
          ))}
        </div>
      </div>
    );
  }

  // duplicate topics for seamless infinite scroll
  const doubled = [...topics, ...topics];

  return (
    <div className="flex items-center gap-3 overflow-hidden py-1">
      <div className="flex items-center gap-1.5 shrink-0 border-r border-white/10 pr-3">
        <Flame className="h-3.5 w-3.5 text-orange-400" />
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neon-cyan whitespace-nowrap">
          Trending
        </span>
      </div>

      {/* marquee track */}
      <div className="relative flex-1 overflow-hidden">
        {/* left fade */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-8 bg-gradient-to-r from-ink-900 to-transparent" />
        {/* right fade */}
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-8 bg-gradient-to-l from-ink-900 to-transparent" />

        <div
          ref={trackRef}
          className="flex gap-2 animate-marquee"
          style={{ animationDuration: `${topics.length * 3.5}s` }}
        >
          {doubled.map((topic, i) => (
            <Link
              key={i}
              href={`/players?q=${encodeURIComponent(topic.split(" ")[0])}`}
              className="shrink-0 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium text-slate-300 transition-all hover:border-neon-cyan/50 hover:bg-neon-cyan/10 hover:text-neon-cyan whitespace-nowrap"
              tabIndex={i >= topics.length ? -1 : 0}
              aria-hidden={i >= topics.length}
            >
              <span className="text-orange-400 text-[9px]">▲</span>
              {topic}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
