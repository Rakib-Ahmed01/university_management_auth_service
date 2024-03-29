class ApiError extends Error {
  status: number;

  constructor(status: number, message: string, stack?: string) {
    super(message);
    this.status = status;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this);
    }
  }
}

export default ApiError;
