// supported languages as an object
export type TranslationFunction = (key: string) => string;

export interface Language {
  name: string;
  //   title: string;
  code: string;

  isRTL?: boolean;
}

export const getSupportedLanguages: (t: any) => Language[] = (t: any) => {
  return [
    {
      code: 'en_US',
      name: 'English',
      //   title: t('Languages.English')
    },
    {
      code: 'tr_TR',
      name: 'Turkish',
      //   title: t('Languages.Turkish')
    },
    {
      code: 'ar_AE',
      name: 'Arabic',
      // title: t('Languages.Arabic'),
      isRTL: true,
    },
  ];
};
