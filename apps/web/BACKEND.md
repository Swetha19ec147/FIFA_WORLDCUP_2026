# Visionary FIFA — Complete Backend Architecture & Build Guide

End-to-end backend for the Visionary FIFA World Cup 2026 platform: every framework, the
full build order (inch by inch), the AI prediction engine, and deployment. Written against
the **actual** frontend data contracts in `lib/data.ts`, `lib/players.ts`, and
`lib/predictions.ts` so the API returns exactly what the UI already expects.

---

## 0. The big picture

```
                         ┌─────────────────────────────────────────────┐
                         │          NEXT.JS 15 FRONTEND (this repo)     │
                         │   SSG/ISR pages → fetch() → REST + WS        │
                         │   Deployed on Vercel                         │
                         └───────────────┬───────────────┬─────────────┘
                                         │ HTTPS (REST)  │ WSS (live)
                                         ▼               ▼
        ┌────────────────────────────────────────────────────────────────────┐
        │                    API GATEWAY  —  NestJS (Node + TS)                │
        │  REST controllers  •  Socket.IO gateway  •  Auth (JWT)  •  Zod DTOs  │
        └───┬───────────┬────────────┬──────────────┬───────────────┬─────────┘
            │           │            │              │               │
            ▼           ▼            ▼              ▼               ▼
      ┌─────────┐ ┌──────────┐ ┌──────────┐  ┌────────────┐  ┌──────────────┐
      │PostgreSQL│ │  Redis   │ │ BullMQ   │  │  AI SVC     │  │  News CMS    │
      │ (Prisma) │ │ cache +  │ │ scheduled│  │  FastAPI +  │  │  Sanity /    │
      │ source of│ │ pub/sub  │ │ ingest   │  │  Claude     │  │  Strapi      │
      │  truth   │ │          │ │ jobs     │  │  (Python)   │  │              │
      └─────────┘ └──────────┘ └────┬─────┘  └─────────────┘  └──────────────┘
                                    │ pulls live data
                                    ▼
                         ┌────────────────────────┐
                         │  External football API │
                         │  API-Football / SportMonks│
                         └────────────────────────┘
```

**One-line summary:** PostgreSQL is the source of truth. A NestJS API serves it over REST +
WebSockets. BullMQ workers poll a third-party football API on a schedule and write into
Postgres, pushing live changes to clients via Redis pub/sub. A separate Python AI service
generates predictions (statistical model for the numbers + Claude for the prose). News comes
from a headless CMS. Everything is containerized and deployed across Vercel + Railway/Render +
Neon + Upstash.

---

## 1. The stack — every framework and why

| Layer | Choice | Why this one |
|---|---|---|
| **Language** | TypeScript (Node 20 LTS) | Shares types with the Next.js frontend; one language across the stack. |
| **API framework** | **NestJS** | Opinionated, modular (controllers/services/modules), first-class DI, built-in WebSockets, guards, pipes. Scales better than bare Express for a multi-domain API. |
| **ORM** | **Prisma** | Type-safe queries, migrations, great DX. Generated types feed both API and (optionally) the frontend. |
| **Database** | **PostgreSQL 16** | Relational data (teams→groups→matches→events→players) with strong querying for standings/leaderboards. |
| **Cache / realtime bus** | **Redis 7** | Response cache, rate-limit store, and pub/sub fan-out for live scores. |
| **Job queue** | **BullMQ** (Redis-backed) | Scheduled + repeatable ingestion jobs, retries, backoff. |
| **Realtime transport** | **Socket.IO** | Rooms per match (`match:<id>`), auto-reconnect, fallback transports. |
| **Validation** | **Zod** (+ `nestjs-zod`) | Runtime validation of external API payloads and request DTOs. |
| **External football data** | **API-Football (api-sports.io)** *or* **SportMonks** | Fixtures, live scores, lineups, events, standings, player stats, xG. |
| **News CMS** | **Sanity** (or Strapi self-hosted) | Editors publish news; frontend reads via API/webhook → ISR revalidate. |
| **AI — statistical** | **Python + FastAPI**, `scikit-learn`, `xgboost`, `numpy`, `scipy` | Win/draw/loss probabilities, predicted scoreline, xG via Dixon-Coles + gradient boosting. |
| **AI — narrative** | **Anthropic Claude API** (`claude-opus-4-8` / `claude-sonnet-4-6`) | Generates the long-form analysis, verdict, tactical breakdown, key battles as structured JSON. |
| **Auth** | **JWT** via NestJS Passport (admin/editor) + optional **Clerk/Auth.js** for end users | Protect admin/ingest/prediction-trigger endpoints. |
| **Containerization** | **Docker** + **docker-compose** (local) | Reproducible local stack (api, db, redis, ai). |
| **CI/CD** | **GitHub Actions** | Lint → test → build → migrate → deploy. |
| **Observability** | **Sentry** (errors), **Pino** (logs), **OpenTelemetry → Grafana/Prometheus** (metrics/traces) | Production visibility. |
| **Hosting** | Vercel (web) · Railway/Render/Fly (API + AI) · Neon/Supabase (PG) · Upstash (Redis) | Managed, low-ops, scales horizontally. |

