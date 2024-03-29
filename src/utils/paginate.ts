import { Model } from 'mongoose';
import { PaginationOptions } from '../types/PaginationOptions';
import { QueryObject } from '../types/QueryObject';
import { calculateSkip } from './calculateSkip';
import { generateSearchCondition } from './generateSearchCondition';
import { pickOptions } from './pickOptions';

type PaginationParams<M, F> = {
  queryObject: QueryObject;
  filterOptions: (keyof F)[];
  model: M;
};

export const paginate = async <
  M extends typeof Model,
  I,
  F extends Record<string, string>
>(
  params: PaginationParams<M, F>
): Promise<{
  meta: { page: number; limit: number; total: number; totalPages: number };
  data: I[] | I | null;
}> => {
  const { filterOptions, queryObject, model } = params;

  const filterFields = filterOptions as string[];
  const searchFields = filterFields.filter((field) => field !== 'search');

  const paginationOptions = pickOptions(queryObject, [
    'page',
    'limit',
    'sortOrder',
    'sortBy',
  ]) as PaginationOptions;

  const filters = pickOptions(queryObject, filterFields) as {
    // eslint-disable-next-line no-unused-vars
    [F in (typeof filterOptions)[number]]: string;
  };

  const { limit, page, skip } = calculateSkip(paginationOptions);
  const { sortBy, sortOrder } = paginationOptions;
  const { search, ...filterables } = filters;

  const searchCondition = generateSearchCondition('or', search, searchFields);

  const [data, total] = await Promise.all([
    model
      .find({ $and: [searchCondition, filterables] })
      .skip(skip)
      .limit(limit)
      .sort({
        [sortBy]: sortOrder,
      })
      .lean(),
    model.countDocuments(),
  ]);

  return {
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
    data: data,
  };
};
