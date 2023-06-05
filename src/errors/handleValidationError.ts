import mongoose from "mongoose";
import { IGenericErrorMessage } from "../types/genericErrorMessage";

export const handleValidationError = (
  error: mongoose.Error.ValidationError
) => {
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
