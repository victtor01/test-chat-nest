import { BadRequestException, Logger, UseGuards } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WebSocketAuthGuard } from './config/guards/gateway-auth.guard';

@UseGuards(WebSocketAuthGuard)
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger: Logger = new Logger('APP_GATEWAY');
  @WebSocketServer() server: Server;

  @SubscribeMessage('connection')
  async connect(client: Socket) {
    //console.log('connected: ', client.handshake.headers.user);
    console.log('connected: ', client.id);
  }

  afterInit() {
    this.logger.warn('init gateway!');
  }

  handleConnection(client: Socket) {
    this.logger.log(' ');
    this.logger.warn('connected: ', client.id);
    this.logger.log(' ');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(' ');
    this.logger.warn('disconnected: ', client.id);
    /* this.logger.warn(client.handshake); */
    this.logger.log(' ');
  }
}
