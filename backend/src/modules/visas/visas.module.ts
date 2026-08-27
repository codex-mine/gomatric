import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VisaApplication, VisaApplicationSchema } from './schemas/visa-application.schema';
import { VisasRepository } from './visas.repository';
import { VisasService } from './visas.service';
import { VisasController } from './visas.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: VisaApplication.name, schema: VisaApplicationSchema }]),
  ],
  controllers: [VisasController],
  providers: [VisasRepository, VisasService],
  exports: [VisasRepository, VisasService, MongooseModule],
})
export class VisasModule {}
