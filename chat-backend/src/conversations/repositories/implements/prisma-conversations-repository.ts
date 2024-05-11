import { Injectable } from '@nestjs/common';
import { ConversationsRepository } from '../conversations-repository';
import { Conversation } from 'src/conversations/entities/conversation.entity';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class PrismaConversationsRepository implements ConversationsRepository {
  constructor(private readonly prisma: PrismaService) {}

  store(data: Conversation, usersIds: string[]): Promise<Conversation> {
    const { users: _, messages: __, ...props } = data;
    return this.prisma.conversation.create({
      data: {
        ...props,
        users: {
          connect: usersIds.map((userId: string) => ({ id: userId })),
        },
      },
    });
  }

  findWithMessages(userId: string): Promise<Conversation[]> {
    return this.prisma.conversation.findMany({
      where: {
        users: {
          some: {
            id: {
              in: [userId],
            },
          },
        },
      },
      include: {
        messages: {
          select: {
            id: true,
          },
        },
        users: {
          select: {
            nickname: true,
            profileId: true,
          },
        },
      },
    });
  }

  findById(conversationId: string): Promise<Conversation> {
    return this.prisma.conversation.findUnique({
      where: { id: conversationId },
      include: {
        users: {
          select: {
            id: true,
            profileId: true,
            nickname: true,
          },
        },
        messages: {
          include: {
            sender: {
              select: {
                name: true,
                profileId: true,
                nickname: true,
              },
            },
          },
          orderBy: {
            createdAt: 'asc', // Organize as mensagens por ordem ascendente de data
          },
        },
      },
    });
  }
}
