import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { Profile } from './entities/profile.entity';
import { CreateProfileDto } from './dtos/create-profile.dto';
import ProfileRepository from './repositories/profile-repository';

type PropsCreate = {
  createProfileDto: CreateProfileDto;
  userId: string;
};

@Injectable()
export class ProfilesService {
  constructor(private readonly profileRepo: ProfileRepository) {}

  async create(data: PropsCreate): Promise<Profile> {
    const profile = new Profile(data.createProfileDto, data.userId);
    return await this.profileRepo.create(profile);
  }

  findById(profileId: string): Promise<Profile> {
    return this.profileRepo.findById(profileId);
  }
  

  async findByNickname(nickname: string): Promise<Profile> {
    return await this.profileRepo.findByNickname(nickname);
  }
}
