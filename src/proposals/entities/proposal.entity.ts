import { Category } from 'src/categories/entities/category.entity';
import { Profile } from 'src/profiles/entities/profile.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum ProposalStatus {
  DRAFT = 'DRAFT',
  IN_REVIEW = 'IN_REVIEW',
  LIVE = 'LIVE',
  ENDED = 'ENDED',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  CANCELLED = 'CANCELLED',
}

@Entity()
export class Proposal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Profile)
  profile: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'enum', enum: ProposalStatus, default: ProposalStatus.DRAFT })
  status: string;

  @Column('text', { array: true })
  attachments: string[];

  @Column('text', { array: true })
  links: string[];

  @Column()
  discussion: string;

  @Column('text', { array: true })
  hashtags: string[];

  @ManyToMany(() => Category)
  @JoinTable()
  categories: string[];

  @Column({ default: 0 })
  views: number;

  @Column()
  endDate: Date;

  @Column()
  startDate: Date;

  @CreateDateColumn()
  createdAt;

  @UpdateDateColumn()
  updatedAt;
}
