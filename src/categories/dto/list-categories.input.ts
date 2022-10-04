import { IsNumber, IsOptional, IsPositive, Max } from 'class-validator';

export class ListCategoriesInput {
  @IsOptional()
  @IsPositive()
  @Max(20)
  pageSize = 10;

  @IsOptional()
  @IsNumber()
  pageNum = 0;
}
