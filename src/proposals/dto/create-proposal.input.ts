import {
  IsArray,
  IsDateString,
  IsUUID,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProposalInput {
  @IsUUID()
  @IsNotEmpty()
  profile: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsOptional()
  @IsArray()
  attachments: string[];

  @IsOptional()
  @IsArray()
  links: string[];

  @IsOptional()
  @IsString()
  discussion: string;

  @IsOptional()
  @IsArray()
  hashtags: string[];

  @IsOptional()
  @IsArray()
  categories: string[];

  @IsDateString()
  @IsNotEmpty()
  startDate: Date;

  @IsDateString()
  @IsNotEmpty()
  endDate: Date;
}
