import { v4 as uuid } from 'uuid';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Bookmark } from 'src/bookmarks/entities/bookmark.entity';

export enum ProfileRole {
  ADMIN = 'ADMIN',
  SHARIAH = 'SHARIAH',
  AUTHOR = 'AUTHOR',
  USER = 'USER',
}
@Entity()
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: uuid() })
  nonce: string;

  @Column()
  walletAddress: string;

  @Column({ type: 'enum', enum: ProfileRole, default: ProfileRole.USER })
  role: ProfileRole;

  @Column({ default: '' })
  picture: string;

  @Column({ default: '' })
  username: string;

  @Column({ default: '' })
  email: string;

  @OneToMany(() => Bookmark, (bookmark) => bookmark.profile)
  bookmarks: Bookmark[];

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
