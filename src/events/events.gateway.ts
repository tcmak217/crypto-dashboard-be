import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { QuotesService } from 'src/quotes/quotes.service';

@WebSocketGateway({ cors: true })
export class EventsGateway {
  constructor(private quotesService: QuotesService) {}
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('quotes')
  async handleMessage(@MessageBody() body: any) {
    setInterval(async () => {
      const quotes = await this.quotesService.selectAllQuotes();
      this.server.emit('quotes', quotes);
    }, 15000);
  }
}
