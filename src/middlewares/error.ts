import { ErrorRequestHandler, RequestHandler } from "express";
import ApiError from "../errors/ApiError";
import { handleValidationError } from "../errors/handleValidationError";
import { IGenericErrorMessage } from "../types/genericErrorMessage";

export const notFoundErrorHandler: RequestHandler = (req, res, next) => {
  const error = new ApiError(404, "404 Resource Not Found!");
  next(error);
};

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  const errors: IGenericErrorMessage[] = [];
  let status = error.status ? error?.status : 500;

  const errorResponse = {
    success: false,
    message: "Something went wrong!",
    errors: errors,
    statck: process.env.NODE_ENV !== "production" ? error?.stack : null,
  };

  if (error?.name === "ValidationError") {
    const simplifiedError = handleValidationError(error);
    status = simplifiedError.status;
    errorResponse.message = simplifiedError.message;
    errorResponse.errors = simplifiedError.errors;
  } else if (error instanceof ApiError) {
    errorResponse.message = error.message;
    errorResponse.errors = [{ path: "", message: error.message }];
  } else if (error instanceof Error) {
    errorResponse.message = error.message;
    errorResponse.errors = [{ path: "", message: error.message }];
  }

  res.status(status).json(errorResponse);
};

export default globalErrorHandler;
