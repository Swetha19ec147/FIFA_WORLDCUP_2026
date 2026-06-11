import SectionHeading from "@/components/ui/SectionHeading";
import MatchCard from "@/components/ui/MatchCard";
import Reveal from "@/components/ui/Reveal";
import { upcomingMatches } from "@/lib/data";

export default function UpcomingFixtures() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="What's Next"
        title="Upcoming Fixtures"
        description="The next wave of group-stage clashes across all 16 host cities."
        href="/schedule"
        cta="Full schedule"
      />
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {upcomingMatches.map((m, i) => (
          <Reveal key={m.id} delay={i}>
            <MatchCard match={m} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
