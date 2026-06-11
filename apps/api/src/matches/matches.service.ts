import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MatchesService {
  constructor(private prisma: PrismaService) {}

  async findAll(status?: string) {
    const where = status ? { status: status.toUpperCase() as any } : {};
    return this.prisma.match.findMany({
      where,
      include: {
        home: true,
        away: true,
      },
      orderBy: { kickoff: 'asc' }
    });
  }

  async findOne(slug: string) {
    const match = await this.prisma.match.findUnique({
      where: { slug },
      include: {
        home: true,
        away: true,
        events: true,
        prediction: true,
      }
    });

    if (!match) throw new NotFoundException(`Match with slug ${slug} not found`);
    return match;
  }
}
