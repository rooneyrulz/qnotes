import { useEffect, useRef, useState, useCallback } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import PulseLoader from "react-spinners/PulseLoader";

import { useRefreshMutation } from "./authApiSlice";
import usePersist from "../../hooks/usePersist";
import usePersistOAuth from "../../hooks/usePersistOAuth";
import useLoading from "../../hooks/useLoading";
import { selectCurrentToken } from "./authSlice";

const PersistLogin = () => {
  const [persist] = usePersist();
  const [persistOAuth] = usePersistOAuth();
  const token = useSelector(selectCurrentToken);
  const effectRan = useRef(false);
  const location = useLocation();

  const [loading, setLoading] = useLoading();

  const [trueSuccess, setTrueSuccess] = useState(false);

  const [refresh, { isUninitialized, isLoading, isSuccess, isError }] =
    useRefreshMutation();

  const verifyRefreshToken = useCallback(async () => {
    console.log("verifying refresh token");
    try {
      await refresh();
      setTrueSuccess(true);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  }, [refresh, setLoading]);

  useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV !== "development") {
      if (!token && (persist || persistOAuth)) verifyRefreshToken();
    }

    return () => (effectRan.current = true);

    // eslint-disable-next-line
  }, [token, persist, persistOAuth, verifyRefreshToken]);

  let content;
  if (!persist) {
    content = <Outlet />;
  } else if (isLoading || loading) {
    content = <PulseLoader color={"#FFF"} />;
  } else if (isError) {
    content = <Navigate to="/login" state={{ from: location }} replace />;
  } else if (isSuccess && trueSuccess) {
    content = <Outlet />;
  } else if (token && isUninitialized) {
    content = <Outlet />;
  }

  return content;
};
export default PersistLogin;
