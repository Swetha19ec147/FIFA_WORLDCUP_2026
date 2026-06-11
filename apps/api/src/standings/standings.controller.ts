import { Controller, Get, Param } from '@nestjs/common';
import { StandingsService } from './standings.service';

@Controller('standings')
export class StandingsController {
  constructor(private readonly standingsService: StandingsService) {}

  @Get()
  findAll() {
    return this.standingsService.findAll();
  }

  @Get(':group')
  findOne(@Param('group') group: string) {
    return this.standingsService.findOne(group);
  }
}
