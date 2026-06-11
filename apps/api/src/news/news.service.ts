import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NewsService {
  constructor(private prisma: PrismaService) {}

  async findAll(limit?: number) {
    return this.prisma.newsItem.findMany({
      orderBy: { date: 'desc' },
      take: limit ? Number(limit) : undefined,
    });
  }

  async findOne(slug: string) {
    const news = await this.prisma.newsItem.findUnique({
      where: { slug }
    });

    if (!news) throw new NotFoundException(`News item with slug ${slug} not found`);
    return news;
  }

  async createFromWebhook(payload: any) {
    // Assuming a payload from a standard headless CMS webhook
    const title = payload.title || 'Breaking News';
    const slug = payload.slug?.current || title.toLowerCase().replace(/\s+/g, '-');
    
    return this.prisma.newsItem.upsert({
      where: { slug },
      update: {
        title,
        excerpt: payload.summary || '',
        body: payload.content || '',
        category: payload.category || 'General',
        readTime: payload.readTime || '3 min',
      },
      create: {
        slug,
        title,
        excerpt: payload.summary || '',
        body: payload.content || '',
        category: payload.category || 'General',
        readTime: payload.readTime || '3 min',
        date: new Date(),
      }
    });
  }
}
