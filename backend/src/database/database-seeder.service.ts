import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from '../modules/users/schemas/user.schema';
import { Country, CountryDocument } from '../modules/visas/schemas/country.schema';
import { VisaType, VisaTypeDocument } from '../modules/visas/schemas/visa-type.schema';
import { VisaService, VisaServiceDocument } from '../modules/visas/schemas/visa-service.schema';
import { Role } from '../common/constants/roles.enum';
import { HashUtil } from '../common/utils/hash.util';
import {
  SEED_COUNTRIES,
  SEED_VISA_SERVICES_TEMPLATE,
  SEED_VISA_TYPES,
} from './seeds/visa-catalog.seed';

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
    @InjectModel(Country.name) private readonly countryModel: Model<CountryDocument>,
    @InjectModel(VisaType.name) private readonly visaTypeModel: Model<VisaTypeDocument>,
    @InjectModel(VisaService.name) private readonly visaServiceModel: Model<VisaServiceDocument>,
  ) {}

  async onApplicationBootstrap() {
    await this.seedUsers();
    await this.seedCountries();
    await this.seedVisaTypes();
    await this.seedVisaServices();
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
        }
      } catch (err: any) {
        this.logger.error(`Error seeding user ${userDef.email}: ${err.message}`);
      }
    }
  }

  async seedCountries() {
    for (const c of SEED_COUNTRIES) {
      try {
        await this.countryModel.findOneAndUpdate(
          { slug: c.slug },
          { $set: c },
          { upsert: true, new: true },
        );
        this.logger.log(`Seeded country: ${c.name} (${c.code})`);
      } catch (err: any) {
        this.logger.error(`Error seeding country ${c.name}: ${err.message}`);
      }
    }
  }

  async seedVisaTypes() {
    for (const vt of SEED_VISA_TYPES) {
      try {
        await this.visaTypeModel.findOneAndUpdate(
          { slug: vt.slug },
          { $set: vt },
          { upsert: true, new: true },
        );
        this.logger.log(`Seeded visa type: ${vt.name} (${vt.category})`);
      } catch (err: any) {
        this.logger.error(`Error seeding visa type ${vt.name}: ${err.message}`);
      }
    }
  }

  async seedVisaServices() {
    for (const s of SEED_VISA_SERVICES_TEMPLATE) {
      try {
        const country = await this.countryModel.findOne({ slug: s.countrySlug });
        const visaType = await this.visaTypeModel.findOne({ slug: s.visaTypeSlug });

        if (country && visaType) {
          const { countrySlug, visaTypeSlug, ...serviceData } = s;
          await this.visaServiceModel.findOneAndUpdate(
            { slug: s.slug },
            {
              $set: {
                ...serviceData,
                country: country._id,
                visaType: visaType._id,
              },
            },
            { upsert: true, new: true },
          );
          this.logger.log(`Seeded visa service: ${s.name} for ${country.name}`);
        }
      } catch (err: any) {
        this.logger.error(`Error seeding visa service ${s.name}: ${err.message}`);
      }
    }
  }
}