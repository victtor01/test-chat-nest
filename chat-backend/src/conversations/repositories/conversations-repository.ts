import { Conversation } from '../entities/conversation.entity';

export abstract class ConversationsRepository {
  abstract store(data: Conversation, users: string[]): Promise<Conversation>;
  abstract findById(conversationId: string): Promise<Conversation>;
  abstract findWithMessages(userId: string): Promise<Conversation[]>
}
