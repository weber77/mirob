import { Comment } from 'src/comments/entities/comment.entity';
import { Profile } from 'src/profiles/entities/profile.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum VoteStatus {
  UP = 'UP',
  DOWN = 'DOWN',
}

@Entity()
export class Vote {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  profileId;

  @ManyToOne(() => Profile)
  profile: string;

  @Column({ nullable: true })
  commentId;

  @ManyToOne(() => Comment, (comment) => comment.voted, { cascade: true })
  comment: string;

  @Column({ type: 'enum', enum: VoteStatus, default: VoteStatus.UP })
  status: VoteStatus;

  @CreateDateColumn()
  createdAt;

  @UpdateDateColumn()
  updatedAt;
}
