import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { Public } from 'src/config/constants';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post()
  store(@Body() body: CreateUserDto): Promise<Omit<User, 'id' | 'password'>> {
    return this.usersService.create(body);
  }

  @Post('/friends/add')
  addFriends(@Body() body: { nickname: string }, @Req() req: { user: User }) {
    return this.usersService.addFriend(req.user.id, body.nickname);
  }

  @Get('/friends')
  allFriends(@Req() req: { user: User }) {
    return this.usersService.allFriends(req.user.id);
  }
}
