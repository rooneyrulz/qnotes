import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import useAuth from "../hooks/useAuth";

const PublicRoute = ({ allowedRoles }) => {
  const location = useLocation();
  const token = useSelector(selectCurrentToken);
  const { roles } = useAuth();

  const content =
    token && roles.some((role) => allowedRoles.includes(role)) ? (
      <Navigate to="/dash" state={{ from: location }} replace />
    ) : (
      <Outlet />
    );

  return content;
};

export default PublicRoute;
