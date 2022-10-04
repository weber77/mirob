import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProfilesService } from './profiles.service';
import { LoginProfileInput } from './dto/login-profile.input';
import { UpdateProfileInput } from './dto/update-profile.input';
import { ListProfilesInput } from './dto/list-profiles.input';
import { BookmarkCommentInput } from './dto/bookmark-comment-input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserGuard } from 'src/auth/user.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { ProfileRole } from './entities/profile.entity';
import { UpdateProfileRoleInput } from './dto/update-profile-role.input';

@Resolver('Profile')
export class ProfilesResolver {
  constructor(private readonly profilesService: ProfilesService) {}

  @Mutation('loginProfile')
  async login(@Args('loginProfileInput') loginProfileInput: LoginProfileInput) {
    return await this.profilesService.login(loginProfileInput);
  }

  @Query('profiles')
  async findAll(@Args() listProfilesInput: ListProfilesInput) {
    return await this.profilesService.findAll(listProfilesInput);
  }

  @Query('profile')
  async findOne(@Args('walletAddress') walletAddress: string) {
    return await this.profilesService.findOne(walletAddress);
  }

  @Mutation('updateProfile')
  @Roles(
    ProfileRole.USER,
    ProfileRole.AUTHOR,
    ProfileRole.SHARIAH,
    ProfileRole.ADMIN,
  )
  @UseGuards(JwtAuthGuard, RolesGuard, UserGuard)
  async update(
    @Args('updateProfileInput') updateProfileInput: UpdateProfileInput,
  ) {
    return await this.profilesService.update(
      updateProfileInput.id,
      updateProfileInput,
    );
  }

  @Mutation('updateProfileRole')
  @Roles(ProfileRole.USER, ProfileRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard, UserGuard)
  async updateRole(
    @Args('updateProfileRoleInput')
    updateProfileRoleInput: UpdateProfileRoleInput,
  ) {
    return await this.profilesService.updateRole(
      updateProfileRoleInput.id,
      updateProfileRoleInput,
    );
  }

  @Mutation('removeProfile')
  @Roles(ProfileRole.AUTHOR, ProfileRole.SHARIAH, ProfileRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard, UserGuard)
  async remove(@Args('id') id: string) {
    return await this.profilesService.remove(id);
  }

  @Mutation('bookmarkComment')
  @UseGuards(JwtAuthGuard)
  async bookmark(
    @Args('bookmarkCommentInput') bookmarkCommentInput: BookmarkCommentInput,
  ) {
    return await this.profilesService.bookmark(bookmarkCommentInput);
  }

  @Mutation('unBookmarkComment')
  @UseGuards(JwtAuthGuard)
  async unbookmark(
    @Args('bookmarkCommentInput') bookmarkCommentInput: BookmarkCommentInput,
  ) {
    return await this.profilesService.unbookmark(bookmarkCommentInput);
  }
}
