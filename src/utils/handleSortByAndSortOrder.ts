import { PaginationOptions } from "../types/PaginationOptions";

export const handleSortByAndSortOrder = (
  options: Pick<PaginationOptions, "sortOrder" | "sortBy">
) => {
  const { sortBy = "createdAt", sortOrder = "desc" } = options;

  return { sortBy, sortOrder };
};
