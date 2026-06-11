# Visionary FIFA — World Cup 2026 Platform

A premium, dark, glassmorphism front-end for the FIFA World Cup 2026, built with
**Next.js 15 · TypeScript · Tailwind CSS · Framer Motion**.

> Demo project for a front-end showcase. Not affiliated with FIFA. Data is
> representative, not a live feed.

## ✨ Features

- **Home** — animated stadium hero, floating trophy, particle field, football
  light-trails, live countdown to the Final, plus Live Matches, AI Predictions,
  Upcoming Fixtures, Group Standings, Top Players, Latest News and animated
  Tournament Statistics.
- **Live Scores** (`/live-scores`) — live, upcoming and recent matches with a
  featured match-centre shortcut.
- **Match Centre** (`/match/[slug]`) — banner, live timeline (goals, cards, subs,
  VAR), animated stat bars (possession, xG, shots, corners, fouls, pass
  accuracy), head-to-head, team form, AI prediction and key players.
- **Standings & Stats** (`/standings`, `/schedule`) — tabbed hub: Standings
  (all 12 groups A–L), Schedule (Today / Tomorrow / This Week / Knockout) and
  Top Players (scorers, assists, clean sheets, ratings).
- **Predictions** (`/predictions`) and **News** (`/news`).

### Correct 2026 format
World Cup 2026 is the first **48-team** edition: **12 groups (A–L)** of four,
hosted by the USA, Canada and Mexico. The data models this (not the old 32-team,
8-group format).

## 🔍 SEO

Semantic HTML5, per-page metadata + Open Graph/Twitter, canonical URLs,
JSON-LD structured data (`WebSite`, `SportsEvent`, `NewsArticle`,
`BreadcrumbList`), dynamic `sitemap.xml` and `robots.txt`, lazy-loaded images,
and `prefers-reduced-motion` support.

## 🎨 Design

Cross-platform flag **images** (flagcdn) — emoji flags are avoided because they
don't render on Windows. Neon blue / cyan / purple / gold accents on an ink-dark
base, glass surfaces, glow shadows and scroll-triggered motion.

## 🚀 Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the build
```

## 🗂️ Structure

```
app/            routes (home, live-scores, standings, schedule, predictions,
                news, match/[slug]) + sitemap.ts, robots.ts
components/     home/  live/  hub/  layout/  ui/
lib/            data.ts (teams, groups, matches, players), seo.ts, utils.ts
```
