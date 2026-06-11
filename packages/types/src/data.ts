/**
 * Visionary FIFA — tournament dataset for the FIFA World Cup 2026.
 *
 * Hosts: Canada, Mexico, USA. First 48-team edition: 12 groups (A–L) of four,
 * 16 host cities, 104 matches, 11 June – 19 July 2026.
 *
 * Group draw reflects the official final draw (held 5 Dec 2025). Team/group
 * composition is final. Match scores and standings are placeholder data —
 * replace with live API data when integrating the backend.
 */

export type Team = {
  code: string; // internal 3-letter code, used for lookups + slug
  name: string;
  flag: string; // emoji flag (fallback)
  iso2: string; // ISO 3166-1 alpha-2 (for flag images, e.g. "br", "gb-eng")
  group: GroupId;
};

export type GroupId =
  | "A" | "B" | "C" | "D" | "E" | "F"
  | "G" | "H" | "I" | "J" | "K" | "L";

export type GroupRow = {
  team: Team;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  gf: number;
  ga: number;
  points: number;
  status: "qualified" | "playoff" | null;
};

export type MatchStatus = "LIVE" | "HT" | "FT" | "UPCOMING";

export type Match = {
  id: string;
  slug: string;
  home: Team;
  away: Team;
  homeScore: number | null;
  awayScore: number | null;
  status: MatchStatus;
  minute?: number;
  kickoff: string;
  stadium: string;
  city: string;
  group?: GroupId;
  stage: string;
};

export type Player = {
  name: string;
  team: Team;
  position: string;
  goals: number;
  assists: number;
  rating: number;
  cleanSheets?: number;
  image?: string; // optional real headshot URL (falls back to an avatar)
};

export type StarPlayer = {
  name: string;
  team: Team;
  position: string;
  club: string;
  number: number;
  honors: string; // short FIFA / World Cup history line
  image?: string; // optional real headshot URL (falls back to an avatar)
};

export type NewsItem = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
};

// ---------------------------------------------------------------------------
// Host nations, cities & tournament meta
// ---------------------------------------------------------------------------

export const hostNations = [
  { name: "Canada", iso2: "ca" },
  { name: "Mexico", iso2: "mx" },
  { name: "United States", iso2: "us" },
];

export const hostCities = [
  { city: "Vancouver", country: "Canada" },
  { city: "Toronto", country: "Canada" },
  { city: "Guadalajara", country: "Mexico" },
  { city: "Mexico City", country: "Mexico" },
  { city: "Monterrey", country: "Mexico" },
  { city: "Atlanta", country: "USA" },
  { city: "Boston", country: "USA" },
  { city: "Dallas", country: "USA" },
  { city: "Houston", country: "USA" },
  { city: "Kansas City", country: "USA" },
  { city: "Los Angeles", country: "USA" },
  { city: "Miami", country: "USA" },
  { city: "Nashville", country: "USA" },
  { city: "New York / New Jersey", country: "USA" },
  { city: "Philadelphia", country: "USA" },
  { city: "San Francisco Bay Area", country: "USA" },
  { city: "Seattle", country: "USA" },
];

export const tournamentMeta = {
  teams: 48,
  groups: 12,
  cities: 16,
  matches: 104,
  start: "2026-06-11",
  end: "2026-07-19",
  dateLabel: "June 11 – July 19, 2026",
  finalDate: "2026-07-19T19:00:00Z",
  finalVenue: "MetLife Stadium, New York / New Jersey",
};

// ---------------------------------------------------------------------------
// Teams & Groups — official 2026 final draw
// ---------------------------------------------------------------------------

const T = (
  code: string,
  name: string,
  flag: string,
  iso2: string,
  group: GroupId,
): Team => ({ code, name, flag, iso2, group });

