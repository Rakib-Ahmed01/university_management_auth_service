import { StatusCodes } from 'http-status-codes';
import { Model, isValidObjectId } from 'mongoose';
import { throwApiError } from './throwApiError';

export const getDataById = async <M extends typeof Model>(
  id: string,
  model: M,
  dataName: string
) => {
  if (!isValidObjectId(id)) {
    throwApiError(StatusCodes.BAD_REQUEST, `Invalid ${dataName} Id`);
  }

  const data = await model.findOne({ _id: id });

  if (!data) {
    throwApiError(StatusCodes.NOT_FOUND, `${dataName} not found`);
  }

  return data;
};
