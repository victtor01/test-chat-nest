import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { MessagesGateway } from './messages.gateway';
import { RedisModule } from 'src/redis/redis.module';
import { RedisService } from 'src/redis/redis.service';
import { ProfilesModule } from 'src/profiles/profiles.module';

@Module({
  imports: [RedisModule, ProfilesModule],
  controllers: [MessagesController],
  providers: [MessagesService, MessagesGateway, RedisService],
})
export class MessagesModule {}
