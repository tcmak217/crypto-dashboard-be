import { Controller, Get, Param } from '@nestjs/common';
import { QuotesService } from './quotes.service';

@Controller('quotes')
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) {}

  @Get()
  getAllQuotes() {
    return this.quotesService.selectAllQuotes();
  }

  @Get(':symbol')
  findOne(@Param('symbol') symbol: string) {
    return this.quotesService.selectOneQuote(symbol);
  }
}
