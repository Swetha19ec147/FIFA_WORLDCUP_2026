import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import Hub from "@/components/hub/Hub";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Schedule & Fixtures — FIFA World Cup 2026",
  description:
    "Full FIFA World Cup 2026 schedule — today's matches, tomorrow, this week and the knockout stage across all 16 host cities.",
  path: "/schedule",
});

import { fetchStandings, fetchMatches } from "@/lib/api";

export default async function SchedulePage() {
  const standings = await fetchStandings();
  const matches = await fetchMatches();

  return (
    <>
      <PageHeader
        eyebrow="Fixtures"
        title="Schedule"
        description="Every kickoff, filterable by day and stage."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Schedule", path: "/schedule" },
        ]}
      />
      <Hub defaultTab="schedule" initialStandings={standings} initialMatches={matches} />
    </>
  );
}
