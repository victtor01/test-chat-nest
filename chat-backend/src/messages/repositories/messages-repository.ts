import { Message } from '../entitites/message.entity';

export abstract class MessagesRepository {
  abstract store(): Promise<Message>;
}
