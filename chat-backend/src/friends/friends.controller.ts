import { Controller, Delete, Get, Param, Put, Req } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { FriendsService } from './friends.service';

@Controller('friendsRequests')
export class FriendsRequestsController {
  constructor(private readonly friendsRequetsService: FriendsService) {}

  @Get()
  getAll(@Req() req: { user: User }) {
    return this.friendsRequetsService.findByReceiver(req.user.id);
  }

  @Put('/accept/:id')
  accept(@Req() req: { user: User }, @Param('id') requestId: string) {
    return this.friendsRequetsService.accept(req.user.id, requestId);
  }

  @Delete('/decline/:id')
  declineFriendRequest(
    @Req() req: { user: User },
    @Param('id') requestId: string,
  ) {
    console.log('teste');
    return this.friendsRequetsService.declineFriendRequest(
      req.user.id,
      requestId,
    );
  }
}
