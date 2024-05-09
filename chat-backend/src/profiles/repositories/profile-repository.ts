import { Profile } from '../entities/profile.entity';

export default abstract class ProfileRepository {
  abstract create(data: Profile): Promise<Profile>;
  abstract findByNickname(nickname: string): Promise<Profile>;
  abstract findById(id: string): Promise<Profile>;
}
