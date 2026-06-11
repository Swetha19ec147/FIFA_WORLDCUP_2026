import { Goal, Handshake, Star } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import PlayerTable from "@/components/ui/PlayerTable";
import Reveal from "@/components/ui/Reveal";
import { topScorers, topAssists, topRated } from "@/lib/data";

const cards = [
  { title: "Top Scorers", icon: Goal, players: topScorers, metric: "goals" as const, label: "G" },
  { title: "Top Assists", icon: Handshake, players: topAssists, metric: "assists" as const, label: "A" },
  { title: "Highest Rated", icon: Star, players: topRated, metric: "rating" as const, label: "AVG" },
];

export default function TopPlayers() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Tournament Leaders"
        title="Top Players"
        description="The standout performers driving their nations forward."
        href="/players"
        cta="All player stats"
      />
      <div className="mt-8 grid gap-5 lg:grid-cols-3">
        {cards.map((c, i) => (
          <Reveal key={c.title} delay={i}>
            <div className="glass glass-hover h-full p-5">
              <div className="mb-4 flex items-center gap-2 text-neon-cyan">
                <c.icon className="h-5 w-5" />
                <h3 className="text-sm font-semibold uppercase tracking-wider">
                  {c.title}
                </h3>
              </div>
              <PlayerTable players={c.players} metric={c.metric} metricLabel={c.label} />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
