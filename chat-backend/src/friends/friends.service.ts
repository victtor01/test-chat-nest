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
import { ConversationsService } from 'src/conversations/conversations.service';
import { CreateConversationDto } from 'src/conversations/dtos/create-conversation.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class FriendsService {
  constructor(
    private readonly friendsRepo: FriendsRepository,
    private readonly usersRepo: UsersRepository,
    private readonly conversationsService: ConversationsService,
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

      // get request of sender in database

      const requestOfSender =
        await this.friendsRepo.findOneByReceiver(senderId);

      // verify errors

      if (requestdb.receiverId !== receiverId)
        throw new UnauthorizedException('usuário não pode fazer isso');

      // delete request of outher user

      if (requestOfSender?.id) {
        await this.friendsRepo.delete(requestOfSender?.id);
      }

      // connect friends

      await this.usersRepo.connectFriend(
        requestdb.senderId,
        requestdb.receiverId,
      );

      await this.usersRepo.connectFriend(
        requestdb.receiverId,
        requestdb.senderId,
      );

      // create conversation

      const createConversation: CreateConversationDto = {
        isGroup: false,
        name: null,
      };

      const usersInConversation: string[] = [
        requestdb.senderId,
        requestdb.receiverId,
      ];

      await this.conversationsService.store(
        createConversation,
        usersInConversation,
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
