import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { UpdateUserDto } from '../user/dto/update-user.dto';

export class CreateUserBody {
  @ApiProperty({ type: CreateUserDto })
  user: CreateUserDto;
}

export class LoginUserBody {
  @ApiProperty({ type: LoginUserDto })
  user: LoginUserDto;
}

export class UpdateUserBody {
  @ApiProperty({ type: UpdateUserDto })
  user: UpdateUserDto;
}

export class UserWithToken {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  bio: string;

  @ApiProperty()
  image: string;

  @ApiProperty()
  token: string;
}

export class UserResponse {
  @ApiProperty({ type: UserWithToken })
  user: UserWithToken;
}
