import { Module } from '@nestjs/common';
import { QuotesModule } from 'src/quotes/quotes.module';
import { EventsGateway } from './events.gateway';

@Module({
  imports: [QuotesModule],
  providers: [EventsGateway],
})
export class EventsModule {}
