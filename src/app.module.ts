import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuotesModule } from './quotes/quotes.module';
import { CronModule } from './cron/cron.module';

@Module({
  imports: [QuotesModule, ScheduleModule.forRoot(), CronModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
