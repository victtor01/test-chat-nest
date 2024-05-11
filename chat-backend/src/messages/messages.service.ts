import { BadRequestException, Injectable } from '@nestjs/common';
import { RedisService } from 'src/redis/redis.service';
import { UsersService } from 'src/users/users.service';
import { MessagesGateway } from './messages.gateway';
import { ConversationsService } from 'src/conversations/conversations.service';
import { CreateMessageDto } from './dtos/create-message.dto';
import { Message } from './entitites/message.entity';
import { MessagesRepository } from './repositories/messages-repository';

@Injectable()
export class MessagesService {
  constructor(
    private readonly messagesRepo: MessagesRepository,
    private readonly messagesGateway: MessagesGateway,
    private readonly conversationsService: ConversationsService,
  ) {}

  async store(data: CreateMessageDto): Promise<Message> {
    return this.messagesRepo.store(data);
  }

  async send(senderId: string, chatId: string, message: string) {
    // get profileId of sender
    const conversation = await this.conversationsService.findFull({
      userId: senderId,
      conversationId: chatId,
    });

    console.log(conversation);

    if (!conversation?.users?.some((user) => user.id === senderId))
      throw new BadRequestException('receiver not found');

    const messageCreated = await this.store({
      conversationId: conversation.id,
      text: message,
      senderId,
    });

    await this.messagesGateway.sendMessage(messageCreated);
  }
}
