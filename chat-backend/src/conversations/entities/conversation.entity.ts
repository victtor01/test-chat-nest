import { Message } from 'src/messages/entitites/message.entity';
import { User } from 'src/users/entities/user.entity';
import { CreateConversationDto } from '../dtos/create-conversation.dto';
import { randomUUID } from 'crypto';

export class Conversation {
  id?: string;
  isGroup?: boolean | null;
  name?: string | null;
  createdAt?: Date | string;
  updatedAt?: Date | string;

  messages?: Partial<Message>[];
  users?: Partial<User>[];

  constructor(props: CreateConversationDto, id?: string) {
    Object.assign(this, props);
    this.id = id || randomUUID();
  }
}

/* 
  id      String   @id @unique @default(uuid())
  isGroup Boolean? @default(false)
  name    String?

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  messages Message[]
  users    User[]
*/
