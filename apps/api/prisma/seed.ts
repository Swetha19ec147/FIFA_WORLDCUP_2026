import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { teams, allMatches, news } from './data';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding Database...');

  // Seed Teams
  for (const t of teams) {
    await prisma.team.upsert({
      where: { code: t.code },
      update: {
        name: t.name,
        flag: t.flag,
        iso2: t.iso2,
        group: t.group as any,
      },
      create: {
        code: t.code,
        name: t.name,
        flag: t.flag,
        iso2: t.iso2,
        group: t.group as any,
      },
    });
  }
  console.log(`Seeded ${teams.length} teams.`);

  // Seed Standings (all zeros for every team)
  for (const t of teams) {
    const dbTeam = await prisma.team.findUnique({ where: { code: t.code } });
    if (dbTeam) {
      await prisma.standing.upsert({
        where: { teamId: dbTeam.id },
        update: {
          group: t.group as any,
          played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, points: 0, status: null,
        },
        create: {
          teamId: dbTeam.id,
          group: t.group as any,
          played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, points: 0,
        },
      });
    }
  }
  console.log(`Seeded ${teams.length} standings (all zeros).`);

  // Seed Matches
  for (const m of allMatches) {
    // Ensure home and away teams exist
    const homeTeam = await prisma.team.findUnique({ where: { code: m.home.code } });
    const awayTeam = await prisma.team.findUnique({ where: { code: m.away.code } });

    if (homeTeam && awayTeam) {
      await prisma.match.upsert({
        where: { slug: m.slug },
        update: {
          homeScore: null,
          awayScore: null,
          status: 'UPCOMING',
          minute: null,
          kickoff: new Date(m.kickoff),
          stadium: m.stadium,
          city: m.city,
          stage: m.stage,
          group: m.group as any,
        },
        create: {
          slug: m.slug,
          homeId: homeTeam.id,
          awayId: awayTeam.id,
          homeScore: null,
          awayScore: null,
          status: 'UPCOMING',
          minute: null,
          kickoff: new Date(m.kickoff),
          stadium: m.stadium,
          city: m.city,
          stage: m.stage,
          group: m.group as any,
        },
      });
    }
  }
  console.log(`Seeded ${allMatches.length} matches.`);

  // Seed News
  for (const item of news) {
    await prisma.newsItem.upsert({
      where: { slug: item.slug },
      update: {
        title: item.title,
        excerpt: item.excerpt,
        category: item.category,
        date: new Date(item.date),
        readTime: item.readTime,
      },
      create: {
        slug: item.slug,
        title: item.title,
        excerpt: item.excerpt,
        category: item.category,
        date: new Date(item.date),
        readTime: item.readTime,
      },
    });
  }
  console.log(`Seeded ${news.length} news items.`);

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
