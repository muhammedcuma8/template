import { useEffect, useContext } from "react";
import { classNames } from "primereact/utils";
import RadioButton from "../basic/ktnRadioButton";
import { Sidebar } from "primereact/sidebar";
import Button from "../basic/ktnButton";
import { RTLContext } from "../../contexts/rtl-context";
import {
  menuThemeValues,
  themeValues,
  topbarThemeValues,
} from "../../utils/contants/themes";
import { useRecoilState } from "recoil";
import { themeState } from "../../services/theme/themeAtom";

const AppConfig = (props: any) => {
  const [storeRecoil, setStoreRecoil] = useRecoilState(themeState);
  const isRTL = useContext(RTLContext);
  const scales = [12, 13, 14, 15, 16];

  const decrementScale = () => {
    setStoreRecoil((values: any) => {
      return { ...values, scale: storeRecoil.scale - 1 };
    });
  };

  const incrementScale = () => {
    // dispatch(setScale(store.scale + 1));
    setStoreRecoil((values: any) => {
      return { ...values, scale: storeRecoil.scale + 1 };
    });
  };

  const applyScale = () => {
    document.documentElement.style.fontSize = storeRecoil.scale + "px";
  };

  useEffect(() => {
    applyScale();
  }, [storeRecoil.scale]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Sidebar
      appendTo="self"
      visible={props.settingBar}
      onHide={() => props.setSettingBar(false)}
      position={isRTL ? "left" : "right"}
      blockScroll={true}
      showCloseIcon={false}
      baseZIndex={1000}
      className="layout-config p-sidebar-sm fs-small p-p-0"
    >
      <div className="layout-config-panel flex flex-column">
        <div className="px-3 pt-3">
          <h5>Theme Customization</h5>
          <span>
            Koton offers different themes for layout, topbar, menu etc.
          </span>
        </div>

        <hr className="mb-0" />

        <div className="layout-config-options p-3">
          <h6>Layout/Theme Scale</h6>
          <div className="flex align-items-center">
            <Button
              type="button"
              icon="pi pi-minus"
              onClick={() => decrementScale()}
              className="p-button-rounded p-button-text"
              disabled={storeRecoil.scale === scales[0]}
            ></Button>
            {scales.map((s, i) => {
              return (
                <i
                  key={i}
                  className={classNames("pi pi-circle-on m-1 scale-icon", {
                    "scale-active": s === storeRecoil.scale,
                  })}
                ></i>
              );
            })}
            <Button
              type="button"
              icon="pi pi-plus"
              onClick={() => incrementScale()}
              className="p-button-rounded p-button-text"
              disabled={storeRecoil.scale === scales[scales.length - 1]}
            ></Button>
          </div>

          <h6>Layout Mode</h6>
          <div className="flex">
            <div className="flex align-items-center">
              <RadioButton
                id="light"
                name="darkMenu"
                value="light"
                checked={props.colorMode === "light"}
                onChange={(e: any) => props.onColorModeChange(e.value)}
              />
              <label
                htmlFor="light"
                className={classNames({ "ml-2": !isRTL, "mr-2": isRTL })}
              >
                Light
              </label>
            </div>
            <div
              className={classNames("flex align-items-center", {
                "ml-4": !isRTL,
                "mr-4": isRTL,
              })}
            >
              <RadioButton
                id="dark"
                name="darkMenu"
                value="dark"
                checked={props.colorMode === "dark"}
                onChange={(e: any) => props.onColorModeChange(e.value)}
              />
              <label
                htmlFor="dark"
                className={classNames({ "ml-2": !isRTL, "mr-2": isRTL })}
              >
                Dark
              </label>
            </div>
          </div>

          <h6>Menu Mode</h6>
          <div className="flex">
            <div className="flex flex-column">
              <div className="flex align-items-center">
                <RadioButton
                  id="static"
                  name="menuMode"
                  value="static"
                  checked={props.menuMode === "static"}
                  onChange={(e: any) => props.onMenuModeChange(e.value)}
                />
                <label
                  htmlFor="static"
                  className={classNames({ "ml-2": !isRTL, "mr-2": isRTL })}
                >
                  Static
                </label>
              </div>
              <div className="flex align-items-center mt-3">
                <RadioButton
                  id="horizontal"
                  name="menuMode"
                  value="horizontal"
                  checked={props.menuMode === "horizontal"}
                  onChange={(e: any) => props.onMenuModeChange(e.value)}
                />
                <label
                  htmlFor="horizontal"
                  className={classNames({ "ml-2": !isRTL, "mr-2": isRTL })}
                >
                  Horizontal
                </label>
              </div>
            </div>
            <div
              className={classNames("flex flex-column", {
                "ml-4": !isRTL,
                "mr-4": isRTL,
              })}
            >
              <div className="flex align-items-center">
                <RadioButton
                  id="overlay"
                  name="menuMode"
                  value="overlay"
                  checked={props.menuMode === "overlay"}
                  onChange={(e: any) => props.onMenuModeChange(e.value)}
                />
                <label
                  htmlFor="overlay"
                  className={classNames({ "ml-2": !isRTL, "mr-2": isRTL })}
                >
                  Overlay
                </label>
              </div>
              <div className="flex align-items-center mt-3">
                <RadioButton
                  id="slim"
                  name="menuMode"
                  value="slim"
                  checked={props.menuMode === "slim"}
                  onChange={(e: any) => props.onMenuModeChange(e.value)}
                />
                <label
                  htmlFor="slim"
                  className={classNames({ "ml-2": !isRTL, "mr-2": isRTL })}
                >
                  Slim
                </label>
              </div>
            </div>
          </div>

          <h6>Input Background</h6>
          <div className="formgroup-inline">
            <div className="flex">
              <div className="flex align-items-center">
                <RadioButton
                  id="input_outlined"
                  name="inputstyle"
                  value="outlined"
                  checked={props.inputStyle === "outlined"}
                  onChange={(e: any) => props.onInputStyleChange(e.value)}
                />
                <label
                  htmlFor="input_outlined"
                  className={classNames({ "ml-2": !isRTL, "mr-2": isRTL })}
                >
                  Outlined
                </label>
              </div>
              <div
                className={classNames("flex align-items-center", {
                  "ml-4": !isRTL,
                  "mr-4": isRTL,
                })}
              >
                <RadioButton
                  id="input_filled"
                  name="inputstyle"
                  value="filled"
                  checked={props.inputStyle === "filled"}
                  onChange={(e: any) => props.onInputStyleChange(e.value)}
                />
                <label
                  htmlFor="input_filled"
                  className={classNames({ "ml-2": !isRTL, "mr-2": isRTL })}
                >
                  Filled
                </label>
              </div>
            </div>
          </div>

          {/* <h6>Ripple Effect</h6>
          <InputSwitch
            checked={props.rippleEffect}
            onChange={props.onRippleEffect}
          /> */}

          {/* <h6>RTL</h6>
            <InputSwitch checked={props.isRTL} onChange={props.onRTLChange} /> */}

          <h6>Menu Themes</h6>
          {props.colorMode !== "dark" && (
            <div className="grid">
              {menuThemeValues.map((t, i) => {
                return (
                  <div key={i} className="col col-fixed">
                    <button
                      type="button"
                      style={{ cursor: "pointer" }}
                      onClick={() => props.onMenuThemeChange(t.name)}
                      className="layout-config-color-option p-link"
                      title={t.name}
                    >
                      <span
                        className="color"
                        style={{ backgroundColor: t.color }}
                      ></span>
                      {props.menuTheme === t.name && (
                        <span className="check flex align-items-center justify-content-center">
                          <i
                            className="pi pi-check"
                            style={{ color: "var(--menu-text-color)" }}
                          ></i>
                        </span>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
          {props.colorMode === "dark" && (
            <p>
              Menu themes are only available in light mode by design as large
              surfaces can emit too much brightness in dark mode.
            </p>
          )}

          <h6>Topbar Themes</h6>
          <div className="grid">
            {topbarThemeValues.map((t, i) => {
              return (
                <div key={i} className="col col-fixed">
                  <button
                    type="button"
                    style={{ cursor: "pointer" }}
                    onClick={() => props.onTopbarThemeChange(t.name)}
                    className="layout-config-color-option p-link"
                    title={t.name}
                  >
                    <span
                      className="color"
                      style={{ backgroundColor: t.color }}
                    ></span>
                    {props.topbarTheme === t.name && (
                      <span className="check flex align-items-center justify-content-center">
                        <i
                          className="pi pi-check"
                          style={{ color: "var(--topbar-text-color)" }}
                        ></i>
                      </span>
                    )}
                  </button>
                </div>
              );
            })}
          </div>

          <h6>Component Themes</h6>
          <div className="grid">
            {themeValues.map((t, i) => {
              return (
                <div key={i} className="col col-fixed">
                  <button
                    type="button"
                    style={{ cursor: "pointer" }}
                    onClick={() => props.onThemeChange(t.name)}
                    className="layout-config-color-option p-link"
                    title={t.name}
                  >
                    <span
                      className="color"
                      style={{ backgroundColor: t.color }}
                    ></span>
                    {props.theme === t.name && (
                      <span className="check flex align-items-center justify-content-center">
                        <i
                          className="pi pi-check"
                          style={{ color: "var(--primary-color-text)" }}
                        ></i>
                      </span>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Sidebar>
  );
};

export default AppConfig;
