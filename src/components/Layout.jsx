import React from "react";
import { Outlet } from "react-router-dom";
import { Lounge } from "./Lounge";

export const Layout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};
