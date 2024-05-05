import { Body, Controller, Post, Req } from '@nestjs/common';
import { CreateProfileDto } from './dtos/create-profile.dto';
import { User } from 'src/users/entities/user.entity';
import { ProfilesService } from './profiles.service';

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profileService: ProfilesService) {}

  @Post()
  create(@Body() body: CreateProfileDto, @Req() req: { user: User }) {
    return this.profileService.create({
      createProfileDto: body,
      userId: req.user.id,
    });
  }
}
