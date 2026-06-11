import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import TrendingPlayers from "@/components/players/TrendingPlayers";
import TournamentLeaders from "@/components/players/TournamentLeaders";
import PlayersExplorer from "@/components/players/PlayersExplorer";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Players & Stats — FIFA World Cup 2026",
  description:
    "Explore FIFA World Cup 2026 players — world-class stars, tournament leaders (top scorers, assists, clean sheets, ratings) and a searchable squad explorer with real photos.",
  path: "/players",
});

export default function PlayersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Premium Analytics"
        title="Players"
        description="World-class stars, tournament leaders and a searchable squad explorer for World Cup 2026."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Players", path: "/players" },
        ]}
      />
      <div className="mx-auto max-w-7xl space-y-16 px-4 py-12 sm:px-6 lg:px-8">
        <TrendingPlayers />
        <TournamentLeaders />
        <PlayersExplorer />
      </div>
    </>
  );
}
