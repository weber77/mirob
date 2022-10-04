import { CreateCommentInput } from './create-comment.input';
import { PartialType } from '@nestjs/mapped-types';
import {
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Max,
} from 'class-validator';

export class ListCommentsInput extends PartialType(CreateCommentInput) {
  @IsOptional()
  @IsString()
  proposal = '';

  @IsOptional()
  @IsString()
  thread = '';

  @IsOptional()
  @IsPositive()
  @Max(20)
  pageSize = 10;

  @IsOptional()
  @IsNumber()
  pageNum = 0;
}
