import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "../AuthProvider";

const PrivateRoute = ({ component: RouteComponent, ...rest }: any) => {
  const context = useContext(AuthContext);
  const { pathname } = useLocation();
  return !!context.currentUser ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ prevPath: pathname }} />
  );
};

export default PrivateRoute;
