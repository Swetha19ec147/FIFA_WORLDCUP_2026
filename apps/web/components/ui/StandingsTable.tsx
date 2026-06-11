"use client";

import { motion } from "framer-motion";
import type { GroupRow } from "@/lib/data";
import { cn } from "@/lib/utils";
import Flag from "./Flag";

const statusDot: Record<NonNullable<GroupRow["status"]>, string> = {
  qualified: "bg-neon-cyan",
  playoff: "bg-neon-gold",
};

export default function StandingsTable({ rows }: { rows: GroupRow[] }) {
  return (
    <div className="overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-[11px] uppercase tracking-wider text-slate-500">
            <th className="py-2 pl-2 font-medium">#</th>
            <th className="py-2 font-medium">Team</th>
            <th className="py-2 text-center font-medium">P</th>
            <th className="hidden py-2 text-center font-medium sm:table-cell">W</th>
            <th className="hidden py-2 text-center font-medium sm:table-cell">D</th>
            <th className="hidden py-2 text-center font-medium sm:table-cell">L</th>
            <th className="py-2 text-center font-medium">GD</th>
            <th className="py-2 pr-2 text-center font-medium">Pts</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <motion.tr
              key={row.team.code}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              className="group border-t border-white/5 transition-colors hover:bg-white/[0.03]"
            >
              <td className="py-2.5 pl-2">
                <span className="flex items-center gap-2">
                  <span
                    className={cn(
                      "h-2 w-2 rounded-full",
                      row.status ? statusDot[row.status] : "bg-transparent",
                    )}
                  />
                  <span className="text-slate-400">{i + 1}</span>
                </span>
              </td>
              <td className="py-2.5">
                <span className="flex items-center gap-2 font-medium text-white">
                  <Flag code={row.team.iso2} name={row.team.name} size="sm" />
                  <span className="truncate">{row.team.name}</span>
                </span>
              </td>
              <td className="py-2.5 text-center text-slate-300">{row.played}</td>
              <td className="hidden py-2.5 text-center text-slate-300 sm:table-cell">{row.won}</td>
              <td className="hidden py-2.5 text-center text-slate-300 sm:table-cell">{row.drawn}</td>
              <td className="hidden py-2.5 text-center text-slate-300 sm:table-cell">{row.lost}</td>
              <td className="py-2.5 text-center text-slate-300">
                {row.gf - row.ga > 0 ? "+" : ""}
                {row.gf - row.ga}
              </td>
              <td className="py-2.5 pr-2 text-center text-base font-bold text-white">
                {row.points}
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
