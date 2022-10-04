import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SharedService } from 'src/shared/services/shared.service';
import { Vote } from 'src/votes/entities/vote.entity';
import { Repository } from 'typeorm';
import { CreateCommentInput } from './dto/create-comment.input';
import { ListCommentsInput } from './dto/list-comments.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { VoteCommentInput, VoteStatus } from './dto/vote-comment-input';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  private readonly logger: Logger = new Logger(CommentsService.name);
  constructor(
    @InjectRepository(Vote)
    private readonly voteRepository: Repository<Vote>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    private readonly sharedService: SharedService,
  ) {}

  async create(createCommentlInput: CreateCommentInput) {
    try {
      this.logger.log('adding new comment');

      const comment = await this.commentRepository.save(createCommentlInput);

      return comment;
    } catch (error) {
      this.sharedService.sendError(error, this.create.name);
    }
  }

  async findAll(listCommentsInput: ListCommentsInput) {
    try {
      this.logger.log(`fetching comments`);

      const where = {};

      [
        { key: 'proposal', value: listCommentsInput.proposal },
        { key: 'thread', value: listCommentsInput.thread },
      ].forEach(({ key, value }) => {
        if (value) {
          where[key] = value;
        }
      });

      const comments = await this.commentRepository.find({
        relations: ['profile', 'voted', 'voted.profile', 'bookmarks'],
        where,
        skip: listCommentsInput.pageNum * listCommentsInput.pageSize,
        take: listCommentsInput.pageSize,
        order: { updatedAt: 'ASC' },
      });

      if (comments.length == 0) throw new NotFoundException();

      return { total: comments.length, comments };
    } catch (error) {
      this.sharedService.sendError(error, this.findAll.name);
    }
  }

  async findOne(id: string) {
    try {
      this.logger.log(`fetching a comment with id ${id}`);

      const comment = await this.commentRepository.findOne({
        where: { id },
        relations: { profile: true },
      });

      if (comment === null) throw new NotFoundException();

      return comment;
    } catch (error) {
      this.sharedService.sendError(error, this.findOne.name);
    }
  }

  async update(id: string, updateCommentInput: UpdateCommentInput) {
    try {
      this.logger.log(`updating a comment with id ${id}`);

      const updatedComment = await this.commentRepository
        .createQueryBuilder()
        .update(updateCommentInput)
        .where({ id })
        .returning('*')
        .execute()
        .then((response) => response.raw[0]);

      if (updatedComment === null) throw new NotFoundException();

      return updatedComment;
    } catch (error) {
      this.sharedService.sendError(error, this.update.name);
    }
  }

  async remove(id: string) {
    try {
      this.logger.log(`deleting a comment with id ${id}`);

      const removedComment = await this.commentRepository.delete(id);

      if (removedComment === null) throw new NotFoundException();

      return removedComment;
    } catch (error) {
      this.sharedService.sendError(error, this.remove.name);
    }
  }

  async vote(voteCommentInput: VoteCommentInput) {
    try {
      this.logger.log(`vote a comment with id ${voteCommentInput.id}`);

      let upadtedComment;

      const vote = await this.voteRepository.findOneBy({
        commentId: voteCommentInput.id,
        profileId: voteCommentInput.profile,
      });

      const updatedVote = Object.assign(vote ? vote : {}, {
        commentId: voteCommentInput.id,
        profileId: voteCommentInput.profile,
        status: voteCommentInput.status,
      });

      if (voteCommentInput.status == VoteStatus.UP) {
        upadtedComment = await this.commentRepository
          .createQueryBuilder()
          .update()
          .set({
            votes: () => 'votes + 1',
          })
          .where({ id: voteCommentInput.id })
          .returning('*')
          .execute()
          .then((response) => response.raw[0]);

        // update user vote
        this.voteRepository.save(updatedVote);
      } else {
        upadtedComment = await this.commentRepository
          .createQueryBuilder()
          .update()
          .set({
            votes: () => 'votes - 1',
          })
          .where({ id: voteCommentInput.id })
          .returning('*')
          .execute()
          .then((response) => response.raw[0]);

        // update user vote
        this.voteRepository.save(updatedVote);
      }

      if (upadtedComment === null) throw new NotFoundException();

      return upadtedComment;
    } catch (error) {
      this.sharedService.sendError(error, this.update.name);
    }
  }
}
