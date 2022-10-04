import { CreateCommentInput } from './create-comment.input';
import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class UpdateCommentInput extends PartialType(CreateCommentInput) {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
