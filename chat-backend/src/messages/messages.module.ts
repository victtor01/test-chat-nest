import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { MessagesGateway } from './messages.gateway';
import { RedisModule } from 'src/redis/redis.module';
import { RedisService } from 'src/redis/redis.service';
import { ConversationsModule } from 'src/conversations/conversations.module';
import { PrismaService } from 'src/database/prisma.service';
import { MessagesRepository } from './repositories/messages-repository';
import PrismaMessagesRepository from './repositories/implements/prisma-messages-repository';

@Module({
  imports: [RedisModule, ConversationsModule],
  controllers: [MessagesController],
  providers: [
    MessagesService,
    MessagesGateway,
    PrismaService,
    {
      provide: MessagesRepository,
      useClass: PrismaMessagesRepository,
    },
  ],
})
export class MessagesModule {}
