import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepository } from '../../../database/abstract.repository';
import { Country, CountryDocument } from '../schemas/country.schema';

@Injectable()
export class CountriesRepository extends AbstractRepository<CountryDocument> {
  constructor(
    @InjectModel(Country.name)
    countryModel: Model<CountryDocument>,
  ) {
    super(countryModel);
  }
}
