import { Module } from '@nestjs/common';
import { ConversationsService } from './conversations.service';
import { PrismaService } from 'src/database/prisma.service';
import { ConversationsRepository } from './repositories/conversations-repository';
import { PrismaConversationsRepository } from './repositories/implements/prisma-conversations-repository';
import { ConversationsController } from './conversations.controller';
import { ConversationsGateway } from './conversations.gateway';
import { RedisModule } from 'src/redis/redis.module';
import { RedisService } from 'src/redis/redis.service';

@Module({
  imports: [RedisModule],
  providers: [
    ConversationsService,
    PrismaService,
    {
      provide: ConversationsRepository,
      useClass: PrismaConversationsRepository,
    },
    ConversationsGateway,
  ],
  exports: [ConversationsService, ConversationsRepository],
  controllers: [ConversationsController],
})
export class ConversationsModule {}