export const teams: Team[] = [
  // Group A
  T("MEX", "Mexico", "🇲🇽", "mx", "A"), T("RSA", "South Africa", "🇿🇦", "za", "A"), T("KOR", "South Korea", "🇰🇷", "kr", "A"), T("CZE", "Czechia", "🇨🇿", "cz", "A"),
  // Group B
  T("CAN", "Canada", "🇨🇦", "ca", "B"), T("SUI", "Switzerland", "🇨🇭", "ch", "B"), T("BIH", "Bosnia & Herzegovina", "🇧🇦", "ba", "B"), T("QAT", "Qatar", "🇶🇦", "qa", "B"),
  // Group C
  T("BRA", "Brazil", "🇧🇷", "br", "C"), T("MAR", "Morocco", "🇲🇦", "ma", "C"), T("SCO", "Scotland", "🏴", "gb-sct", "C"), T("HAI", "Haiti", "🇭🇹", "ht", "C"),
  // Group D
  T("USA", "United States", "🇺🇸", "us", "D"), T("TUR", "Türkiye", "🇹🇷", "tr", "D"), T("PAR", "Paraguay", "🇵🇾", "py", "D"), T("AUS", "Australia", "🇦🇺", "au", "D"),
  // Group E
  T("GER", "Germany", "🇩🇪", "de", "E"), T("ECU", "Ecuador", "🇪🇨", "ec", "E"), T("CIV", "Ivory Coast", "🇨🇮", "ci", "E"), T("CUR", "Curaçao", "🇨🇼", "cw", "E"),
  // Group F
  T("NED", "Netherlands", "🇳🇱", "nl", "F"), T("JPN", "Japan", "🇯🇵", "jp", "F"), T("SWE", "Sweden", "🇸🇪", "se", "F"), T("TUN", "Tunisia", "🇹🇳", "tn", "F"),
  // Group G
  T("BEL", "Belgium", "🇧🇪", "be", "G"), T("EGY", "Egypt", "🇪🇬", "eg", "G"), T("IRN", "Iran", "🇮🇷", "ir", "G"), T("NZL", "New Zealand", "🇳🇿", "nz", "G"),
  // Group H
  T("ESP", "Spain", "🇪🇸", "es", "H"), T("URU", "Uruguay", "🇺🇾", "uy", "H"), T("CPV", "Cape Verde", "🇨🇻", "cv", "H"), T("KSA", "Saudi Arabia", "🇸🇦", "sa", "H"),
  // Group I
  T("FRA", "France", "🇫🇷", "fr", "I"), T("SEN", "Senegal", "🇸🇳", "sn", "I"), T("NOR", "Norway", "🇳🇴", "no", "I"), T("IRQ", "Iraq", "🇮🇶", "iq", "I"),
  // Group J
  T("ARG", "Argentina", "🇦🇷", "ar", "J"), T("AUT", "Austria", "🇦🇹", "at", "J"), T("ALG", "Algeria", "🇩🇿", "dz", "J"), T("JOR", "Jordan", "🇯🇴", "jo", "J"),
  // Group K
  T("POR", "Portugal", "🇵🇹", "pt", "K"), T("COL", "Colombia", "🇨🇴", "co", "K"), T("UZB", "Uzbekistan", "🇺🇿", "uz", "K"), T("COD", "DR Congo", "🇨🇩", "cd", "K"),
  // Group L
  T("ENG", "England", "🏴", "gb-eng", "L"), T("CRO", "Croatia", "🇭🇷", "hr", "L"), T("GHA", "Ghana", "🇬🇭", "gh", "L"), T("PAN", "Panama", "🇵🇦", "pa", "L"),
];

const byCode = (code: string) => teams.find((t) => t.code === code)!;

export const groupIds: GroupId[] = ["A","B","C","D","E","F","G","H","I","J","K","L"];

/** Deterministic pseudo-standings so the table looks alive but stays stable. */
function buildGroup(group: GroupId): GroupRow[] {
  const members = teams.filter((t) => t.group === group);
  const seed = group.charCodeAt(0);
  const rows = members.map((team, i) => {
    const won = (seed + i * 3) % 3;
    const drawn = (seed + i) % 2;
    const lost = Math.max(0, 2 - won - drawn);
    const played = won + drawn + lost;
    const gf = won * 2 + drawn + ((seed + i) % 3);
    const ga = lost * 2 + ((seed * i) % 3);
    return {
      team,
      played,
      won,
      drawn,
      lost,
      gf,
      ga,
      points: won * 3 + drawn,
      status: null as GroupRow["status"],
    };
  });
  rows.sort(
    (a, b) =>
      b.points - a.points ||
      b.gf - b.ga - (a.gf - a.ga) ||
      b.gf - a.gf,
  );
  rows.forEach((r, idx) => {
    r.status = idx < 2 ? "qualified" : idx === 2 ? "playoff" : null;
  });
  return rows;
}

