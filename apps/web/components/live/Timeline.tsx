"use client";

import { motion } from "framer-motion";
import { Goal, RectangleVertical, ArrowLeftRight, ScanEye } from "lucide-react";
import type { TimelineEvent } from "@/lib/data";
import { cn } from "@/lib/utils";

const config = {
  goal: { icon: Goal, color: "text-neon-cyan", ring: "ring-neon-cyan/40" },
  card: { icon: RectangleVertical, color: "text-neon-gold", ring: "ring-neon-gold/40" },
  sub: { icon: ArrowLeftRight, color: "text-slate-300", ring: "ring-white/20" },
  var: { icon: ScanEye, color: "text-neon-purple", ring: "ring-neon-purple/40" },
};

export default function Timeline({ events }: { events: TimelineEvent[] }) {
  return (
    <ol className="relative space-y-4 before:absolute before:left-[19px] before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-white/10">
      {events
        .slice()
        .reverse()
        .map((e, i) => {
          const c = config[e.type];
          const Icon = c.icon;
          return (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="relative flex items-start gap-4"
            >
              <span
                className={cn(
                  "relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink-700 ring-2",
                  c.ring,
                )}
              >
                <Icon className={cn("h-4 w-4", c.color)} />
              </span>
              <div className="flex-1 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-white">{e.text}</span>
                  <span className="ml-3 shrink-0 rounded-md bg-white/5 px-2 py-0.5 text-xs font-bold text-slate-300">
                    {e.minute}&apos;
                  </span>
                </div>
              </div>
            </motion.li>
          );
        })}
    </ol>
  );
}
