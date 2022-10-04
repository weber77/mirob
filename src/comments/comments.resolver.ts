import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { UserGuard } from 'src/auth/user.guard';
import { ProfileRole } from 'src/profiles/entities/profile.entity';
import { CommentsService } from './comments.service';
import { CreateCommentInput } from './dto/create-comment.input';
import { ListCommentsInput } from './dto/list-comments.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { VoteCommentInput } from './dto/vote-comment-input';

@Resolver('Comment')
export class CommentsResolver {
  constructor(private readonly commentsService: CommentsService) {}

  @Mutation('createComment')
  @Roles(ProfileRole.AUTHOR, ProfileRole.SHARIAH, ProfileRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard, UserGuard)
  async create(
    @Args('createCommentInput') createCommentInput: CreateCommentInput,
  ) {
    return await this.commentsService.create(createCommentInput);
  }

  @Query('comments')
  async findAll(@Args() listCommentsInput: ListCommentsInput) {
    return await this.commentsService.findAll(listCommentsInput);
  }

  @Query('comment')
  async findOne(@Args('id') id: string) {
    return await this.commentsService.findOne(id);
  }

  @Mutation('updateComment')
  @Roles(
    ProfileRole.USER,
    ProfileRole.AUTHOR,
    ProfileRole.SHARIAH,
    ProfileRole.ADMIN,
  )
  @UseGuards(JwtAuthGuard, RolesGuard, UserGuard)
  async update(
    @Args('updateCommentInput') updateCommentInput: UpdateCommentInput,
  ) {
    return await this.commentsService.update(
      updateCommentInput.id,
      updateCommentInput,
    );
  }

  @Mutation('removeComment')
  @Roles(ProfileRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard, UserGuard)
  async remove(@Args('id') id: string) {
    return await this.commentsService.remove(id);
  }

  @Mutation('voteComment')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async vote(@Args('voteCommentInput') voteCommentInput: VoteCommentInput) {
    return await this.commentsService.vote(voteCommentInput);
  }
}
