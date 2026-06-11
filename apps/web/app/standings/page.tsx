import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import Hub from "@/components/hub/Hub";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Standings & Schedule — FIFA World Cup 2026",
  description:
    "FIFA World Cup 2026 group standings (A–L) and the full match schedule across all 16 host cities.",
  path: "/standings",
});

import { fetchStandings, fetchMatches } from "@/lib/api";

export default async function StandingsPage() {
  const standings = await fetchStandings();
  const matches = await fetchMatches();

  return (
    <>
      <PageHeader
        eyebrow="Tournament Hub"
        title="Standings & Schedule"
        description="Group tables for all 12 groups and every fixture, filterable by day and stage."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Standings", path: "/standings" },
        ]}
      />
      <Hub defaultTab="standings" initialStandings={standings} initialMatches={matches} />
    </>
  );
}
