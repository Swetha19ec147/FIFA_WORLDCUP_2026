import Link from "next/link";
import { Award } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Flag from "@/components/ui/Flag";
import PlayerAvatar from "@/components/ui/PlayerAvatar";
import { starPlayers } from "@/lib/players";

export default function StarPlayers() {
  // Preview on the home page; the full experience lives on /players.
  const featured = starPlayers.slice(0, 8);

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Stars & Legends"
        title="Players to Watch"
        description="The icons and game-changers lighting up World Cup 2026 — with the honours that made their names."
        href="/players"
        cta="All player stats"
      />

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {featured.map((p, i) => (
          <Reveal key={p.slug} delay={i % 4}>
            <Link
              href={`/player/${p.slug}`}
              className="glass glass-hover group flex h-full flex-col p-5"
            >
              <div className="flex items-start justify-between">
                <PlayerAvatar name={p.name} image={p.image} size="md" />
                <span className="text-3xl font-black text-white/10 transition-colors group-hover:text-neon-cyan/30">
                  {p.number}
                </span>
              </div>

              <h3 className="mt-3 flex items-center gap-2 text-lg font-bold leading-tight text-white">
                <Flag code={p.iso2} name={p.country} size="sm" />
                {p.name}
              </h3>
              <p className="mt-0.5 text-xs text-slate-400">
                {p.country} · {p.pos} · {p.club}
              </p>

              <div className="mt-4 flex flex-1 items-start gap-2 border-t border-white/5 pt-3">
                <Award className="mt-0.5 h-3.5 w-3.5 shrink-0 text-neon-gold" />
                <p className="text-xs leading-relaxed text-slate-300">{p.honors}</p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