export const standings: Record<GroupId, GroupRow[]> = Object.fromEntries(
  groupIds.map((g) => [g, buildGroup(g)]),
) as Record<GroupId, GroupRow[]>;

// ---------------------------------------------------------------------------
// Matches — real intra-group fixtures (illustrative scores)
// ---------------------------------------------------------------------------

const M = (
  id: string,
  homeCode: string,
  awayCode: string,
  homeScore: number | null,
  awayScore: number | null,
  status: MatchStatus,
  kickoff: string,
  stadium: string,
  city: string,
  stage: string,
  minute?: number,
  group?: GroupId,
): Match => {
  const home = byCode(homeCode);
  const away = byCode(awayCode);
  return {
    id,
    slug: `${home.name}-vs-${away.name}`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, ""),
    home,
    away,
    homeScore,
    awayScore,
    status,
    minute,
    kickoff,
    stadium,
    city,
    stage,
    group,
  };
};

export const liveMatches: Match[] = [
  M("m1", "MEX", "RSA", 2, 1, "LIVE", "2026-06-11T20:00:00Z", "Estadio Azteca", "Mexico City", "Group A", 67, "A"),
  M("m2", "ARG", "AUT", 1, 0, "LIVE", "2026-06-11T20:00:00Z", "MetLife Stadium", "New York / New Jersey", "Group J", 54, "J"),
  M("m3", "FRA", "SEN", 1, 1, "HT", "2026-06-11T22:30:00Z", "SoFi Stadium", "Los Angeles", "Group I", 45, "I"),
];

export const upcomingMatches: Match[] = [
  M("u1", "USA", "PAR", null, null, "UPCOMING", "2026-06-12T19:00:00Z", "AT&T Stadium", "Dallas", "Group D", undefined, "D"),
  M("u2", "ENG", "CRO", null, null, "UPCOMING", "2026-06-12T21:30:00Z", "Mercedes-Benz Stadium", "Atlanta", "Group L", undefined, "L"),
  M("u3", "BRA", "MAR", null, null, "UPCOMING", "2026-06-13T18:00:00Z", "Hard Rock Stadium", "Miami", "Group C", undefined, "C"),
  M("u4", "POR", "COL", null, null, "UPCOMING", "2026-06-13T20:30:00Z", "BMO Field", "Toronto", "Group K", undefined, "K"),
  M("u5", "ESP", "URU", null, null, "UPCOMING", "2026-06-14T19:00:00Z", "Lincoln Financial Field", "Philadelphia", "Group H", undefined, "H"),
  M("u6", "GER", "ECU", null, null, "UPCOMING", "2026-06-14T21:30:00Z", "Levi's Stadium", "San Francisco Bay Area", "Group E", undefined, "E"),
];

export const recentResults: Match[] = [
  M("r1", "BEL", "EGY", 3, 0, "FT", "2026-06-10T20:00:00Z", "BC Place", "Vancouver", "Group G", undefined, "G"),
  M("r2", "NED", "JPN", 2, 1, "FT", "2026-06-10T22:30:00Z", "Lumen Field", "Seattle", "Group F", undefined, "F"),
];

/** Featured live match used by the Live Match page. */
export const featuredMatch = liveMatches[0];

export const allMatches: Match[] = [
  ...liveMatches,
  ...upcomingMatches,
  ...recentResults,
];

export function findMatch(slug: string): Match | undefined {
  return allMatches.find((m) => m.slug === slug);
}

// ---------------------------------------------------------------------------
// Star players & legends (real squads + World Cup / FIFA history)
// ---------------------------------------------------------------------------

const S = (
  name: string,
  code: string,
  position: string,
  club: string,
  number: number,
  honors: string,
): StarPlayer => ({ name, team: byCode(code), position, club, number, honors });

