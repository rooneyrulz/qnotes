import { useState, useEffect } from "react";

const usePersistOAuth = () => {
  const [persistOAuth, setPersistOAuth] = useState(
    JSON.parse(localStorage.getItem("persistGoogle")) || false
  );

  useEffect(() => {
    localStorage.setItem("persistOAuth", JSON.stringify(persistOAuth));
  }, [persistOAuth]);

  return [persistOAuth, setPersistOAuth];
};

export default usePersistOAuth;
