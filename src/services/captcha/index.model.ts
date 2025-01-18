export type ValidateResponse = {
  success: boolean;
  score: number; 
  action?: string;
};
export interface Validate {
  
  token: string;
}

export interface CaptchaResponse {
  type: string;
}