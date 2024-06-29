import { UserEntity } from '../user.entity';

type UserType = Omit<UserEntity, 'hashPassword'>;

export interface UserResponseInterface {
  user: UserType & { token: string };
}
