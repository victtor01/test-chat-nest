import { Controller, Get, Param, Req } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { ConversationsService } from './conversations.service';

@Controller('conversations')
export class ConversationsController {
  constructor(private readonly conversationsService: ConversationsService) {}

  @Get(':id')
  getById(@Req() req: { user: User }, @Param('id') id: string) {
    return this.conversationsService.findById({
      userId: req.user.id,
      conversationId: id,
    });
  }

  @Get()
  GetAllWithMessages(@Req() req: { user: User }) {
    return this.conversationsService.findWithMessages(req.user.id);
  }
}
