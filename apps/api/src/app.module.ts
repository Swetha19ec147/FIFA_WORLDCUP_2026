import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TeamsModule } from './teams/teams.module';
import { PrismaModule } from './prisma/prisma.module';
import { PlayersModule } from './players/players.module';
import { MatchesModule } from './matches/matches.module';
import { StandingsModule } from './standings/standings.module';
import { PredictionsModule } from './predictions/predictions.module';
import { NewsModule } from './news/news.module';
import { IngestionModule } from './ingestion/ingestion.module';
import { LiveModule } from './live/live.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ScheduleModule.forRoot(), TeamsModule, PrismaModule, PlayersModule, MatchesModule, StandingsModule, PredictionsModule, NewsModule, IngestionModule, LiveModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
