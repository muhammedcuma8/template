import i18n, { InitOptions } from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    debug: false,
    fallbackLng: "tr",
    interpolation: {
      escapeValue: false,
    },
    ns: ["translation"],
    defaultNS: "translation",
    backend: {
      loadPath: "/locales/{{lng}}/translation.json",
    },
    detection: {
      order: ["queryString", "cookie", "localStorage", "navigator", "htmlTag"],
      lookupQuerystring: "lng",
      lookupCookie: "i18next",
      lookupLocalStorage: "i18nextLng",
      caches: ["cookie", "localStorage"],
    },
    supportedLngs: ["tr", "en", "ar"],
  } as InitOptions);

export default i18n;
