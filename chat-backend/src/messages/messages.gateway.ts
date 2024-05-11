import { RedisService } from 'src/redis/redis.service';
import { UseGuards } from '@nestjs/common';
import { Server } from 'socket.io';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import {
  ClientRedisData,
  WebSocketAuthGuard,
} from 'src/config/guards/gateway-auth.guard';
import { Message } from './entitites/message.entity';

/* type ISendMessage = {
  senderId: string;
  chatId: string;
  body: string;
};
 */
@UseGuards(WebSocketAuthGuard)
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MessagesGateway {
  constructor(private readonly redis: RedisService) {}

  @WebSocketServer() server: Server;

  async sendMessage(data: Message): Promise<void> {
    /*   
    const receiver =
      (await this.redis.get<ClientRedisData>(data.receiverId)) || null;
    const sender =
      (await this.redis.get<ClientRedisData>(data.senderId)) || null;
    */

    this.server.to(data.conversationId).emit('message', data);
  }
}
