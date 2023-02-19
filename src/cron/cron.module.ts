import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CronService } from './cron.service';

@Module({
  imports: [HttpModule, PrismaModule],
  providers: [CronService],
})
export class CronModule {}
