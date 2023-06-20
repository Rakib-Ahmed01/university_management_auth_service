import ApiError from '../errors/ApiError';

export const throwApiError = (statusCode: number, error: string): never => {
  throw new ApiError(statusCode, error);
};
