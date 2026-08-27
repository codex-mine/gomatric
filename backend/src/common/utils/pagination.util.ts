import { FilterQuery, Model } from 'mongoose';
import { PaginationDto, SortOrder } from '../dto/pagination.dto';
import { MetaDto } from '../dto/api-response.dto';

export interface PaginatedResult<T> {
  data: T[];
  meta: MetaDto;
}

export async function paginate<T>(
  model: Model<any>,
  filter: FilterQuery<T> = {},
  paginationDto: PaginationDto = new PaginationDto(),
  populate?: any,
  select?: string,
): Promise<PaginatedResult<T>> {
  const page = Number(paginationDto.page) || 1;
  const limit = Number(paginationDto.limit) || 10;
  const skip = (page - 1) * limit;

  const sortField = paginationDto.sortBy || 'createdAt';
  const sortDirection = paginationDto.sortOrder === SortOrder.ASC ? 1 : -1;
  const sort: Record<string, 1 | -1> = { [sortField]: sortDirection };

  let query = model
    .find(filter as any)
    .sort(sort)
    .skip(skip)
    .limit(limit);

  if (select) {
    query = query.select(select);
  }

  if (populate) {
    query = query.populate(populate);
  }

  const [data, total] = await Promise.all([
    query.exec(),
    model.countDocuments(filter as any).exec(),
  ]);

  const totalPages = Math.ceil(total / limit);

  return {
    data: data as T[],
    meta: {
      page,
      limit,
      total,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    },
  };
}
