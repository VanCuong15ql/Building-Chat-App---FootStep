import { Stack } from "@mui/material";
import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import { useDispatch, useSelector } from "react-redux";
import { connectSocket, socket } from "../../socket";

const DashboardLayout = () => {

  const dispatch = useDispatch();

  const { isLoggedIn } = useSelector((state) => state.auth);

  const user_id = window.localStorage.getItem("user_id");

  useEffect(() => {
    if (isLoggedIn) {
      window.onload = function () {
        if (!window.location.hash) {
          window.location = window.location + '#loaded';
          window.location.reload();
        }
      }

      window.reload();

      if (!socket) {
        connectSocket(user_id);
      }

      // new_friend_requests

      socket.on("new_friend_request", (data) => {
        dispatch(showSnackbar({ severity: "success", message: data.message }))
      })

      socket.on("request_accepted", (data) => {
        dispatch(showSnackbar({ severity: "success", message: data.message }))
      })

      socket.on("request_sent", (data) => {
        dispatch(showSnackbar({ severity: "success", message: data.message }))
      })
    }

    return () => {
      socket.off("new_friend_request");
      socket.off("request_accepted");
      socket.off("request_sent");

    }
  }, [isLoggedIn, socket])

  if (!isLoggedIn) {
    return <Navigator to="/auth/login" />
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
