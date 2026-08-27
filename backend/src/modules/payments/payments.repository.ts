import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepository } from '../../database/abstract.repository';
import { Payment, PaymentDocument } from './schemas/payment.schema';

@Injectable()
export class PaymentsRepository extends AbstractRepository<PaymentDocument> {
  constructor(
    @InjectModel(Payment.name)
    paymentModel: Model<PaymentDocument>,
  ) {
    super(paymentModel);
  }
}
