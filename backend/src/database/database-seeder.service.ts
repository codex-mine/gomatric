import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../modules/users/schemas/user.schema';
import { Role } from '../common/constants/roles.enum';
import { HashUtil } from '../common/utils/hash.util';

export const SEED_USERS = [
  {
    name: 'GoMatric Super Admin',
    email: 'admin@gomatric.com',
    password: 'AdminPassword123!',
    role: Role.ADMIN,
    phone: '+1 (555) 019-2831',
    isActive: true,
    isEmailVerified: true,
  },
  {
    name: 'Operations Manager',
    email: 'manager@gomatric.com',
    password: 'ManagerPassword123!',
    role: Role.MANAGER,
    phone: '+1 (555) 019-2832',
    isActive: true,
    isEmailVerified: true,
  },
  {
    name: 'Travel Concierge Agent',
    email: 'agent@gomatric.com',
    password: 'AgentPassword123!',
    role: Role.AGENT,
    phone: '+1 (555) 019-2833',
    isActive: true,
    isEmailVerified: true,
  },
  {
    name: 'John Traveler',
    email: 'customer@gomatric.com',
    password: 'CustomerPassword123!',
    role: Role.CUSTOMER,
    phone: '+1 (555) 019-2834',
    isActive: true,
    isEmailVerified: true,
  },
];

@Injectable()
export class DatabaseSeederService implements OnApplicationBootstrap {
  private readonly logger = new Logger(DatabaseSeederService.name);

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async onApplicationBootstrap() {
    await this.seedUsers();
  }

  async seedUsers() {
    for (const userDef of SEED_USERS) {
      try {
        const existing = await this.userModel.findOne({ email: userDef.email.toLowerCase() });
        const passwordHash = await HashUtil.hash(userDef.password);

        if (!existing) {
          await this.userModel.create({
            name: userDef.name,
            email: userDef.email.toLowerCase(),
            passwordHash,
            role: userDef.role,
            phone: userDef.phone,
            isActive: true,
            isEmailVerified: true,
            lastLoginAt: new Date(),
          });
          this.logger.log(`Seeded user account: [${userDef.role}] ${userDef.email}`);
        } else {
          // Ensure account is active, verified, and has valid bcrypt hash
          await this.userModel.updateOne(
            { _id: existing._id },
            {
              $set: {
                role: userDef.role,
                isActive: true,
                isEmailVerified: true,
                passwordHash,
              },
            },
          );
          this.logger.log(`Verified active status for user: [${userDef.role}] ${userDef.email}`);
        }
      } catch (err: any) {
        this.logger.error(`Error seeding user ${userDef.email}: ${err.message}`);
      }
    }
  }
}