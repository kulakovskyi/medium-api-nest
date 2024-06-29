import { IsEmail, IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
  readonly bio: string;

  @IsNotEmpty()
  readonly username: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly image: string;
}
