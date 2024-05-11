import { Message } from 'src/messages/entitites/message.entity';
import { MessagesRepository } from '../messages-repository';
import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from 'src/messages/dtos/create-message.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export default class PrismaMessagesRepository implements MessagesRepository {
  constructor(private readonly prisma: PrismaService) {}

  store(data: CreateMessageDto): Promise<Message> {
    return this.prisma.message.create({
      data,
      include: {
        sender: {
          select: {
            nickname: true,
            profileId: true,
            name: true,
          },
        },
      },
    });
  }
}
