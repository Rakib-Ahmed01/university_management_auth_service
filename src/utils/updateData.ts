import { StatusCodes } from 'http-status-codes';
import { Model, isValidObjectId } from 'mongoose';
import { throwApiError } from './throwApiError';

export const updateData = async <M extends typeof Model>(
  id: string,
  model: M,
  dataName: string,
  payload: object
) => {
  if (!isValidObjectId(id)) {
    throwApiError(StatusCodes.BAD_REQUEST, `Invalid ${dataName} Id`);
  }

  if (Object.keys(payload).length === 0) {
    throwApiError(StatusCodes.BAD_REQUEST, `Missing ${dataName} update data`);
  }

  const isExist = await model.findOne({ _id: id });

  if (!isExist) {
    throwApiError(StatusCodes.NOT_FOUND, `${dataName} not found`);
  }

  const data = await model.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return data;
};
