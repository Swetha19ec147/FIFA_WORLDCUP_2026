import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TeamsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.team.findMany({
      orderBy: { name: 'asc' }
    });
  }

  async findOne(slug: string) {
    const team = await this.prisma.team.findFirst({
      where: { code: { equals: slug, mode: 'insensitive' } },
      include: {
        players: true,
        standing: true,
        homeMatches: true,
        awayMatches: true,
      }
    });

    if (!team) throw new NotFoundException(`Team with code ${slug} not found`);
    return team;
  }
}
