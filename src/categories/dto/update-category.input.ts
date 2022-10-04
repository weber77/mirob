import { CreateCategoryInput } from './create-category.input';
import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class UpdateCategoryInput extends PartialType(CreateCategoryInput) {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
