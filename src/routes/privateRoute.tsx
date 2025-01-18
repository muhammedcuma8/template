import jwt_Decode, { JwtPayload } from "jwt-decode";
import { Outlet, Navigate } from "react-router-dom";
import Layout from "../components/layout";
import { logoutUser } from "../services/auth/login/index.api";

export const PrivateRoute = () => {
  const token = localStorage.getItem("token");
  if (token == null) {
    return <Navigate to="/login" />;
  }

  if (token != null) {
    const decode = jwt_Decode<JwtPayload>(token as string);
    const tokenExpiration = new Date((decode.exp as number) * 1000);
    const nowDate = new Date();

    if (nowDate >= tokenExpiration) {
      logoutUser();
      return <Navigate to="/login" />;
    }
  }

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};
