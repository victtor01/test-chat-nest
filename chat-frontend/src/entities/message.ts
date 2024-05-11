import { Conversation } from "./conversation";
import { User } from "./user";

export interface Message {
  id: string;
  text: string;

  conversationId: string;
  conversation?: Conversation;

  senderId: string;
  sender?: Partial<User>;

  createdAt: Date;
  updatedAt: Date;
}
