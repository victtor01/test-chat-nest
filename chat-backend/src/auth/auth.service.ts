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

type AuthResponse = {
  access_token: string;
  refresh_token: string;
};

export interface TokenPayload {
  id: string;
  name: string;
  email: string;
  profileId: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly redis: RedisService,
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

      const access_token = await this.jwtService.signAsync({
        id: userdb.id,
        name: userdb.name,
        email: userdb.email,
        profileId: userdb.profileId,
      });

      const refresh_token = await this.jwtService.signAsync(
        {
          id: userdb.id,
          name: userdb.name,
          email: userdb.email,
          profileId: userdb.profileId,
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

      const profile: Partial<{ nickname: string; id: string }> = {
        nickname: userdb?.nickname,
        id: userdb?.profileId,
      };

      response.cookie('profile', JSON.stringify(profile));

      await this.redis.save(
        userdb.id,
        JSON.stringify({
          profileId: userdb.profileId,
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
