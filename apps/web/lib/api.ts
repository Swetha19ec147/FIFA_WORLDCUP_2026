import { allMatches, standings as staticStandings } from './data';

export async function fetchMatches() {
  return allMatches;
}

export async function fetchLiveMatches() {
  return [];
}

export async function fetchStandings() {
  return staticStandings;
}

export async function fetchNews() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/news`, {
    next: { revalidate: 60 }
  });
  if (!res.ok) return [];
  return res.json();
}

function mapPrediction(apiPred: any) {
  if (!apiPred) return null;
  const payload = apiPred.payload || {};
  return {
    matchSlug: apiPred.match?.slug || "",
    slug: apiPred.slug,
    publishAt: apiPred.publishAt,
    homeTeam: apiPred.match?.home?.name || "Home",
    awayTeam: apiPred.match?.away?.name || "Away",
    homeIso2: apiPred.match?.home?.iso2 || "xx",
    awayIso2: apiPred.match?.away?.iso2 || "xx",
    kickoff: apiPred.match?.kickoff || new Date().toISOString(),
    stadium: apiPred.match?.stadium || "Stadium",
    city: apiPred.match?.city || "City",
    stage: apiPred.match?.stage || "Group Stage",
    predictedScore: apiPred.predictedScore || "0 - 0",
    winner: apiPred.winner || "DRAW",
    confidence: apiPred.confidence || 50,
    homePct: apiPred.homePct || 33,
    drawPct: apiPred.drawPct || 34,
    awayPct: apiPred.awayPct || 33,
    overview: payload.overview || "Match overview not available.",
    verdict: payload.verdict || "Match verdict not available.",
    fullAnalysis: payload.fullAnalysis || [],
    homeForm: payload.homeForm || [],
    awayForm: payload.awayForm || [],
    h2hHome: payload.h2hHome || 0,
    h2hDraw: payload.h2hDraw || 0,
    h2hAway: payload.h2hAway || 0,
    h2hSummary: payload.h2hSummary || "No H2H data.",
    lastMeeting: payload.lastMeeting || "N/A",
    homeKeyPlayers: payload.homeKeyPlayers || [],
    awayKeyPlayers: payload.awayKeyPlayers || [],
    homeTactics: {
      formation: payload.homeTactics?.formation || "4-3-3",
      style: payload.homeTactics?.style || "Balanced",
      strengths: payload.homeTactics?.strengths || [],
      weaknesses: payload.homeTactics?.weaknesses || []
    },
    awayTactics: {
      formation: payload.awayTactics?.formation || "4-3-3",
      style: payload.awayTactics?.style || "Balanced",
      strengths: payload.awayTactics?.strengths || [],
      weaknesses: payload.awayTactics?.weaknesses || []
    },
    battles: payload.battles || [],
    homeXI: payload.homeXI || [],
    awayXI: payload.awayXI || [],
    injuries: payload.injuries || [],
    suspensions: payload.suspensions || [],
    keyFactors: payload.keyFactors || [],
    tournamentImplications: payload.tournamentImplications || "No implications recorded.",
    stats: {
      homeXG: payload.stats?.homeXG || 0,
      awayXG: payload.stats?.awayXG || 0,
      homePossession: payload.stats?.homePossession || 50,
      homeShotsOnTarget: payload.stats?.homeShotsOnTarget || 0,
      awayShotsOnTarget: payload.stats?.awayShotsOnTarget || 0,
      homeCorners: payload.stats?.homeCorners || 0,
      awayCorners: payload.stats?.awayCorners || 0
    }
  };
}

export async function fetchPredictions() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/predictions`, {
    cache: 'no-store'
  });
  if (!res.ok) return [];
  const data = await res.json();
  return data.map(mapPrediction);
}

export async function fetchPrediction(slug: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/predictions/${slug}`, {
    cache: 'no-store'
  });
  if (!res.ok) return null;
  const data = await res.json();
  return mapPrediction(data);
}
