import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import AIPredictions from "@/components/home/AIPredictions";
import UpcomingFixtures from "@/components/home/UpcomingFixtures";
import GroupStandings from "@/components/home/GroupStandings";
import TopPlayers from "@/components/home/TopPlayers";
import StarPlayers from "@/components/home/StarPlayers";
import LatestNews from "@/components/home/LatestNews";
import TournamentStats from "@/components/home/TournamentStats";
import JsonLd from "@/components/ui/JsonLd";
import { SITE, sportsEventJsonLd, faqJsonLd } from "@/lib/seo";
import { featuredMatch } from "@/lib/data";
import { fetchStandings, fetchPredictions } from "@/lib/api";

export const metadata: Metadata = {
  title: "FIFA World Cup 2026 — Live Scores, Standings, Schedule & Player Stats",
  description:
    "Complete FIFA World Cup 2026 coverage — live scores, group standings, full schedule, AI match predictions and stats for all 300+ players across 48 nations. Hosts: USA, Canada, Mexico.",
  keywords: [
    "FIFA World Cup 2026", "World Cup 2026 live scores", "World Cup 2026 standings",
    "World Cup 2026 schedule", "World Cup 2026 predictions", "World Cup 2026 players",
    "World Cup 2026 teams", "FIFA 2026", "WC 2026", "soccer world cup 2026",
  ],
  alternates: { canonical: SITE.url },
  openGraph: {
    title: "FIFA World Cup 2026 — Live Scores, Standings & Stats",
    description: "Complete FIFA World Cup 2026 coverage — live scores, group standings, schedule, AI predictions and player stats for all 48 nations.",
    url: SITE.url,
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "FIFA World Cup 2026 — Visionary FIFA" }],
  },
};

const homeFaq = faqJsonLd([
  { q: "When does FIFA World Cup 2026 start?", a: "The FIFA World Cup 2026 starts on June 11, 2026 and runs until July 19, 2026. It is hosted across 16 cities in the United States, Canada, and Mexico." },
  { q: "How many teams are in the 2026 World Cup?", a: "FIFA World Cup 2026 features 48 teams for the first time, divided into 12 groups of 4. A total of 104 matches will be played." },
  { q: "Where is the 2026 World Cup final?", a: "The FIFA World Cup 2026 final will be held on July 19, 2026 at MetLife Stadium in East Rutherford, New Jersey, USA." },
  { q: "Who are the favourites for World Cup 2026?", a: "The favourites for FIFA World Cup 2026 include Argentina (defending champions), France, Brazil, England, Spain, and Germany." },
  { q: "Where can I watch World Cup 2026 live scores?", a: "You can follow all FIFA World Cup 2026 live scores, match updates and real-time stats right here on Visionary FIFA." },
]);

export default async function HomePage() {
  const standingsData = await fetchStandings();
  const predictionsData = await fetchPredictions();
  
  return (
    <>
      <JsonLd data={sportsEventJsonLd({
        homeTeam: featuredMatch.home.name,
        awayTeam: featuredMatch.away.name,
        startDate: featuredMatch.kickoff,
        location: featuredMatch.stadium,
        city: featuredMatch.city,
        path: `/match/${featuredMatch.slug}`,
      })} />
      <JsonLd data={homeFaq} />
      <Hero />
      <AIPredictions initialPredictions={predictionsData} />
      <UpcomingFixtures />
      <GroupStandings initialStandings={standingsData} />
      <TopPlayers />
      <StarPlayers />
      <LatestNews />
      <TournamentStats />
    </>
  );
}