> **Alternative (smaller team / faster):** skip NestJS and keep the backend *inside* Next.js
> using Route Handlers (`app/api/**/route.ts`) + Server Actions, Prisma, and Vercel Cron for
> ingestion. Same Postgres/Redis/AI design. Trade-off: less structure, harder to scale the
> realtime/ingestion workload independently. The phases below note where this diverges.

---

## 2. Data model — Prisma schema (maps 1:1 to the frontend types)

`prisma/schema.prisma` — covers `Team`, `GroupRow`, `Match`, `TimelineEvent`, `Player`,
`StarPlayer`, `PlayerPro`, `NewsItem`, and `Prediction`.

```prisma
generator client { provider = "prisma-client-js" }
datasource db { provider = "postgresql"; url = env("DATABASE_URL") }

enum GroupId { A B C D E F G H I J K L }
enum MatchStatus { UPCOMING LIVE HT FT }
enum QualStatus { qualified playoff }
enum PosGroup { GK DEF MID FWD }

model Team {
  id        String   @id @default(cuid())
  code      String   @unique           // "ARG"
  name      String
  flag      String                      // emoji fallback
  iso2      String                      // "ar" / "gb-eng"
  group     GroupId
  // relations
  homeMatches Match[] @relation("home")
  awayMatches Match[] @relation("away")
  players     Player[]
  standing    Standing?
}

model Standing {                         // === GroupRow
  id      String   @id @default(cuid())
  team    Team     @relation(fields: [teamId], references: [id])
  teamId  String   @unique
  group   GroupId
  played  Int  @default(0)
  won     Int  @default(0)
  drawn   Int  @default(0)
  lost    Int  @default(0)
  gf      Int  @default(0)
  ga      Int  @default(0)
  points  Int  @default(0)
  status  QualStatus?
  updatedAt DateTime @updatedAt
  @@index([group])
}

model Match {
  id         String      @id @default(cuid())
  externalId String?     @unique         // id from API-Football, for upserts
  slug       String      @unique         // "argentina-vs-austria"
  home       Team        @relation("home", fields: [homeId], references: [id])
  homeId     String
  away       Team        @relation("away", fields: [awayId], references: [id])
  awayId     String
  homeScore  Int?
  awayScore  Int?
  status     MatchStatus @default(UPCOMING)
  minute     Int?
  kickoff    DateTime
  stadium    String
  city       String
  group      GroupId?
  stage      String
  events     MatchEvent[]
  stats      Json?                        // possession/xG/shots block
  prediction Prediction?
  updatedAt  DateTime    @updatedAt
  @@index([status]) @@index([kickoff])
}

model MatchEvent {                        // === TimelineEvent
  id      String @id @default(cuid())
  match   Match  @relation(fields: [matchId], references: [id])
  matchId String
  minute  Int
  type    String                          // goal | card | sub | var
  team    String                          // "home" | "away"
  text    String
  @@index([matchId])
}

model Player {                            // === PlayerPro (superset of Player/StarPlayer)
  id            String  @id @default(cuid())
  externalId    String? @unique
  slug          String  @unique
  name          String
  fullName      String?
  country       String
  iso2          String
  team          Team?   @relation(fields: [teamId], references: [id])
  teamId        String?
  pos           String
  posGroup      PosGroup
  club          String
  number        Int
  age           Int
  height        String
  foot          String
  goals         Int @default(0)
  assists       Int @default(0)
  rating        Float @default(0)
  cleanSheets   Int @default(0)
  matchesPlayed Int @default(0)
  careerGoals   Int @default(0)
  careerCaps    Int @default(0)
  image         String?
  cutout        String?
  honors        String  @default("")
  bio           String  @default("")
  marketValue   String  @default("")
  fifaRating    Int     @default(0)
  star          Boolean @default(false)
  trending      Boolean @default(false)
  @@index([posGroup]) @@index([trending])
}

model NewsItem {
  id        String   @id @default(cuid())
  slug      String   @unique
  title     String
  excerpt   String
  body      String?                       // full article (or pulled from CMS)
  category  String
  date      DateTime
  readTime  String
  source    String   @default("cms")
  @@index([date])
}

model Prediction {                        // === lib/predictions.ts Prediction
  id          String   @id @default(cuid())
  slug        String   @unique
  match       Match    @relation(fields: [matchId], references: [id])
  matchId     String   @unique
  publishAt   DateTime
  predictedScore String
  winner      String                       // home | away | draw
  confidence  Int
  homePct     Int
  drawPct     Int
  awayPct     Int
  // rich narrative + structured blocks stored as JSON to match the TS type exactly
  payload     Json                         // overview, fullAnalysis[], verdict, forms,
                                           // h2h, keyPlayers, tactics, battles, XIs,
                                           // injuries, stats, keyFactors, implications
  model       String                       // "dixon-coles+claude-opus-4-8"
  createdAt   DateTime @default(now())
}
```

