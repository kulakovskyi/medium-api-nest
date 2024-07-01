import { UserEntity } from '../user.entity';

export type UserType = Omit<UserEntity, 'hashPassword'>;

export interface UserResponseInterface {
  user: UserType & { token: string };
}
