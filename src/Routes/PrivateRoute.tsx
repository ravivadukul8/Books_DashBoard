import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const PrivateRoute = () => {
  const name = Cookies.get("token");

  return name ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
