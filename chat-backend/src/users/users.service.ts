import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersRepository } from './repositories/users-repository';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { UsersGateway } from './users.gateway';
import { FriendsService } from 'src/friends/friends.service';
import { send } from 'process';
import { FriendRequest } from '@prisma/client';
import { ProfilesService } from 'src/profiles/profiles.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepo: UsersRepository,
    private readonly usersGateway: UsersGateway,
    private readonly friendsService: FriendsService,
    private readonly profilesService: ProfilesService,
  ) {}

  private logger: Logger = new Logger('USER_SERVICE');
  private salt: number = 10;

  private async bcryptPass(password: string) {
    return await bcrypt.hash(password, this.salt);
  }

  async create(body: CreateUserDto): Promise<Omit<User, 'id' | 'password'>> {
    body.password = await this.bcryptPass(body.password);

    const createdUser = await this.usersRepo.create(body);

    await this.profilesService.create({
      userId: createdUser.id,
      createProfileDto: {
        nickname: createdUser.name,
      },
    });

    const { id, password, ...props } = createdUser;

    return props;
  }

  findOneByEmail(email: string): Promise<User> {
    return this.usersRepo.findOneByEmail(email);
  }

  async allFriends(userId: string): Promise<Partial<User>> {
    const user = await this.usersRepo.findOneFull(userId);
    const { password, id, ...props } = user;
    return props;
  }

  async addFriend(sender: string, nickname: string): Promise<any> {
    try {
      // get user of nickname
      const ReceiverProfile =
        await this.profilesService.findByNickname(nickname);

      const receiverId = ReceiverProfile.userId;

      console.log(receiverId);

      // verify if send request before
      const sends = await this.friendsService.findByReceiver(receiverId);

      sends?.forEach((element: FriendRequest) => {
        if (element?.senderId === sender) {
          throw new BadRequestException('convite já enviado!');
        }
      });

      // create new friendRequest
      await this.friendsService.create({
        senderId: sender,
        receiverId: receiverId,
      });

      // find user
      const user = await this.usersRepo.findOneById(sender);

      if (!user?.id) {
        this.logger.log(`usuário ${sender} não encontrado!`);
        throw new BadRequestException('usuário não encontrado');
      }

      // emit notification
      await this.usersGateway.emitNotification(
        receiverId,
        `${user.name} mandou uma solicitação!`,
      );

      return {
        error: false,
      };
    } catch (error) {
      this.logger.fatal(error);
      throw new BadRequestException(
        'Houve um erro ao tentar enviar solicitação de amizade!',
      );
    }
  }
}
