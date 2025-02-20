import { Navigate } from "react-router-dom";
import { useAuth } from "../Auth/AuthContext";
import React from "react";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/login" />;
};

export default PrivateRoute;
