import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Cache } from 'cache-manager';

@Injectable()
export class QuotesService {
  constructor(
    private prisma: PrismaService,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {}

  async selectAllQuotes() {
    const cacheKey = 'allQuotes';
    const cachedResult = await this.cacheService.get(cacheKey);
    if (cachedResult) {
      return cachedResult;
    }

    const result = await this.prisma.quote.findMany();
    await this.cacheService.set(cacheKey, result, 15000);

    return result;
  }

  async selectOneQuote(symbol: string) {
    return await this.prisma.quote.findFirst({
      where: {
        symbol,
      },
    });
  }
}
