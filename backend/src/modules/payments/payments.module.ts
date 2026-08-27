import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Payment, PaymentSchema } from './schemas/payment.schema';
import { PaymentsRepository } from './payments.repository';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Payment.name, schema: PaymentSchema }])],
  controllers: [PaymentsController],
  providers: [PaymentsRepository, PaymentsService],
  exports: [PaymentsRepository, PaymentsService, MongooseModule],
})
export class PaymentsModule {}
