import React from "react";
import { Outlet } from "react-router-dom";
import PublicFooter from "./PublicFooter";

const DashLayout = () => {
  return (
    <>
      <div className="public-container">
        <Outlet />
      </div>
      <PublicFooter />
    </>
  );
};

export default DashLayout;
