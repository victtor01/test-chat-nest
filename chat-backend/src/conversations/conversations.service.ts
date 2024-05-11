import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateConversationDto } from './dtos/create-conversation.dto';
import { Conversation } from './entities/conversation.entity';
import { ConversationsRepository } from './repositories/conversations-repository';
import * as dayjs from 'dayjs';

type IFindById = {
  userId: string;
  conversationId: string;
};

@Injectable()
export class ConversationsService {
  constructor(
    private readonly conversationsRepository: ConversationsRepository,
  ) {}

  async store(data: CreateConversationDto, usersIds: string[]) {
    const conversation = new Conversation({
      name: data.name,
      isGroup: data.isGroup,
    });

    return await this.conversationsRepository.store(conversation, usersIds);
  }

  async findFull(data: IFindById): Promise<Conversation> {
    return await this.conversationsRepository.findById(data.conversationId);
  }

  async findWithMessages(userId: string) {
    const conversations =
      await this.conversationsRepository.findWithMessages(userId);

    const filter = conversations.filter(
      (conversation) => conversation?.messages?.length > 0,
    );

    filter?.forEach((object) => delete object?.messages);

    console.log(filter);
    
    return filter;
  }

  async findById(data: IFindById): Promise<Conversation> {
    const conversation = await this.conversationsRepository.findById(
      data.conversationId,
    );

    const userPertences =
      conversation?.users?.filter((user) => user.id === data.userId) || null;

    if (!userPertences?.[0]?.id) {
      throw new BadRequestException('você não pode fazer isso!');
    }

    conversation?.users.forEach((element) => {
      delete element?.password;
      delete element?.friends;
      delete element?.id;
    });

    return conversation;
  }
}
