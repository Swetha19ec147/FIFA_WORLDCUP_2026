import { NextResponse } from "next/server";

const CURATED: string[] = [
  "Mbappé World Cup 2026", "Argentina vs France", "Haaland hat-trick",
  "World Cup 2026 bracket", "Messi final World Cup", "England squad news",
  "Brazil vs Spain", "Group A standings", "Bellingham stats",
  "Vinicius Jr goals", "Lamine Yamal record", "World Cup top scorer",
  "VAR controversy 2026", "World Cup 2026 upset", "Germany vs France preview",
  "Neymar return", "World Cup 2026 final venue", "Pedri injury update",
  "Salah World Cup", "De Bruyne last tournament", "Ronaldo farewell",
  "World Cup 2026 predictions", "Golden Boot race", "USA home advantage",
];

async function fetchGoogleTrendsTopics(): Promise<string[]> {
  try {
    const res = await fetch(
      "https://trends.google.com/trends/trendingsearches/daily/rss?geo=US",
      { next: { revalidate: 3600 }, signal: AbortSignal.timeout(4000) }
    );
    if (!res.ok) return [];
    const xml = await res.text();
    const footKw = ["football", "soccer", "world cup", "messi", "mbappe", "ronaldo", "fifa", "goal", "squad", "striker", "midfielder"];
    const topics: string[] = [];
    const re = /<title><!\[CDATA\[([^\]]+)\]\]><\/title>/g;
    let m: RegExpExecArray | null;
    while ((m = re.exec(xml)) !== null) {
      const t = m[1];
      if (footKw.some((k) => t.toLowerCase().includes(k))) topics.push(t);
    }
    return topics.slice(0, 6);
  } catch {
    return [];
  }
}

export const revalidate = 3600;

export async function GET() {
  const live = await fetchGoogleTrendsTopics();
  const merged = [...live, ...CURATED];
  const unique = [...new Set(merged)];
  // deterministic daily shuffle — same order for all users per hour
  const seed = Math.floor(Date.now() / 3_600_000);
  const shuffled = unique.sort((a, b) => {
    const ha = ((a.charCodeAt(0) * 31 + seed) % 97);
    const hb = ((b.charCodeAt(0) * 31 + seed) % 97);
    return ha - hb;
  });
  return NextResponse.json(
    { topics: shuffled.slice(0, 18) },
    { headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" } }
  );
}
