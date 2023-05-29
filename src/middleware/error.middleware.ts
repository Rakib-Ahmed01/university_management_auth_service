import { NextFunction, Request, Response } from "express";

interface CustomError extends Error {
  status?: number;
}

export const notFoundErrorHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error: CustomError = new Error("404 Resource Not Found!");
  error.status = 404;

  next(error);
};

export const globalErrorHandler = (
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = error.status ? error.status : 500;

  res.status(statusCode).json({
    name: error.name,
    status: error.status,
    message: error.message,
    stack: process.env.NODE_ENV !== "production" ? error.stack : null,
  });
};
