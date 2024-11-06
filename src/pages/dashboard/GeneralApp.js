import React from "react";
import Chats from "./Chats";
import { Box, Stack } from "@mui/material";
import Conversation from "../../components/Conversation";
import { useTheme } from "@mui/material/styles";
import Contact from "../../components/Contact";
import { useSelector } from "react-redux";
import SharedMessages from "../../components/SharedMessages";
import StarredMessages from "../../components/StarredMessages";

const GeneralApp = () => {
  const theme = useTheme();
  const { sidebar } = useSelector((store) => store.app);


  return (
    <Stack direction={"row"} sx={{ width: "100%" }}>
      {/* Chats */}
      <Chats />

      {/* Conversation */}
      <Box sx={{
        height: "100%",
        width: sidebar.open ? "calc(100vw - 740px)" : "calc(100vw - 420px)",
        backgroundColor: theme.palette.mode === "light"
          ? "#F0F4FA"
          : theme.palette.background.default
      }}>
        <Conversation />
      </Box>

      {/* Contact information */}
      {sidebar.open && (() => {
        switch (sidebar.type) {
          case "CONTACT":
            // Contact Info
            return <Contact />;
          case "STARRED":
            // Starred Messages
            return <StarredMessages />;
          case "SHARED":
            // Shared Messages
            return <SharedMessages />;
          default:
            break;
        }
      })()}

    </Stack >
  );
};

export default GeneralApp;
