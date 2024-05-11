import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Client } from 'socket.io/dist/client';
import { ConversationsRepository } from './repositories/conversations-repository';
import { UseGuards } from '@nestjs/common';
import { WebSocketAuthGuard } from 'src/config/guards/gateway-auth.guard';

@UseGuards(WebSocketAuthGuard)
@WebSocketGateway()
export class ConversationsGateway {
  constructor(private readonly conversationRepo: ConversationsRepository) {}

  @WebSocketServer() server: Server;

  @SubscribeMessage('joinRoom')
  async handleMessage(client: Socket, roomId: string): Promise<void> {
    const conversation = await this.conversationRepo.findById(roomId);

    const head = client?.handshake?.headers?.user as any;
    console.log(head);

    if (conversation?.users?.some((user) => user.id === head?.id)) {
      client.join(roomId);
    }
  }
}
