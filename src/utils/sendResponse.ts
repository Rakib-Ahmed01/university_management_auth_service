import { Response } from "express";
import { ApiResponse } from "../types/ApiResponse";

export const sendResponse = <T>(res: Response, response: ApiResponse<T>) => {
  return res.status(response.statusCode).json({
    success: response.success,
    message: response.message,
    data: response.data,
    meta: response.meta,
  });
};
