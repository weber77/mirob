import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ThreadsService } from './threads.service';
import { CreateThreadInput } from './dto/create-thread.input';
import { UpdateThreadInput } from './dto/update-thread.input';
import { ListThreadsInput } from './dto/list-threads.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserGuard } from 'src/auth/user.guard';
import { ProfileRole } from 'src/graphql';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UpdateThreadStatusInput } from './dto/update-thread-status.input';

@Resolver('Thread')
export class ThreadsResolver {
  constructor(private readonly threadsService: ThreadsService) {}

  @Mutation('createThread')
  @Roles(ProfileRole.AUTHOR, ProfileRole.SHARIAH, ProfileRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard, UserGuard)
  async create(
    @Args('createThreadInput') createThreadInput: CreateThreadInput,
  ) {
    return await this.threadsService.create(createThreadInput);
  }

  @Query('threads')
  async findAll(@Args() listThreadsInput: ListThreadsInput) {
    return await this.threadsService.findAll(listThreadsInput);
  }

  @Query('thread')
  async findOne(@Args('id') id: string) {
    return await this.threadsService.findOne(id);
  }

  @Mutation('updateThread')
  @Roles(ProfileRole.AUTHOR, ProfileRole.SHARIAH, ProfileRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard, UserGuard)
  async update(
    @Args('updateThreadInput') updateThreadInput: UpdateThreadInput,
  ) {
    return await this.threadsService.update(
      updateThreadInput.id,
      updateThreadInput,
    );
  }

  @Mutation('updateThreadStatus')
  @Roles(ProfileRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updateStatus(
    @Args('updateThreadStatusInput')
    updateThreadStatusInput: UpdateThreadStatusInput,
  ) {
    return await this.threadsService.updateStatus(
      updateThreadStatusInput.id,
      updateThreadStatusInput,
    );
  }

  @Mutation('removeThread')
  @Roles(ProfileRole.AUTHOR, ProfileRole.SHARIAH, ProfileRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard, UserGuard)
  async remove(@Args('id') id: string) {
    return await this.threadsService.remove(id);
  }

  @Mutation('incrementThreadViews')
  @Roles(ProfileRole.AUTHOR, ProfileRole.SHARIAH, ProfileRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard, UserGuard)
  async incrementViews(@Args('id') id: string) {
    return await this.threadsService.incrementViews(id);
  }
}
