import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Max,
} from 'class-validator';
import { ThreadStatus } from '../entities/thread.entity';

export class ListThreadsInput {
  @IsString()
  @IsOptional()
  search = '';

  @IsOptional()
  @IsEnum(ThreadStatus)
  status: ThreadStatus;

  @IsOptional()
  @IsPositive()
  @Max(20)
  pageSize = 10;

  @IsOptional()
  @IsNumber()
  pageNum = 0;
}
