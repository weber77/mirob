import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsResolver } from './comments.resolver';
import { Comment } from './entities/comment.entity';
import { SharedModule } from 'src/shared/shared.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VotesModule } from 'src/votes/votes.module';

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), SharedModule, VotesModule],
  providers: [CommentsResolver, CommentsService],
})
export class CommentsModule {}
