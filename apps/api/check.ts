import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_s2Uhvza8Zkmb@ep-wild-term-adfodkoz-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require&schema=public';
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const standings = await prisma.standing.findMany({ take: 2 });
  console.log('DB Standings:', standings);
}

main().catch(console.error).finally(() => prisma.$disconnect());
