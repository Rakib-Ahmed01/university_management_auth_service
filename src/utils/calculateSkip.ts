import { PaginationOptions } from "../types/PaginationOptions";

export const calculateSkip = (
  paginationOptions: Pick<PaginationOptions, "limit" | "page">
) => {
  const { page = 1, limit = 10 } = paginationOptions;
  const skip = (page - 1) * limit;
  return { page, skip, limit };
};
