import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { compare } from 'bcryptjs';
import { UsersService } from 'src/users/users.service';
import { AuthDto } from './dtos/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { RedisService } from 'src/redis/redis.service';
import { Response } from 'express';
import { ProfilesService } from 'src/profiles/profiles.service';

type AuthResponse = {
  access_token: string;
  refresh_token: string;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly redis: RedisService,
    private readonly profileService: ProfilesService,
  ) {}

  async auth(body: AuthDto, response: Response): Promise<AuthResponse> {
    try {
      // auth user with password

      const userdb =
        (await this.usersService.findOneByEmail(body?.email)) || null;

      if (!userdb?.email)
        throw new NotFoundException('usuário não encontrado!');

      const comparePassword = await compare(body.password, userdb.password);

      if (!comparePassword) throw new UnauthorizedException('senha incorreta!');

      // if user not have profile | create

      const word = userdb?.id.substring(0, 4);

      if (!userdb?.profile?.id) {
        const profile = await this.profileService.create({
          createProfileDto: { nickname: `user-${word}` },
          userId: userdb.id,
        });

        userdb.profile = profile;
      }

      const access_token = await this.jwtService.signAsync({
        id: userdb.id,
        name: userdb.name,
        email: userdb.email,
        profile: userdb.profile,
      });

      const refresh_token = await this.jwtService.signAsync(
        {
          id: userdb.id,
          name: userdb.name,
          email: userdb.email,
          profile: userdb.profile,
        },
        {
          expiresIn: '4d',
        },
      );

      response.cookie('access_token', access_token, {
        httpOnly: true,
        sameSite: 'strict',
        path: '/',
      });

      response.cookie('refresh_token', refresh_token, {
        httpOnly: true,
        sameSite: 'strict',
        path: '/',
      });

      await this.redis.save(
        userdb.id,
        JSON.stringify({
          profileId: userdb.profile.id,
          id: userdb.id,
        }),
      );

      return {
        access_token,
        refresh_token,
      };
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }

  async decode(acesss_token: string): Promise<any> {
    return await this.jwtService.decode(acesss_token);
  }
}
