export type PaginationResponse<T> = {
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  data: T;
};
