import { CSSTransition } from "react-transition-group";
import { classNames } from "primereact/utils";
import { useContext, useRef } from "react";
import { RTLContext } from "../../contexts/rtl-context";
import Tooltip from "../basic/ktnTooltip";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/auth/login/index.api";

const AppInlineMenu = (props: any) => {
  const navigate = useNavigate();
  const isRTL = useContext(RTLContext);
  const menuKey = props.menuKey || "inline-menu";
  const inlineMenuRef = useRef(null);

  const inlineMenuClassName = classNames(
    "layout-inline-menu",
    {
      "layout-inline-menu-active": props.inlineMenuActive[props.menuKey],
    },
    props.className
  );

  const isSlim = () => {
    return props.menuMode === "slim";
  };

  return (
    <div className={inlineMenuClassName} style={props.style}>
      {isSlim() && <Tooltip target=".avatarTooltip" />}

      <button
        data-pr-tooltip="Amy Elsner"
        className={classNames(
          "avatarTooltip layout-inline-menu-action p-link flex flex-row align-items-center",
          { "p-3 lg:p-1 py-3": props.horizontal, "p-3": !props.horizontal }
        )}
        onClick={(e) => props.onInlineMenuClick(e, menuKey)}
      >
        <i className="pi pi-user" style={{ fontSize: "1.5rem" }}></i>
        <span
          className={classNames("flex flex-column", {
            "ml-2": !isRTL,
            "mr-2": isRTL,
          })}
        >
          <span className="font-bold">Koton React</span>
          <small>Software Developer</small>
        </span>
        <i
          className={classNames("layout-inline-menu-icon pi pi-angle-down", {
            "ml-auto": !isRTL,
            "mr-auto": isRTL,
          })}
        ></i>
      </button>

      <CSSTransition
        nodeRef={inlineMenuRef}
        classNames="p-toggleable-content"
        timeout={{ enter: 1000, exit: 450 }}
        in={props.inlineMenuActive[menuKey]}
        unmountOnExit
      >
        <>
          <ul ref={inlineMenuRef} className="layout-inline-menu-action-panel">
            <li
              className="layout-inline-menu-action-item tooltip"
              data-pr-tooltip="Settings"
            >
              <button className="flex flex-row align-items-center p-link">
                <i className="pi pi-cog pi-fw"></i>
                <span>Settings</span>
              </button>
            </li>
            <li
              className="layout-inline-menu-action-item tooltip"
              data-pr-tooltip="Logout"
            >
              <button
                className="flex flex-row align-items-center p-link"
                onClick={() => {
                  logoutUser();
                  navigate("/");
                }}
              >
                <i className="pi pi-power-off pi-fw"></i>
                <span>Logout</span>
              </button>
            </li>
          </ul>
          {isSlim() && <Tooltip target=".tooltip" />}
        </>
      </CSSTransition>
    </div>
  );
};

export default AppInlineMenu;
