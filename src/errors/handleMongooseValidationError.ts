import mongoose from "mongoose";
import { IGenericErrorMessage } from "../types/GenericErrorMessage";
import { ValidationErrorResponse } from "../types/ValidatonErrorResponse";

export const handleValidationError = (
  error: mongoose.Error.ValidationError
): ValidationErrorResponse => {
  const errors: IGenericErrorMessage[] = Object.values(error.errors).map(
    (err) => {
      return {
        path: err.path,
        message: err.message,
      };
    }
  );

  return {
    status: 403,
    message: "Validation Error",
    errors,
  };
};
