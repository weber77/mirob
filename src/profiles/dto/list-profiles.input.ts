import {
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Max,
} from 'class-validator';

export class ListProfilesInput {
  @IsString()
  @IsOptional()
  search = '';

  @IsOptional()
  @IsPositive()
  @Max(20)
  pageSize = 10;

  @IsOptional()
  @IsNumber()
  pageNum = 0;
}
