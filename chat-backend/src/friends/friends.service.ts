import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateFriendRequest } from './dtos/create-friend-request.dto';
import { FriendsRepository } from './repositories/friends-repository';
import { FriendRequest } from '@prisma/client';
import { UsersService } from 'src/users/users.service';
import { UsersRepository } from 'src/users/repositories/users-repository';

@Injectable()
export class FriendsService {
  constructor(
    private readonly friendsRepo: FriendsRepository,
    private readonly usersRepo: UsersRepository,
  ) {}

  async create(data: CreateFriendRequest): Promise<FriendRequest> {
    return await this.friendsRepo.create(data);
  }

  findByReceiver(userId: string): Promise<FriendRequest[]> {
    return this.friendsRepo.findByUserReceiver(userId);
  }

  async accept(receiverId: string, requestId: string): Promise<any> {
    try {
      // get friend request in database
      const requestdb = await this.friendsRepo.findById(requestId);
      const { senderId } = requestdb;

      const requestOfSender =
        await this.friendsRepo.findOneByReceiver(senderId);

      if (requestOfSender?.id) {
        await this.friendsRepo.delete(requestOfSender?.id);
      }

      if (requestdb.receiverId !== receiverId)
        throw new UnauthorizedException('usuário não pode fazer isso');

      // connect friends
      await this.usersRepo.connectFriend(
        requestdb.senderId,
        requestdb.receiverId,
      );
      
      await this.usersRepo.connectFriend(
        requestdb.receiverId,
        requestdb.senderId,
      );

      // delete friendRequest
      await this.friendsRepo.delete(requestdb.id);

      return {
        error: false,
      };
    } catch (error) {
      throw new BadRequestException(
        'houve um erro ao tentar aceitar solicitação de amizade',
      );
    }
  }

  async declineFriendRequest(
    receiverId: string,
    requestId: string,
  ): Promise<any> {
    // get friend request in database
    const friendRequestDb = await this.friendsRepo.findById(requestId);

    // if not exists
    if (!friendRequestDb?.id)
      throw new BadRequestException('não há pendências de solicitações');

    if (friendRequestDb?.receiverId !== receiverId) {
      throw new UnauthorizedException(
        'você não tem permissão para fazer isso!',
      );
    }

    // delete
    return await this.friendsRepo.delete(friendRequestDb.id);
  }
}
