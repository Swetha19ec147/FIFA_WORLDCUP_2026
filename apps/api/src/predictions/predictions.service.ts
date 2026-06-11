import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class PredictionsService {
  private readonly logger = new Logger(PredictionsService.name);

  constructor(
    private prisma: PrismaService,
    private httpService: HttpService,
  ) {}

  async findAll(limit?: number) {
    return this.prisma.prediction.findMany({
      include: { match: { include: { home: true, away: true } } },
      orderBy: { publishAt: 'desc' },
      take: limit ? Number(limit) : undefined,
    });
  }

  async findOne(slug: string) {
    const prediction = await this.prisma.prediction.findUnique({
      where: { slug },
      include: { match: { include: { home: true, away: true } } }
    });

    if (!prediction) throw new NotFoundException(`Prediction with slug ${slug} not found`);
    return prediction;
  }

  async generatePrediction(matchId: string) {
    const match = await this.prisma.match.findUnique({
      where: { id: matchId },
      include: { home: true, away: true }
    });

    if (!match) throw new NotFoundException('Match not found');

    this.logger.log(`Generating prediction for ${match.slug}...`);
    
    let homeWin = 50;
    let awayWin = 30;
    let draw = 20;
    
    // Attempt Python service, but gracefully fallback
    try {
      const response = await firstValueFrom(
        this.httpService.post('http://127.0.0.1:8000/predict', {
          home_team: match.home.name,
          away_team: match.away.name,
          home_strength: 80,
          away_strength: 75,
        })
      );
      const aiData = response.data;
      homeWin = Math.round(aiData.stats.homeWin);
      awayWin = Math.round(aiData.stats.awayWin);
      draw = Math.round(aiData.stats.draw);
    } catch (error) {
      this.logger.warn('Python AI service unreachable or failed. Falling back to internal mock generator.');
      // Simple pseudo-random distribution based on string lengths just for variety
      const homeVal = match.home.name.length * 5 + 30;
      const awayVal = match.away.name.length * 4 + 20;
      const total = homeVal + awayVal + 20;
      homeWin = Math.round((homeVal / total) * 100);
      awayWin = Math.round((awayVal / total) * 100);
      draw = 100 - homeWin - awayWin;
    }

    const winner = homeWin > awayWin ? 'home' : (awayWin > homeWin ? 'away' : 'draw');
    const pScore = winner === 'home' ? '2-1' : (winner === 'away' ? '1-2' : '1-1');

    // Generate a rich payload matching the frontend's expected Prediction type
    const payload = {
      overview: `AI generated overview for ${match.home.name} vs ${match.away.name}. This is an auto-generated analysis of the upcoming fixture in ${match.stage}.`,
      fullAnalysis: [
        `${match.home.name} enters this match with strong expectations based on recent performance.`,
        `${match.away.name} will rely on their compact defensive shape to frustrate the opposition.`
      ],
      verdict: `A tight match expected, but our model tips a ${pScore} result.`,
      homeForm: [
        { opponent: "TBD", result: "W", score: "2-0", competition: "Friendly" }
      ],
      awayForm: [
        { opponent: "TBD", result: "D", score: "1-1", competition: "Friendly" }
      ],
      h2hSummary: "Historical data suggests closely fought contests between these two nations.",
      h2hHome: 1,
      h2hDraw: 1,
      h2hAway: 0,
      lastMeeting: "Recent Friendly",
      homeKeyPlayers: [
        { name: "Key Player A", position: "Midfielder", stat: "Top passes", impact: "Controls the tempo." }
      ],
      awayKeyPlayers: [
        { name: "Key Player B", position: "Forward", stat: "Top scorer", impact: "Main goal threat." }
      ],
      homeTactics: {
        formation: "4-3-3",
        style: "Possession-based attacking",
        strengths: ["Midfield control", "Wing play"],
        weaknesses: ["High defensive line"]
      },
      awayTactics: {
        formation: "4-4-2",
        style: "Counter-attacking",
        strengths: ["Defensive solidity", "Pace on the break"],
        weaknesses: ["Struggle against low blocks"]
      },
      battles: [
        { home: "Midfield Duo", away: "Playmaker", context: "Key battle in the center of the park." }
      ],
      homeXI: ["Player 1", "Player 2", "Player 3", "Player 4", "Player 5", "Player 6", "Player 7", "Player 8", "Player 9", "Player 10", "Player 11"],
      awayXI: ["Player 1", "Player 2", "Player 3", "Player 4", "Player 5", "Player 6", "Player 7", "Player 8", "Player 9", "Player 10", "Player 11"],
      injuries: [],
      suspensions: [],
      stats: {
        homeXG: 1.8,
        awayXG: 1.2,
        homePossession: 55,
        homeShotsOnTarget: 5,
        awayShotsOnTarget: 3,
        homeCorners: 6,
        awayCorners: 4
      },
      keyFactors: [
        "First goal will be crucial.",
        "Set-piece dominance."
      ],
      tournamentImplications: "Crucial points for progression from the group."
    };

    const prediction = await this.prisma.prediction.upsert({
      where: { matchId: match.id },
      update: {
        homePct: homeWin,
        awayPct: awayWin,
        drawPct: draw,
        predictedScore: pScore,
        winner: winner,
        confidence: 75,
        payload: payload,
        model: 'fallback-generator',
        publishAt: new Date(),
      },
      create: {
        slug: `${match.slug}-prediction`,
        matchId: match.id,
        homePct: homeWin,
        awayPct: awayWin,
        drawPct: draw,
        predictedScore: pScore,
        winner: winner,
        confidence: 75,
        payload: payload,
        model: 'fallback-generator',
        publishAt: new Date(),
      }
    });

    return prediction;
  }
}
