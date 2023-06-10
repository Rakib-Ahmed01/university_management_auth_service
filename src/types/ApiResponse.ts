export type ApiResponse<T> = {
  statusCode: number;
  success: true;
  message?: string;
  data: T | T[] | null;
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
};
