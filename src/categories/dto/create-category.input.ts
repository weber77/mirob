import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryInput {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
