// config.ts
export enum RecaptchaSize {
  NORMAL = "normal",
  COMPACT = "compact",
  INVISIBLE = "invisible",
}

export const RecaptchaType = {
  V2 : "v2",
  V3 : "v3",
  V2_AND_V3 : "v2_and_v3",
}

// The configuration can be replicated for other captchas.
export const RECAPTCHA_CONFIG = {
  SITE_KEY_V2: import.meta.env.VITE_SITE_KEY_V2 || "",
  SITE_KEY_V3: import.meta.env.VITE_SITE_KEY_V3 || "",
  ENABLED: false,
  SIZE: RecaptchaSize.NORMAL, // default: normal
};


