import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VisaApplication, VisaApplicationSchema } from './schemas/visa-application.schema';
import { Country, CountrySchema } from './schemas/country.schema';
import { VisaType, VisaTypeSchema } from './schemas/visa-type.schema';
import { VisaService, VisaServiceSchema } from './schemas/visa-service.schema';
import { VisasRepository } from './visas.repository';
import { CountriesRepository } from './repositories/countries.repository';
import { VisaTypesRepository } from './repositories/visa-types.repository';
import { VisaServicesRepository } from './repositories/visa-services.repository';
import { VisasService } from './visas.service';
import { CountriesService } from './services/countries.service';
import { VisaTypesService } from './services/visa-types.service';
import { VisaServicesService } from './services/visa-services.service';
import { VisasController } from './visas.controller';
import { CountriesController } from './controllers/countries.controller';
import { VisaTypesController } from './controllers/visa-types.controller';
import { VisaServicesController } from './controllers/visa-services.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: VisaApplication.name, schema: VisaApplicationSchema },
      { name: Country.name, schema: CountrySchema },
      { name: VisaType.name, schema: VisaTypeSchema },
      { name: VisaService.name, schema: VisaServiceSchema },
    ]),
  ],
  controllers: [
    VisasController,
    CountriesController,
    VisaTypesController,
    VisaServicesController,
  ],
  providers: [
    VisasRepository,
    CountriesRepository,
    VisaTypesRepository,
    VisaServicesRepository,
    VisasService,
    CountriesService,
    VisaTypesService,
    VisaServicesService,
  ],
  exports: [
    VisasRepository,
    CountriesRepository,
    VisaTypesRepository,
    VisaServicesRepository,
    VisasService,
    CountriesService,
    VisaTypesService,
    VisaServicesService,
    MongooseModule,
  ],
})
export class VisasModule {}
