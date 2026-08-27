import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Destination, DestinationSchema } from './schemas/destination.schema';
import { DestinationsRepository } from './destinations.repository';
import { DestinationsService } from './destinations.service';
import { DestinationsController } from './destinations.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Destination.name, schema: DestinationSchema }])],
  controllers: [DestinationsController],
  providers: [DestinationsRepository, DestinationsService],
  exports: [DestinationsRepository, DestinationsService, MongooseModule],
})
export class DestinationsModule {}
