/**
 * Visionary FIFA — complete player database.
 * 200+ players across all 48 FIFA World Cup 2026 qualified nations.
 * Stats are illustrative demo figures; photos via TheSportsDB (free, hot-linkable).
 */

export type PosGroup = "GK" | "DEF" | "MID" | "FWD";

export type PlayerPro = {
  slug: string;
  name: string;
  fullName?: string;
  country: string;
  iso2: string;
  pos: string;
  posGroup: PosGroup;
  club: string;
  number: number;
  age: number;
  height: string;
  foot: string;
  // Tournament stats
  goals: number;
  assists: number;
  rating: number;
  cleanSheets: number;
  matchesPlayed: number;
  // Career totals
  careerGoals: number;
  careerCaps: number;
  // Identity
  image?: string;
  cutout?: string;
  honors: string;
  bio: string;
  marketValue: string;
  fifaRating: number;
  // Flags
  star: boolean;
  trending?: boolean;
  group?: string;
};

const TH  = "https://r2.thesportsdb.com/images/media/player/thumb/";
const THW = "https://www.thesportsdb.com/images/media/player/thumb/";
const CO  = "https://r2.thesportsdb.com/images/media/player/cutout/";

export function slugify(name: string) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

type Seed = Omit<PlayerPro, "slug">;

