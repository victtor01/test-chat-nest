import { FriendRequest } from '@prisma/client';
import { CreateFriendRequest } from '../dtos/create-friend-request.dto';

export abstract class FriendsRepository {
  abstract create(data: CreateFriendRequest): Promise<FriendRequest>;
  abstract delete(id: string): Promise<any>;
  abstract findById(id: string): Promise<FriendRequest>;
  abstract findOneByReceiver(receiverId: string): Promise<FriendRequest>;
  abstract findOneBySenderAndReceiver(
    senderId: string,
    receiverId: string,
  ): Promise<FriendRequest>;
  abstract findByUserReceiver(receiver: string): Promise<FriendRequest[]>;
}
