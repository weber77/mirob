import mongoose from 'mongoose';
import { Category } from 'src/categories/entities/category.entity';
import { Profile } from 'src/profiles/entities/profile.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
export enum ThreadStatus {
  DRAFT = 'DRAFT',
  IN_REVIEW = 'IN_REVIEW',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  LIVE = 'LIVE',
  RESOLVED = 'RESOLVED',
}

@Entity()
export class Thread {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Profile)
  @JoinTable()
  profile: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'enum', enum: ThreadStatus, default: ThreadStatus.DRAFT })
  status: ThreadStatus;

  @ManyToOne(() => Category)
  categories: string[];

  @Column({ default: 0 })
  views: number;

  @CreateDateColumn()
  createdAt;

  @UpdateDateColumn()
  updatedAt;
}
