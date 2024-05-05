import { Module } from '@nestjs/common';
import { UsersGateway } from './users.gateway';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from 'src/database/prisma.service';
import { UsersRepository } from './repositories/users-repository';
import { PrismaUsersRepository } from './repositories/implements/prisma-users-repository';
import { RedisModule } from 'src/redis/redis.module';
import { FriendsModule } from 'src/friends/friends.module';
import { FriendsRepository } from 'src/friends/repositories/friends-repository';
import { ProfilesModule } from 'src/profiles/profiles.module';

@Module({
  imports: [RedisModule, FriendsModule, ProfilesModule],
  providers: [
    UsersGateway,
    UsersService,
    PrismaService,
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
  ],
  controllers: [UsersController],
  exports: [UsersService, UsersRepository, UsersGateway],
})
export class UsersModule {}
