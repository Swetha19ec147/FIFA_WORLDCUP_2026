import { Controller, Get, Param, Query, Post, Body, UseGuards } from '@nestjs/common';
import { NewsService } from './news.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  findAll(@Query('limit') limit?: number) {
    return this.newsService.findAll(limit);
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.newsService.findOne(slug);
  }

  @Post('webhook')
  @UseGuards(JwtAuthGuard)
  handleWebhook(@Body() payload: any) {
    return this.newsService.createFromWebhook(payload);
  }
}
