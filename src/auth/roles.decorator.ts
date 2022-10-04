import { SetMetadata } from '@nestjs/common';
import { ProfileRole } from 'src/profiles/entities/profile.entity';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: ProfileRole[]) => SetMetadata(ROLES_KEY, roles);
