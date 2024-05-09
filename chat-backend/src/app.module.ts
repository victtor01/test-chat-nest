import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AppGateway } from './app.gateway';
import {
  CacheModule,
  CacheModuleAsyncOptions,
  CacheStore,
} from '@nestjs/cache-manager';
import { AppController } from './app.controller';
import { redisStore } from 'cache-manager-redis-store';
import { RedisService } from './redis/redis.service';
import { RedisModule } from './redis/redis.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { FriendsModule } from './friends/friends.module';
import { ServiceService } from './service/service.service';
import { MessagesModule } from './messages/messages.module';
import { ProfilesModule } from './profiles/profiles.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    RedisModule,
    FriendsModule,
    MessagesModule,
    ProfilesModule,
  ],
  controllers: [AppController],
  providers: [
    AppGateway,
    RedisService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    ServiceService,
  ],
  exports: [RedisService],
})

export class AppModule {}

/* CacheModule.register({
  host: 'http://localhost',
  port: '6379',
  auth_pass: 'admin',
  isGlobal: true,
  ttl: 30000,
  no_ready_check: true,
}), */