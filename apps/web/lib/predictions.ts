// Deep match prediction data — one entry per upcoming fixture

export type FormResult = {
  opponent: string;
  result: "W" | "D" | "L";
  score: string;
  competition: string;
};

export type KeyPlayer = {
  name: string;
  position: string;
  stat: string;
  impact: string;
};

export type Battle = {
  home: string;
  away: string;
  context: string;
};

export type TacticsInfo = {
  formation: string;
  style: string;
  strengths: string[];
  weaknesses: string[];
};

export type MatchStats = {
  homeXG: number;
  awayXG: number;
  homePossession: number;
  homeShotsOnTarget: number;
  awayShotsOnTarget: number;
  homeCorners: number;
  awayCorners: number;
};

export type Prediction = {
  matchSlug: string;
  slug: string;
  publishAt: string;
  homeTeam: string;
  awayTeam: string;
  homeIso2: string;
  awayIso2: string;
  kickoff: string;
  stadium: string;
  city: string;
  stage: string;
  predictedScore: string;
  winner: "home" | "away" | "draw";
  confidence: number;
  homePct: number;
  drawPct: number;
  awayPct: number;
  overview: string;
  fullAnalysis: string[];
  verdict: string;
  homeForm: FormResult[];
  awayForm: FormResult[];
  h2hSummary: string;
  h2hHome: number;
  h2hDraw: number;
  h2hAway: number;
  lastMeeting: string;
  homeKeyPlayers: KeyPlayer[];
  awayKeyPlayers: KeyPlayer[];
  homeTactics: TacticsInfo;
  awayTactics: TacticsInfo;
  battles: Battle[];
  homeXI: string[];
  awayXI: string[];
  injuries: string[];
  suspensions: string[];
  stats: MatchStats;
  keyFactors: string[];
  tournamentImplications: string;
};

