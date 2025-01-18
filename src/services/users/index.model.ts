export interface UserResponse {
  id: number;
  title: string;
  body: string;
  picture: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export interface UserCreate {
  title: string;
  body: string;
}
