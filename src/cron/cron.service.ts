import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { lastValueFrom, map } from 'rxjs';

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
  constructor(private readonly httpService: HttpService) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  async getQuote() {
    const observable = await this.httpService
      .get(coincapAPI)
      .pipe(map((response) => response.data));
    const data = await lastValueFrom(observable);
    console.log(data);
  }
}