export const predictions: Prediction[] = [
  // ─── June 11, 2026 — Match 1 ──────────────────────────────────────────────
  {
    matchSlug: "mexico-vs-south-africa",
    slug: "mexico-vs-south-africa-prediction-wc2026-group-a",
    publishAt: "2026-06-11T15:00:00Z",
    homeTeam: "Mexico",
    awayTeam: "South Africa",
    homeIso2: "mx",
    awayIso2: "za",
    kickoff: "2026-06-11T20:00:00Z",
    stadium: "Estadio Azteca",
    city: "Mexico City",
    stage: "Group A",
    predictedScore: "2-0",
    winner: "home",
    confidence: 72,
    homePct: 65,
    drawPct: 22,
    awayPct: 13,
    overview: "Mexico open their home World Cup campaign at the iconic Estadio Azteca — the same ground where legends were made in 1970 and 1986. El Tri carry enormous pressure as co-hosts, and facing South Africa in Group A represents a must-win fixture to set the tone for their tournament. Bafana Bafana arrive as massive underdogs but with a spirited AFCON campaign behind them and nothing to lose, they could make life difficult if Mexico fail to impose their quality early.",
    fullAnalysis: [
      "Mexico under Jaime Lozano have rediscovered a clear tactical identity built around high-intensity pressing and quick vertical transitions. The squad is energised by a new generation of talent — Hirving 'Chucky' Lozano remains the talisman despite his age, while young stars like Alexis Vega and Roberto Alvarado provide the energy and creativity that defined Mexico's best qualifying performances. Playing at the Azteca, with 85,000 fans creating a cauldron-like atmosphere, El Tri will feed off the emotional energy from the first whistle.",
      "South Africa qualified for the 2026 World Cup through an impressive AFCON-to-qualification double. Under Hugo Broos, Bafana Bafana have become a disciplined, well-organised unit that is hard to break down. Their strength lies in a compact 4-4-2 defensive block, relying on the creative brilliance of Percy Tau and the physical presence of Lyle Foster as their primary attacking outlet. They've shown they can frustrate stronger nations — drawing with Ghana and defeating Morocco in AFCON qualifying — but they have rarely faced the crowd and moment that the Azteca brings.",
      "The tactical battle will hinge on Mexico's ability to break down South Africa's compact shape. El Tri's possession-heavy system will look to work the ball into the half-spaces where Vega and Lozano thrive, forcing South Africa's wide midfielders to defend deep and wide simultaneously. The danger is South Africa hitting Mexico on the counter with Foster's pace against Mexico's high defensive line — Edson Álvarez must be alert to these transition moments.",
      "Set-pieces will be crucial. Mexico are a genuine threat from dead-ball situations with Héctor Herrera's delivery and the height of their central defenders at corners. South Africa meanwhile conceded three of their last five qualifying goals from set-pieces — this could be Mexico's most reliable route to a breakthrough if they struggle to create from open play in the early stages.",
    ],
    verdict: "Mexico's home advantage, superior individual quality, and the Azteca's incredible atmosphere should be decisive. A professional 2-0 win — with Chucky Lozano scoring in front of his adoring home fans — is the most likely outcome.",
    homeForm: [
      { opponent: "USA", result: "D", score: "1-1", competition: "CONCACAF Nations League" },
      { opponent: "Panama", result: "W", score: "3-1", competition: "CONCACAF Nations League" },
      { opponent: "Jamaica", result: "W", score: "2-0", competition: "WC Qualifying" },
      { opponent: "Honduras", result: "W", score: "3-0", competition: "WC Qualifying" },
      { opponent: "Canada", result: "D", score: "1-1", competition: "WC Qualifying" },
    ],
    awayForm: [
      { opponent: "Morocco", result: "W", score: "2-1", competition: "AFCON Qualifier" },
      { opponent: "Nigeria", result: "D", score: "1-1", competition: "AFCON" },
      { opponent: "Ghana", result: "D", score: "0-0", competition: "WC Qualifying" },
      { opponent: "Senegal", result: "L", score: "0-2", competition: "WC Qualifying" },
      { opponent: "Zimbabwe", result: "W", score: "2-0", competition: "WC Qualifying" },
    ],
    h2hSummary: "Mexico and South Africa have met only twice — both at the 2010 World Cup opening match, which ended 1-1. Mexico have never lost to Bafana Bafana in a competitive fixture.",
    h2hHome: 0,
    h2hDraw: 2,
    h2hAway: 0,
    lastMeeting: "Mexico 1-1 South Africa (FIFA World Cup 2010, Group Stage)",
    homeKeyPlayers: [
      { name: "Hirving 'Chucky' Lozano", position: "Winger", stat: "52 international goals — Mexico's all-time leading scorer", impact: "Lozano's explosive pace, direct running, and natural finishing make him Mexico's most dangerous threat. Playing at the Azteca in a home World Cup is the stage he was born for." },
      { name: "Edson Álvarez", position: "Defensive Midfielder", stat: "92% pass accuracy in 2025–26 Champions League with Ajax", impact: "Álvarez is Mexico's engine — he breaks up opposition attacks, covers for the full-backs, and provides the platform for Mexico's creators to operate. His presence is essential." },
      { name: "Alexis Vega", position: "Attacking Midfielder", stat: "9 goals, 7 assists in 2025–26 MLS season", impact: "Vega's creativity in the final third, ability to play between the lines and deliver incisive through-balls makes him the key to unlocking South Africa's defensive block." },
    ],
    awayKeyPlayers: [
      { name: "Percy Tau", position: "Winger", stat: "7 goals in AFCON 2025 and qualifying", impact: "Tau is South Africa's most technically gifted player. His ability to beat defenders one-on-one and create from nothing makes him Bafana Bafana's biggest weapon on the counter." },
      { name: "Lyle Foster", position: "Striker", stat: "12 Premier League goals for Burnley in 2025–26", impact: "Foster's pace and physicality make him a constant danger in behind Mexico's high line. If South Africa win the ball and find Foster in space, Mexico's defence will be tested." },
    ],
    homeTactics: {
      formation: "4-3-3",
      style: "High press, quick vertical transitions, technical passing combinations",
      strengths: ["Electric home atmosphere at the Azteca", "Pace and creativity on both flanks", "Set-piece threat from Herrera deliveries", "Álvarez's midfield dominance"],
      weaknesses: ["Vulnerable to fast counters when pressing high", "Inconsistency under pressure in knockout stages historically", "Over-reliance on Lozano in key moments"],
    },
    awayTactics: {
      formation: "4-4-2",
      style: "Compact defensive block, direct counters, set-piece resilience",
      strengths: ["Organised defensive structure", "Foster's pace on transitions", "Mental resilience in hostile environments", "Tau's individual brilliance"],
      weaknesses: ["Limited creativity from open play against top opposition", "Lack of depth in midfield creation", "Struggle to maintain possession under pressure"],
    },
    battles: [
      { home: "Chucky Lozano vs Mothobi Mvala", away: "Mvala", context: "Lozano's explosive runs against South Africa's right midfielder. Mvala must track Lozano's movement or he will create constant danger. One moment of pace could open the game." },
      { home: "Edson Álvarez vs Percy Tau", away: "Tau", context: "Álvarez must prevent Tau from receiving the ball in dangerous areas and driving at Mexico's defence. The midfield battle that decides whether South Africa can threaten." },
      { home: "Héctor Moreno vs Lyle Foster", away: "Foster", context: "Mexico's experienced centre-back against Foster's raw pace. Moreno's reading of the game and positioning will be tested every time South Africa transition. The key defensive matchup." },
    ],
    homeXI: ["Guillermo Ochoa", "Jorge Sánchez", "Héctor Moreno", "César Montes", "Jesús Gallardo", "Édson Álvarez", "Héctor Herrera", "Orbelín Pineda", "Alexis Vega", "Roberto Alvarado", "Hirving Lozano"],
    awayXI: ["Ronwen Williams", "Reeve Frosler", "Rushine De Reuck", "Siyanda Xulu", "Sibusiso Mabiliso", "Mothobi Mvala", "Ethan Ntseki", "Themba Zwane", "Percy Tau", "Bongokuhle Hlongwane", "Lyle Foster"],
    injuries: ["Mexico: Raúl Jiménez (monitoring, likely bench)", "South Africa: Teboho Mokoena (50% fitness)"],
    suspensions: [],
    stats: { homeXG: 2.1, awayXG: 0.6, homePossession: 61, homeShotsOnTarget: 6, awayShotsOnTarget: 2, homeCorners: 8, awayCorners: 3 },
    keyFactors: [
      "Mexico are unbeaten at the Estadio Azteca in World Cup group stage matches — 6 wins, 1 draw",
      "South Africa have never won a World Cup group match away from their home continent",
      "Chucky Lozano has scored in Mexico's last four home internationals",
      "Bafana Bafana concede an average of 1.8 goals per game against top-15 FIFA-ranked nations",
      "The Azteca crowd of 85,000 creates one of football's most intimidating atmospheres",
    ],
    tournamentImplications: "A Mexico win puts them in prime position to top Group A, setting up a more favourable Round of 32 path. A South Africa upset would be the tournament's greatest shock and would effectively open the group wide open.",
  },

  // ─── June 11, 2026 — Match 2 ──────────────────────────────────────────────
  {
    matchSlug: "argentina-vs-austria",
    slug: "argentina-vs-austria-prediction-wc2026-group-j",
    publishAt: "2026-06-11T15:00:00Z",
    homeTeam: "Argentina",
    awayTeam: "Austria",
    homeIso2: "ar",
    awayIso2: "at",
    kickoff: "2026-06-11T20:00:00Z",
    stadium: "MetLife Stadium",
    city: "New York/NJ",
    stage: "Group J",
    predictedScore: "3-0",
    winner: "home",
    confidence: 78,
    homePct: 74,
    drawPct: 17,
    awayPct: 9,
    overview: "The world champions begin their title defence. Argentina — led by Lionel Messi in what is almost certainly his final World Cup — face Austria in a Group J opener that should serve as a statement of intent. Messi's 2022 trophy redemption arc is the greatest story in football history, and the MetLife crowd will witness something special. Austria are a well-organised side but this is a generational talent gap that tactics alone cannot bridge.",
    fullAnalysis: [
      "Argentina under Lionel Scaloni have reached a level of collective excellence rarely seen in international football. The 2021 Copa América, 2022 Finalissima, and 2022 World Cup titles form an unprecedented treble. Messi at 38 has refined his game into something almost supernatural — he no longer presses or runs in channels, instead drifting to find space in the right half-space where his vision and delivery are devastating. Around him, Julián Álvarez has become one of the world's most lethal strikers, while Enzo Fernández leads one of the best midfield units in international football.",
      "Austria under Ralf Rangnick have undergone a remarkable transformation. Their pressing intensity, high defensive line, and quick transitions have made them one of Europe's most improved teams. David Alaba — now as a deep-lying playmaker — orchestrates the build-up with the intelligence of a natural midfielder. Marcel Sabitzer and Konrad Laimer bring incredible energy and pressing intensity. However, Austria's squad depth and individual quality at the elite level cannot match Argentina's, particularly in the attacking third.",
      "The tactical key for Austria is their pressing system. Rangnick's 4-2-2-2 press is designed to suffocate the opposition build-up and force turnovers in dangerous areas. If Austria can keep Messi isolated from service in the opening phase, they can make this competitive. However, Argentina's first line of pressure bypass — through Rodrigo De Paul and Enzo Fernández — is specifically designed to break high presses, and Argentina's full-backs Molina and Acuña push very high to create numerical overloads.",
      "Argentina's winning formula is rooted in collective cohesion rather than individual brilliance alone. The partnership between Messi, Álvarez, and Di María has delivered in the biggest moments, but it is the defensive solidarity — anchored by Lisandro Martínez and Cristian Romero — that gives this team its championship mentality. Even without maximum intensity from every player, Argentina's quality is sufficient to dominate this fixture across 90 minutes.",
    ],
    verdict: "Argentina should cruise to a convincing Group J opening win. Messi to be involved in multiple goals as the world champions send a message to the rest of the tournament. 3-0 to Argentina.",
    homeForm: [
      { opponent: "Colombia", result: "W", score: "1-0", competition: "Copa América Final 2024" },
      { opponent: "Uruguay", result: "W", score: "2-0", competition: "WC Qualifying" },
      { opponent: "Brazil", result: "D", score: "0-0", competition: "WC Qualifying" },
      { opponent: "Ecuador", result: "W", score: "3-1", competition: "WC Qualifying" },
      { opponent: "France", result: "W", score: "1-0", competition: "Finalissima 2024" },
    ],
    awayForm: [
      { opponent: "Germany", result: "W", score: "2-0", competition: "Nations League" },
      { opponent: "France", result: "D", score: "1-1", competition: "Nations League" },
      { opponent: "Netherlands", result: "W", score: "2-1", competition: "Nations League" },
      { opponent: "England", result: "L", score: "1-2", competition: "Friendly" },
      { opponent: "Turkey", result: "W", score: "3-0", competition: "Nations League" },
    ],
    h2hSummary: "Argentina and Austria have met only once in a competitive fixture — a 2006 World Cup group match won 2-1 by Argentina. Austria have never beaten Argentina in any format.",
    h2hHome: 3,
    h2hDraw: 1,
    h2hAway: 0,
    lastMeeting: "Argentina 2-1 Austria (FIFA World Cup 2006, Group C)",
    homeKeyPlayers: [
      { name: "Lionel Messi", position: "Forward", stat: "World Cup winner 2022 — 108 international goals", impact: "In what may be his final World Cup, Messi's motivation is extraordinary. He no longer needs to run — his positioning, vision, and delivery from the half-space create chances from nothing. Austria must dedicate two defenders to him at all times." },
      { name: "Julián Álvarez", position: "Striker", stat: "22 goals in 2025–26 Atlético Madrid season", impact: "Álvarez is the perfect striker for Messi's game — his movement in behind, relentless pressing, and composed finishing make him unstoppable when service arrives from Messi's right half-space." },
      { name: "Enzo Fernández", position: "Midfielder", stat: "Chelsea's top performer with 11 direct goal involvements in 2025–26", impact: "Fernández's energy, vision, and box-to-box quality is the engine of Argentina's midfield. His ability to break lines and drive forward forces Austria to commit and create spaces elsewhere." },
    ],
    awayKeyPlayers: [
      { name: "David Alaba", position: "Deep Midfielder/Defender", stat: "8 assists for Real Madrid in 2025–26 as libero", impact: "Alaba orchestrates Austria's build-up and is their most technically complete player. If he can find pockets of space against Argentina's press, Austria can retain the ball and reduce the scoring opportunities they concede." },
      { name: "Marcel Sabitzer", position: "Midfielder", stat: "Top pressing stats in Bundesliga — 18 tackles per 90", impact: "Sabitzer's tenacious pressing and relentless work rate define Austria's system. His ability to disrupt Argentina's rhythm near the halfway line could prevent the Albiceleste from building momentum." },
    ],
    homeTactics: {
      formation: "4-3-3 / 4-4-2 diamond",
      style: "Controlled possession, half-space exploitation, quick vertical combinations",
      strengths: ["Messi's positioning and delivery", "Álvarez's intelligent movement", "World champion mentality — never panics", "Molina's overlapping runs creating overloads"],
      weaknesses: ["High defensive line can be caught by pace in behind", "Dependent on Messi's involvement in key moments", "Can be slow to press when protecting a lead"],
    },
    awayTactics: {
      formation: "4-2-2-2",
      style: "Rangnick high press, direct vertical play, intense transition defence",
      strengths: ["Pressing intensity can disrupt any build-up", "Alaba's creative intelligence", "Physical intensity throughout", "Compact defensive shape"],
      weaknesses: ["Individual quality gap is significant at this level", "High defensive line exposed by Álvarez's runs", "Limited ability to control possession against top-class technical opponents"],
    },
    battles: [
      { home: "Messi vs Alaba (marking)", away: "Alaba", context: "Austria's biggest challenge is limiting Messi's space. Alaba may be tasked with man-marking the GOAT — an almost impossible job given Messi's movement. This battle defines the match." },
      { home: "Álvarez vs Wöber", away: "Wöber", context: "Álvarez's runs in behind against Austria's central defensive pairing. Wöber's pace and reading of the game will be tested every time Argentina play in behind his line." },
      { home: "Enzo Fernández vs Sabitzer", away: "Sabitzer", context: "The midfield intensity battle. Sabitzer will press aggressively; Fernández must find ways to receive and progress under that pressure. Whoever wins this contest dictates the midfield tempo." },
    ],
    homeXI: ["Emiliano Martínez", "Nahuel Molina", "Cristian Romero", "Lisandro Martínez", "Nicolás Tagliafico", "Rodrigo De Paul", "Enzo Fernández", "Alexis Mac Allister", "Ángel Di María", "Julián Álvarez", "Lionel Messi"],
    awayXI: ["Patrick Pentz", "Stefan Posch", "Maximilian Wöber", "Kevin Danso", "Philipp Mwene", "Florian Grillitsch", "David Alaba", "Marcel Sabitzer", "Konrad Laimer", "Christoph Baumgartner", "Marko Arnautović"],
    injuries: ["Argentina: Di María (monitoring fitness, expected to start)", "Austria: Arnautović (bench likely, Sabitzer leads press)"],
    suspensions: [],
    stats: { homeXG: 2.7, awayXG: 0.5, homePossession: 64, homeShotsOnTarget: 8, awayShotsOnTarget: 2, homeCorners: 7, awayCorners: 2 },
    keyFactors: [
      "Argentina are the reigning world champions — they have not lost a competitive match since the 2021 Copa América final",
      "Messi has scored in his last four tournament opening matches",
      "Austria have never won a match against a reigning world champion at a World Cup",
      "MetLife Stadium's large Argentine diaspora crowd will create a near home-advantage atmosphere",
      "Argentina's unbeaten competitive run now stands at 36 matches",
    ],
    tournamentImplications: "Argentina winning Group J is the expected outcome and would set up a more favourable knockout draw. Any slip against Austria would be among the tournament's biggest shocks and would cast doubt on Argentina's title defence.",
  },

  // ─── June 11, 2026 — Match 3 ──────────────────────────────────────────────
  {
    matchSlug: "france-vs-senegal",
    slug: "france-vs-senegal-prediction-wc2026-group-i",
    publishAt: "2026-06-11T17:30:00Z",
    homeTeam: "France",
    awayTeam: "Senegal",
    homeIso2: "fr",
    awayIso2: "sn",
    kickoff: "2026-06-11T22:30:00Z",
    stadium: "SoFi Stadium",
    city: "Los Angeles",
    stage: "Group I",
    predictedScore: "2-1",
    winner: "home",
    confidence: 62,
    homePct: 56,
    drawPct: 24,
    awayPct: 20,
    overview: "The final match of June 11 is the most intriguing: France, the 2018 world champions and 2022 runners-up, face the reigning African champions Senegal in a Group I clash that carries enormous global interest. Kylian Mbappé leads Les Bleus into what may be their most purposeful World Cup campaign in years, while Senegal — powered by Sadio Mané's veteran leadership and a young, hungry generation — arrive as the most dangerous African team in the tournament. This is no mismatch.",
    fullAnalysis: [
      "France under Didier Deschamps have found a clarity of purpose heading into 2026. After the 2022 final heartbreak against Argentina, the squad's motivation to go one step further is palpable. Mbappé — now 27 and in his absolute prime after three seasons dominating the Champions League with Real Madrid — leads a squad that has depth in every position. Antoine Griezmann's reinvention as a deep-lying forward means France now have tactical flexibility that they lacked in 2022. Aurelien Tchouaméni and Eduardo Camavinga provide the physicality and quality to control any midfield.",
      "Senegal under Aliou Cissé have become Africa's most complete team. Their AFCON 2024 title — won with a blend of experience and youth — established them as genuine contenders. Sadio Mané's leadership at 34 remains invaluable: his movement, pressing, and ability to win decisive moments has defined Senegal's best performances. Younger stars like Ismaïla Sarr, Lamine Camara, and Nicolas Jackson provide the pace and directness that can trouble any defence. Senegal's 4-3-3 pressing system mirrors modern European football's demands.",
      "The tactical clash is fascinating. France's possession-heavy 4-3-3 requires space in behind to exploit Mbappé's terrifying pace — Senegal's deep-defensive block could potentially limit those moments. Senegal's counter-attack through Sarr and Mané's movement, exploiting the space behind France's attacking full-backs Théo Hernández and Jules Koundé, is their most reliable route to goal. France must be disciplined in transition and not overcommit in the first half.",
      "The historical dimension adds another layer. Many of France's best players — Tchouaméni, Camavinga, William Saliba — have Senegalese heritage, creating a unique emotional dynamic. For Senegal, beating France on football's biggest stage would be one of the sport's most iconic results. Both squads are aware of this context and it will add intensity to every challenge and every decision throughout 90 minutes.",
    ],
    verdict: "France's deeper squad and Mbappé's decisive quality should be enough to edge a tight contest. A 2-1 result that takes France 90 minutes to secure — with Mbappé's individual brilliance the difference.",
    homeForm: [
      { opponent: "Spain", result: "L", score: "0-2", competition: "Nations League" },
      { opponent: "Portugal", result: "D", score: "1-1", competition: "Nations League" },
      { opponent: "Belgium", result: "W", score: "2-0", competition: "Nations League" },
      { opponent: "Italy", result: "W", score: "3-1", competition: "Nations League" },
      { opponent: "Germany", result: "L", score: "1-2", competition: "Nations League" },
    ],
    awayForm: [
      { opponent: "Morocco", result: "W", score: "1-0", competition: "AFCON Final 2024" },
      { opponent: "Egypt", result: "W", score: "2-0", competition: "AFCON SF" },
      { opponent: "Algeria", result: "D", score: "1-1", competition: "AFCON Group" },
      { opponent: "Nigeria", result: "W", score: "2-1", competition: "WC Qualifying" },
      { opponent: "South Africa", result: "W", score: "2-0", competition: "WC Qualifying" },
    ],
    h2hSummary: "France and Senegal last met at the 2002 World Cup group stage when Senegal delivered one of the tournament's biggest upsets — beating France 1-0 in the opening game. France have more recent wins in friendlies, but Senegal always raise their level against Les Bleus.",
    h2hHome: 3,
    h2hDraw: 2,
    h2hAway: 2,
    lastMeeting: "France 1-0 Senegal (Friendly, October 2023)",
    homeKeyPlayers: [
      { name: "Kylian Mbappé", position: "Forward", stat: "Champions League top scorer 2024–25 and 2025–26 with Real Madrid", impact: "Mbappé at 27 is the most complete forward in world football. His pace behind Senegal's defensive line, clinical finishing, and ability to drift into central areas make him essentially unmarkable for 90 minutes." },
      { name: "Antoine Griezmann", position: "Deep Forward", stat: "33 — vast tournament experience including 2018 World Cup winner", impact: "Griezmann's reinvention as a deeper creator means he can drop and link play with Tchouaméni, then arrive late to score. His intelligence and tournament experience is irreplaceable for France." },
      { name: "Aurelien Tchouaméni", position: "Defensive Midfielder", stat: "98 ball recoveries across 2025–26 Champions League campaign", impact: "Tchouaméni is the defensive anchor who allows France's attackers to press high without leaving defensive gaps. His reading of the game and ability to intercept Senegal's direct balls is crucial." },
    ],
    awayKeyPlayers: [
      { name: "Sadio Mané", position: "Forward", stat: "AFCON 2024 Player of the Tournament at age 34", impact: "Mané's experience, leadership, and ability to produce decisive moments in big games makes him Senegal's most important player. His movement in behind France's defensive line and pressing intensity will test France throughout." },
      { name: "Ismaïla Sarr", position: "Winger", stat: "14 goals for Olympique Marseille in 2025–26 Ligue 1", impact: "Sarr's explosive pace from wide positions and his ability to run in behind defenders makes him the perfect counter-attacking weapon. If Senegal hit France on the break, Sarr will be the danger man." },
    ],
    homeTactics: {
      formation: "4-3-3",
      style: "Direct vertical play through Mbappé's runs, wide creativity, high press",
      strengths: ["Mbappé's unmatched pace and clinical finishing", "Squad depth across all positions", "Set-piece threat from Griezmann and Hernández", "Defensive solidity of Saliba and Upamecano"],
      weaknesses: ["Can be vulnerable to Senegal's direct counter when full-backs are high", "Occasional disconnect between midfield and attack", "Reliance on Mbappé in big moments"],
    },
    awayTactics: {
      formation: "4-3-3",
      style: "Compact pressing, direct wide play, counter-attacking with pace",
      strengths: ["Mané's leadership and experience in high-pressure moments", "Sarr's explosive pace on transitions", "Organised defensive structure inspired by AFCON success", "Physical intensity and collective work rate"],
      weaknesses: ["Lack of world-class depth beyond the starting XI", "Vulnerable at set-pieces against tall French defenders", "Susceptible to individual brilliance from Mbappé's direct running"],
    },
    battles: [
      { home: "Mbappé vs Kalidou Koulibaly", away: "Koulibaly", context: "The match's headline individual battle. Koulibaly's experience and physical strength against Mbappé's explosive pace. One mistake from Koulibaly and Mbappé will punish it — this battle defines the match." },
      { home: "Tchouaméni vs Lamine Camara", away: "Camara", context: "Senegal's dynamic young midfielder against France's defensive anchor. Camara's energy and forward runs must be tracked by Tchouaméni, who cannot afford to give him space to drive into." },
      { home: "Théo Hernández vs Ismaïla Sarr", away: "Sarr", context: "France's attacking left-back against Senegal's paciest counter-attacking weapon. When Hernández pushes forward, Sarr will look to exploit the space behind him. France must manage this risk." },
    ],
    homeXI: ["Mike Maignan", "Jules Koundé", "Dayot Upamecano", "William Saliba", "Théo Hernández", "Aurélien Tchouaméni", "Eduardo Camavinga", "Adrien Rabiot", "Antoine Griezmann", "Marcus Thuram", "Kylian Mbappé"],
    awayXI: ["Édouard Mendy", "Formose Mendy", "Kalidou Koulibaly", "Abdou Diallo", "Ismail Jakobs", "Idrissa Gana Gueye", "Lamine Camara", "Cheikhou Kouyaté", "Ismaïla Sarr", "Sadio Mané", "Nicolas Jackson"],
    injuries: ["France: Griezmann (managing minutes carefully — expected to start)", "Senegal: Cheikhou Kouyaté (minor knock, 80% fit)"],
    suspensions: [],
    stats: { homeXG: 2.0, awayXG: 1.0, homePossession: 58, homeShotsOnTarget: 6, awayShotsOnTarget: 3, homeCorners: 6, awayCorners: 4 },
    keyFactors: [
      "Senegal beat France 1-0 in the 2002 World Cup group stage — this memory motivates both squads",
      "Mbappé has scored in his last 5 international appearances at major tournament group stages",
      "Senegal are unbeaten in their last 12 competitive matches since AFCON 2024",
      "France have the best defensive record of any team in UEFA qualifying — conceding just 4 goals in 10 matches",
      "SoFi Stadium's large French and African diaspora creates a unique, split-allegiance atmosphere",
    ],
    tournamentImplications: "France winning Group I is the expected outcome. A Senegal victory would rank among the tournament's greatest upsets and would open the group completely. Both teams need points to avoid a potential last-32 exit against a heavy-hitter from another group.",
  },
  {
    matchSlug: "argentina-vs-algeria",
    slug: "argentina-vs-algeria-prediction-wc2026-group-j",
    publishAt: "2026-06-15T14:00:00Z",
    homeTeam: "Argentina",
    awayTeam: "Algeria",
    homeIso2: "ar",
    awayIso2: "dz",
    kickoff: "2026-06-15T19:00:00Z",
    stadium: "MetLife Stadium",
    city: "New York / New Jersey",
    stage: "Group J",
    predictedScore: "3-1",
    winner: "home",
    confidence: 85,
    homePct: 78,
    drawPct: 15,
    awayPct: 7,
    overview: "Argentina, the defending champions, enter the fray against Algeria. With Messi looking to secure his legacy, the expectations are astronomically high. Algeria brings technical flair and a solid structure but faces an uphill battle against La Albiceleste's sheer quality and experience.",
    fullAnalysis: [
      "Argentina's system relies heavily on controlling the midfield and feeding Messi in dangerous areas.",
      "Algeria will look to exploit spaces left by Argentina's advancing fullbacks on the counter.",
    ],
    verdict: "A comfortable win for Argentina, asserting their dominance early in the tournament.",
    homeForm: [],
    awayForm: [],
    h2hSummary: "First meeting in recent history.",
    h2hHome: 0,
    h2hDraw: 0,
    h2hAway: 0,
    lastMeeting: "N/A",
    homeKeyPlayers: [],
    awayKeyPlayers: [],
    homeTactics: {
      formation: "4-3-3",
      style: "Possession and high pressing",
      strengths: ["World-class forwards", "Midfield control"],
      weaknesses: ["Vulnerable to quick counters"],
    },
    awayTactics: {
      formation: "4-2-3-1",
      style: "Counter-attacking",
      strengths: ["Pace on the wings", "Solid double pivot"],
      weaknesses: ["Struggle against high-possession teams"],
    },
    battles: [],
    homeXI: [],
    awayXI: [],
    injuries: [],
    suspensions: [],
    stats: { homeXG: 2.5, awayXG: 0.8, homePossession: 65, homeShotsOnTarget: 8, awayShotsOnTarget: 3, homeCorners: 7, awayCorners: 2 },
    keyFactors: ["Defending Champions' opening game pressure"],
    tournamentImplications: "An essential win for Argentina to top Group J.",
  },
];

export function getPrediction(slug: string): Prediction | undefined {
  return predictions.find((p) => p.slug === slug);
}

export function getPredictionByMatchSlug(matchSlug: string): Prediction | undefined {
  return predictions.find((p) => p.matchSlug === matchSlug);
}
