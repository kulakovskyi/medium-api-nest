import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import {
  CreateUserBody,
  LoginUserBody,
  UpdateUserBody,
  UserResponseInterface,
} from './types/user-response.interface';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './decorators/user.decorator';
import { UserEntity } from './user.entity';
import { AuthGuard } from './guards/auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('users')
  @ApiOperation({ summary: 'User registration' })
  @ApiBody({ type: CreateUserBody })
  @ApiResponse({
    status: 200,
    description: 'User registration',
    type: UserResponseInterface,
  })
  @UsePipes(new ValidationPipe())
  async createUser(
    @Body('user') createUserDto: CreateUserDto,
  ): Promise<UserResponseInterface> {
    const user = await this.userService.createUser(createUserDto);
    return this.userService.buildUserResponse(user);
  }

  @Post('users/login')
  @ApiOperation({ summary: 'User login' })
  @UsePipes(new ValidationPipe())
  @ApiBody({ type: LoginUserBody })
  @ApiResponse({
    status: 200,
    description: 'User login',
    type: UserResponseInterface,
  })
  async login(
    @Body('user') loginUserDto: LoginUserDto,
  ): Promise<UserResponseInterface> {
    const user = await this.userService.login(loginUserDto);
    return this.userService.buildUserResponse(user);
  }

  @Get('user')
  @ApiOperation({ summary: 'Current user' })
  @UseGuards(AuthGuard)
  @ApiResponse({
    status: 200,
    description: 'Get current user',
    type: UserResponseInterface,
  })
  async currentUser(@User() user: UserEntity): Promise<UserResponseInterface> {
    return this.userService.buildUserResponse(user);
  }

  @Put('user')
  @ApiOperation({ summary: 'Update user bio' })
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard)
  @ApiBody({ type: UpdateUserBody })
  @ApiResponse({
    status: 200,
    description: 'Update user',
    type: UserResponseInterface,
  })
  async updateUser(
    @User('id') currentUserId: number,
    @Body('user') updateUserDto: UpdateUserDto,
  ): Promise<UserResponseInterface> {
    const user = await this.userService.updateUser(
      currentUserId,
      updateUserDto,
    );
    return this.userService.buildUserResponse(user);
  }
}
