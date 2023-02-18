import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { lastValueFrom, map } from 'rxjs';

@Injectable()
export class CronService {
  constructor(private readonly httpService: HttpService) {}
  // Get quote from https://api.cryptonator.com/api/ticker/btc-usd every 10 seconds
  @Cron(CronExpression.EVERY_10_SECONDS)
  async getQuote() {
    const observable = await this.httpService
      .get('https://api.cryptonator.com/api/ticker/btc-usd')
      .pipe(map((response) => response.data));
    const data = await lastValueFrom(observable);
    console.log(data);
  }
}
