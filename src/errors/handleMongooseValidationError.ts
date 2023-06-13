import mongoose from "mongoose";
import { IGenericErrorMessage } from "../types/ErrorMessage";
import { ValidationErrorResponse } from "../types/ValidationErrorResponse";

export const handleValidationError = (
  error: mongoose.Error.ValidationError
): ValidationErrorResponse => {
  const errors: IGenericErrorMessage[] = Object.values(error.errors).map(
    (err) => {
      return {
        path: err?.path,
        message: err?.message.replace("Path ", ""),
      };
    }
  );

  return {
    status: 400,
    message: "Validation Error",
    errors,
  };
};
