export interface ApiError {
  message: string;
  statusCode: number;
  errors?: Record<string, string[]>;
}

export interface RequestOptions {
  headers?: Record<string, string>;
  signal?: AbortSignal;
}
