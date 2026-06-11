import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { news } from "@/lib/data";
import { shortDate } from "@/lib/utils";

export default function LatestNews() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="From the Newsroom"
        title="Latest News"
        description="Match reports, analysis and tournament storylines as they happen."
        href="/news"
        cta="All news"
      />
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {news.map((n, i) => (
          <Reveal key={n.id} delay={i}>
            <Link
              href="/news"
              className="glass glass-hover group flex h-full flex-col p-6"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="rounded-full bg-neon-purple/15 px-2.5 py-1 text-[11px] font-semibold text-neon-purple">
                  {n.category}
                </span>
                <ArrowUpRight className="h-4 w-4 text-slate-500 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-neon-cyan" />
              </div>
              <h3 className="text-lg font-bold leading-snug text-white transition-colors group-hover:text-neon-cyan">
                {n.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">
                {n.excerpt}
              </p>
              <div className="mt-4 flex items-center gap-3 border-t border-white/5 pt-3 text-xs text-slate-500">
                <span>{shortDate(n.date)}</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {n.readTime}
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