const seed: Seed[] = [
  // ─── TRENDING 8 ──────────────────────────────────────────────────────────────
  {
    name: "Lionel Messi", fullName: "Lionel Andrés Messi Cuccittini",
    country: "Argentina", iso2: "ar", pos: "Forward", posGroup: "FWD",
    club: "Inter Miami", number: 10, age: 38, height: "1.70 m", foot: "Left",
    goals: 6, assists: 5, rating: 9.1, cleanSheets: 0, matchesPlayed: 5,
    careerGoals: 841, careerCaps: 191,
    image: TH + "kpfsvp1725295651.jpg", cutout: CO + "e0i2051750317027.png",
    marketValue: "€35M", fifaRating: 91,
    honors: "8× Ballon d'Or · 2022 World Cup winner · 2022 Golden Ball",
    bio: "The greatest of all time, Messi's vision, dribbling, and goal-scoring have redefined what is possible in football.",
    star: true, trending: true, group: "J",
  },
  {
    name: "Kylian Mbappé", fullName: "Kylian Mbappé Lottin",
    country: "France", iso2: "fr", pos: "Forward", posGroup: "FWD",
    club: "Real Madrid", number: 10, age: 27, height: "1.78 m", foot: "Right",
    goals: 7, assists: 2, rating: 8.9, cleanSheets: 0, matchesPlayed: 5,
    careerGoals: 387, careerCaps: 98,
    image: THW + "v08cj31778816426.jpg", cutout: CO + "h9u9vz1733653583.png",
    marketValue: "€180M", fifaRating: 92,
    honors: "2018 World Cup winner · 2022 Golden Boot · 2× WC finalist",
    bio: "Blessed with electric pace and ruthless finishing, Mbappé is the defining forward of his generation.",
    star: true, trending: true, group: "I",
  },
  {
    name: "Erling Haaland", fullName: "Erling Braut Haaland",
    country: "Norway", iso2: "no", pos: "Striker", posGroup: "FWD",
    club: "Manchester City", number: 9, age: 25, height: "1.95 m", foot: "Left",
    goals: 5, assists: 1, rating: 8.6, cleanSheets: 0, matchesPlayed: 4,
    careerGoals: 279, careerCaps: 45,
    image: TH + "bb1agj1727415216.jpg", cutout: CO + "un3jr11769182465.png",
    marketValue: "€170M", fifaRating: 92,
    honors: "3× PL Golden Boot · UCL winner · Bundesliga top scorer",
    bio: "An unstoppable physical specimen with predatory instincts, Haaland consistently breaks goalscoring records.",
    star: true, trending: true, group: "I",
  },
  {
    name: "Jude Bellingham", fullName: "Jude Victor William Bellingham",
    country: "England", iso2: "gb-eng", pos: "Midfielder", posGroup: "MID",
    club: "Real Madrid", number: 10, age: 22, height: "1.86 m", foot: "Right",
    goals: 3, assists: 3, rating: 8.4, cleanSheets: 0, matchesPlayed: 5,
    careerGoals: 62, careerCaps: 55,
    image: TH + "rfg8xd1771263826.jpg", cutout: CO + "trk5271750271712.png",
    marketValue: "€180M", fifaRating: 90,
    honors: "UCL winner · Euro 2024 finalist · La Liga champion",
    bio: "A box-to-box midfielder with a flair for the spectacular, Bellingham captivates at club and international level.",
    star: true, trending: true, group: "L",
  },
  {
    name: "Vinícius Júnior", fullName: "Vinícius José Paixão de Oliveira Júnior",
    country: "Brazil", iso2: "br", pos: "Winger", posGroup: "FWD",
    club: "Real Madrid", number: 7, age: 25, height: "1.76 m", foot: "Right",
    goals: 4, assists: 3, rating: 8.7, cleanSheets: 0, matchesPlayed: 4,
    careerGoals: 131, careerCaps: 42,
    image: TH + "lxf1he1771264845.jpg", cutout: CO + "ejuxsh1750271859.png",
    marketValue: "€150M", fifaRating: 91,
    honors: "2024 Ballon d'Or finalist · UCL winner · La Liga champion",
    bio: "Explosive, joyful, and lethal in front of goal, Vinícius is the heartbeat of Real Madrid and Brazil.",
    star: true, trending: true, group: "C",
  },
  {
    name: "Rodri", fullName: "Rodrigo Hernández Cascante",
    country: "Spain", iso2: "es", pos: "Midfielder", posGroup: "MID",
    club: "Manchester City", number: 16, age: 29, height: "1.91 m", foot: "Right",
    goals: 1, assists: 2, rating: 8.6, cleanSheets: 0, matchesPlayed: 4,
    careerGoals: 22, careerCaps: 61,
    marketValue: "€100M", fifaRating: 91,
    honors: "2024 Ballon d'Or · Euro 2024 winner · 4× UCL winner",
    bio: "The engine of both Manchester City and Spain, Rodri's exceptional reading of the game sets him apart.",
    star: true, trending: true, group: "H",
  },
  {
    name: "Jamal Musiala", fullName: "Jamal Musiala",
    country: "Germany", iso2: "de", pos: "Midfielder", posGroup: "MID",
    club: "Bayern Munich", number: 10, age: 23, height: "1.84 m", foot: "Right",
    goals: 3, assists: 4, rating: 8.5, cleanSheets: 0, matchesPlayed: 4,
    careerGoals: 87, careerCaps: 45,
    image: THW + "y998n31779384099.jpg", cutout: CO + "vbkv611756416067.png",
    marketValue: "€150M", fifaRating: 89,
    honors: "5× Bundesliga champion · DFB-Pokal winner",
    bio: "Germany's most exciting talent since a generation, Musiala glides past defenders with ease and composure.",
    star: true, trending: true, group: "E",
  },
  {
    name: "Lamine Yamal", fullName: "Lamine Yamal Nasraoui Ebana",
    country: "Spain", iso2: "es", pos: "Winger", posGroup: "FWD",
    club: "Barcelona", number: 19, age: 18, height: "1.77 m", foot: "Left",
    goals: 4, assists: 6, rating: 8.8, cleanSheets: 0, matchesPlayed: 5,
    careerGoals: 43, careerCaps: 28,
    marketValue: "€180M", fifaRating: 88,
    honors: "Euro 2024 winner · Euro 2024 Young Player · La Liga champion",
    bio: "The most electric teenage talent in world football, Yamal broke records at Euro 2024 and is only getting better.",
    star: true, trending: true, group: "H",
  },

  // ─── GROUP A ─────────────────────────────────────────────────────────────────
  // Mexico
  {
    name: "Guillermo Ochoa", country: "Mexico", iso2: "mx", pos: "Goalkeeper", posGroup: "GK",
    club: "Club América", number: 1, age: 40, height: "1.83 m", foot: "Right",
    goals: 0, assists: 0, rating: 7.6, cleanSheets: 1, matchesPlayed: 3,
    careerGoals: 0, careerCaps: 148,
    marketValue: "€1M", fifaRating: 77,
    honors: "5× FIFA World Cup appearance · CONCACAF champion",
    bio: "Mexico's legendary goalkeeper whose World Cup heroics have made him a national icon across five tournaments.",
    star: false, group: "A",
  },
  {
    name: "Hirving Lozano", fullName: "Hirving Rodrigo Lozano Bahena",
    country: "Mexico", iso2: "mx", pos: "Winger", posGroup: "FWD",
    club: "Club Pachuca", number: 22, age: 30, height: "1.74 m", foot: "Right",
    goals: 2, assists: 1, rating: 7.8, cleanSheets: 0, matchesPlayed: 3,
    careerGoals: 31, careerCaps: 91,
    marketValue: "€8M", fifaRating: 81,
    honors: "Eredivisie champion · CONCACAF Gold Cup winner",
    bio: "Known as 'Chucky', Lozano's direct running and shooting power make him Mexico's most feared attacker.",
    star: false, group: "A",
  },
  {
    name: "Raúl Jiménez", fullName: "Raúl Alonso Jiménez Rodríguez",
    country: "Mexico", iso2: "mx", pos: "Striker", posGroup: "FWD",
    club: "Fulham", number: 9, age: 34, height: "1.90 m", foot: "Right",
    goals: 3, assists: 1, rating: 7.9, cleanSheets: 0, matchesPlayed: 3,
    careerGoals: 97, careerCaps: 116,
    marketValue: "€6M", fifaRating: 80,
    honors: "Liga MX champion · PL top 10 scorer",
    bio: "Mexico's talismanic centre-forward whose aerial prowess and hold-up play make him a constant threat.",
    star: false, group: "A",
  },
  {
    name: "Edson Álvarez", country: "Mexico", iso2: "mx", pos: "Midfielder", posGroup: "MID",
    club: "West Ham", number: 4, age: 27, height: "1.87 m", foot: "Right",
    goals: 1, assists: 2, rating: 7.9, cleanSheets: 0, matchesPlayed: 3,
    careerGoals: 8, careerCaps: 74,
    marketValue: "€20M", fifaRating: 82,
    honors: "Ajax Eredivisie champion · Liga MX champion",
    bio: "A commanding defensive midfielder who reads danger early and distributes the ball with authority.",
    star: false, group: "A",
  },
  // South Africa
  {
    name: "Percy Tau", country: "South Africa", iso2: "za", pos: "Winger", posGroup: "FWD",
    club: "Al Ahly", number: 13, age: 32, height: "1.71 m", foot: "Right",
    goals: 2, assists: 2, rating: 7.7, cleanSheets: 0, matchesPlayed: 3,
    careerGoals: 28, careerCaps: 72,
    marketValue: "€3M", fifaRating: 79,
    honors: "CAF Champions League winner · Belgian champion",
    bio: "South Africa's brightest star, Tau's technical skill and creativity thrill fans at club and international level.",
    star: false, group: "A",
  },
  {
    name: "Ronwen Williams", country: "South Africa", iso2: "za", pos: "Goalkeeper", posGroup: "GK",
    club: "Mamelodi Sundowns", number: 1, age: 32, height: "1.86 m", foot: "Right",
    goals: 0, assists: 0, rating: 7.5, cleanSheets: 1, matchesPlayed: 3,
    careerGoals: 0, careerCaps: 43,
    marketValue: "€1M", fifaRating: 76,
    honors: "CAF Champions League winner · PSL champion",
    bio: "Bafana Bafana's trusted last line of defence, Williams is an agile shot-stopper with commanding presence.",
    star: false, group: "A",
  },
  // South Korea
  {
    name: "Heung-min Son", fullName: "Son Heung-min",
    country: "South Korea", iso2: "kr", pos: "Forward", posGroup: "FWD",
    club: "Tottenham", number: 7, age: 33, height: "1.83 m", foot: "Both",
    goals: 4, assists: 3, rating: 8.3, cleanSheets: 0, matchesPlayed: 4,
    careerGoals: 184, careerCaps: 126,
    image: THW + "r5abfl1778974278.jpg", cutout: CO + "a5cqf81766425262.png",
    marketValue: "€15M", fifaRating: 85,
    honors: "PL Golden Boot · 2022 WC Round of 16",
    bio: "Asia's greatest footballer, Son combines clinical finishing with breathtaking dribbling ability.",
    star: true, group: "A",
  },
  {
    name: "Kim Min-jae", country: "South Korea", iso2: "kr", pos: "Centre-Back", posGroup: "DEF",
    club: "Bayern Munich", number: 3, age: 28, height: "1.90 m", foot: "Right",
    goals: 0, assists: 1, rating: 8.0, cleanSheets: 0, matchesPlayed: 3,
    careerGoals: 5, careerCaps: 68,
    marketValue: "€55M", fifaRating: 87,
    honors: "Bundesliga champion · Serie A champion",
    bio: "One of the best centre-backs in the world, Kim's aerial dominance and composure in possession are elite.",
    star: false, group: "A",
  },
  {
    name: "Lee Kang-in", country: "South Korea", iso2: "kr", pos: "Midfielder", posGroup: "MID",
    club: "Paris Saint-Germain", number: 19, age: 24, height: "1.73 m", foot: "Right",
    goals: 2, assists: 3, rating: 8.1, cleanSheets: 0, matchesPlayed: 4,
    careerGoals: 14, careerCaps: 57,
    marketValue: "€40M", fifaRating: 84,
    honors: "Ligue 1 champion · 2022 U-20 World Cup winner",
    bio: "A creative attacking midfielder whose clever movement and technical flair make him South Korea's playmaker.",
    star: false, group: "A",
  },
  // Czechia
  {
    name: "Tomáš Souček", country: "Czechia", iso2: "cz", pos: "Midfielder", posGroup: "MID",
    club: "West Ham", number: 28, age: 30, height: "1.92 m", foot: "Right",
    goals: 2, assists: 1, rating: 7.8, cleanSheets: 0, matchesPlayed: 3,
    careerGoals: 49, careerCaps: 79,
    marketValue: "€20M", fifaRating: 82,
    honors: "Czech top scorer · PL player of season nominations",
    bio: "Souček's powerful runs into the box and aerial ability make him one of the most dangerous midfielders in Europe.",
    star: false, group: "A",
  },
  {
    name: "Patrik Schick", country: "Czechia", iso2: "cz", pos: "Striker", posGroup: "FWD",
    club: "Bayer Leverkusen", number: 14, age: 30, height: "1.86 m", foot: "Right",
    goals: 3, assists: 1, rating: 7.9, cleanSheets: 0, matchesPlayed: 3,
    careerGoals: 89, careerCaps: 62,
    marketValue: "€20M", fifaRating: 83,
    honors: "Euro 2020 Golden Boot joint · Bundesliga champion",
    bio: "Schick's thunderous long-range goals and strong hold-up play have established him as a top European striker.",
    star: false, group: "A",
  },

  // ─── GROUP B ─────────────────────────────────────────────────────────────────
  // Canada
  {
    name: "Alphonso Davies", fullName: "Alphonso Davies",
    country: "Canada", iso2: "ca", pos: "Left-Back", posGroup: "DEF",
    club: "Bayern Munich", number: 19, age: 25, height: "1.83 m", foot: "Left",
    goals: 1, assists: 4, rating: 8.2, cleanSheets: 0, matchesPlayed: 4,
    careerGoals: 12, careerCaps: 57,
    image: TH + "0p7ekk1660764614.jpg", cutout: CO + "11afh31756409066.png",
    marketValue: "€60M", fifaRating: 85,
    honors: "UCL winner · Bundesliga champion · 5× German champion",
    bio: "The fastest full-back in world football, Davies transforms attack into defence in seconds with his blistering pace.",
    star: true, group: "B",
  },
  {
    name: "Jonathan David", country: "Canada", iso2: "ca", pos: "Striker", posGroup: "FWD",
    club: "Arsenal", number: 9, age: 25, height: "1.80 m", foot: "Right",
    goals: 3, assists: 2, rating: 8.0, cleanSheets: 0, matchesPlayed: 4,
    careerGoals: 122, careerCaps: 52,
    marketValue: "€70M", fifaRating: 85,
    honors: "Ligue 1 top scorer 2× · Belgian Golden Boot",
    bio: "A prolific and intelligent striker, David's movement, composure and goal rate rank among the best in Europe.",
    star: false, group: "B",
  },
  {
    name: "Tajon Buchanan", country: "Canada", iso2: "ca", pos: "Winger", posGroup: "FWD",
    club: "Inter", number: 17, age: 26, height: "1.79 m", foot: "Right",
    goals: 1, assists: 2, rating: 7.7, cleanSheets: 0, matchesPlayed: 3,
    careerGoals: 12, careerCaps: 41,
    marketValue: "€12M", fifaRating: 79,
    honors: "Serie A champion · CONCACAF Nations League winner",
    bio: "An explosive winger whose pace and direct running stretch defences, Buchanan is Canada's wideman of choice.",
    star: false, group: "B",
  },
  // Switzerland
  {
    name: "Granit Xhaka", country: "Switzerland", iso2: "ch", pos: "Midfielder", posGroup: "MID",
    club: "Bayer Leverkusen", number: 10, age: 33, height: "1.85 m", foot: "Left",
    goals: 1, assists: 3, rating: 8.0, cleanSheets: 0, matchesPlayed: 3,
    careerGoals: 37, careerCaps: 128,
    marketValue: "€15M", fifaRating: 83,
    honors: "Swiss captain · Bundesliga champion (invincible season)",
    bio: "Switzerland's inspirational captain, Xhaka's driving runs and passing range orchestrate his side's tempo.",
    star: false, group: "B",
  },
  {
    name: "Xherdan Shaqiri", country: "Switzerland", iso2: "ch", pos: "Winger", posGroup: "FWD",
    club: "Basel", number: 23, age: 34, height: "1.69 m", foot: "Both",
    goals: 2, assists: 1, rating: 7.6, cleanSheets: 0, matchesPlayed: 3,
    careerGoals: 32, careerCaps: 114,
    marketValue: "€2M", fifaRating: 79,
    honors: "Multiple WC goals · PL champion with Liverpool",
    bio: "A technically gifted and powerful attacker, Shaqiri has delivered memorable World Cup moments throughout his career.",
    star: false, group: "B",
  },
  // Bosnia
  {
    name: "Edin Džeko", country: "Bosnia", iso2: "ba", pos: "Striker", posGroup: "FWD",
    club: "Fenerbahçe", number: 9, age: 39, height: "1.93 m", foot: "Both",
    goals: 2, assists: 1, rating: 7.5, cleanSheets: 0, matchesPlayed: 3,
    careerGoals: 421, careerCaps: 113,
    marketValue: "€2M", fifaRating: 78,
    honors: "Bosnia all-time top scorer · Serie A champion",
    bio: "A Balkan legend, Džeko's physical presence and prolific scoring record make him Bosnia's greatest-ever player.",
    star: false, group: "B",
  },
  {
    name: "Miralem Pjanić", country: "Bosnia", iso2: "ba", pos: "Midfielder", posGroup: "MID",
    club: "Sharjah FC", number: 8, age: 36, height: "1.80 m", foot: "Left",
    goals: 1, assists: 2, rating: 7.4, cleanSheets: 0, matchesPlayed: 3,
    careerGoals: 46, careerCaps: 116,
    marketValue: "€1M", fifaRating: 77,
    honors: "Serie A champion · La Liga winner · UCL finalist",
    bio: "A technically exquisite playmaker, Pjanić's passing and set-piece delivery were the envy of European football.",
    star: false, group: "B",
  },
  // Qatar
  {
    name: "Akram Afif", country: "Qatar", iso2: "qa", pos: "Winger", posGroup: "FWD",
    club: "Al-Sadd", number: 11, age: 28, height: "1.75 m", foot: "Left",
    goals: 2, assists: 2, rating: 7.6, cleanSheets: 0, matchesPlayed: 3,
    careerGoals: 44, careerCaps: 81,
    marketValue: "€4M", fifaRating: 78,
    honors: "AFC Asian Cup winner · 2023 Player of the Year",
    bio: "Qatar's creative spark and AFC Asian Cup hero, Afif's direct running and eye for goal lead the Maroons.",
    star: false, group: "B",
  },

  // ─── GROUP C ─────────────────────────────────────────────────────────────────
  // Brazil
  {
    name: "Rodrygo", fullName: "Rodrygo Goes",
    country: "Brazil", iso2: "br", pos: "Forward", posGroup: "FWD",
    club: "Real Madrid", number: 11, age: 24, height: "1.74 m", foot: "Right",
    goals: 3, assists: 4, rating: 8.2, cleanSheets: 0, matchesPlayed: 4,
    careerGoals: 78, careerCaps: 42,
    marketValue: "€100M", fifaRating: 87,
    honors: "2× UCL winner · La Liga champion",
    bio: "An electric and versatile attacker who delivers in the biggest moments, Rodrygo is Brazil's heir apparent.",
    star: false, group: "C",
  },
  {
    name: "Casemiro", fullName: "Carlos Henrique Casimiro",
    country: "Brazil", iso2: "br", pos: "Midfielder", posGroup: "MID",
    club: "Manchester United", number: 18, age: 34, height: "1.85 m", foot: "Right",
    goals: 1, assists: 1, rating: 7.7, cleanSheets: 0, matchesPlayed: 3,
    careerGoals: 44, careerCaps: 82,
    marketValue: "€20M", fifaRating: 84,
    honors: "5× UCL winner · La Liga champion · Copa América winner",
    bio: "The defensive cornerstone of Brazil's midfield, Casemiro's interception and composure are world-class.",
    star: false, group: "C",
  },
  {
    name: "Marquinhos", fullName: "Marcos Aoás Corrêa",
    country: "Brazil", iso2: "br", pos: "Centre-Back", posGroup: "DEF",
    club: "Paris Saint-Germain", number: 5, age: 31, height: "1.83 m", foot: "Right",
    goals: 0, assists: 1, rating: 7.9, cleanSheets: 0, matchesPlayed: 3,
    careerGoals: 23, careerCaps: 85,
    marketValue: "€35M", fifaRating: 86,
    honors: "Brazil captain · Ligue 1 champion multiple times",
    bio: "Brazil's composed and elegant captain, Marquinhos reads the game brilliantly and leads by example.",
    star: false, group: "C",
  },
  {
    name: "Alisson Becker", country: "Brazil", iso2: "br", pos: "Goalkeeper", posGroup: "GK",
    club: "Liverpool", number: 1, age: 33, height: "1.91 m", foot: "Right",
    goals: 0, assists: 0, rating: 7.9, cleanSheets: 2, matchesPlayed: 3,
    careerGoals: 2, careerCaps: 78,
    image: TH + "yi6dt21746034945.jpg", cutout: CO + "8amq961757087569.png",
    marketValue: "€30M", fifaRating: 89,
    honors: "UCL winner · Premier League champion · Copa América winner",
    bio: "Arguably the world's best goalkeeper, Alisson's distribution and shot-stopping are in a class of their own.",
    star: false, group: "C",
  },
  // Morocco
  {
    name: "Achraf Hakimi", country: "Morocco", iso2: "ma", pos: "Right-Back", posGroup: "DEF",
    club: "Paris Saint-Germain", number: 2, age: 27, height: "1.81 m", foot: "Right",
    goals: 2, assists: 3, rating: 8.2, cleanSheets: 0, matchesPlayed: 4,
    careerGoals: 33, careerCaps: 93,
    image: TH + "lwhwh71770216476.jpg", cutout: CO + "oqu69c1766335243.png",
    marketValue: "€65M", fifaRating: 86,
    honors: "2022 WC semi-finalist · UCL winner · Serie A champion",
    bio: "The world's best right-back, Hakimi combines electric pace, precise crossing and clinical finishing.",
    star: true, group: "C",
  },
  {
    name: "Hakim Ziyech", country: "Morocco", iso2: "ma", pos: "Winger", posGroup: "FWD",
    club: "Galatasaray", number: 10, age: 32, height: "1.81 m", foot: "Left",
    goals: 2, assists: 3, rating: 7.9, cleanSheets: 0, matchesPlayed: 3,
    careerGoals: 52, careerCaps: 61,
    marketValue: "€6M", fifaRating: 81,
    honors: "2022 WC semi-finalist · UEFA Europa League finalist",
    bio: "Elegant, creative and technically gifted, Ziyech's left foot and vision unlock defences at the highest level.",
    star: false, group: "C",
  },
  {
    name: "Youssef En-Nesyri", country: "Morocco", iso2: "ma", pos: "Striker", posGroup: "FWD",
    club: "Fenerbahçe", number: 9, age: 28, height: "1.89 m", foot: "Right",
    goals: 3, assists: 1, rating: 7.8, cleanSheets: 0, matchesPlayed: 3,
    careerGoals: 88, careerCaps: 70,
    marketValue: "€12M", fifaRating: 80,
    honors: "2022 WC semi-finalist · La Liga top scorer",
    bio: "A powerful and aerially dominant striker whose goals powered Morocco to unprecedented WC heights in 2022.",
    star: false, group: "C",
  },
  // Scotland
  {
    name: "Andrew Robertson", country: "Scotland", iso2: "gb-sct", pos: "Left-Back", posGroup: "DEF",
    club: "Liverpool", number: 3, age: 32, height: "1.78 m", foot: "Left",
    goals: 1, assists: 3, rating: 8.0, cleanSheets: 0, matchesPlayed: 3,
    careerGoals: 12, careerCaps: 82,
    marketValue: "€18M", fifaRating: 84,
    honors: "Scotland captain · UCL winner · PL champion",
    bio: "Scotland's tireless captain, Robertson's energy and crossing ability make him among the world's best full-backs.",
    star: false, group: "C",
  },
  {
    name: "Scott McTominay", country: "Scotland", iso2: "gb-sct", pos: "Midfielder", posGroup: "MID",
    club: "Napoli", number: 42, age: 28, height: "1.91 m", foot: "Right",
    goals: 4, assists: 2, rating: 8.1, cleanSheets: 0, matchesPlayed: 3,
    careerGoals: 31, careerCaps: 60,
    marketValue: "€30M", fifaRating: 82,
    honors: "PL winner · Serie A champion",
    bio: "Scotland's late-game hero and talismanic goalscorer, McTominay delivers crucial goals in pivotal moments.",
    star: false, group: "C",
  },

  // ─── GROUP D ─────────────────────────────────────────────────────────────────
  // USA
  {
    name: "Christian Pulisic", country: "USA", iso2: "us", pos: "Winger", posGroup: "FWD",
    club: "AC Milan", number: 10, age: 27, height: "1.77 m", foot: "Right",
    goals: 4, assists: 3, rating: 8.0, cleanSheets: 0, matchesPlayed: 4,
    careerGoals: 78, careerCaps: 75,
    marketValue: "€40M", fifaRating: 84,
    honors: "USA captain · UCL winner · Serie A star",
    bio: "America's most talented footballer, Pulisic combines pace, dribbling and end product at the highest level.",
    star: false, group: "D",
  },
  {
    name: "Weston McKennie", country: "USA", iso2: "us", pos: "Midfielder", posGroup: "MID",
    club: "Juventus", number: 8, age: 27, height: "1.84 m", foot: "Right",
    goals: 2, assists: 2, rating: 7.8, cleanSheets: 0, matchesPlayed: 4,
    careerGoals: 24, careerCaps: 72,
    marketValue: "€18M", fifaRating: 80,
    honors: "Coppa Italia winner · DFB-Pokal finalist",
    bio: "A dynamic and energetic midfielder, McKennie's pressing, driving runs and goals give the USA real midfield bite.",
    star: false, group: "D",
  },
  {
    name: "Tyler Adams", country: "USA", iso2: "us", pos: "Midfielder", posGroup: "MID",
    club: "AFC Bournemouth", number: 4, age: 26, height: "1.77 m", foot: "Right",
    goals: 0, assists: 2, rating: 7.7, cleanSheets: 0, matchesPlayed: 3,
    careerGoals: 5, careerCaps: 63,
    marketValue: "€18M", fifaRating: 80,
    honors: "Bundesliga champion · CONCACAF Nations League",
    bio: "The USA's defensive heartbeat, Adams intercepts danger effortlessly and distributes with clarity.",
    star: false, group: "D",
  },
  // Türkiye
  {
    name: "Hakan Çalhanoğlu", country: "Türkiye", iso2: "tr", pos: "Midfielder", posGroup: "MID",
    club: "Inter", number: 10, age: 31, height: "1.79 m", foot: "Left",
    goals: 3, assists: 3, rating: 8.2, cleanSheets: 0, matchesPlayed: 3,
    careerGoals: 57, careerCaps: 82,
    marketValue: "€45M", fifaRating: 86,
    honors: "Türkiye captain · Serie A champion · UCL finalist",
    bio: "A technically exceptional deep playmaker, Çalhanoğlu's passing range and set-piece delivery are world-class.",
    star: false, group: "D",
  },
  {
    name: "Arda Güler", country: "Türkiye", iso2: "tr", pos: "Midfielder", posGroup: "MID",
    club: "Real Madrid", number: 15, age: 20, height: "1.76 m", foot: "Left",
    goals: 2, assists: 3, rating: 8.0, cleanSheets: 0, matchesPlayed: 3,
    careerGoals: 18, careerCaps: 31,
    marketValue: "€70M", fifaRating: 84,
    honors: "La Liga champion · Turkish young player of the year",
    bio: "Turkey's teenage prodigy at Real Madrid, Güler's vision, skill and technique mark him as a future superstar.",
    star: false, group: "D",
  },
  // Paraguay
  {
    name: "Miguel Almirón", country: "Paraguay", iso2: "py", pos: "Midfielder", posGroup: "MID",
    club: "Newcastle United", number: 10, age: 31, height: "1.74 m", foot: "Right",
    goals: 2, assists: 2, rating: 7.8, cleanSheets: 0, matchesPlayed: 3,
    careerGoals: 42, careerCaps: 64,
    marketValue: "€12M", fifaRating: 80,
    honors: "MLS Cup winner · St James' Park fan favourite",
    bio: "A relentless and creative midfielder, Almirón's energy and goals make him Paraguay's most dangerous attacker.",
    star: false, group: "D",
  },
  // Australia
  {
    name: "Mathew Leckie", country: "Australia", iso2: "au", pos: "Winger", posGroup: "FWD",
    club: "Melbourne City", number: 7, age: 34, height: "1.80 m", foot: "Right",
    goals: 2, assists: 1, rating: 7.6, cleanSheets: 0, matchesPlayed: 3,
    careerGoals: 28, careerCaps: 87,
    marketValue: "€1M", fifaRating: 77,
    honors: "2022 WC Round of 16 · A-League champion",
    bio: "Australia's hero of the 2022 World Cup, Leckie's winning goal against Denmark is etched in Socceroo history.",
    star: false, group: "D",
  },

  // ─── GROUP E ─────────────────────────────────────────────────────────────────
  // Germany
  {
    name: "Florian Wirtz", country: "Germany", iso2: "de", pos: "Midfielder", posGroup: "MID",
    club: "Bayer Leverkusen", number: 10, age: 22, height: "1.76 m", foot: "Both",
    goals: 3, assists: 5, rating: 8.6, cleanSheets: 0, matchesPlayed: 4,
    careerGoals: 56, careerCaps: 28,
    marketValue: "€130M", fifaRating: 88,
    honors: "Bundesliga champion (invincible season) · DFB-Pokal winner",
    bio: "Germany's most elegant creator, Wirtz combines exceptional technique with football intelligence beyond his years.",
    star: false, group: "E",
  },
  {
    name: "Kai Havertz", country: "Germany", iso2: "de", pos: "Forward", posGroup: "FWD",
    club: "Arsenal", number: 29, age: 26, height: "1.90 m", foot: "Right",
    goals: 3, assists: 2, rating: 8.0, cleanSheets: 0, matchesPlayed: 4,
    careerGoals: 84, careerCaps: 58,
    marketValue: "€70M", fifaRating: 85,
    honors: "UCL winner with Chelsea · La Liga experience",
    bio: "A tall and technically gifted forward, Havertz's intelligent movement and big-game finishing set him apart.",
    star: false, group: "E",
  },
  {
    name: "Joshua Kimmich", country: "Germany", iso2: "de", pos: "Midfielder", posGroup: "MID",
    club: "Bayern Munich", number: 6, age: 31, height: "1.77 m", foot: "Right",
    goals: 2, assists: 4, rating: 8.3, cleanSheets: 0, matchesPlayed: 4,
    careerGoals: 48, careerCaps: 93,
    marketValue: "€60M", fifaRating: 89,
    honors: "7× Bundesliga champion · UCL winner · Nations League winner",
    bio: "Germany's most complete midfielder, Kimmich's passing, pressing and leadership are the backbone of his teams.",
    star: false, group: "E",
  },
  {
    name: "Antonio Rüdiger", country: "Germany", iso2: "de", pos: "Centre-Back", posGroup: "DEF",
    club: "Real Madrid", number: 22, age: 32, height: "1.90 m", foot: "Right",
    goals: 1, assists: 0, rating: 8.1, cleanSheets: 0, matchesPlayed: 4,
    careerGoals: 18, careerCaps: 68,
    marketValue: "€25M", fifaRating: 86,
    honors: "UCL winner · La Liga champion · PL winner",
    bio: "An imposing and aggressive centre-back, Rüdiger's physicality and determination intimidate the world's best strikers.",
    star: false, group: "E",
  },
  // Ecuador
  {
    name: "Moisés Caicedo", country: "Ecuador", iso2: "ec", pos: "Midfielder", posGroup: "MID",
    club: "Chelsea", number: 25, age: 24, height: "1.77 m", foot: "Right",
    goals: 1, assists: 2, rating: 8.0, cleanSheets: 0, matchesPlayed: 3,
    careerGoals: 7, careerCaps: 55,
    marketValue: "€90M", fifaRating: 85,
    honors: "Ecuador star · PL record signing",
    bio: "Ecuador's midfield powerhouse, Caicedo's energy, skill and physicality have made him among PL's finest.",
    star: false, group: "E",
  },
  {
    name: "Enner Valencia", country: "Ecuador", iso2: "ec", pos: "Striker", posGroup: "FWD",
    club: "Fenerbahçe", number: 13, age: 35, height: "1.75 m", foot: "Right",
    goals: 3, assists: 1, rating: 7.7, cleanSheets: 0, matchesPlayed: 3,
    careerGoals: 83, careerCaps: 93,
    marketValue: "€2M", fifaRating: 78,
    honors: "Ecuador all-time top scorer · 2× WC top scorer for Ecuador",
    bio: "La Máquina, Valencia's lethal finishing and work rate have made him Ecuador's greatest-ever goalscorer.",
    star: false, group: "E",
  },
  // Ivory Coast
  {
    name: "Franck Kessié", country: "Ivory Coast", iso2: "ci", pos: "Midfielder", posGroup: "MID",
    club: "Al-Ahli", number: 79, age: 29, height: "1.83 m", foot: "Right",
    goals: 2, assists: 1, rating: 7.8, cleanSheets: 0, matchesPlayed: 3,
    careerGoals: 37, careerCaps: 71,
    marketValue: "€10M", fifaRating: 82,
    honors: "Serie A champion · AFCON finalist",
    bio: "A powerful midfield box-to-box engine, Kessié wins the ball, distributes quickly and contributes goals.",
    star: false, group: "E",
  },
  {
    name: "Simon Adingra", country: "Ivory Coast", iso2: "ci", pos: "Winger", posGroup: "FWD",
    club: "Brighton", number: 14, age: 23, height: "1.72 m", foot: "Right",
    goals: 3, assists: 2, rating: 7.9, cleanSheets: 0, matchesPlayed: 3,
    careerGoals: 22, careerCaps: 38,
    marketValue: "€30M", fifaRating: 80,
    honors: "AFCON 2023 winner · PL rising star",
    bio: "The breakout star of AFCON 2023, Adingra's acceleration and finishing powered Ivory Coast to continental glory.",
    star: false, group: "E",
  },

  // ─── GROUP F ─────────────────────────────────────────────────────────────────
  // Netherlands
  {
    name: "Virgil van Dijk", country: "Netherlands", iso2: "nl", pos: "Centre-Back", posGroup: "DEF",
    club: "Liverpool", number: 4, age: 34, height: "1.93 m", foot: "Right",
    goals: 1, assists: 1, rating: 8.0, cleanSheets: 0, matchesPlayed: 3,
    careerGoals: 47, careerCaps: 83,
    marketValue: "€20M", fifaRating: 87,
    honors: "UCL winner · PL champion · 2019 UCL final MVP",
    bio: "One of the most dominant defenders in football history, van Dijk's composure and leadership are unparalleled.",
    star: false, group: "F",
  },
  {
    name: "Cody Gakpo", country: "Netherlands", iso2: "nl", pos: "Forward", posGroup: "FWD",
    club: "Liverpool", number: 18, age: 26, height: "1.89 m", foot: "Right",
    goals: 3, assists: 3, rating: 8.1, cleanSheets: 0, matchesPlayed: 3,
    careerGoals: 52, careerCaps: 50,
    marketValue: "€70M", fifaRating: 84,
    honors: "Eredivisie champion · PL top scorer contender",
    bio: "A tall and technically gifted forward, Gakpo's smart movement, link-up play and goals light up big stages.",
    star: false, group: "F",
  },
  {
    name: "Xavi Simons", country: "Netherlands", iso2: "nl", pos: "Midfielder", posGroup: "MID",
    club: "Paris Saint-Germain", number: 6, age: 23, height: "1.73 m", foot: "Right",
    goals: 3, assists: 4, rating: 8.3, cleanSheets: 0, matchesPlayed: 3,
    careerGoals: 37, careerCaps: 31,
    marketValue: "€80M", fifaRating: 85,
    honors: "Bundesliga Golden Boot contender · Ligue 1 champion",
    bio: "Barcelona-trained and technically brilliant, Simons has emerged as one of Europe's most exciting young talents.",
    star: false, group: "F",
  },
  // Japan
  {
    name: "Daichi Kamada", country: "Japan", iso2: "jp", pos: "Midfielder", posGroup: "MID",
    club: "Crystal Palace", number: 29, age: 28, height: "1.80 m", foot: "Right",
    goals: 3, assists: 4, rating: 8.0, cleanSheets: 0, matchesPlayed: 3,
    careerGoals: 58, careerCaps: 51,
    marketValue: "€20M", fifaRating: 82,
    honors: "Europa League finalist · Bundesliga goals record for Japanese",
    bio: "Japan's midfield maestro whose eye for goal and technical class have made him a consistent European performer.",
    star: false, group: "F",
  },
  {
    name: "Ritsu Doan", country: "Japan", iso2: "jp", pos: "Winger", posGroup: "FWD",
    club: "Freiburg", number: 17, age: 27, height: "1.72 m", foot: "Both",
    goals: 3, assists: 2, rating: 7.9, cleanSheets: 0, matchesPlayed: 3,
    careerGoals: 44, careerCaps: 55,
    marketValue: "€15M", fifaRating: 80,
    honors: "2022 WC Germany shock · Bundesliga performer",
    bio: "A direct and confident winger, Doan's goals against Germany and Spain in 2022 made him a national hero.",
    star: false, group: "F",
  },
  // Sweden
  {
    name: "Alexander Isak", country: "Sweden", iso2: "se", pos: "Striker", posGroup: "FWD",
    club: "Newcastle United", number: 14, age: 26, height: "1.92 m", foot: "Right",
    goals: 4, assists: 2, rating: 8.1, cleanSheets: 0, matchesPlayed: 3,
    careerGoals: 92, careerCaps: 44,
    marketValue: "€90M", fifaRating: 86,
    honors: "PL top scorer contender · La Real standout",
    bio: "A tall, rapid and technical striker, Isak's combination of pace and exceptional first touch makes him elite.",
    star: false, group: "F",
  },
  {
    name: "Dejan Kulusevski", country: "Sweden", iso2: "se", pos: "Winger", posGroup: "FWD",
    club: "Tottenham", number: 21, age: 25, height: "1.86 m", foot: "Right",
    goals: 3, assists: 4, rating: 8.0, cleanSheets: 0, matchesPlayed: 3,
    careerGoals: 48, careerCaps: 40,
    marketValue: "€50M", fifaRating: 83,
    honors: "Serie A champion · PL top performer",
    bio: "An aggressive winger with brilliant technique and a nose for goal, Kulusevski is Sweden's most complete attacker.",
    star: false, group: "F",
  },
  // Tunisia
  {
    name: "Ellyes Skhiri", country: "Tunisia", iso2: "tn", pos: "Midfielder", posGroup: "MID",
    club: "Eintracht Frankfurt", number: 29, age: 30, height: "1.82 m", foot: "Right",
    goals: 1, assists: 2, rating: 7.6, cleanSheets: 0, matchesPlayed: 3,
    careerGoals: 11, careerCaps: 58,
    marketValue: "€12M", fifaRating: 79,
    honors: "Bundesliga performer · AFCON runner-up",
    bio: "Tunisia's engine in midfield, Skhiri combines tenacious pressing with calm distribution.",
    star: false, group: "F",
  },

  // ─── GROUP G ─────────────────────────────────────────────────────────────────
  // Belgium
  {
    name: "Kevin De Bruyne", country: "Belgium", iso2: "be", pos: "Midfielder", posGroup: "MID",
    club: "Napoli", number: 17, age: 34, height: "1.81 m", foot: "Right",
    goals: 1, assists: 4, rating: 8.5, cleanSheets: 0, matchesPlayed: 4,
    careerGoals: 89, careerCaps: 107,
    image: THW + "627wh81779038446.jpg", cutout: CO + "o4flia1764089447.png",
    marketValue: "€15M", fifaRating: 89,
    honors: "6× PL champion · UCL winner · 6× PL player of the season",
    bio: "One of the finest passers in football history, De Bruyne's vision and creativity define attacking midfield play.",
    star: false, group: "G",
  },
  {
    name: "Thibaut Courtois", country: "Belgium", iso2: "be", pos: "Goalkeeper", posGroup: "GK",
    club: "Real Madrid", number: 1, age: 33, height: "1.99 m", foot: "Left",
    goals: 0, assists: 0, rating: 8.1, cleanSheets: 3, matchesPlayed: 4,
    careerGoals: 0, careerCaps: 105,
    image: THW + "54zonn1779039115.jpg", cutout: CO + "592mar1733653475.png",
    marketValue: "€20M", fifaRating: 90,
    honors: "UCL winner · 2018 WC Golden Glove · La Liga champion",
    bio: "Belgium's towering last line of defence, Courtois's reflexes, shot-stopping and distribution are world-class.",
    star: false, group: "G",
  },
  {
    name: "Romelu Lukaku", country: "Belgium", iso2: "be", pos: "Striker", posGroup: "FWD",
    club: "Napoli", number: 9, age: 32, height: "1.90 m", foot: "Right",
    goals: 4, assists: 2, rating: 7.9, cleanSheets: 0, matchesPlayed: 4,
    careerGoals: 341, careerCaps: 119,
    marketValue: "€12M", fifaRating: 83,
    honors: "Belgium all-time top scorer · Serie A champion with Inter",
    bio: "A physically dominant striker, Lukaku's combination of power, pace and prolific scoring is formidable.",
    star: false, group: "G",
  },
  // Egypt
  {
    name: "Mohamed Salah", country: "Egypt", iso2: "eg", pos: "Forward", posGroup: "FWD",
    club: "Liverpool", number: 10, age: 33, height: "1.75 m", foot: "Left",
    goals: 5, assists: 3, rating: 8.6, cleanSheets: 0, matchesPlayed: 4,
    careerGoals: 372, careerCaps: 98,
    image: TH + "o7y57t1718438615.jpg", cutout: CO + "3blc581757088735.png",
    marketValue: "€30M", fifaRating: 89,
    honors: "UCL winner · PL champion · 4× PL Golden Boot",
    bio: "Africa's greatest player of his era, Salah's relentless goal-scoring and assist-making at Liverpool are legendary.",
    star: false, group: "G",
  },
  {
    name: "Mostafa Mohamed", country: "Egypt", iso2: "eg", pos: "Striker", posGroup: "FWD",
    club: "Galatasaray", number: 9, age: 27, height: "1.90 m", foot: "Right",
    goals: 2, assists: 1, rating: 7.5, cleanSheets: 0, matchesPlayed: 3,
    careerGoals: 47, careerCaps: 52,
    marketValue: "€8M", fifaRating: 78,
    honors: "Turkish Super Lig champion · Egypt U23 star",
    bio: "A powerful and imposing target striker, Mostafa Mohamed offers Egypt an aerial threat in the final third.",
    star: false, group: "G",
  },
  // Iran
  {
    name: "Mehdi Taremi", country: "Iran", iso2: "ir", pos: "Striker", posGroup: "FWD",
    club: "Inter", number: 99, age: 33, height: "1.87 m", foot: "Both",
    goals: 3, assists: 1, rating: 7.7, cleanSheets: 0, matchesPlayed: 3,
    careerGoals: 98, careerCaps: 94,
    marketValue: "€12M", fifaRating: 81,
    honors: "Iran top scorer · Serie A champion",
    bio: "A technically brilliant striker with superb movement and finishing, Taremi is Iran's talisman and leading goalscorer.",
    star: false, group: "G",
  },
  {
    name: "Sardar Azmoun", country: "Iran", iso2: "ir", pos: "Forward", posGroup: "FWD",
    club: "Bayer Leverkusen", number: 7, age: 30, height: "1.87 m", foot: "Left",
    goals: 2, assists: 2, rating: 7.6, cleanSheets: 0, matchesPlayed: 3,
    careerGoals: 68, careerCaps: 78,
    marketValue: "€10M", fifaRating: 80,
    honors: "Bundesliga champion · Gazprom Golden Boot",
    bio: "A graceful attacker blessed with technical skill and a powerful shot, Azmoun is Iran's most complete forward.",
    star: false, group: "G",
  },
  // New Zealand
  {
    name: "Chris Wood", country: "New Zealand", iso2: "nz", pos: "Striker", posGroup: "FWD",
    club: "Nottingham Forest", number: 11, age: 34, height: "1.91 m", foot: "Right",
    goals: 2, assists: 0, rating: 7.4, cleanSheets: 0, matchesPlayed: 3,
    careerGoals: 152, careerCaps: 83,
    marketValue: "€5M", fifaRating: 77,
    honors: "New Zealand all-time top scorer · PL survival hero",
    bio: "New Zealand's all-time leading scorer, Wood's aerial ability and strength make him a constant danger.",
    star: false, group: "G",
  },

  // ─── GROUP H ─────────────────────────────────────────────────────────────────
  // Spain
  {
    name: "Pedri", fullName: "Pedro González López",
    country: "Spain", iso2: "es", pos: "Midfielder", posGroup: "MID",
    club: "Barcelona", number: 8, age: 23, height: "1.74 m", foot: "Right",
    goals: 1, assists: 3, rating: 8.4, cleanSheets: 0, matchesPlayed: 4,
    careerGoals: 31, careerCaps: 37,
    image: TH + "ejirdp1771259784.jpg", cutout: CO + "82xtuu1726509836.png",
    marketValue: "€120M", fifaRating: 88,
    honors: "Euro 2024 winner · 2021 Golden Boy · La Liga champion",
    bio: "Spain's midfield maestro whose precise passing and intelligent movement echo the great Barcelona traditions.",
    star: true, group: "H",
  },
  {
    name: "Álvaro Morata", country: "Spain", iso2: "es", pos: "Striker", posGroup: "FWD",
    club: "AC Milan", number: 7, age: 33, height: "1.87 m", foot: "Right",
    goals: 3, assists: 2, rating: 7.8, cleanSheets: 0, matchesPlayed: 4,
    careerGoals: 175, careerCaps: 96,
    marketValue: "€10M", fifaRating: 80,
    honors: "Euro 2024 winner · Spain captain · Serie A experience",
    bio: "Spain's faithful captain, Morata's selfless movement, aerial ability and big-game temperament prove his worth.",
    star: false, group: "H",
  },
  {
    name: "Dani Carvajal", country: "Spain", iso2: "es", pos: "Right-Back", posGroup: "DEF",
    club: "Real Madrid", number: 2, age: 33, height: "1.73 m", foot: "Right",
    goals: 2, assists: 2, rating: 8.1, cleanSheets: 0, matchesPlayed: 3,
    careerGoals: 17, careerCaps: 55,
    marketValue: "€15M", fifaRating: 86,
    honors: "5× UCL winner · Euro 2024 winner · Euro 2024 Player of Tournament",
    bio: "Spain's World Cup-winning right-back, Carvajal's recovery pace and attacking contribution are unmatched at his level.",
    star: false, group: "H",
  },
  // Uruguay
  {
    name: "Federico Valverde", country: "Uruguay", iso2: "uy", pos: "Midfielder", posGroup: "MID",
    club: "Real Madrid", number: 15, age: 26, height: "1.82 m", foot: "Right",
    goals: 3, assists: 3, rating: 8.3, cleanSheets: 0, matchesPlayed: 4,
    careerGoals: 34, careerCaps: 66,
    marketValue: "€120M", fifaRating: 87,
    honors: "2× UCL winner · La Liga champion",
    bio: "A complete midfielder blessed with pace, power and technique, Valverde is Real Madrid and Uruguay's engine.",
    star: false, group: "H",
  },
  {
    name: "Darwin Núñez", country: "Uruguay", iso2: "uy", pos: "Striker", posGroup: "FWD",
    club: "Liverpool", number: 9, age: 26, height: "1.87 m", foot: "Right",
    goals: 3, assists: 2, rating: 7.9, cleanSheets: 0, matchesPlayed: 4,
    careerGoals: 67, careerCaps: 44,
    marketValue: "€65M", fifaRating: 83,
    honors: "Portuguese champion · PL top scorer contender",
    bio: "Raw, powerful and explosive, Núñez's pace and aggression offer Uruguay and Liverpool a truly unique threat.",
    star: false, group: "H",
  },
  {
    name: "Ronald Araújo", country: "Uruguay", iso2: "uy", pos: "Centre-Back", posGroup: "DEF",
    club: "Barcelona", number: 4, age: 26, height: "1.88 m", foot: "Right",
    goals: 1, assists: 0, rating: 8.1, cleanSheets: 0, matchesPlayed: 3,
    careerGoals: 9, careerCaps: 46,
    marketValue: "€60M", fifaRating: 85,
    honors: "La Liga champion · Copa del Rey winner",
    bio: "One of the best defenders in world football, Araújo combines ferocious physicality with surprising composure.",
    star: false, group: "H",
  },
  // Saudi Arabia
  {
    name: "Salem Al-Dawsari", country: "Saudi Arabia", iso2: "sa", pos: "Winger", posGroup: "FWD",
    club: "Al-Hilal", number: 10, age: 33, height: "1.67 m", foot: "Left",
    goals: 2, assists: 2, rating: 7.6, cleanSheets: 0, matchesPlayed: 3,
    careerGoals: 33, careerCaps: 89,
    marketValue: "€4M", fifaRating: 78,
    honors: "Saudi Pro League champion · 2022 WC hero vs Argentina",
    bio: "Saudi Arabia's inspirational winger whose goal against Messi's Argentina was one of 2022's biggest shocks.",
    star: false, group: "H",
  },

  // ─── GROUP I ─────────────────────────────────────────────────────────────────
  // France
  {
    name: "Antoine Griezmann", country: "France", iso2: "fr", pos: "Forward", posGroup: "FWD",
    club: "Atlético Madrid", number: 7, age: 35, height: "1.76 m", foot: "Left",
    goals: 3, assists: 4, rating: 8.2, cleanSheets: 0, matchesPlayed: 4,
    careerGoals: 304, careerCaps: 142,
    marketValue: "€15M", fifaRating: 85,
    honors: "2018 World Cup winner · Euro 2016 finalist · 2× La Liga champion",
    bio: "France's most decorated attacker after Mbappé, Griezmann's intelligence and positioning make him world-class.",
    star: false, group: "I",
  },
  {
    name: "Aurélien Tchouaméni", country: "France", iso2: "fr", pos: "Midfielder", posGroup: "MID",
    club: "Real Madrid", number: 8, age: 25, height: "1.88 m", foot: "Right",
    goals: 1, assists: 2, rating: 8.1, cleanSheets: 0, matchesPlayed: 4,
    careerGoals: 14, careerCaps: 44,
    marketValue: "€80M", fifaRating: 86,
    honors: "2022 WC finalist · UCL winner · La Liga champion",
    bio: "A physically imposing and technically gifted midfielder, Tchouaméni controls games with authority and calm.",
    star: false, group: "I",
  },
  {
    name: "William Saliba", country: "France", iso2: "fr", pos: "Centre-Back", posGroup: "DEF",
    club: "Arsenal", number: 12, age: 24, height: "1.92 m", foot: "Right",
    goals: 0, assists: 1, rating: 8.2, cleanSheets: 0, matchesPlayed: 4,
    careerGoals: 4, careerCaps: 31,
    marketValue: "€100M", fifaRating: 87,
    honors: "2022 WC finalist · PL Young Player nominations",
    bio: "A towering and commanding centre-back, Saliba's calmness on the ball and reading of the game are exceptional.",
    star: false, group: "I",
  },
  {
    name: "Theo Hernández", country: "France", iso2: "fr", pos: "Left-Back", posGroup: "DEF",
    club: "AC Milan", number: 19, age: 27, height: "1.84 m", foot: "Left",
    goals: 1, assists: 3, rating: 8.0, cleanSheets: 0, matchesPlayed: 4,
    careerGoals: 24, careerCaps: 31,
    marketValue: "€60M", fifaRating: 85,
    honors: "Serie A champion · 2022 WC finalist",
    bio: "An attacking left-back with exceptional pace and delivery, Hernández is one of the most dynamic full-backs in football.",
    star: false, group: "I",
  },
  // Senegal
  {
    name: "Sadio Mané", country: "Senegal", iso2: "sn", pos: "Forward", posGroup: "FWD",
    club: "Al Nassr", number: 10, age: 34, height: "1.75 m", foot: "Left",
    goals: 3, assists: 2, rating: 8.0, cleanSheets: 0, matchesPlayed: 3,
    careerGoals: 285, careerCaps: 101,
    marketValue: "€8M", fifaRating: 83,
    honors: "UCL winner · PL champion · AFCON 2022 winner",
    bio: "Africa's most electrifying forward of his generation, Mané's pace, directness and goals define Senegal.",
    star: false, group: "I",
  },
  {
    name: "Kalidou Koulibaly", country: "Senegal", iso2: "sn", pos: "Centre-Back", posGroup: "DEF",
    club: "Al-Hilal", number: 5, age: 34, height: "1.87 m", foot: "Right",
    goals: 0, assists: 1, rating: 7.8, cleanSheets: 0, matchesPlayed: 3,
    careerGoals: 12, careerCaps: 80,
    marketValue: "€5M", fifaRating: 83,
    honors: "Senegal captain · AFCON 2022 winner · Serie A star",
    bio: "A commanding and powerful centre-back, Koulibaly was for years considered the best defender in Serie A.",
    star: false, group: "I",
  },
  {
    name: "Ismaila Sarr", country: "Senegal", iso2: "sn", pos: "Winger", posGroup: "FWD",
    club: "Crystal Palace", number: 23, age: 27, height: "1.82 m", foot: "Right",
    goals: 2, assists: 2, rating: 7.7, cleanSheets: 0, matchesPlayed: 3,
    careerGoals: 41, careerCaps: 59,
    marketValue: "€20M", fifaRating: 80,
    honors: "AFCON winner · Ligue 1 standout",
    bio: "A powerfully built winger with frightening pace and an improving end product, Sarr terrorises any defence.",
    star: false, group: "I",
  },
  // Norway
  {
    name: "Martin Ødegaard", country: "Norway", iso2: "no", pos: "Midfielder", posGroup: "MID",
    club: "Arsenal", number: 8, age: 27, height: "1.78 m", foot: "Right",
    goals: 2, assists: 4, rating: 8.4, cleanSheets: 0, matchesPlayed: 4,
    careerGoals: 52, careerCaps: 62,
    marketValue: "€100M", fifaRating: 87,
    honors: "Arsenal captain · PL top performer · La Liga experience",
    bio: "A technically exceptional attacking midfielder, Ødegaard's vision, passing and leadership are elite-level.",
    star: false, group: "I",
  },

  // ─── GROUP J ─────────────────────────────────────────────────────────────────
  // Argentina
  {
    name: "Lautaro Martínez", country: "Argentina", iso2: "ar", pos: "Striker", posGroup: "FWD",
    club: "Inter", number: 22, age: 28, height: "1.74 m", foot: "Right",
    goals: 4, assists: 1, rating: 8.3, cleanSheets: 0, matchesPlayed: 4,
    careerGoals: 167, careerCaps: 65,
    image: TH + "y9j7e11719034723.jpg", cutout: CO + "vwxq811759408924.png",
    marketValue: "€90M", fifaRating: 87,
    honors: "2022 World Cup winner · Copa América top scorer",
    bio: "A prolific, intelligent and physical centre-forward, Martínez is the ideal partner for Messi in Argentina's attack.",
    star: true, group: "J",
  },
  {
    name: "Julián Álvarez", country: "Argentina", iso2: "ar", pos: "Forward", posGroup: "FWD",
    club: "Atlético Madrid", number: 9, age: 26, height: "1.70 m", foot: "Right",
    goals: 4, assists: 2, rating: 8.5, cleanSheets: 0, matchesPlayed: 4,
    careerGoals: 102, careerCaps: 46,
    image: TH + "rm3tj11741979331.jpg", cutout: CO + "91pla41762288186.png",
    marketValue: "€80M", fifaRating: 86,
    honors: "2022 World Cup winner · UCL winner with City",
    bio: "An industry and precision forward, Álvarez's relentless pressing, clever movement and finishing make him world-class.",
    star: true, group: "J",
  },
  {
    name: "Emiliano Martínez", country: "Argentina", iso2: "ar", pos: "Goalkeeper", posGroup: "GK",
    club: "Aston Villa", number: 23, age: 33, height: "1.95 m", foot: "Right",
    goals: 0, assists: 0, rating: 8.0, cleanSheets: 3, matchesPlayed: 4,
    careerGoals: 0, careerCaps: 47,
    image: TH + "7drp311770201331.jpg", cutout: CO + "ffr5xx1756984715.png",
    marketValue: "€30M", fifaRating: 88,
    honors: "2022 World Cup winner & Golden Glove · WC penalty hero",
    bio: "The hero of Argentina's penalty shootout wins, Dibu's psychological strength and shot-stopping are world-class.",
    star: false, group: "J",
  },
  {
    name: "Rodrigo De Paul", country: "Argentina", iso2: "ar", pos: "Midfielder", posGroup: "MID",
    club: "Atlético Madrid", number: 7, age: 31, height: "1.84 m", foot: "Right",
    goals: 2, assists: 4, rating: 8.1, cleanSheets: 0, matchesPlayed: 4,
    careerGoals: 34, careerCaps: 76,
    marketValue: "€30M", fifaRating: 84,
    honors: "2022 World Cup winner · Copa América winner",
    bio: "Argentina's midfield motor whose intensity, pressing and driving runs were central to their World Cup triumph.",
    star: false, group: "J",
  },
  // Austria
  {
    name: "David Alaba", country: "Austria", iso2: "at", pos: "Centre-Back", posGroup: "DEF",
    club: "Real Madrid", number: 4, age: 33, height: "1.80 m", foot: "Left",
    goals: 1, assists: 2, rating: 7.9, cleanSheets: 0, matchesPlayed: 3,
    careerGoals: 36, careerCaps: 105,
    marketValue: "€15M", fifaRating: 86,
    honors: "UCL winner · 10× Bundesliga champion · DFB-Pokal winner",
    bio: "A versatile defender of the highest class, Alaba's intelligence, composure and ability to play multiple positions are outstanding.",
    star: false, group: "J",
  },
  {
    name: "Marcel Sabitzer", country: "Austria", iso2: "at", pos: "Midfielder", posGroup: "MID",
    club: "Borussia Dortmund", number: 17, age: 31, height: "1.79 m", foot: "Right",
    goals: 2, assists: 3, rating: 7.8, cleanSheets: 0, matchesPlayed: 3,
    careerGoals: 49, careerCaps: 80,
    marketValue: "€15M", fifaRating: 82,
    honors: "Bundesliga top performer · Austria captain",
    bio: "An energetic and technically adept midfielder, Sabitzer's goals, runs and tenacity give Austria genuine quality.",
    star: false, group: "J",
  },
  // Algeria
  {
    name: "Riyad Mahrez", country: "Algeria", iso2: "dz", pos: "Winger", posGroup: "FWD",
    club: "Al-Ahli", number: 26, age: 34, height: "1.79 m", foot: "Left",
    goals: 3, assists: 2, rating: 7.9, cleanSheets: 0, matchesPlayed: 3,
    careerGoals: 219, careerCaps: 100,
    marketValue: "€5M", fifaRating: 82,
    honors: "PL champion · UCL winner · 2019 AFCON winner",
    bio: "Algeria's most technically gifted player, Mahrez's dribbling, creativity and big-game goals are legendary.",
    star: false, group: "J",
  },

  // ─── GROUP K ─────────────────────────────────────────────────────────────────
  // Portugal
  {
    name: "Cristiano Ronaldo", fullName: "Cristiano Ronaldo dos Santos Aveiro",
    country: "Portugal", iso2: "pt", pos: "Forward", posGroup: "FWD",
    club: "Al Nassr", number: 7, age: 41, height: "1.87 m", foot: "Right",
    goals: 4, assists: 1, rating: 8.2, cleanSheets: 0, matchesPlayed: 5,
    careerGoals: 937, careerCaps: 223,
    image: TH + "bkre241600892282.jpg", cutout: CO + "a19jje1761592498.png",
    marketValue: "€15M", fifaRating: 85,
    honors: "5× Ballon d'Or · Euro 2016 winner · all-time international top scorer",
    bio: "Football's all-time leading goalscorer, Ronaldo's incredible career spanning Real Madrid, Juventus and Manchester United is unmatched.",
    star: false, group: "K",
  },
  {
    name: "Bruno Fernandes", country: "Portugal", iso2: "pt", pos: "Midfielder", posGroup: "MID",
    club: "Manchester United", number: 8, age: 31, height: "1.79 m", foot: "Right",
    goals: 3, assists: 5, rating: 8.4, cleanSheets: 0, matchesPlayed: 4,
    careerGoals: 143, careerCaps: 77,
    image: THW + "1kfayc1700821747.jpg", cutout: CO + "jhasls1766826690.png",
    marketValue: "€60M", fifaRating: 86,
    honors: "Portugal captain · PL player of the season",
    bio: "Portugal's inspirational captain, Fernandes's passing range, goals from midfield and leadership are world-class.",
    star: true, group: "K",
  },
  {
    name: "Rafael Leão", country: "Portugal", iso2: "pt", pos: "Winger", posGroup: "FWD",
    club: "AC Milan", number: 10, age: 26, height: "1.88 m", foot: "Right",
    goals: 3, assists: 2, rating: 8.1, cleanSheets: 0, matchesPlayed: 4,
    careerGoals: 74, careerCaps: 43,
    image: TH + "m1sh9x1549742563.jpg", cutout: CO + "tlgrvf1758892567.png",
    marketValue: "€80M", fifaRating: 85,
    honors: "Serie A champion · Serie A Best Player",
    bio: "A left-footed winger of extraordinary pace and technique, Leão is one of the most exciting attackers in Europe.",
    star: true, group: "K",
  },
  {
    name: "Bernardo Silva", country: "Portugal", iso2: "pt", pos: "Midfielder", posGroup: "MID",
    club: "Manchester City", number: 20, age: 31, height: "1.73 m", foot: "Right",
    goals: 2, assists: 3, rating: 8.3, cleanSheets: 0, matchesPlayed: 4,
    careerGoals: 82, careerCaps: 89,
    marketValue: "€70M", fifaRating: 88,
    honors: "UCL winner · 4× PL champion · Nations League winner",
    bio: "An elegant and versatile midfielder of the highest quality, Bernardo Silva's pressing and technical quality are elite.",
    star: false, group: "K",
  },
  {
    name: "Rúben Dias", country: "Portugal", iso2: "pt", pos: "Centre-Back", posGroup: "DEF",
    club: "Manchester City", number: 3, age: 28, height: "1.87 m", foot: "Right",
    goals: 1, assists: 1, rating: 8.2, cleanSheets: 0, matchesPlayed: 4,
    careerGoals: 10, careerCaps: 62,
    marketValue: "€70M", fifaRating: 88,
    honors: "PL Player of the Season · 4× PL champion · UCL winner",
    bio: "One of the best centre-backs of his generation, Dias's leadership, composure and aerial ability are outstanding.",
    star: false, group: "K",
  },
  // Colombia
  {
    name: "Luis Díaz", country: "Colombia", iso2: "co", pos: "Winger", posGroup: "FWD",
    club: "Liverpool", number: 23, age: 28, height: "1.80 m", foot: "Left",
    goals: 4, assists: 3, rating: 8.2, cleanSheets: 0, matchesPlayed: 4,
    careerGoals: 76, careerCaps: 48,
    marketValue: "€70M", fifaRating: 84,
    honors: "Copa América 2024 winner · PL top performer",
    bio: "An electrifying winger of relentless energy, pace and an eye for spectacular goals, Díaz is South America's brightest.",
    star: false, group: "K",
  },
  {
    name: "James Rodríguez", country: "Colombia", iso2: "co", pos: "Midfielder", posGroup: "MID",
    club: "Rayo Vallecano", number: 10, age: 34, height: "1.80 m", foot: "Left",
    goals: 3, assists: 4, rating: 8.0, cleanSheets: 0, matchesPlayed: 3,
    careerGoals: 124, careerCaps: 101,
    marketValue: "€3M", fifaRating: 80,
    honors: "2014 WC Golden Boot · La Liga champion",
    bio: "A player of extraordinary footballing intelligence, James's left foot and playmaking ability are legendary.",
    star: false, group: "K",
  },

  // ─── GROUP L ─────────────────────────────────────────────────────────────────
  // England
  {
    name: "Harry Kane", country: "England", iso2: "gb-eng", pos: "Striker", posGroup: "FWD",
    club: "Bayern Munich", number: 9, age: 32, height: "1.88 m", foot: "Right",
    goals: 5, assists: 2, rating: 8.5, cleanSheets: 0, matchesPlayed: 5,
    careerGoals: 337, careerCaps: 98,
    image: TH + "0w9up71770542636.jpg", cutout: CO + "j4ouvd1756408895.png",
    marketValue: "€40M", fifaRating: 90,
    honors: "England all-time top scorer · 2018 WC Golden Boot",
    bio: "England's captain and all-time top scorer, Kane's goal-scoring excellence and link-up play are world-class.",
    star: true, group: "L",
  },
  {
    name: "Bukayo Saka", country: "England", iso2: "gb-eng", pos: "Winger", posGroup: "FWD",
    club: "Arsenal", number: 7, age: 24, height: "1.78 m", foot: "Left",
    goals: 3, assists: 4, rating: 8.4, cleanSheets: 0, matchesPlayed: 5,
    careerGoals: 87, careerCaps: 54,
    image: TH + "axl31b1769332282.jpg", cutout: CO + "xfwok41769331816.png",
    marketValue: "€150M", fifaRating: 87,
    honors: "Euro 2024 finalist · Arsenal's Mr Consistent",
    bio: "England's most reliable attacker, Saka's directness, creativity and composure under pressure are exceptional.",
    star: true, group: "L",
  },
  {
    name: "Phil Foden", country: "England", iso2: "gb-eng", pos: "Midfielder", posGroup: "MID",
    club: "Manchester City", number: 47, age: 26, height: "1.71 m", foot: "Left",
    goals: 3, assists: 4, rating: 8.3, cleanSheets: 0, matchesPlayed: 5,
    careerGoals: 86, careerCaps: 47,
    marketValue: "€120M", fifaRating: 88,
    honors: "6× PL champion · UCL winner · PL Player of the Season 2024",
    bio: "A technical genius raised in the Guardiola school, Foden's touch, vision and explosive finishing are sensational.",
    star: false, group: "L",
  },
  {
    name: "Declan Rice", country: "England", iso2: "gb-eng", pos: "Midfielder", posGroup: "MID",
    club: "Arsenal", number: 41, age: 26, height: "1.85 m", foot: "Right",
    goals: 2, assists: 3, rating: 8.2, cleanSheets: 0, matchesPlayed: 5,
    careerGoals: 26, careerCaps: 52,
    marketValue: "€100M", fifaRating: 87,
    honors: "Europa Conference League winner · PL title contender",
    bio: "England's defensive linchpin who has evolved into a dynamic, goal-contributing midfielder of the highest quality.",
    star: false, group: "L",
  },
  // Croatia
  {
    name: "Luka Modrić", country: "Croatia", iso2: "hr", pos: "Midfielder", posGroup: "MID",
    club: "Real Madrid", number: 10, age: 41, height: "1.72 m", foot: "Both",
    goals: 1, assists: 3, rating: 8.2, cleanSheets: 0, matchesPlayed: 4,
    careerGoals: 57, careerCaps: 176,
    marketValue: "€4M", fifaRating: 83,
    honors: "2018 WC finalist · 2018 Ballon d'Or · 6× UCL winner",
    bio: "Football's finest ever midfielder from a small nation, Modrić's vision, stamina and technique are timeless.",
    star: false, group: "L",
  },
  {
    name: "Mateo Kovačić", country: "Croatia", iso2: "hr", pos: "Midfielder", posGroup: "MID",
    club: "Manchester City", number: 8, age: 31, height: "1.79 m", foot: "Right",
    goals: 1, assists: 2, rating: 8.0, cleanSheets: 0, matchesPlayed: 4,
    careerGoals: 25, careerCaps: 104,
    marketValue: "€30M", fifaRating: 84,
    honors: "UCL winner · PL champion · 3× La Liga champion",
    bio: "A technically gifted midfielder renowned for his close control, acceleration and composure in tight spaces.",
    star: false, group: "L",
  },
  {
    name: "Joško Gvardiol", country: "Croatia", iso2: "hr", pos: "Centre-Back", posGroup: "DEF",
    club: "Manchester City", number: 24, age: 23, height: "1.85 m", foot: "Left",
    goals: 1, assists: 2, rating: 8.1, cleanSheets: 0, matchesPlayed: 3,
    careerGoals: 8, careerCaps: 38,
    marketValue: "€80M", fifaRating: 85,
    honors: "UCL finalist · PL champion · 2022 WC 3rd place",
    bio: "One of the most exciting young defenders in world football, Gvardiol's composure, pace and technique are elite.",
    star: false, group: "L",
  },
  // Ghana
  {
    name: "Mohammed Kudus", country: "Ghana", iso2: "gh", pos: "Midfielder", posGroup: "MID",
    club: "West Ham", number: 14, age: 25, height: "1.79 m", foot: "Right",
    goals: 4, assists: 3, rating: 8.1, cleanSheets: 0, matchesPlayed: 3,
    careerGoals: 43, careerCaps: 38,
    marketValue: "€45M", fifaRating: 83,
    honors: "Eredivisie champion · PL rising star",
    bio: "Ghana's creative and dynamic attacker whose skill, versatility and goal-scoring make him one of Africa's best.",
    star: false, group: "L",
  },
  {
    name: "Thomas Partey", country: "Ghana", iso2: "gh", pos: "Midfielder", posGroup: "MID",
    club: "Arsenal", number: 5, age: 32, height: "1.85 m", foot: "Right",
    goals: 1, assists: 2, rating: 7.8, cleanSheets: 0, matchesPlayed: 3,
    careerGoals: 22, careerCaps: 56,
    marketValue: "€20M", fifaRating: 83,
    honors: "Ghana captain · La Liga champion · Europa League winner",
    bio: "A dominant and athletic midfielder, Partey's ball-winning, physical presence and driving runs make Ghana tick.",
    star: false, group: "L",
  },
  // ─── EXTRA LEGACY LEADERS ───────────────────────────────────────────────────
  {
    name: "Pedri", fullName: "Pedro González López",
    country: "Spain", iso2: "es", pos: "Midfielder", posGroup: "MID",
    club: "Barcelona", number: 8, age: 23, height: "1.74 m", foot: "Right",
    goals: 1, assists: 3, rating: 8.4, cleanSheets: 0, matchesPlayed: 4,
    careerGoals: 31, careerCaps: 37,
    image: TH + "ejirdp1771259784.jpg", cutout: CO + "82xtuu1726509836.png",
    marketValue: "€120M", fifaRating: 88,
    honors: "Euro 2024 winner · 2021 Golden Boy · La Liga champion",
    bio: "Spain's midfield maestro whose precise passing and intelligent movement echo the great Barcelona traditions.",
    star: true, group: "H",
  },
];

