export type RootResponse<T> = {
  success: boolean;
  message: string;
  result: T;
  token?: string;
  errors: any[];
  status: number;
};
