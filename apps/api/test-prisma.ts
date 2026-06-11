import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
dotenv.config();

try {
  const prisma = new PrismaClient({ url: process.env.DATABASE_URL } as any);
  console.log("Success");
} catch (e) {
  console.error(e);
}
