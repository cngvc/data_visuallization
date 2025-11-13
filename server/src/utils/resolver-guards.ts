import { UserRoleEnum } from '@/entities/auth.entity';
import { NotAuthorizedError } from '@/interfaces/responses/error-handler';
import { organizationService } from '@/services/organization.service';
import mongoose from 'mongoose';

export const withAuth = (resolver: Function) => {
  return async (parent: any, args: any, context: any, info: any) => {
    if (!context.user) {
      throw new NotAuthorizedError('Authentication required');
    }
    return resolver(parent, args, context, info);
  };
};

export const withRole = (role: UserRoleEnum) => (resolver: Function) => {
  return async (parent: any, args: any, context: any, info: any) => {
    if (!context.user) {
      throw new NotAuthorizedError('Authentication required');
    }
    if (context.user.role === UserRoleEnum.SUPER_ADMIN) {
      return resolver(parent, args, context, info);
    }

    if (context.user.role !== role) {
      throw new NotAuthorizedError(`Role ${role} required`);
    }
    return resolver(parent, args, context, info);
  };
};

export const roleInOrganization = async (userId: mongoose.Types.ObjectId, organizationId: mongoose.Types.ObjectId, role?: UserRoleEnum) => {
  const hasAccess = await organizationService.hasRoleInOrganization(userId, organizationId, role);
  if (!hasAccess) {
    throw new NotAuthorizedError('You do not have permission to update this organization');
  }
};
