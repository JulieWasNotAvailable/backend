import { SetMetadata } from '@nestjs/common';
import { Role } from './roles.enum';

export const ROLES_KEY = 'roles';
export const Roles = (role: string[]) => SetMetadata(ROLES_KEY, role);
