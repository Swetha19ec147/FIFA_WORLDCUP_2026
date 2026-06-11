import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '../prisma/prisma.service';
import axios from 'axios';

@Injectable()
export class IngestionService {
  private readonly logger = new Logger(IngestionService.name);
  private readonly apiBaseUrl = process.env.FOOTBALL_API_BASE;
  private readonly apiKey = process.env.FOOTBALL_API_KEY;
  private readonly apiClient = this.apiBaseUrl
    ? axios.create({
        baseURL: this.apiBaseUrl,
        headers: { 'x-apisports-key': this.apiKey },
      })
    : null;

  constructor(private readonly prisma: PrismaService) {}

  // Sync matches every hour
  @Cron(CronExpression.EVERY_HOUR)
  async syncFixtures() {
    if (!this.apiClient) {
      this.logger.debug('FOOTBALL_API_BASE not configured — skipping fixture sync.');
      return;
    }
    this.logger.log('Starting hourly fixture sync...');
    try {
      // Assuming league 1 is World Cup, season 2026
      const response = await this.apiClient.get('/fixtures', {
        params: { league: 1, season: 2026 },
      });
      
      const fixtures = response.data.response;
      if (!fixtures) return;

      this.logger.log(`Fetched ${fixtures.length} fixtures. Syncing...`);
      for (const item of fixtures) {
        const fixtureId = item.fixture.id.toString();
        const homeCode = item.teams.home.name.substring(0,3).toUpperCase();
        const awayCode = item.teams.away.name.substring(0,3).toUpperCase();
        
        // Find or fallback to team ids
        const homeTeam = await this.prisma.team.findFirst({ where: { name: item.teams.home.name } });
        const awayTeam = await this.prisma.team.findFirst({ where: { name: item.teams.away.name } });
        
        if (homeTeam && awayTeam) {
          await this.prisma.match.upsert({
            where: { slug: `match-${fixtureId}` },
            update: {
              status: item.fixture.status.short === 'FT' ? 'FT' : item.fixture.status.short === '1H' ? 'LIVE' : 'UPCOMING',
              homeScore: item.goals.home,
              awayScore: item.goals.away,
            },
            create: {
              slug: `match-${fixtureId}`,
              homeId: homeTeam.id,
              awayId: awayTeam.id,
              homeScore: item.goals.home || 0,
              awayScore: item.goals.away || 0,
              status: item.fixture.status.short === 'FT' ? 'FT' : item.fixture.status.short === '1H' ? 'LIVE' : 'UPCOMING',
              kickoff: new Date(item.fixture.date),
              group: null,
              stadium: item.fixture.venue.name || 'Unknown',
              city: item.fixture.venue.city || 'Unknown',
              stage: 'Group Stage'
            }
          });
        }
      }
      this.logger.log('Fixture sync complete.');
    } catch (error) {
      this.logger.error('Failed to sync fixtures', error);
    }
  }

  // Poll live scores every 30 seconds
  @Cron('*/30 * * * * *')
  async pollLiveScores() {
    if (!this.apiClient) return; // skip silently if no API configured
    this.logger.debug('Polling live matches...');
    try {
      const response = await this.apiClient.get('/fixtures', {
        params: { live: '1' },
      });
      const liveFixtures = response.data.response;
      if (!liveFixtures || liveFixtures.length === 0) return;

      this.logger.debug(`Found ${liveFixtures.length} live matches.`);
      for (const item of liveFixtures) {
        const fixtureId = `match-${item.fixture.id}`;
        
        await this.prisma.match.updateMany({
          where: { slug: fixtureId },
          data: {
            homeScore: item.goals.home,
            awayScore: item.goals.away,
            status: 'LIVE'
          }
        });
        
        // Push event to WebSocket or Redis could be implemented here
      }
    } catch (error) {
      this.logger.error('Failed to poll live scores', error);
    }
  }
}
