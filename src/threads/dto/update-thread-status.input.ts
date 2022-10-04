import { CreateThreadInput } from './create-thread.input';
import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsUUID, IsNotEmpty } from 'class-validator';
import { ThreadStatus } from '../entities/thread.entity';

export class UpdateThreadStatusInput extends PartialType(CreateThreadInput) {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsEnum(ThreadStatus)
  status: ThreadStatus;
}
