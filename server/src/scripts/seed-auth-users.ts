import Auth, { UserRoleEnum } from '@/entities/auth.entity';
import OrganizationModel from '@/entities/organization.entity';
import { authService } from '@/services/auth.service';
import { organizationService } from '@/services/organization.service';
import { log } from '@/utils/logger.util';
import mongoose from 'mongoose';

const seedUsers = [
  {
    email: 'sample+json@example.com',
    password: 'password123',
    first_name: 'Sam',
    last_name: 'Smith',
    role: UserRoleEnum.ORG_ADMIN,
    organization_name: 'The JSON Organization'
  },
  {
    email: 'sample+csv@example.com',
    password: 'password123',
    first_name: 'Simons',
    last_name: 'Wong',
    role: UserRoleEnum.ORG_ADMIN,
    organization_name: 'The CSV Organization'
  },
  {
    email: 'sample+1@example.com',
    password: 'password123',
    first_name: 'John',
    last_name: 'Doe',
    role: UserRoleEnum.ORG_ADMIN,
    organization_name: 'The Third Organization'
  }
];

class SeedAuthUsers {
  createSeedAuthUsers = async () => {
    try {
      log.info('Starting to seed auth users...');
      const organizationIds = [];
      const userIds = [];
      for (const userData of seedUsers) {
        const existingUser = await Auth.findOne({ email: userData.email.toLowerCase() });
        if (existingUser) {
          log.info(`User ${userData.email} already exists, skipping...`);
          continue;
        }
        let organization = await OrganizationModel.findOne({ name: userData.organization_name });
        if (!organization) {
          organization = new OrganizationModel({
            name: userData.organization_name,
            email: userData.email.toLowerCase(),
            description: `Organization for ${userData.organization_name}`
          });
          await organization.save();
          log.info(`Created organization: ${userData.organization_name}`);
          organizationIds.push(organization._id as mongoose.Types.ObjectId);
        }

        const result = await authService.createAuthUser({
          email: userData.email.toLowerCase(),
          first_name: userData.first_name,
          last_name: userData.last_name,
          password: userData.password,
          role: userData.role,
          current_organization_id: organization._id as mongoose.Types.ObjectId
        });
        userIds.push(result._id as mongoose.Types.ObjectId);

        await organizationService.createUserOrganization(
          result._id as mongoose.Types.ObjectId,
          organization._id as mongoose.Types.ObjectId,
          userData.role
        );
        log.info(`Created user: ${result.email} with role ${result.role}`);
      }
      await organizationService.createUserOrganization(userIds[0], organizationIds[1], UserRoleEnum.USER);
      await organizationService.createUserOrganization(userIds[0], organizationIds[2], UserRoleEnum.USER);

      await organizationService.createUserOrganization(userIds[1], organizationIds[0], UserRoleEnum.USER);
      await organizationService.createUserOrganization(userIds[1], organizationIds[2], UserRoleEnum.USER);

      await organizationService.createUserOrganization(userIds[2], organizationIds[0], UserRoleEnum.USER);
      await organizationService.createUserOrganization(userIds[2], organizationIds[1], UserRoleEnum.USER);
    } catch (error) {
      log.error(`Error seeding auth users: ${error}`);
    }
  };
}

export const seedAuthUsers = new SeedAuthUsers();
