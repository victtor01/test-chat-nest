import { Module } from '@nestjs/common';
import { ProfilesController } from './profiles.controller';
import { ProfilesService } from './profiles.service';
import { PrismaService } from 'src/database/prisma.service';
import ProfileRepository from './repositories/profile-repository';
import { PrismaProfileRepository } from './repositories/implements/prisma-profile-repository';

@Module({
  controllers: [ProfilesController],
  providers: [
    ProfilesService,
    PrismaService,
    {
      provide: ProfileRepository,
      useClass: PrismaProfileRepository,
    },
  ],
  exports: [ProfilesService, ProfileRepository],
})
export class ProfilesModule {}
