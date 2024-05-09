import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { SECRET_KEY } from './constants/secret';
import { constantsJWT } from './constants';
import { RedisService } from 'src/redis/redis.service';
import { RedisModule } from 'src/redis/redis.module';
import { ProfilesModule } from 'src/profiles/profiles.module';

@Module({
  imports: [
    RedisModule,
    UsersModule,
    ProfilesModule,
    JwtModule.register({
      global: true,
      secret: SECRET_KEY,
      signOptions: { expiresIn: constantsJWT.token_expiration },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
