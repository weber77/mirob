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

@Entity()
export class Bookmark {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  profileId: string;

  @ManyToOne(() => Profile, (profile) => profile.bookmarks)
  profile: Profile;

  @Column({ nullable: true })
  commentId: string;

  @ManyToOne(() => Comment, (comment) => comment.bookmarks)
  comment: Comment;

  @CreateDateColumn()
  createdDate;

  @UpdateDateColumn()
  updatedDate;
}
