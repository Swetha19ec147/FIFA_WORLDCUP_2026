import Link from "next/link";
import { MapPin } from "lucide-react";
import type { Match, Team } from "@/lib/data";
import { kickoffTime, shortDate } from "@/lib/utils";
import { cn } from "@/lib/utils";
import Flag from "./Flag";

function StatusBadge({ match }: { match: Match }) {
  if (match.status === "LIVE") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500/15 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-red-400">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-red-500" />
        </span>
        {match.minute}&apos;
      </span>
    );
  }
  if (match.status === "HT") {
    return (
      <span className="rounded-full bg-amber-500/15 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-amber-400">
        Half-time
      </span>
    );
  }
  if (match.status === "FT") {
    return (
      <span className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-slate-300">
        Full-time
      </span>
    );
  }
  return (
    <span className="rounded-full bg-neon-blue/15 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-neon-cyan">
      {shortDate(match.kickoff)} · {kickoffTime(match.kickoff)}
    </span>
  );
}

function TeamRow({
  team,
  score,
  live,
}: {
  team: Team;
  score: number | null;
  live: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Flag code={team.iso2} name={team.name} size="md" />
        <span className="font-semibold text-white">{team.name}</span>
      </div>
      <span
        className={cn(
          "text-xl font-bold tabular-nums",
          live ? "text-neon-cyan" : "text-white",
          score === null && "text-slate-600",
        )}
      >
        {score === null ? "–" : score}
      </span>
    </div>
  );
}

export default function MatchCard({ match }: { match: Match }) {
  const live = match.status === "LIVE";
  return (
    <Link
      href={`/match/${match.slug}`}
      className={cn(
        "glass glass-hover group block p-5",
        live && "shadow-glow",
      )}
    >
      <div className="mb-4 flex items-center justify-between">
        <span className="text-xs font-medium text-slate-400">{match.stage}</span>
        <StatusBadge match={match} />
      </div>

      <div className="space-y-3">
        <TeamRow team={match.home} score={match.homeScore} live={live} />
        <TeamRow team={match.away} score={match.awayScore} live={live} />
      </div>

      <div className="mt-4 flex items-center gap-1.5 border-t border-white/5 pt-3 text-xs text-slate-500">
        <MapPin className="h-3.5 w-3.5" />
        <span className="truncate">
          {match.stadium}, {match.city}
        </span>
      </div>
    </Link>
  );
}
