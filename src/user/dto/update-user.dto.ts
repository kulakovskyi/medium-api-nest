import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    required: false,
  })
  readonly bio: string;

  @IsNotEmpty()
  @ApiProperty({
    required: true,
  })
  readonly username: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    required: true,
  })
  readonly email: string;

  @IsNotEmpty()
  @ApiProperty({
    required: true,
  })
  readonly image: string;
}
