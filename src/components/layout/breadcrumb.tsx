import BreadCrumb from "../basic/ktnBreadcrumb";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../basic/ktnButton";
import { logoutUser } from "../../services/auth/login/index.api";
// import KTNButton as Button from '../basic/ktnButton';

const AppBreadcrumb = (props: any) => {
  const location = useLocation();
  const navigate = useNavigate();
  const pathname =
    location.pathname === "/"
      ? ["", ""]
      : location.pathname.split("/").slice(1);
  const activeRoute = props.routes.filter((route: any) => {
    return (
      route.parent.replace(/\s/g, "").toLowerCase() === pathname[0] &&
      route.label.replace(/\s/g, "").toLowerCase() === pathname[1]
    );
  });

  let model;

  if (!activeRoute.length) {
    model = [{ label: "" }];
  } else {
    model =
      activeRoute[0].parent === "" && activeRoute[0].label === ""
        ? [{ label: "Home" }]
        : [{ label: activeRoute[0].parent }, { label: activeRoute[0].label }];
  }

  const home = { icon: "pi pi-home", url: "/" };

  return (
    <div className="layout-breadcrumb-container flex justify-content-between align-items-center shadow-1">
      <BreadCrumb
        model={model}
        home={home}
        className="layout-breadcrumb p-pl-4 p-py-2"
      />

      <div className="layout-breadcrumb-buttons flex align-items-center pr-3">
        <Button
          type="button"
          icon="pi pi-power-off"
          className="p-button p-button-rounded p-button-text p-button-plain mr-1"
          onClick={() => {
            logoutUser();
            navigate("/");
          }}
        ></Button>
      </div>
    </div>
  );
};

export default AppBreadcrumb;