**Why `payload Json` on Prediction:** the frontend `Prediction` type has ~25 fields including
nested arrays (`fullAnalysis`, `homeKeyPlayers`, `battles`, `homeXI`…). The hard numbers get
their own columns (for querying/sorting); the prose blocks live in one JSON column so the API
can return the exact shape the UI renders with zero transformation.

---

## 3. Build order — phase by phase

### Phase 0 — Repository & tooling (½ day)
1. Create a monorepo (pnpm workspaces or Turborepo):
   ```
   /apps/web        ← existing Next.js app (move this repo here)
   /apps/api        ← NestJS
   /apps/ai         ← FastAPI (Python)
   /packages/types  ← shared TS types (Team, Match, PlayerPro, Prediction…)
   /packages/config ← eslint/tsconfig
   ```
2. Extract the TS types from `lib/*.ts` into `packages/types` so web + api import the same
   contract. (Keep `lib/*.ts` as the seed source for Phase 1.)
3. `pnpm`, ESLint, Prettier, `tsconfig` base, Husky pre-commit.

### Phase 1 — Database + Prisma + seed (1 day)
1. `cd apps/api && npm i prisma @prisma/client && npx prisma init`.
2. Paste the schema from §2. `npx prisma migrate dev --name init`.
3. **Seed from the data you already have** — write `prisma/seed.ts` that imports the current
   `teams`, `players`, `starPlayers`, `news`, and `predictions` arrays and `upsert`s them.
   This gives you a working DB on day one without waiting for the live API.
   ```ts
   for (const t of teams) await db.team.upsert({ where:{code:t.code}, create:{...}, update:{...} });
   ```
4. `npx prisma db seed`.

