import { Module, forwardRef } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { PrismaService } from 'src/database/prisma.service';
import { PrismaFriendsRepository } from './repositories/implements/prisma-friends-repository';
import { FriendsRepository } from './repositories/friends-repository';
import { FriendsRequestsController } from './friends.controller';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { RedisService } from 'src/redis/redis.service';
import { RedisModule } from 'src/redis/redis.module';
import { ConversationsService } from 'src/conversations/conversations.service';
import { ConversationsModule } from 'src/conversations/conversations.module';

@Module({
  imports: [forwardRef(() => UsersModule), ConversationsModule],
  providers: [
    FriendsService,
    PrismaService,
    RedisService,
    {
      provide: FriendsRepository,
      useClass: PrismaFriendsRepository,
    },
  ],
  exports: [FriendsService, FriendsRepository],
  controllers: [FriendsRequestsController],
})
export class FriendsModule {}
