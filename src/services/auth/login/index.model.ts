import { AxiosInstance } from "axios";

export interface LoginParams {
  email: string;
  password: string;
  http: AxiosInstance;
}

export interface LoginResponse {
  id: number;
  name: string;
  email: string;
  phone: string;
  email_verified_at?: any;
  created_at: string;
  updated_at: string;
}
