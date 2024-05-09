import { BadRequestException, Injectable } from '@nestjs/common';
import { ProfilesService } from 'src/profiles/profiles.service';
import { RedisService } from 'src/redis/redis.service';
import { UsersService } from 'src/users/users.service';
import { MessagesGateway } from './messages.gateway';

@Injectable()
export class MessagesService {
  constructor(
    private readonly profilesService: ProfilesService,
    private readonly messagesGateway: MessagesGateway,
  ) {}

  async send(senderId: string, receiverProfileId: string, message: string) {
    // get profileId of sender
    const receiver = await this.profilesService.findById(receiverProfileId);

    if (!receiver?.userId) throw new BadRequestException('receiver not found');

    const { userId: receiverId } = receiver;

    //const dataReceiver = await this.redis.get<any>(receiverId);
    
    // post in database message

    await this.messagesGateway.sendMessage({
      senderId,
      receiverId,
      message,
    });
  }
}
