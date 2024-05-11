import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../entities/user.entity';

export abstract class UsersRepository {
  abstract findOneFull(userId: string): Promise<User>;
  abstract create(body: CreateUserDto): Promise<User>;
  abstract findOneByEmail(email: string): Promise<User>;
  abstract findOneById(userId: string): Promise<User>;
  abstract connectFriend(userId: string, friend: string): Promise<any>;
  abstract findByNickname(nickname: string): Promise<User>
}
