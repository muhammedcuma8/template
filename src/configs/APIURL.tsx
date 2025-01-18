export const APIURLS: Record<string, string> = {
  SSO_API: `${import.meta.env.VITE_API_URL}`,
  PUZZLE_API: `${import.meta.env.VITE_API_URL2}`,
};
export const PUZZLE_API = 'puzzle-api';
export const SSO_API = 'sso-api';

export type APIS = typeof PUZZLE_API | typeof SSO_API;
