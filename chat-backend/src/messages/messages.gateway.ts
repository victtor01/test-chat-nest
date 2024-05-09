import { UseGuards } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import {
  ClientRedisData,
  WebSocketAuthGuard,
} from 'src/config/guards/gateway-auth.guard';
import { RedisService } from 'src/redis/redis.service';

type DataMessage = {
  senderId: string;
  receiverId: string;
  message: string;
};

@UseGuards(WebSocketAuthGuard)
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MessagesGateway {
  constructor(private readonly redis: RedisService) {}

  @WebSocketServer() server: Server;

  async sendMessage(data: DataMessage): Promise<void> {
    const receiver =
      (await this.redis.get<ClientRedisData>(data.receiverId)) || null;
    const sender =
      (await this.redis.get<ClientRedisData>(data.senderId)) || null;
    
    if (receiver?.socket && sender?.profileId) {
      this.server.to(receiver?.socket).emit(sender?.profileId, {
        senderId: sender.id,
        receiverId: receiver.id,
        message: data.message,
      });
    }
  }
}
