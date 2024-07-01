import { UserEntity } from '../user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

export type UserType = Omit<UserEntity, 'hashPassword'>;
class User {
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

export class UserResponseInterface {
  @ApiProperty({ type: () => User })
  user: User;
}

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
