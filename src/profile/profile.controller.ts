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

@Controller('profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get(':username')
  async getProfile(
    @Param('username') username: string,
  ): Promise<ProfileResponseInterface> {
    const user = await this.profileService.getProfile(username);
    return this.profileService.buildProfileResponse(user);
  }

  @Post(':username/follow')
  @UseGuards(AuthGuard)
  async followUser(
    @User('id') currentUserId: number,
    @Param('username') username: string,
  ): Promise<ProfileResponseInterface> {
    const user = await this.profileService.followUser(currentUserId, username);
    return this.profileService.buildProfileResponse(user);
  }

  @Delete(':username/follow')
  @UseGuards(AuthGuard)
  async unfollowUser(
    @User('id') currentUserId: number,
    @Param('username') username: string,
  ) {
    const user = await this.profileService.unfollowUser(
      currentUserId,
      username,
    );
    return this.profileService.buildProfileResponse(user);
  }
}
