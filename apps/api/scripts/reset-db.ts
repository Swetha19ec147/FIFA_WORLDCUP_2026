import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import axios from 'axios';

const connectionString = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_s2Uhvza8Zkmb@ep-wild-term-adfodkoz-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require&schema=public';
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Resetting standings to 0...');
  await prisma.standing.updateMany({
    data: {
      played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, points: 0, status: null
    }
  });

  console.log('Resetting schedule...');
  // The first match is Mexico vs South Africa. Let's make it upcoming.
  const openingMatch = await prisma.match.findUnique({
    where: { slug: 'mexico-vs-south-africa' },
    include: { home: true, away: true }
  });

  if (openingMatch) {
    await prisma.match.update({
      where: { id: openingMatch.id },
      data: {
        status: 'UPCOMING',
        homeScore: null,
        awayScore: null,
        minute: null
      }
    });

    console.log('Generating fresh AI prediction for opening match...');
    // Generate AI Prediction directly
    try {
      const response = await axios.post('http://127.0.0.1:8000/predict', {
        home_team: openingMatch.home.name,
        away_team: openingMatch.away.name,
        home_strength: 82, 
        away_strength: 70, 
      });

      const aiData = response.data;
      
      await prisma.prediction.upsert({
        where: { matchId: openingMatch.id },
        update: {
          homePct: Math.round(aiData.stats.homeWin),
          awayPct: Math.round(aiData.stats.awayWin),
          drawPct: Math.round(aiData.stats.draw),
          predictedScore: "TBD",
          winner: aiData.stats.homeWin > aiData.stats.awayWin ? 'home' : 'away',
          confidence: 85,
          payload: { narrative: aiData.narrative, homeXg: aiData.stats.homeXg, awayXg: aiData.stats.awayXg },
          model: 'gemini-1.5-flash',
          publishAt: new Date(),
        },
        create: {
          slug: `${openingMatch.slug}-prediction`,
          matchId: openingMatch.id,
          homePct: Math.round(aiData.stats.homeWin),
          awayPct: Math.round(aiData.stats.awayWin),
          drawPct: Math.round(aiData.stats.draw),
          predictedScore: "TBD",
          winner: aiData.stats.homeWin > aiData.stats.awayWin ? 'home' : 'away',
          confidence: 85,
          payload: { narrative: aiData.narrative, homeXg: aiData.stats.homeXg, awayXg: aiData.stats.awayXg },
          model: 'gemini-1.5-flash',
          publishAt: new Date(),
        }
      });
      console.log('AI Prediction stored.');
    } catch (e) {
      console.log('Failed to generate AI Prediction (is Python server running?). Inserting fallback prediction...');
      await prisma.prediction.upsert({
        where: { matchId: openingMatch.id },
        update: {
          homePct: 65, awayPct: 15, drawPct: 20, predictedScore: "3-1", winner: 'home', confidence: 90,
          payload: { narrative: "Mexico enters the opening match with intense home support. South Africa will struggle.", homeXg: 2.1, awayXg: 0.8 },
          model: 'fallback-mock', publishAt: new Date()
        },
        create: {
          slug: `${openingMatch.slug}-prediction`, matchId: openingMatch.id,
          homePct: 65, awayPct: 15, drawPct: 20, predictedScore: "3-1", winner: 'home', confidence: 90,
          payload: { narrative: "Mexico enters the opening match with intense home support. South Africa will struggle.", homeXg: 2.1, awayXg: 0.8 },
          model: 'fallback-mock', publishAt: new Date()
        }
      });
    }
  }

  // Find USA vs Paraguay
  const usaMatch = await prisma.match.findUnique({
    where: { slug: 'united-states-vs-paraguay' }
  });
  if (usaMatch) {
    await prisma.match.update({
      where: { id: usaMatch.id },
      data: { status: 'UPCOMING', homeScore: null, awayScore: null }
    });
  }

  console.log('Database reset complete!');
}

main().catch(console.error).finally(() => prisma.$disconnect());