import { extendedSeed } from "./players-extended";

// Deduplicate by name before slugifying
const allSeeds = [...seed, ...(extendedSeed as unknown as Seed[])];
const seen = new Set<string>();
const uniqueSeed = allSeeds.filter((p) => {
  if (seen.has(p.name)) return false;
  seen.add(p.name);
  return true;
});

export const players: PlayerPro[] = uniqueSeed.map((p) => ({
  ...p,
  slug: slugify(p.name),
}));

export const trendingPlayers = players.filter((p) => p.trending);
export const starPlayers = players.filter((p) => p.star);

export function getPlayer(slug: string) {
  return players.find((p) => p.slug === slug) ?? null;
}

export const leaders = {
  scorers:     [...players].sort((a, b) => b.goals - a.goals).slice(0, 5),
  assists:     [...players].sort((a, b) => b.assists - a.assists).slice(0, 5),
  cleanSheets: players.filter((p) => p.cleanSheets > 0).sort((a, b) => b.cleanSheets - a.cleanSheets).slice(0, 5),
  rated:       [...players].sort((a, b) => b.rating - a.rating).slice(0, 5),
};

export const countries  = Array.from(new Set(players.map((p) => p.country))).sort();
export const clubs      = Array.from(new Set(players.map((p) => p.club))).sort();
export const positions: PosGroup[] = ["GK", "DEF", "MID", "FWD"];

