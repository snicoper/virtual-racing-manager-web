export interface ApiError {
  detail?: string;
  status: number;
  title: string;
  type: string;
  code?: string;
  errors?: Record<string, string[]>;
}
