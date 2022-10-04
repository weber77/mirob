import { Bookmark } from 'src/bookmarks/entities/bookmark.entity';
import { Profile } from 'src/profiles/entities/profile.entity';
import { Vote } from 'src/votes/entities/vote.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  content: string;

  @ManyToOne(() => Profile)
  profile: string;

  @OneToMany(() => Bookmark, (bookmark) => bookmark.comment)
  bookmarks: Bookmark[];

  @CreateDateColumn()
  createdAt;

  @UpdateDateColumn()
  updatedAt;

  @Column({ nullable: true })
  proposal: string;

  @Column({ nullable: true })
  thread: string;

  @Column({ default: 0 })
  votes: number;

  @OneToMany(() => Vote, (vote) => vote.comment)
  voted: Vote[];
}
