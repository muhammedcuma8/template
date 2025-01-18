/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { classNames } from "primereact/utils";
import { RTLContext } from "../../contexts/rtl-context";
import { useLocation } from "react-router-dom";
import AppInlineMenu from "./inlineMenu";
import AppTopbar from "./topbar";
import AppMenu from "./menu";
import AppConfig from "./sidebar";
import AppBreadcrumb from "./breadcrumb";
import getMenuConfig from "../../configs/menu";
import { InputSwitchChangeEvent } from "primereact/inputswitch";
import { useTranslation } from "react-i18next";
import Tooltip from "../basic/ktnTooltip";
import { useRecoilState } from "recoil";
import { themeState } from "../../services/theme/themeAtom";
import packageJson from "../../../package.json";

type IProps = {
  children: JSX.Element;
};

const Layout: React.FC<IProps> = (props) => {
  const [storeRecoil, setStoreRecoil] = useRecoilState(themeState);
  console.log(storeRecoil);
  const { i18n } = useTranslation();
  const [settingBar, setSettingBar] = useState<boolean>(false);
  const MenuConfig = getMenuConfig(i18n.t);
  const [desktopMenuActive, setDesktopMenuActive] = useState(true);
  const [mobileMenuActive, setMobileMenuActive] = useState(false);
  const [activeTopbarItem, setActiveTopbarItem] = useState(null);
  const [rightMenuActive, setRightMenuActive] = useState(false);
  const [menuActive, setMenuActive] = useState(false);
  const [mobileTopbarActive, setMobileTopbarActive] = useState(false);
  const [isInputBackgroundChanged, setIsInputBackgroundChanged] =
    useState(false);
  const [inlineMenuActive, setInlineMenuActive] = useState<any>({});
  const [searchActive, setSearchActive] = useState(false);
  const currentInlineMenuKey = useRef("");
  const copyTooltipRef = useRef<any>();
  const location = useLocation();

  let searchClick: boolean;
  let topbarItemClick: boolean;
  let menuClick: boolean;
  let inlineMenuClick: boolean;

  const routes: any = [{ parent: "", label: "" }];
  const menuToSingleRows = Object.assign(
    [],
    MenuConfig,
    MenuConfig.filter((x) => x.items),
    MenuConfig.filter((x) => x.items.filter((x) => x.items))
  );
  menuToSingleRows.forEach(function (menu: any) {
    menu.items.forEach(function (item: any) {
      routes.push({ parent: menu.label, label: item.label });
    });
  });

  useEffect(() => {
    copyTooltipRef &&
      copyTooltipRef.current &&
      copyTooltipRef.current.updateTargetEvents();
  }, [location]);

  useLayoutEffect(() => {
    if (storeRecoil.menuMode === "overlay") {
      hideOverlayMenu();
    }
    if (storeRecoil.menuMode === "static") {
      setDesktopMenuActive(true);
    }
  }, [storeRecoil.menuMode]);

  useLayoutEffect(() => {
    onColorModeChange(storeRecoil.colorMode);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onMenuThemeChange = (theme: string) => {
    setStoreRecoil((values) => {
      return { ...values, menuTheme: theme };
    });
  };

  const onTopbarThemeChange = (theme: string) => {
    setStoreRecoil((values) => {
      return { ...values, topbarTheme: theme };
    });
  };

  useLayoutEffect(() => {
    const appLogoLink = document.getElementById("app-logo") as HTMLInputElement;

    if (
      storeRecoil.topbarTheme === "white" ||
      storeRecoil.topbarTheme === "yellow" ||
      storeRecoil.topbarTheme === "amber" ||
      storeRecoil.topbarTheme === "orange" ||
      storeRecoil.topbarTheme === "lime"
    ) {
      appLogoLink.src = "/assets/layout/images/logo-dark.svg";
    } else {
      appLogoLink.src = "/assets/layout/images/logo-light.svg";
    }
  }, [storeRecoil.topbarTheme]);

  useLayoutEffect(() => {
    const themeLink = document.getElementById("theme-css");
    const themeHref =
      "/assets/theme/" +
      storeRecoil.theme +
      "/theme-" +
      storeRecoil.colorMode +
      ".css";
    replaceLink(themeLink, themeHref);
  }, [storeRecoil.theme]);

  const onThemeChange = (theme: string) => {
    setStoreRecoil((values) => {
      return { ...values, theme: theme };
    });
  };

  const onColorModeChange = (mode: string) => {
    setStoreRecoil((values) => {
      return { ...values, colorMode: mode };
    });
    setIsInputBackgroundChanged(true);

    if (isInputBackgroundChanged) {
      if (mode === "dark") {
        setStoreRecoil((values) => {
          return { ...values, inputStyle: "filled" };
        });
      } else {
        setStoreRecoil((values) => {
          return { ...values, inputStyle: "outlined" };
        });
      }
    }

    setStoreRecoil((values) => {
      return { ...values, menuTheme: storeRecoil.menuTheme };
    });

    if (mode === "dark") {
      setStoreRecoil((values) => {
        return { ...values, menuTheme: "dark", topbarTheme: "dark" };
      });
    }

    const layoutLink = document.getElementById("layout-css");
    const layoutHref = "/assets/layout/css/layout-" + mode + ".css";
    replaceLink(layoutLink, layoutHref);
    const dxLink = document.getElementById("dx-css");
    const dxHref = "/assets/layout/css/dx." + mode + ".css";
    replaceLink(dxLink, dxHref);
    const themeLink = document.getElementById("theme-css") as HTMLInputElement;
    const urlTokens = (themeLink.getAttribute("href") as string).split("/");
    urlTokens[urlTokens.length - 1] = "theme-" + mode + ".css";
  };

  const replaceLink = (linkElement: any, href: string, callback?: any) => {
    if (isIE()) {
      linkElement.setAttribute("href", href);

      if (callback) {
        callback();
      }
    } else {
      const id = linkElement.getAttribute("id");
      const cloneLinkElement = linkElement.cloneNode(true);

      cloneLinkElement.setAttribute("href", href);
      cloneLinkElement.setAttribute("id", id + "-clone");

      linkElement.parentNode.insertBefore(
        cloneLinkElement,
        linkElement.nextSibling
      );

      cloneLinkElement.addEventListener("load", () => {
        linkElement.remove();
        const _linkElement = document.getElementById(id);
        _linkElement && _linkElement.remove();
        cloneLinkElement.setAttribute("id", id);

        if (callback) {
          callback();
        }
      });
    }
  };

  const onInputStyleChange = (inputStyle: string) => {
    setStoreRecoil((values) => {
      return { ...values, inputStyle: inputStyle };
    });
  };

  const onRipple = (e: InputSwitchChangeEvent) => {
    setStoreRecoil((values) => {
      return { ...values, rippleEffect: e.value ?? storeRecoil.rippleEffect };
    });
  };

  const onMenuModeChange = (mode: string) => {
    setStoreRecoil((values) => {
      return { ...values, menuMode: mode };
    });
  };

  const onRTLChange = () => {
    setStoreRecoil((values) => {
      return { ...values, isRTL: !storeRecoil.isRTL };
    });
  };

  const onMenuClick = () => {
    menuClick = true;
  };

  const onMenuButtonClick = (event: Event) => {
    menuClick = true;

    if (isDesktop()) setDesktopMenuActive((prevState) => !prevState);
    else setMobileMenuActive((prevState) => !prevState);

    event.preventDefault();
  };

  const onTopbarItemClick = (event: any) => {
    topbarItemClick = true;
    if (activeTopbarItem === event.item) setActiveTopbarItem(null);
    else {
      setActiveTopbarItem(event.item);
    }

    event.originalEvent.preventDefault();
  };

  const onSearch = (event: any) => {
    searchClick = true;
    setSearchActive(event);
  };

  const onMenuItemClick = (event: any) => {
    if (
      !event.item.items &&
      (storeRecoil.menuMode === "overlay" || !isDesktop())
    ) {
      hideOverlayMenu();
    }

    if (!event.item.items && (isHorizontal() || isSlim())) {
      setMenuActive(false);
    }
  };

  const onRootMenuItemClick = () => {
    setMenuActive((prevState) => !prevState);
  };

  const onRightMenuButtonClick = () => {
    setRightMenuActive((prevState) => !prevState);
  };

  const onMobileTopbarButtonClick = (event: any) => {
    setMobileTopbarActive((prevState) => !prevState);
    event.preventDefault();
  };

  const onDocumentClick = (event: any) => {
    if (!searchClick && event.target.localName !== "input") {
      setSearchActive(false);
    }

    if (!topbarItemClick) {
      setActiveTopbarItem(null);
    }

    if (!menuClick && (storeRecoil.menuMode === "overlay" || !isDesktop())) {
      if (isHorizontal() || isSlim()) {
        setMenuActive(false);
      }
      hideOverlayMenu();
    }

    if (inlineMenuActive[currentInlineMenuKey.current] && !inlineMenuClick) {
      const menuKeys = { ...inlineMenuActive };
      menuKeys[currentInlineMenuKey.current] = false;
      setInlineMenuActive(menuKeys);
    }

    if (!menuClick && (isSlim() || isHorizontal())) {
      setMenuActive(false);
    }

    searchClick = false;
    topbarItemClick = false;
    inlineMenuClick = false;
    menuClick = false;
  };

  const hideOverlayMenu = () => {
    setMobileMenuActive(false);
    setDesktopMenuActive(false);
  };

  const isDesktop = () => {
    return window.innerWidth > 1024;
  };

  const isHorizontal = () => {
    return storeRecoil.menuMode === "horizontal";
  };

  const isSlim = () => {
    return storeRecoil.menuMode === "slim";
  };

  const isIE = () => {
    return /(MSIE|Trident\/|Edge\/)/i.test(window.navigator.userAgent);
  };

  const onInlineMenuClick = (e: any, key: any) => {
    console.log(e);
    const menuKeys = { ...inlineMenuActive };
    if (key !== currentInlineMenuKey.current && currentInlineMenuKey.current) {
      menuKeys[currentInlineMenuKey.current] = false;
    }

    menuKeys[key] = !menuKeys[key];
    setInlineMenuActive(menuKeys);
    currentInlineMenuKey.current = key;
    inlineMenuClick = true;
  };

  const layoutContainerClassName = classNames(
    "layout-wrapper ",
    "layout-menu-" +
      storeRecoil.menuTheme +
      " layout-topbar-" +
      storeRecoil.topbarTheme,
    {
      "layout-menu-static": storeRecoil.menuMode === "static",
      "layout-menu-overlay": storeRecoil.menuMode === "overlay",
      "layout-menu-slim": storeRecoil.menuMode === "slim",
      "layout-menu-horizontal": storeRecoil.menuMode === "horizontal",
      "layout-menu-active": desktopMenuActive,
      "layout-menu-mobile-active": mobileMenuActive,
      "layout-topbar-mobile-active": mobileTopbarActive,
      "layout-rightmenu-active": rightMenuActive,
      "p-input-filled": storeRecoil.inputStyle === "filled",
      "p-ripple-disabled": !storeRecoil.rippleEffect,
      "layout-rtl": storeRecoil.isRTL,
    }
  );

  return (
    <RTLContext.Provider value={storeRecoil.isRTL}>
      <div className={layoutContainerClassName} onClick={onDocumentClick}>
        <Tooltip
          // ref={copyTooltipRef}
          target=".block-action-copy"
          position="bottom"
          content="Copied to clipboard"
          event="focus"
        />

        <AppTopbar
          horizontal={isHorizontal()}
          activeTopbarItem={activeTopbarItem}
          onMenuButtonClick={onMenuButtonClick}
          onTopbarItemClick={onTopbarItemClick}
          onRightMenuButtonClick={onRightMenuButtonClick}
          onMobileTopbarButtonClick={onMobileTopbarButtonClick}
          mobileTopbarActive={mobileTopbarActive}
          searchActive={searchActive}
          onSearch={onSearch}
          mobileMenuActive={mobileMenuActive}
          desktopMenuActive={desktopMenuActive}
          isDesktop={isDesktop}
          setSettingBar={setSettingBar}
        />

        <div className="menu-wrapper" onClick={onMenuClick}>
          <div className="layout-menu-container">
            {(storeRecoil.inlineMenuPosition === "top" ||
              storeRecoil.inlineMenuPosition === "both") && (
              <AppInlineMenu
                menuKey="top"
                inlineMenuActive={inlineMenuActive}
                onInlineMenuClick={onInlineMenuClick}
                horizontal={isHorizontal()}
                menuMode={storeRecoil.menuMode}
              />
            )}
            <AppMenu
              model={MenuConfig}
              onMenuItemClick={onMenuItemClick}
              onRootMenuItemClick={onRootMenuItemClick}
              menuMode={storeRecoil.menuMode}
              active={menuActive}
            />
            {(storeRecoil.inlineMenuPosition === "bottom" ||
              storeRecoil.inlineMenuPosition === "both") && (
              <AppInlineMenu
                menuKey="bottom"
                inlineMenuActive={inlineMenuActive}
                onInlineMenuClick={onInlineMenuClick}
                horizontal={isHorizontal()}
                menuMode={storeRecoil.menuMode}
              />
            )}
            <div className="version-number">
               {i18n.t("Version")}: {packageJson.version}
            </div>
          </div>
        </div>

        <div className="layout-main">
          <AppBreadcrumb
            routes={routes}
            settingBar={settingBar}
          />
          <div className="layout-content">{props.children}</div>
        </div>

        <AppConfig
          inputStyle={storeRecoil.inputStyle}
          onInputStyleChange={onInputStyleChange}
          rippleEffect={storeRecoil.rippleEffect}
          onRippleEffect={onRipple}
          menuMode={storeRecoil.menuMode}
          onMenuModeChange={onMenuModeChange}
          colorMode={storeRecoil.colorMode}
          onColorModeChange={onColorModeChange}
          menuTheme={storeRecoil.menuTheme}
          onMenuThemeChange={onMenuThemeChange}
          topbarTheme={storeRecoil.topbarTheme}
          onTopbarThemeChange={onTopbarThemeChange}
          theme={storeRecoil.theme}
          onThemeChange={onThemeChange}
          isRTL={storeRecoil.isRTL}
          onRTLChange={onRTLChange}
          settingBar={settingBar}
          setSettingBar={setSettingBar}
        />

        {mobileMenuActive && <div className="layout-mask modal-in"></div>}
      </div>
    </RTLContext.Provider>
  );
};

export default Layout;
