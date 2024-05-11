import { Conversation } from 'src/conversations/entities/conversation.entity';
import { User } from 'src/users/entities/user.entity';

export class CreateMessageDto {
  text: string;
  conversationId: string;
  senderId: string;
}
