import { Injectable, Logger, UseGuards } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WebSocketAuthGuard } from 'src/config/guards/gateway-auth.guard';
import { RedisService } from 'src/redis/redis.service';

@UseGuards(WebSocketAuthGuard)
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class UsersGateway {
  constructor(private readonly redis: RedisService) {}

  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('USERS_GATEWAY');

  /* @SubscribeMessage('send_message')
  async sendMessage(
    client: Socket,
    data: { message: string; receiverId: string },
  ): Promise<void> {
    const receiver = await this.redis.get<any>(data.receiverId);
    const sender = client?.handshake?.headers?.user as any;
    this.server.to(receiver?.socket).emit(sender?.id, {
      senderId: sender.id,
      receiverId: receiver.id,
      message: data.message,
    });
  } */

  async emitNotification(userId: string, message: string): Promise<void> {
    try {
      const user = await this.redis.get<any>(userId);
      this.server.to(user?.socket).emit('notifications', message);
    } catch (error) {
      this.logger.error('usuário do socket da notificação não conectado!');
    }
  }
}
