import { IGenericErrorMessage } from "./GenericErrorMessage";

export type ValidationErrorResponse = {
  status: number;
  message: string;
  errors: IGenericErrorMessage[];
};
