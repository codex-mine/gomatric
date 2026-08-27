import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Service, ServiceSchema } from './schemas/service.schema';
import { ServicesRepository } from './services.repository';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Service.name, schema: ServiceSchema }])],
  controllers: [ServicesController],
  providers: [ServicesRepository, ServicesService],
  exports: [ServicesRepository, ServicesService, MongooseModule],
})
export class ServicesModule {}
