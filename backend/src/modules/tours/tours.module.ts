import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TourPackage, TourPackageSchema } from './schemas/tour-package.schema';
import { ToursRepository } from './tours.repository';
import { ToursService } from './tours.service';
import { ToursController } from './tours.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: TourPackage.name, schema: TourPackageSchema }])],
  controllers: [ToursController],
  providers: [ToursRepository, ToursService],
  exports: [ToursRepository, ToursService, MongooseModule],
})
export class ToursModule {}
