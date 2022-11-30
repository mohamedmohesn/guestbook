import { Outlet, Navigate } from "react-router-dom";
import React from "react";


export const PrivateRoutes = () => {
  const tokens = localStorage.getItem("token");
  let auth = { token: false };
  tokens === null ? auth.token= false:  auth.token= true;

  return auth.token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
