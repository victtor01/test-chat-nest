import { User } from 'src/users/entities/user.entity';

export class Message {
  id: string;
  message: string;
  senderId: string;
  receiverId: string;

  sender: User;
  receiver: User;

  createdAt: Date;
  updatedAt: Date;
}

/* 
  id      String @id @unique @default(uuid())
  message String

  senderId   String
  sender     User   @relation("sender", fields: [senderId], references: [id])
  receiverId String
  receiver   User   @relation("receiver", fields: [receiverId], references: [id])

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("private_messages")
*/
