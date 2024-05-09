import { Injectable } from '@nestjs/common';
import ProfileRepository from '../profile-repository';
import { Profile } from 'src/profiles/entities/profile.entity';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class PrismaProfileRepository implements ProfileRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: Profile): Promise<Profile> {
    return this.prisma.profile.create({
      data,
    });
  }

  findByNickname(nickname: string): Promise<Profile> {
    return this.prisma.profile.findUnique({
      where: {
        nickname,
      },
    });
  }

  findById(id: string): Promise<Profile> {
    return this.prisma.profile.findUnique({
      where: {
        id,
      },
    });
  }
}
