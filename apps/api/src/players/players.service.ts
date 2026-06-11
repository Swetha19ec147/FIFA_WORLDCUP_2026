import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PlayersService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: any) {
    const { posGroup, q, page = 1, limit = 50, sort = 'rating' } = query;
    const where: any = {};
    if (posGroup) where.posGroup = posGroup;
    if (q) where.name = { contains: q, mode: 'insensitive' };

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.player.findMany({
        where,
        skip: Number(skip),
        take: Number(limit),
        orderBy: { [sort]: 'desc' },
        include: { team: true },
      }),
      this.prisma.player.count({ where })
    ]);

    return {
      data,
      meta: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  async findOne(slug: string) {
    const player = await this.prisma.player.findUnique({
      where: { slug },
      include: { team: true }
    });

    if (!player) throw new NotFoundException(`Player with slug ${slug} not found`);
    return player;
  }
}
