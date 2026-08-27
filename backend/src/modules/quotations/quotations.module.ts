import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Quotation, QuotationSchema } from './schemas/quotation.schema';
import { QuotationsRepository } from './quotations.repository';
import { QuotationsService } from './quotations.service';
import { QuotationsController } from './quotations.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Quotation.name, schema: QuotationSchema }])],
  controllers: [QuotationsController],
  providers: [QuotationsRepository, QuotationsService],
  exports: [QuotationsRepository, QuotationsService, MongooseModule],
})
export class QuotationsModule {}
