import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class QuotesService {
  constructor(private prisma: PrismaService) {}
  async selectAllQuotes() {
    return await this.prisma.quote.findMany();
  }

  async selectOneQuote(symbol: string) {
    return await this.prisma.quote.findFirst({
      where: {
        symbol,
      },
    });
  }
}
