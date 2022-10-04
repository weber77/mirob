import { IsNotEmpty, IsUUID } from 'class-validator';

export class BookmarkCommentInput {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsUUID()
  comment = '';
}
