export type RegexRules = {
  username: RegExp;
  password: RegExp;
};
export const regexRules: RegexRules = {
  username: /^[a-zA-Z][a-zA-Z\d_]{2,19}$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\S]{8,}$/,
};
