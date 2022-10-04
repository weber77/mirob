import { LoginProfileInput } from './login-profile.input';
import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class UpdateProfileInput extends PartialType(LoginProfileInput) {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsOptional()
  @IsUUID()
  nonce: string;
}
