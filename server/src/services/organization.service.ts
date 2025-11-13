import { UserRoleEnum } from '@/entities/auth.entity';
import UserOrganization, { IUserOrganization } from '@/entities/user-organization.entity';
import mongoose from 'mongoose';

class OrganizationService {
  hasRoleInOrganization = async (
    userId: mongoose.Types.ObjectId,
    organizationId: mongoose.Types.ObjectId,
    role?: UserRoleEnum
  ): Promise<boolean> => {
    const result = await UserOrganization.findOne({
      user_id: userId,
      organization_id: organizationId
    });
    const hasAccess = !!result;
    if (role) {
      return hasAccess && result.role === role;
    }
    return hasAccess;
  };

  createUserOrganization = async (
    userId: mongoose.Types.ObjectId,
    organizationId: mongoose.Types.ObjectId,
    role: UserRoleEnum
  ): Promise<IUserOrganization> => {
    const existingUserOrganization = await UserOrganization.findOne({
      user_id: userId,
      organization_id: organizationId
    });
    if (existingUserOrganization) {
      return existingUserOrganization;
    }
    const result = await UserOrganization.create({
      user_id: userId,
      organization_id: organizationId,
      role
    });
    return result;
  };
}
export const organizationService = new OrganizationService();
