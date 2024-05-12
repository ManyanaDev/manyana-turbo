export interface ApiResponse {
  error: null | string;
  data: unknown | ValidationError;
  status: number;
}
