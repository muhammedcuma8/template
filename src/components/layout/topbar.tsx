import { useContext, useRef } from "react";
import { classNames } from "primereact/utils";
import { useNavigate } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { RTLContext } from "../../contexts/rtl-context";
import Button from "../basic/ktnButton";
import LanguageSelector from "../orginizim/languageSelector";
import { logoutUser } from "../../services/auth/login/index.api";

const AppTopbar = (props: any) => {
  const isRTL = useContext(RTLContext);
  const navigate = useNavigate();

  const topbarRef2 = useRef(null);
  const topbarRef4 = useRef(null);

  return (
    <div className="layout-topbar shadow-4">
      <div className="layout-topbar-left">
        <button
          type="button"
          style={{ cursor: "pointer", width: "15rem" }}
          className="layout-topbar-logo p-link"
          onClick={() => navigate("/")}
        >
          <img
            id="app-logo"
            src="/assets/layout/images/logo-light.svg"
            alt="ultima-layout"
            style={{ height: "2.25rem" }}
          />
        </button>
        <button
          type="button"
          className=" p-link"
          onClick={props.onMenuButtonClick}
          style={{ width: "2rem", height: "25px", textAlign: "center" }}
        >
          {props.isDesktop() && props.desktopMenuActive && (
            <i className="pi pi-chevron-left"></i>
          )}
          {props.isDesktop() && !props.desktopMenuActive && (
            <i className="pi pi-chevron-right"></i>
          )}
          {!props.isDesktop() && <i className="pi pi-align-left"></i>}
          {/* {!props.isDesktop() && !props.mobileMenuActive && (
            <i className="pi pi-chevron-right"></i>
          )} */}
        </button>
        <button type="button" className="layout-topbar-mobile-button p-link">
          <i
            className="pi pi-ellipsis-v fs-large"
            onClick={props.onMobileTopbarButtonClick}
          ></i>
        </button>
      </div>

      <div
        className={classNames("layout-topbar-right", {
          "layout-topbar-mobile-active": props.mobileTopbarActive,
        })}
      >
        {/* <div className="layout-topbar-actions-left">
          <MegaMenu model={model} className="layout-megamenu" />
        </div> */}
        <div></div>
        <div className="layout-topbar-actions-right">
          <ul className="layout-topbar-items">
            <li className="layout-topbar-item notifications">
              {/* <button
                className="layout-topbar-action rounded-circle p-link"
                onClick={(event) =>
                  props.onTopbarItemClick({
                    originalEvent: event,
                    item: 'notifications',
                  })
                }
              >
                <span className="p-overlay-badge">
                  <i className="pi pi-language fs-large"></i>
                </span>
              </button> */}

              <LanguageSelector />
              <CSSTransition
                nodeRef={topbarRef2}
                classNames="p-toggleable"
                timeout={{ enter: 1000, exit: 150 }}
                in={props.activeTopbarItem === "notifications"}
                unmountOnExit
              >
                <ul
                  ref={topbarRef2}
                  className="layout-topbar-action-panel shadow-6 fadeInDown"
                >
                  <li className="layout-topbar-action-item">
                    <div className="flex flex-row align-items-center">
                      <div
                        className={classNames("flex flex-column", {
                          "ml-3": !isRTL,
                          "mr-3": isRTL,
                        })}
                        style={{ flexGrow: "1" }}
                      >
                        <div className="flex align-items-center justify-content-between mb-1">
                          <span className="fs-small font-bold">
                            Arlene Mccoy
                          </span>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </CSSTransition>
            </li>
            <li className="layout-topbar-item">
              <button
                className="layout-topbar-action flex flex-row justify-content-center align-items-center px-2 rounded-circle p-link"
                onClick={(event) =>
                  props.onTopbarItemClick({
                    originalEvent: event,
                    item: "profile",
                  })
                }
              >
                <i className="pi pi-user" style={{ fontSize: "1.5rem" }}></i>
              </button>

              <CSSTransition
                nodeRef={topbarRef4}
                classNames="p-toggleable"
                timeout={{ enter: 1000, exit: 450 }}
                in={props.activeTopbarItem === "profile"}
                unmountOnExit
              >
                <ul
                  ref={topbarRef4}
                  className="layout-topbar-action-panel shadow-6"
                >
                  <li className="layout-topbar-action-item">
                    <button className="flex flex-row align-items-center p-link">
                      <i
                        className={classNames("pi pi-cog", {
                          "mr-2": !isRTL,
                          "ml-2": isRTL,
                        })}
                      ></i>
                      <span>Settings</span>
                    </button>
                  </li>
                  <li className="layout-topbar-action-item">
                    <Button className="flex flex-row align-items-center p-link"
                      onClick={() => {
                        props.setSettingBar(true);
                      }}>
                      <i
                        className={classNames("pi pi-sliders-h", {
                          "mr-2": !isRTL,
                          "ml-2": isRTL,
                        })}
                      ></i>
                      <span>Theme Customization</span>
                    </Button>
                  </li>
                  <li className="layout-topbar-action-item">
                    <Button
                      className="flex flex-row align-items-center p-link"
                      onClick={() => {
                        logoutUser();
                        navigate("/");
                      }}
                    >
                      <i
                        className={classNames("pi pi-power-off", {
                          "mr-2": !isRTL,
                          "ml-2": isRTL,
                        })}
                      ></i>
                      <span>Logout</span>
                    </Button>
                  </li>
                </ul>
              </CSSTransition>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AppTopbar;
