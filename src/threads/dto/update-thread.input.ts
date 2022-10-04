import { CreateThreadInput } from './create-thread.input';
import { PartialType } from '@nestjs/mapped-types';
import { IsUUID, IsNotEmpty } from 'class-validator';

export class UpdateThreadInput extends PartialType(CreateThreadInput) {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
