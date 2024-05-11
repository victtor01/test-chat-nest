import { Conversation } from 'src/conversations/entities/conversation.entity';
import { User } from 'src/users/entities/user.entity';

export class Message {
  id: string;
  text: string;

  conversationId: string;
  conversation?: Conversation;

  senderId: string;
  sender?: Partial<User>;

  createdAt: Date;
  updatedAt: Date;
}

/* 
  id   String @id @unique @default(uuid())
  text String

  conversationId String
  conversation   Conversation @relation(fields: [conversationId], references: [id], onDelete: Cascade)

  senderId String
  sender   User   @relation(fields: [senderId], references: [id], onDelete: Cascade)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("messages")
*/
