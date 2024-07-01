import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { AuthGuard } from '../user/guards/auth.guard';
import { ProfileResponseInterface } from './types/profile.interface';
import { User } from '../user/decorators/user.decorator';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Profiles')
@Controller('profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get(':username')
  @ApiOperation({ summary: 'Get a profile' })
  @ApiParam({ name: 'username', required: true })
  @ApiResponse({
    status: 200,
    description: 'The profile has been successfully obtained.',
    type: ProfileResponseInterface,
  })
  async getProfile(
    @Param('username') username: string,
  ): Promise<ProfileResponseInterface> {
    const user = await this.profileService.getProfile(username);
    return this.profileService.buildProfileResponse(user);
  }

  @Post(':username/follow')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Follow a user' })
  @ApiParam({ name: 'username', required: true })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully followed.',
    type: ProfileResponseInterface,
  })
  async followUser(
    @User('id') currentUserId: number,
    @Param('username') username: string,
  ): Promise<ProfileResponseInterface> {
    const user = await this.profileService.followUser(currentUserId, username);
    return this.profileService.buildProfileResponse(user);
  }

  @Delete(':username/follow')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Unfollow a user' })
  @ApiParam({ name: 'username', required: true })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully unfollowed.',
    type: ProfileResponseInterface,
  })
  async unfollowUser(
    @User('id') currentUserId: number,
    @Param('username') username: string,
  ): Promise<ProfileResponseInterface> {
    const user = await this.profileService.unfollowUser(
      currentUserId,
      username,
    );
    return this.profileService.buildProfileResponse(user);
  }
}
