import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../AuthProvider";

const PrivateRoute = ({ component: RouteComponent, ...rest }: any) => {
  const context = useContext(AuthContext);

  return !!context.currentUser ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
