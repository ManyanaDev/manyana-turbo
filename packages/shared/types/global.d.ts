export interface ApiResponse {
  error: any;
  data: unknown | ValidationError;
  status: number;
}
