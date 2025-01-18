import { atom, selector } from 'recoil';

export const themeState = atom({
    key: 'themeState',
    default: {
      scale: 14,
      isRTL: false,
      inputStyle: "outlined",
      rippleEffect: true,
      menuMode: "static",
      colorMode: "light",
      menuTheme: "light",
      topbarTheme: "blue",
      theme: "indigo",
        inlineMenuPosition: "top"
    },
});
export const selectThemeState = selector({
    key: 'selectThemeState',
    get: ({ get }) => get(themeState),
  });
  
  export const selectColorMode = selector({
    key: 'selectColorMode',
    get: ({ get }) => get(themeState).colorMode,
  });
  
  export const selectMenuTheme = selector({
    key: 'selectMenuTheme',
    get: ({ get }) => get(themeState).menuTheme,
  });
  
  export const selectTopbarTheme = selector({
    key: 'selectTopbarTheme',
    get: ({ get }) => get(themeState).topbarTheme,
  });
  
  export const selectTheme = selector({
    key: 'selectTheme',
    get: ({ get }) => get(themeState).theme,
  });
  
  export const selectIsRTL = selector({
    key: 'selectIsRTL',
    get: ({ get }) => get(themeState).isRTL,
  });
  
  export const selectScale = selector({
    key: 'selectScale',
    get: ({ get }) => get(themeState).scale,
  });
  
  export const selectInlineMenuPosition = selector({
    key: 'selectInlineMenuPosition',
    get: ({ get }) => get(themeState).inlineMenuPosition,
  });
  