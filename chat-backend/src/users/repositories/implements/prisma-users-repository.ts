import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { UsersRepository } from '../users-repository';
import { PrismaService } from 'src/database/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(body: CreateUserDto): Promise<User> {
    return this.prisma.user.create({
      data: body,
    });
  }

  findOneByEmail(email: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        profile: true,
      },
    });
  }

  findOneFull(userId: string): Promise<any> {
    return this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        friends: {
          select: {
            name: true,
            profile: {
              select: {
                id: true,
                nickname: true,
              },
            },
          },
        },
      },
    });
  }

  findOneById(userId: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  }

  connectFriend(userId: string, friend: string): Promise<any> {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        friends: {
          connect: { id: friend },
        },
      },
    });
  }
}
