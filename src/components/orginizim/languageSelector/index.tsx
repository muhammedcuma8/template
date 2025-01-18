import { useCallback, useEffect, useState } from "react";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { Language, getSupportedLanguages } from "./constant";
import { useTranslation } from "react-i18next";
import { useReduxDispatch } from "../../../services";
import { setIsRTL } from "../../../services/theme/themeSlice";
import { useRecoilState } from "recoil";
import { themeState } from "../../../services/theme/themeAtom";
export default function LanguageSelector() {
  const { i18n } = useTranslation();
  // const dispatch = useReduxDispatch();
  const [storeRecoil, setStoreRecoil] = useRecoilState(themeState);
  const supportedLanguages = getSupportedLanguages(i18n.t);
  const currentLanguage =
    supportedLanguages.find((lang) => lang.code === i18n.language) ||
    supportedLanguages[0];
  const [selectedLanguage, setSelectedLanguage] =
    useState<Language>(currentLanguage);
  useEffect(() => {
    i18n.changeLanguage(selectedLanguage?.code);
    // dispatch(setIsRTL(!!selectedLanguage?.isRTL));
    setStoreRecoil((values: any) => {
      return { ...values, isRTL: !!selectedLanguage?.isRTL };
    });
    document.documentElement.lang = selectedLanguage.code.slice(0, 2);
  }, [selectedLanguage, i18n]);

  const LanguageOptionTemplate = useCallback((option: Language) => {
    return (
      <div className="flex align-items-center">
        <span
          className={`px-2 flag flag-${option.code.toLowerCase().substring(3)}`}
        ></span>

        <div className="px-2">{option.name}</div>
      </div>
    );
  }, []);

  return (
    <>
      <span className="p-overlay-badge px-2  ">
        <i
          className="pi pi-language fs-large"
          style={{
            color: "#fff",
            lineHeight: "36px",
          }}
        ></i>
      </span>

      <Dropdown
        value={selectedLanguage}
        onChange={(e: DropdownChangeEvent) => setSelectedLanguage(e.value)}
        options={supportedLanguages}
        optionLabel="name"
        placeholder="Change Language"
        itemTemplate={LanguageOptionTemplate}
        className="w-full md:w-8rem languageSelect"
      />
    </>
  );
}