export const starPlayers: StarPlayer[] = [
  S("Lionel Messi", "ARG", "Forward", "Inter Miami", 10, "2022 World Cup winner · 8× Ballon d'Or · 2022 Golden Ball"),
  S("Kylian Mbappé", "FRA", "Forward", "Real Madrid", 10, "2018 World Cup winner · 2022 Golden Boot · 2× WC finalist"),
  S("Cristiano Ronaldo", "POR", "Forward", "Al Nassr", 7, "5× Ballon d'Or · Euro 2016 winner · most international goals"),
  S("Erling Haaland", "NOR", "Striker", "Manchester City", 9, "Norway talisman · UCL & PL winner · prolific goalscorer"),
  S("Vinícius Júnior", "BRA", "Winger", "Real Madrid", 7, "UCL winner & final scorer · Brazil's creative spark"),
  S("Jude Bellingham", "ENG", "Midfielder", "Real Madrid", 10, "UCL winner · Euro 2024 finalist · England's engine"),
  S("Harry Kane", "ENG", "Striker", "Bayern Munich", 9, "England all-time top scorer · 2018 WC Golden Boot"),
  S("Lamine Yamal", "ESP", "Winger", "Barcelona", 19, "Euro 2024 winner & Young Player · teenage phenomenon"),
  S("Pedri", "ESP", "Midfielder", "Barcelona", 8, "Euro 2024 winner · 2021 Golden Boy · midfield metronome"),
  S("Kevin De Bruyne", "BEL", "Midfielder", "Napoli", 17, "Belgium's golden generation · elite playmaker"),
  S("Mohamed Salah", "EGY", "Forward", "Liverpool", 10, "Multiple PL Golden Boots · Africa's standout star"),
  S("Achraf Hakimi", "MAR", "Defender", "Paris Saint-Germain", 2, "2022 WC semi-finalist with Morocco · UCL winner"),
  S("Luka Modrić", "CRO", "Midfielder", "AC Milan", 10, "2018 Ballon d'Or & WC Golden Ball · 2018 finalist"),
  S("Virgil van Dijk", "NED", "Defender", "Liverpool", 4, "UCL & PL winner · Netherlands captain & defensive rock"),
  S("Heung-min Son", "KOR", "Forward", "Tottenham", 7, "Asia's biggest star · PL Golden Boot winner"),
  S("Florian Wirtz", "GER", "Midfielder", "Liverpool", 10, "Germany's young creator · Bundesliga title-winner"),
];

// ---------------------------------------------------------------------------
// Player stat leaders (illustrative)
// ---------------------------------------------------------------------------

export const topScorers: Player[] = [
  { name: "Kylian Mbappé", team: byCode("FRA"), position: "FW", goals: 6, assists: 2, rating: 8.9 },
  { name: "Lionel Messi", team: byCode("ARG"), position: "FW", goals: 5, assists: 4, rating: 9.1 },
  { name: "Erling Haaland", team: byCode("NOR"), position: "FW", goals: 5, assists: 1, rating: 8.6 },
  { name: "Vinícius Júnior", team: byCode("BRA"), position: "FW", goals: 4, assists: 3, rating: 8.7 },
  { name: "Harry Kane", team: byCode("ENG"), position: "FW", goals: 4, assists: 2, rating: 8.4 },
];

export const topAssists: Player[] = [
  { name: "Lionel Messi", team: byCode("ARG"), position: "FW", goals: 5, assists: 4, rating: 9.1 },
  { name: "Kevin De Bruyne", team: byCode("BEL"), position: "MF", goals: 1, assists: 4, rating: 8.5 },
  { name: "Vinícius Júnior", team: byCode("BRA"), position: "FW", goals: 4, assists: 3, rating: 8.7 },
  { name: "Jude Bellingham", team: byCode("ENG"), position: "MF", goals: 2, assists: 3, rating: 8.3 },
  { name: "Pedri", team: byCode("ESP"), position: "MF", goals: 1, assists: 3, rating: 8.2 },
];

export const topKeepers: Player[] = [
  { name: "Thibaut Courtois", team: byCode("BEL"), position: "GK", goals: 0, assists: 0, rating: 8.1, cleanSheets: 3 },
  { name: "Emiliano Martínez", team: byCode("ARG"), position: "GK", goals: 0, assists: 0, rating: 8.0, cleanSheets: 3 },
  { name: "Alisson Becker", team: byCode("BRA"), position: "GK", goals: 0, assists: 0, rating: 7.9, cleanSheets: 2 },
  { name: "Jordan Pickford", team: byCode("ENG"), position: "GK", goals: 0, assists: 0, rating: 7.8, cleanSheets: 2 },
];

