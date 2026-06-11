import AnimatedCounter from "@/components/ui/AnimatedCounter";
import Reveal from "@/components/ui/Reveal";
import { tournamentStats } from "@/lib/data";

export default function TournamentStats() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <Reveal>
        <div className="glass relative overflow-hidden p-8 sm:p-12">
          {/* glow accents */}
          <div className="absolute -left-10 -top-10 h-48 w-48 rounded-full bg-neon-cyan/20 blur-[90px]" />
          <div className="absolute -bottom-10 -right-10 h-48 w-48 rounded-full bg-neon-purple/20 blur-[90px]" />

          <div className="relative text-center">
            <span className="eyebrow">By the Numbers</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Tournament Statistics
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-slate-400">
              The biggest World Cup in history, at a glance.
            </p>
          </div>

          <dl className="relative mt-10 grid grid-cols-2 gap-6 lg:grid-cols-4">
            {tournamentStats.map((s) => (
              <div key={s.label} className="text-center">
                <dt className="sr-only">{s.label}</dt>
                <dd className="text-4xl font-black text-gradient sm:text-5xl">
                  <AnimatedCounter value={s.value} suffix={s.suffix} />
                </dd>
                <p className="mt-2 text-sm font-medium uppercase tracking-wider text-slate-400">
                  {s.label}
                </p>
              </div>
            ))}
          </dl>
        </div>
      </Reveal>
    </section>
  );
}
