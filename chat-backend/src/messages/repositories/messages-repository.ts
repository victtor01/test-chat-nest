import { CreateMessageDto } from '../dtos/create-message.dto';
import { Message } from '../entitites/message.entity';

export abstract class MessagesRepository {
  abstract store(data: CreateMessageDto): Promise<Message>;
}