### Phase 2 — NestJS REST API (2–3 days)
Module per domain. Each module = controller (routes) + service (Prisma) + DTO (Zod).
```
apps/api/src/
  teams/      GET /teams                GET /teams/:slug
  standings/  GET /standings            GET /standings/:group
  matches/    GET /matches?status=live  GET /matches/:slug
  players/    GET /players?pos=&q=&page= GET /players/:slug
  news/       GET /news                 GET /news/:slug
  predictions/GET /predictions          GET /predictions/:slug
  health/     GET /healthz
```
- Global `ValidationPipe` (Zod), `ClassSerializer`, CORS locked to the web origin.
- Pagination on `/players` (329 rows) — `?page=&limit=&posGroup=&q=`.
- Response envelope: `{ data, meta }`. Add `Cache-Control: s-maxage=...` per route.

> **Endpoint ↔ page map** (so the API matches the site exactly):
> | Frontend page | Endpoint(s) |
> |---|---|
> | `/` (home) | `/matches?status=live`, `/matches?status=upcoming`, `/standings/A`, `/players?sort=goals&limit=5`, `/news?limit=3`, `/predictions?limit=3` |
> | `/standings` | `/standings` (all 12 groups) |
> | `/schedule` | `/matches?from=&to=` |
> | `/live-scores` | `/matches?status=live` + **WS** `match:<id>` |
> | `/match/[slug]` | `/matches/:slug` (incl. events, stats, H2H) |
> | `/teams`, `/team/[slug]` | `/teams`, `/teams/:slug` |
> | `/players`, `/player/[slug]` | `/players`, `/players/:slug` |
> | `/predictions`, `/predictions/[slug]` | `/predictions`, `/predictions/:slug` |
> | `/news` | `/news` |
> | `/api/trending` | keep in Next.js (already works) or proxy `/trending` |

### Phase 3 — External data ingestion (2–3 days)
The engine that keeps the DB live.
1. `IngestModule` with a typed client for **API-Football** (axios + Zod-validated responses).
2. **BullMQ** queues + repeatable jobs:
   - `fixtures:sync` — daily 03:00 UTC: full fixture list + stadiums/stages → upsert `Match`.
   - `standings:sync` — every 30 min during tournament → upsert `Standing`.
   - `players:sync` — daily → stats (`goals/assists/rating/cleanSheets/matchesPlayed`).
   - `live:poll` — **every 15–20 s while any match is `LIVE`** → score, minute, events.
3. Mapping layer: external IDs → your `externalId` columns; idempotent upserts.
4. Each job wrapped with retries (exponential backoff), a dead-letter queue, and a
   `last_synced_at` heartbeat exposed at `/healthz`.

> **Next.js-only variant:** replace BullMQ workers with **Vercel Cron** (`vercel.json`) hitting
> protected route handlers `app/api/cron/live/route.ts` etc. Good to ~minute granularity;
> for sub-20s live polling you still want a long-running worker (Railway/Fly).

### Phase 4 — Redis cache + live WebSockets (2 days)
1. **Cache-aside** in services: `redis.get(key) ?? (compute → redis.setex)`. Keys like
   `standings:A`, `players:p1`, TTL 30–300s. Invalidate on ingest write.
