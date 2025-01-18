import { Route, Routes, useLocation } from "react-router-dom";
import { PrivateRoute } from "./privateRoute";
import { PublicRoute } from "./publicRoute";
import { Suspense, lazy, useEffect } from "react";
import Loading from "../components/basic/ktnLoading";
import Pages from "../pages/AccessControl/pages";
import Users from "../pages/AccessControl/users";
import Roles from "../pages/AccessControl/roles";
import Permissions from "../pages/AccessControl/Permissions";
import UserRoles from "../pages/AccessControl/userRoles";

const Product = lazy(() => import("../pages/product"));
const ProductCRUD = lazy(() => import("../pages/productCRUD"));
const Article = lazy(() => import("../pages/article"));
const Home = lazy(() => import("../pages/home"));
const Login = lazy(() => import("../pages/login"));
const Form = lazy(() => import("../pages/form"));
const Error = lazy(() => import("../pages/layout/error"));
const NotFound = lazy(() => import("../pages/layout/notFound"));
const Access = lazy(() => import("../pages/layout/access"));
const PrivacyPolicy = lazy(() => import("../pages/privacyPolicy"));

const Router = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* Global sayfalar */}
        <Route path="*" element={<NotFound />} />
        <Route path="/error" element={<Error />} />
        <Route path="/access" element={<Access />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />}/>

          {/* Private Route Pages -- Login olan kullanıcıların erişebilecekleri sayfalar */}
          <Route path="/" element={<PrivateRoute />}>
            <Route index element={<Home />} />
            <Route path="pages/articles" element={<Article />} />
            <Route path="pages/products" element={<Product />} />
            <Route path="pages/productsCRUD" element={<ProductCRUD />} />
            <Route path="pages/form" element={<Form />} />
            <Route path="pages/users" element={<Users />} />
            <Route path="pages/roles" element={<Roles />} />
            <Route path="pages/Permissions" element={<Permissions />} />
            <Route path="pages/Pages" element={<Pages />} />
            <Route path="pages/UserRoles" element={<UserRoles />} />
          </Route>

          {/* Public Route Pages -- Auth kontrolü yapılacak sayfalar */}
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
          </Route>
      </Routes>
    </Suspense>
  );
};

export default Router;
