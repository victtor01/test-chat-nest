import { PrismaService } from 'src/database/prisma.service';
import { FriendsRepository } from '../friends-repository';
import { Injectable } from '@nestjs/common';
import { CreateFriendRequest } from 'src/friends/dtos/create-friend-request.dto';
import { FriendRequest } from '@prisma/client';

@Injectable()
export class PrismaFriendsRepository implements FriendsRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateFriendRequest): Promise<FriendRequest> {
    return this.prisma.friendRequest.create({
      data,
    });
  }

  delete(id: string): Promise<any> {
    return this.prisma.friendRequest.delete({
      where: {
        id,
      },
    });
  }

  findOneByReceiver(receiverId: string): Promise<FriendRequest> {
    return this.prisma.friendRequest.findFirst({
      where: {
        receiverId,
      },
    });
  }

  findOneBySenderAndReceiver(
    senderId: string,
    receiverId: string,
  ): Promise<FriendRequest> {
    return this.prisma.friendRequest.findFirst({
      where: {
        receiverId,
        senderId,
      },
    });
  }

  findById(id: string): Promise<FriendRequest> {
    return this.prisma.friendRequest.findUnique({
      where: {
        id,
      },
    });
  }

  findByUserReceiver(receiver: string): Promise<FriendRequest[]> {
    return this.prisma.friendRequest.findMany({
      where: { receiverId: receiver },
      include: {
        sender: true,
      },
    });
  }
}
