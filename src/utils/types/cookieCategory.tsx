type Cookie = {
  name: string;
  descriptionKey: string;
};

type CookieCategory = {
  descriptionKey: string;
  title: string;
  cookies: Cookie[];
  defaultValue: boolean;
  readOnly: boolean;
  isActive: boolean;
};

export type CookieCategories = Record<string, CookieCategory>;
