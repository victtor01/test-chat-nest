import { UUID, randomUUID } from 'crypto';
import { CreateProfileDto } from '../dtos/create-profile.dto';

export class Profile {
  id: string = randomUUID();
  nickname: string;
  createdAt: Date = new Date();
  updatedAt: Date = new Date();
  userId: string;

  constructor(props: CreateProfileDto, userId: string) {
    this.userId = userId;
    Object.assign(this, props);
  }
}
