import { Controller, Get, Param, Query } from '@nestjs/common';
import { MatchesService } from './matches.service';

@Controller('matches')
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) {}

  @Get()
  findAll(@Query('status') status?: string) {
    return this.matchesService.findAll(status);
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.matchesService.findOne(slug);
  }
}
