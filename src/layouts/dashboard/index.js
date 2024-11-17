import { Stack } from "@mui/material";
import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import { useDispatch, useSelector } from "react-redux";
import { connectSocket, socket } from "../../socket";
import { SelectConversation, showSnackbar } from "../../redux/slices/app";
import { AddDirectConversation, UpdateDirectConversation, AddDirectMessage } from "../../redux/slices/conversation";

// fix logined - make it dynamic

const DashboardLayout = () => {
  const dispatch = useDispatch();

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { conversations, current_conversation } = useSelector((state) => state.conversation.direct_chat)

  const user_id = window.localStorage.getItem("user_id");

  useEffect(() => {
    if (isLoggedIn) {
      window.onload = function () {
        if (!window.location.hash) {
          window.location = window.location + '#loaded';
          window.location.reload();
        }
      }

      window.onload();

      if (!socket) {
        connectSocket(user_id);
      }

      socket.on("new_message", (data) => {
        const message = data.message;
        console.log(current_conversation, data);
        // check if msg we got is from currently selected conversation
        if (current_conversation && current_conversation.id === data.conversation_id) {
          dispatch(
            AddDirectMessage({
              id: message.created_at,
              type: "msg",
              subtype: message.type,
              message: message.text,
              incoming: message.to === user_id,
              outgoing: message.from === user_id,
            })
          );
        }
      })

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

      socket.on("start_chat", (data) => {
        console.log(data)
        const existing_conversation = conversations.find((el) => el.id === data._id)
        if (existing_conversation) {
          dispatch(UpdateDirectConversation({ conversation: data }))
        } else {
          dispatch(AddDirectConversation({ conversation: data }))
        }
        dispatch(SelectConversation({ room_id: data._id }))
      })
    }

    return () => {
      socket?.off("new_friend_request");
      socket?.off("request_accepted");
      socket?.off("request_sent");
      socket?.off("start_chat");
      socket?.off("new_message");
    }
  }, [isLoggedIn, socket])

  if (!isLoggedIn) {
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
