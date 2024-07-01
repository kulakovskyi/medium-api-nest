import { UserType } from '../../user/types/user-response.interface';
import { ApiProperty } from '@nestjs/swagger';

export class ProfileRes {
  @ApiProperty()
  username: string;
  @ApiProperty()
  bio: string;
  @ApiProperty()
  image: string;
  @ApiProperty()
  following: boolean;
}

export class ProfileResponseInterface {
  @ApiProperty()
  profile: ProfileRes;
}

export type ProfileType = UserType & { following: boolean };
