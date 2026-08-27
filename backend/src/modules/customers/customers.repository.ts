import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepository } from '../../database/abstract.repository';
import { Customer, CustomerDocument } from './schemas/customer.schema';

@Injectable()
export class CustomersRepository extends AbstractRepository<CustomerDocument> {
  constructor(
    @InjectModel(Customer.name)
    customerModel: Model<CustomerDocument>,
  ) {
    super(customerModel);
  }
}
