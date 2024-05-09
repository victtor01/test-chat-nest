import { Body, Controller, Post, Req } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  send(
    @Req() req: { user: User },
    @Body() body: { receiverProfileId: string; message: string },
  ) {
    return this.messagesService.send(
      req.user.id,
      body.receiverProfileId,
      body.message,
    );
  }
}
