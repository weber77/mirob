import {
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateCommentInput {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsUUID()
  profile: string;

  @IsOptional()
  @IsString()
  proposal: string;

  @IsOptional()
  @IsString()
  thread: string;
}