export const topRated: Player[] = [...topScorers]
  .concat(topAssists)
  .filter((p, i, arr) => arr.findIndex((x) => x.name === p.name) === i)
  .sort((a, b) => b.rating - a.rating)
  .slice(0, 5);

// ---------------------------------------------------------------------------
// News
// ---------------------------------------------------------------------------

export const news: NewsItem[] = [
  {
    id: "n1",
    slug: "azteca-roars-as-mexico-open-2026",
    title: "Azteca Roars as Mexico Open World Cup 2026",
    excerpt:
      "A record crowd watched the hosts edge South Africa in a breathless opener under the Mexico City lights.",
    category: "Match Report",
    date: "2026-06-11",
    readTime: "4 min",
  },
  {
    id: "n2",
    slug: "ai-model-tips-argentina-and-france",
    title: "Visionary AI Tips Argentina and France for the Final",
    excerpt:
      "Our prediction engine crunched 2.4M data points — here are the favourites before a ball was kicked.",
    category: "AI Predictions",
    date: "2026-06-10",
    readTime: "6 min",
  },
  {
    id: "n3",
    slug: "48-teams-12-groups-format-explained",
    title: "48 Teams, 12 Groups: The New Format Explained",
    excerpt:
      "United by three nations, the biggest World Cup ever brings a fresh knockout path. Here is how it works.",
    category: "Explainer",
    date: "2026-06-09",
    readTime: "5 min",
  },
];

// ---------------------------------------------------------------------------
// Tournament statistics (home "Tournament Statistics" section)
// ---------------------------------------------------------------------------

export const tournamentStats = [
  { label: "Teams", value: 48, suffix: "" },
  { label: "Matches", value: 104, suffix: "" },
  { label: "Host Cities", value: 16, suffix: "" },
  { label: "Goals Scored", value: 187, suffix: "" },
];

// ---------------------------------------------------------------------------
// Live Match page detail data (featured: Mexico vs South Africa)
// ---------------------------------------------------------------------------

export type TimelineEvent = {
  minute: number;
  type: "goal" | "card" | "sub" | "var";
  team: "home" | "away";
  text: string;
};

export const matchTimeline: TimelineEvent[] = [
  { minute: 12, type: "goal", team: "home", text: "Goal! R. Jiménez fires Mexico ahead" },
  { minute: 23, type: "card", team: "away", text: "Yellow card — T. Mokoena (tactical foul)" },
  { minute: 31, type: "goal", team: "away", text: "Goal! L. Foster levels for South Africa" },
  { minute: 44, type: "var", team: "home", text: "VAR check — penalty awarded to Mexico" },
  { minute: 46, type: "goal", team: "home", text: "Goal! S. Giménez converts the penalty" },
  { minute: 58, type: "sub", team: "away", text: "Substitution — P. Tau on for South Africa" },
];

export const matchStats = [
  { label: "Possession", home: 54, away: 46, unit: "%" },
  { label: "Expected Goals (xG)", home: 1.8, away: 1.1, unit: "" },
  { label: "Shots", home: 12, away: 9, unit: "" },
  { label: "Shots on Target", home: 6, away: 4, unit: "" },
  { label: "Corners", home: 5, away: 3, unit: "" },
  { label: "Fouls", home: 8, away: 11, unit: "" },
  { label: "Pass Accuracy", home: 87, away: 82, unit: "%" },
];

export const headToHead = [
  { date: "2010", comp: "World Cup", home: "RSA", away: "MEX", score: "1 - 1" },
  { date: "2008", comp: "Friendly", home: "MEX", away: "RSA", score: "2 - 0" },
  { date: "2005", comp: "Friendly", home: "RSA", away: "MEX", score: "1 - 2" },
];

export const teamForm = {
  home: ["W", "W", "D", "W", "L"],
  away: ["W", "L", "W", "D", "W"],
};

export const keyPlayers = [
  { name: "S. Giménez", team: "home", role: "Striker", stat: "2 G" },
  { name: "R. Jiménez", team: "home", role: "Forward", stat: "1 G · 1 A" },
  { name: "L. Foster", team: "away", role: "Forward", stat: "1 G" },
  { name: "P. Tau", team: "away", role: "Winger", stat: "88% pass" },
];
