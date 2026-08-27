import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../modules/users/schemas/user.schema';
import { Country, CountrySchema } from '../modules/visas/schemas/country.schema';
import { VisaType, VisaTypeSchema } from '../modules/visas/schemas/visa-type.schema';
import { VisaService, VisaServiceSchema } from '../modules/visas/schemas/visa-service.schema';
import { DatabaseSeederService } from './database-seeder.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('database.uri'),
        autoIndex: configService.get<string>('app.nodeEnv') !== 'production',
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Country.name, schema: CountrySchema },
      { name: VisaType.name, schema: VisaTypeSchema },
      { name: VisaService.name, schema: VisaServiceSchema },
    ]),
  ],
  providers: [DatabaseSeederService],
  exports: [MongooseModule, DatabaseSeederService],
})
export class DatabaseModule {}
