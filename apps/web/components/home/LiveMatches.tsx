import SectionHeading from "@/components/ui/SectionHeading";
import MatchCard from "@/components/ui/MatchCard";
import Reveal from "@/components/ui/Reveal";
import { fetchLiveMatches } from "@/lib/api";

export default async function LiveMatches() {
  const matches = await fetchLiveMatches();
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Now Playing"
        title="Live Matches"
        description="Real-time scores from across the tournament, updating as the action unfolds."
        href="/live-scores"
        cta="All live scores"
      />
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {matches.map((m: any, i: number) => (
          <Reveal key={m.id} delay={i}>
            <MatchCard match={m} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
