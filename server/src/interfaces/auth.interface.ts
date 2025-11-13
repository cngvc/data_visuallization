import { UserRole } from '@/entities/auth.entity';

export interface IAuthPayload {
  id: string;
  username: string;
  email: string;
  iat?: number;
  role: UserRole;
}
