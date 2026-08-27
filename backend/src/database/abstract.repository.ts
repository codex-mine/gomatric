import {
  Document,
  FilterQuery,
  Model,
  PipelineStage,
  ProjectionType,
  QueryOptions,
  UpdateQuery,
} from 'mongoose';
import { NotFoundException } from '@nestjs/common';
import { PaginationDto } from '../common/dto/pagination.dto';
import { paginate, PaginatedResult } from '../common/utils/pagination.util';

export abstract class AbstractRepository<TDocument extends Document> {
  protected constructor(protected readonly model: Model<TDocument>) {}

  async create(document: unknown): Promise<TDocument> {
    const createdDocument = new this.model(document);
    return (await createdDocument.save()) as TDocument;
  }

  async findOne(
    filterQuery: FilterQuery<TDocument>,
    projection?: ProjectionType<TDocument>,
    options?: QueryOptions<TDocument>,
  ): Promise<TDocument | null> {
    return this.model.findOne(filterQuery, projection, options).exec();
  }

  async findOneOrThrow(
    filterQuery: FilterQuery<TDocument>,
    projection?: ProjectionType<TDocument>,
    options?: QueryOptions<TDocument>,
  ): Promise<TDocument> {
    const document = await this.model.findOne(filterQuery, projection, options).exec();
    if (!document) {
      throw new NotFoundException(`Resource not found`);
    }
    return document;
  }

  async findById(
    id: string,
    projection?: ProjectionType<TDocument>,
    options?: QueryOptions<TDocument>,
  ): Promise<TDocument | null> {
    return this.model.findById(id, projection, options).exec();
  }

  async findByIdOrThrow(
    id: string,
    projection?: ProjectionType<TDocument>,
    options?: QueryOptions<TDocument>,
  ): Promise<TDocument> {
    const document = await this.model.findById(id, projection, options).exec();
    if (!document) {
      throw new NotFoundException(`Resource with ID ${id} not found`);
    }
    return document;
  }

  async find(
    filterQuery: FilterQuery<TDocument> = {},
    projection?: ProjectionType<TDocument>,
    options?: QueryOptions<TDocument>,
  ): Promise<TDocument[]> {
    return this.model.find(filterQuery, projection, options).exec();
  }

  async findPaginated(
    filterQuery: FilterQuery<TDocument> = {},
    paginationDto: PaginationDto = new PaginationDto(),
    populate?: any,
    select?: string,
  ): Promise<PaginatedResult<TDocument>> {
    return paginate<TDocument>(this.model as any, filterQuery, paginationDto, populate, select);
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<TDocument>,
    update: UpdateQuery<TDocument>,
    options: QueryOptions<TDocument> = { new: true },
  ): Promise<TDocument | null> {
    return this.model.findOneAndUpdate(filterQuery, update, options).exec();
  }

  async findByIdAndUpdate(
    id: string,
    update: UpdateQuery<TDocument>,
    options: QueryOptions<TDocument> = { new: true },
  ): Promise<TDocument | null> {
    return this.model.findByIdAndUpdate(id, update, options).exec();
  }

  async findByIdAndDelete(id: string): Promise<TDocument | null> {
    return this.model.findByIdAndDelete(id).exec();
  }

  async deleteMany(filterQuery: FilterQuery<TDocument>): Promise<number> {
    const result = await this.model.deleteMany(filterQuery).exec();
    return result.deletedCount || 0;
  }

  async count(filterQuery: FilterQuery<TDocument> = {}): Promise<number> {
    return this.model.countDocuments(filterQuery).exec();
  }

  async aggregate(pipeline: PipelineStage[]): Promise<any[]> {
    return this.model.aggregate(pipeline).exec();
  }
}
