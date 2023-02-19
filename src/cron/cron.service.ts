import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { lastValueFrom, map } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';

const cryptoName: string[] = [
  'bitcoin',
  'ethereum',
  'litecoin',
  'monero',
  'ripple',
  'xrp',
  'dogecoin',
  'dash',
  'maidsafecoin',
  'lisk',
  'storjcoin-x',
];

const coincapAPI =
  'https://api.coincap.io/v2/assets?ids=' + cryptoName.join(',');

@Injectable()
export class CronService {
  constructor(
    private readonly httpService: HttpService,
    private readonly prisma: PrismaService,
  ) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  async getQuote() {
    const observable = await this.httpService
      .get(coincapAPI)
      .pipe(map((response) => response.data));
    const data = await lastValueFrom(observable);
    for (let quote of data.data) {
      await this.prisma.quote.update({
        where: {
          symbol: quote.symbol.toLowerCase(),
        },
        data: {
          price: Number(quote.priceUsd),
          volume: Number(quote.volumeUsd24Hr),
          change: Number(quote.changePercent24Hr),
          timestamp: new Date(data.timestamp),
        },
      });
    }
    // console.log(data);
  }
}
