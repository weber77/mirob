import { IsArray, IsUUID, IsNotEmpty, IsString } from 'class-validator';

export class CreateThreadInput {
  @IsUUID()
  @IsNotEmpty()
  profile: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsArray()
  categories: string[];
}
