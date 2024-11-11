import { Stack } from "@mui/material";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import SideBar from "./SideBar";

// fix logined - make it dynamic
const isAuthenticated = true;

const DashboardLayout = () => {
  if (!isAuthenticated) {
    // navigate all path to login if not authenticated
    return <Navigate to="/auth/login" />
  }

  return (
    <Stack direction="row">
      {/* Side bar */}
      <SideBar />
      <Outlet />
      {/* Chats and conservation render here */}
    </Stack>
  );
};

export default DashboardLayout;
