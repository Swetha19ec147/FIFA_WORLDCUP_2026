import { Controller, Get, Param, Query, Post, UseGuards } from '@nestjs/common';
import { PredictionsService } from './predictions.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('predictions')
export class PredictionsController {
  constructor(private readonly predictionsService: PredictionsService) {}

  @Get()
  findAll(@Query('limit') limit?: number) {
    return this.predictionsService.findAll(limit);
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.predictionsService.findOne(slug);
  }

  @Post(':matchId/generate')
  generatePrediction(@Param('matchId') matchId: string) {
    return this.predictionsService.generatePrediction(matchId);
  }
}
