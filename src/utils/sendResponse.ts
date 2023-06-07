import { Response } from "express";

type ApiResponse<T> = {
  statusCode: number;
  success: true;
  message?: string;
  data: T | T[] | null;
};

export const sendResponse = <T>(res: Response, response: ApiResponse<T>) => {
  return res.status(response.statusCode).json({
    success: response.success,
    message: response.message,
    data: response.data,
  });
};
