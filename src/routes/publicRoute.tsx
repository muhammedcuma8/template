import { Outlet, Navigate } from "react-router-dom";

export const PublicRoute = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};
