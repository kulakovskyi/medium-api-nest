import { UserType } from '../../user/types/user-response.interface';

export interface ProfileResponseInterface {
  profile: {
    username: string;
    bio: string;
    image: string;
    following: boolean;
  };
}

export type ProfileType = UserType & { following: boolean };
