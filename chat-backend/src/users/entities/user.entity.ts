import { Profile } from 'src/profiles/entities/profile.entity';

export class User {
  id: string;
  name: string;
  email: string;
  password: string;

  friends?: User[];
  profile?: Profile;
}