2. **Socket.IO gateway** (`/live` namespace). Client joins room `match:<id>`.
3. The `live:poll` worker publishes diffs to Redis channel `live:<id>`; the gateway subscribes
   and emits `score`, `event`, `status` to the room. Frontend `/live-scores` + `/match/[slug]`
   subscribe and patch state in real time (replaces today's static numbers).
   ```ts
   // gateway
   @SubscribeMessage('join') join(c, id){ c.join(`match:${id}`); }
   redisSub.on('message',(ch,msg)=> io.to(`match:${ch.split(':')[1]}`).emit('update', JSON.parse(msg)));
   ```

### Phase 5 — News CMS (1 day)
1. Model `Article` in Sanity (title, slug, excerpt, body-portable-text, category, date,
   readTime, cover).
2. Either mirror into Postgres `NewsItem` on a `cms:sync` job, **or** have `/news` read Sanity
   directly and cache in Redis.
3. **Webhook → ISR:** on publish, Sanity calls `POST /api/revalidate?tag=news` (Next.js
   `revalidateTag`) so `/news` updates within seconds without a redeploy.

### Phase 6 — AI Prediction engine (the headline feature) — 4–6 days
See **§4** for the full pipeline. In short: a Python FastAPI service produces the **numbers**
(win%, scoreline, xG) with a Dixon-Coles/XGBoost model, then calls **Claude** to produce the
**narrative** JSON matching the `Prediction` type. NestJS triggers it ~5h before kickoff
(BullMQ job `prediction:generate`) and stores the result in the `Prediction` table.

### Phase 7 — Auth & admin (1–2 days)
- JWT (Passport) guarding `POST/PATCH` ingest, prediction-trigger, and CMS-webhook routes.
- Roles: `admin`, `editor`, `service`. `@Roles()` decorator + `RolesGuard`.
- (Optional) end-user accounts for saved brackets/predictions via **Clerk** or **Auth.js**;
  add a `User` + `BracketPick` table — fits the existing `/bracket` `BracketPredictor`.

### Phase 8 — Wire the frontend to the backend (2 days)
1. Add `NEXT_PUBLIC_API_URL` + a typed `lib/api.ts` fetch client.
2. Replace each `import { … } from "@/lib/data"` with a server-side `fetch()` in the page
   (App Router server components) using `next: { revalidate, tags }` for ISR.
   - `/standings` → `await api.standings()` with `revalidate: 60`.
   - `/live-scores`, `/match/[slug]` → initial `fetch` + client WS subscription.
   - `/players` → server fetch with the existing filter UI calling `/players?…`.
3. Keep `lib/*.ts` as **fallback/seed** + types. Delete once API is stable.
4. On-demand revalidation: ingest worker calls `POST /api/revalidate?tag=standings` after writes.

### Phase 9 — Testing (ongoing)
- **Unit:** services with mocked Prisma (Jest).
- **Integration:** spin Postgres+Redis via Testcontainers; hit controllers with Supertest.
- **Contract:** Zod-validate that API responses still match `packages/types` (guards the UI).
- **AI:** golden-file tests for the stat model; schema-validate Claude JSON output.
- **E2E:** Playwright against a seeded stack.

### Phase 10 — Docker + CI/CD (1–2 days)
1. `Dockerfile` per app (multi-stage: build → slim runtime). `docker-compose.yml` runs
   `api + db + redis + ai` locally.
2. **GitHub Actions** pipeline:
   ```
   lint → typecheck → test → prisma migrate deploy → docker build/push → deploy
   ```
3. Migrations run automatically on deploy (`prisma migrate deploy`), never `migrate dev` in prod.

### Phase 11 — Deployment topology (1 day)
| Component | Host | Notes |
|---|---|---|
| Web (Next.js) | **Vercel** | ISR + on-demand revalidate; `NEXT_PUBLIC_API_URL` env. |
| API (NestJS) | **Railway / Render / Fly.io** | 2+ instances behind LB; WebSocket sticky sessions. |
| Ingestion workers | same platform, **separate service** | Long-running; scales independently of API. |
| AI service (FastAPI) | **Railway / Fly / Modal** | GPU not required (CPU XGBoost + Claude API). |
| PostgreSQL | **Neon** or **Supabase** or **AWS RDS** | Connection pooling (PgBouncer/Neon pooler). |
| Redis | **Upstash** or **Redis Cloud** | Cache + pub/sub + BullMQ. |
| CMS | **Sanity** (hosted) | Webhook to Vercel for ISR. |
| Object storage | **Cloudflare R2 / S3** | OG images, player cutouts cache. |

### Phase 12 — Observability, security, scaling (ongoing)
- **Sentry** in web + api + ai; **Pino** JSON logs; **OTel** traces; **Prometheus/Grafana**
  dashboards (ingest lag, live-poll latency, cache hit-rate, Claude tokens/cost).
- **Security:** Helmet, CORS allowlist, rate-limit (`@nestjs/throttler` + Redis), secrets in
  platform vault, Zod-validate *all* external input, never expose football-API keys to the
  browser, signed webhooks.
- **Scaling:** stateless API (scale horizontally), Redis pub/sub fans out live data, read
  replicas for Postgres if needed, CDN caching on GET endpoints via `s-maxage`.

---

## 4. AI Prediction engine — complete pipeline

The frontend `Prediction` type needs **both** hard numbers and rich prose. Use a **hybrid**:
a statistical model for probabilities, an LLM for narrative. Never let the LLM invent the
numbers — feed them in.

```
 match + team form + squad + H2H + venue
                 │
                 ▼
   ┌──────────────────────────────┐   1. FEATURE BUILDER (FastAPI)
   │ Elo/SPI ratings, last-5 form, │      pulls from Postgres + football API
   │ home edge, xG for/against,    │
   │ rest days, injuries           │
   └──────────────┬───────────────┘
                  ▼
   ┌──────────────────────────────┐   2. STATISTICAL MODEL
   │ Dixon-Coles bivariate Poisson │      → P(home/draw/away), exact-score matrix,
   │  + XGBoost classifier (blend) │        most-likely scoreline, team xG, confidence
   └──────────────┬───────────────┘
                  ▼
   ┌──────────────────────────────┐   3. CLAUDE (narrative)
   │ Prompt = structured numbers + │      → JSON: overview, fullAnalysis[], verdict,
   │ form + squads + tactics, ask  │        homeKeyPlayers/awayKeyPlayers, tactics,
   │ for Prediction-shaped JSON    │        battles, homeXI/awayXI, keyFactors, …
   └──────────────┬───────────────┘
                  ▼
   ┌──────────────────────────────┐   4. VALIDATE + PERSIST
   │ Zod-check against Prediction  │      numbers from step 2 OVERRIDE any the LLM wrote;
   │ type → store in Postgres      │      save payload JSON; expose via /predictions/:slug
   └──────────────────────────────┘
```

### 4a. Statistical model (the numbers)

**Dixon-Coles** (bivariate Poisson) gives a full score matrix from team attack/defence
strengths + home advantage. Train on historical internationals + this cycle's matches.

```python
# apps/ai/model/dixon_coles.py  (sketch)
import numpy as np
from scipy.optimize import minimize
from scipy.stats import poisson

def fit(matches):                      # matches: home, away, hg, ag
    teams = sorted({t for m in matches for t in (m.home, m.away)})
    # params: attack[i], defence[i], home_adv, rho (low-score correction)
    ...                                # MLE via minimize(neg_log_likelihood)
    return params

def predict(params, home, away, max_goals=8):
    lh = np.exp(params.attack[home] - params.defence[away] + params.home_adv)
    la = np.exp(params.attack[away] - params.defence[home])
    M  = np.outer(poisson.pmf(range(max_goals), lh),
                  poisson.pmf(range(max_goals), la))
    M  = apply_dixon_coles_correction(M, lh, la, params.rho)
    return {
      "home_pct": round(np.tril(M, -1).sum()*100),     # home win
      "draw_pct": round(np.trace(M)*100),
      "away_pct": round(np.triu(M, 1).sum()*100),
      "score":    most_likely_scoreline(M),            # e.g. "2-0"
      "home_xg":  float(lh), "away_xg": float(la),
      "confidence": int(max(home, draw, away) ... )     # margin-based
    }
```

Blend with an **XGBoost** classifier on engineered features (form points, rest days, FIFA
rank delta, injuries count, xG differentials) for robustness; average the two probability
vectors. Calibrate with Platt scaling so `confidence` is meaningful.

> **No-data-yet fallback:** before real results exist, seed strengths from **FIFA/Elo ratings**
> + bookmaker odds. The model still produces sensible numbers on day one.

### 4b. Narrative generation (Claude)

Feed the **computed numbers** + structured context; ask for JSON that matches the
`Prediction` payload. Use tool/JSON mode and validate.

```python
# apps/ai/narrative.py  (sketch)
from anthropic import Anthropic
client = Anthropic()

SYSTEM = """You are a football analyst for Visionary FIFA. Given fixture data and
PRE-COMPUTED model numbers, write a deep World Cup 2026 match preview.
Rules: use the provided probabilities/scoreline/xG EXACTLY — never change them.
Return ONLY JSON matching the schema. Be specific, factual, no betting advice."""

def generate(ctx: dict) -> dict:
    msg = client.messages.create(
        model="claude-opus-4-8",          # or claude-sonnet-4-6 for cost
        max_tokens=4000,
        system=SYSTEM,
        messages=[{"role":"user","content": json.dumps(ctx)}],
        # ctx = { homeTeam, awayTeam, stage, venue, model_numbers,
        #         homeForm, awayForm, h2h, squads, injuries }
    )
    data = json.loads(extract_json(msg.content))
    return data    # overview, fullAnalysis[], verdict, homeKeyPlayers[],
                   # awayKeyPlayers[], homeTactics, awayTactics, battles[],
                   # homeXI[], awayXI[], keyFactors[], tournamentImplications
```

> See `/skills/claude-api` for current model IDs, JSON/tool-use, prompt caching (cache the
> long SYSTEM + squad context to cut cost), and token accounting. Cache the squad/context
> block — it repeats across the tournament.

### 4c. Orchestration & schedule
- NestJS BullMQ job `prediction:generate` runs **~5h before each kickoff** (matches the site's
  "published 4–5 hrs before kickoff" copy), calls the AI service, validates with Zod against
  the `Prediction` type, writes the row, and `revalidateTag('predictions')`.
- Re-run on major team-news changes (injury webhook).
- Store `model` provenance + token cost per prediction for auditing.

### 4d. FastAPI surface
```
POST /predict        body: { matchId }  → { numbers, narrative }  (internal, JWT)
GET  /health
POST /retrain        admin-only; refits Dixon-Coles/XGBoost on latest results
```

---

## 5. Environment variables (superset of current `.env.example`)

```bash
# Web (Vercel)
NEXT_PUBLIC_SITE_URL=https://visionaryfifa.com
NEXT_PUBLIC_API_URL=https://api.visionaryfifa.com
NEXT_PUBLIC_WS_URL=wss://api.visionaryfifa.com
NEXT_PUBLIC_GOOGLE_VERIFICATION=
REVALIDATE_SECRET=                       # shared with API for on-demand ISR

# API (NestJS)
DATABASE_URL=postgresql://…
REDIS_URL=rediss://…
JWT_SECRET=
CORS_ORIGIN=https://visionaryfifa.com
FOOTBALL_API_KEY=                        # API-Football / SportMonks
FOOTBALL_API_BASE=https://v3.football.api-sports.io
AI_SERVICE_URL=https://ai.visionaryfifa.com
AI_SERVICE_TOKEN=
SANITY_PROJECT_ID=
SANITY_DATASET=production
SANITY_WEBHOOK_SECRET=
SENTRY_DSN=

# AI (FastAPI)
ANTHROPIC_API_KEY=
DATABASE_URL=postgresql://…              # read access for features
MODEL_VERSION=dixon-coles-v1+claude-opus-4-8
```

---

## 6. Suggested timeline

| Sprint | Scope | Outcome |
|---|---|---|
| Week 1 | Phases 0–2 | DB + seeded REST API serving teams/standings/matches/players/news/predictions. |
| Week 2 | Phases 3–4 | Live ingestion + Redis cache + WebSocket live scores. |
| Week 3 | Phases 5–6 | News CMS + AI prediction engine (numbers + Claude narrative). |
| Week 4 | Phases 7–11 | Auth, frontend wiring, Docker, CI/CD, production deploy. |
| Ongoing | Phase 12 | Observability, tuning, model retraining. |

---

## 7. Definition of done
- Every frontend page reads from the API (no `lib/*.ts` runtime imports).
- Live matches update in <2s end-to-end during the tournament.
- Predictions auto-generate ~5h pre-kickoff and render identically to today's static ones.
- All external input validated; secrets server-side only; rate-limited; monitored.
- One-command local stack (`docker compose up`) and automated deploys on `main`.
```
