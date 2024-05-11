import { randomUUID } from 'crypto';
import { CreateUserDto } from '../dtos/create-user.dto';

export class User {
  id: string = randomUUID();
  profileId: string = randomUUID();
  name: string;
  email: string;
  password: string;
  nickname: string;

  friends?: Partial<User>[];

  constructor(props: CreateUserDto) {
    Object.assign(this, props);
  }
}
