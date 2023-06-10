import { IGenericErrorMessage } from "./ErrorMessage";

export type ValidationErrorResponse = {
  status: number;
  message: string;
  errors: IGenericErrorMessage[];
};
