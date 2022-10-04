import { LoginProfileInput } from './login-profile.input';
import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsNotEmpty, IsUUID } from 'class-validator';
import { ProfileRole } from '../entities/profile.entity';

export class UpdateProfileRoleInput extends PartialType(LoginProfileInput) {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsEnum(ProfileRole)
  role: ProfileRole;
}
