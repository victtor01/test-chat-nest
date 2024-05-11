import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as cookieParser from 'cookie-parser';
import { TokenPayload } from 'src/auth/auth.service';
import { RedisService } from 'src/redis/redis.service';

//const token = this.extractTokenFromHeader(client.handshake.auth.passport);

export type ClientDataHeader = {
  profileId: string;
  socket: string;
  id: string;
};

export type ClientRedisData = {
  profileId: string;
  socket: string;
  name: string;
  id: string;
};

@Injectable()
export class WebSocketAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private redis: RedisService,
  ) {}

  private logger: Logger = new Logger('WEB_SOCKET_AUTH_GUARD');

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const client = context.switchToWs().getClient();

    /* console.log(client.handshake); */
    // cookies parter to get access_token
    cookieParser()(client.handshake, null, () => {});

    const token: string | null =
      client.handshake?.cookies?.access_token || null;

    if (!token)
      throw new UnauthorizedException('não foi encontrado um passport!');

    try {
      const decoded: TokenPayload = await this.jwtService.verifyAsync(token);

      //this.logger.warn(decoded);

      await this.redis.save(decoded.id, {
        profileId: decoded.profileId, // add new profile id
        name: decoded.name,
        socket: client.id,
        id: decoded.id,
      });

      client.handshake.headers.user = {
        profileId: decoded.profileId,
        socket: client.id,
        id: decoded.id,
      };

      return true;
    } catch (error) {
      this.logger.fatal(error);
      return false;
    }
  }
}
