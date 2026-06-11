import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StandingsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const standings = await this.prisma.standing.findMany({
      include: { team: true },
      orderBy: [
        { group: 'asc' },
        { points: 'desc' },
        { gf: 'desc' }
      ]
    });
    
    // Group by group ID
    const grouped = standings.reduce((acc, row) => {
      const g = row.group;
      if (!acc[g]) acc[g] = [];
      acc[g].push(row);
      return acc;
    }, {} as any);

    return grouped;
  }

  async findOne(group: string) {
    const standings = await this.prisma.standing.findMany({
      where: { group: group.toUpperCase() as any },
      include: { team: true },
      orderBy: [
        { points: 'desc' },
        { gf: 'desc' }
      ]
    });

    if (!standings || standings.length === 0) {
      throw new NotFoundException(`Standings for group ${group} not found`);
    }

    return standings;
  }
}
