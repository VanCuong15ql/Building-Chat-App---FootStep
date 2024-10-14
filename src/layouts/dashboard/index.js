import { Avatar, Box, Divider, IconButton, Switch, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Logo from "../../assets/Images/logo.ico"
import { Nav_Buttons } from "../../data";
import { Gear } from "phosphor-react";
import { faker } from "@faker-js/faker";
import useSettings from "../../hooks/useSettings";

const DashboardLayout = () => {
  const theme = useTheme();
  const [selected, setSelected] = useState(0);
  const { onToggleMode } = useSettings();
  return (
    <>
      {/* Side bar */}
      <Box p={2}
        sx={{
          backgroundColor: theme.palette.background.paper,
          boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
          height: "100vh", width: 100
        }}>
        <Stack direction="column" alignItems={"center"}
          sx={{ width: "100%", height: "100%" }}
          spacing={3} justifyContent="space-between">
          <Stack alignItems="center" spacing={4}>
            {/* Logo */}
            <Box sx={{
              backgroundColor: theme.palette.primary.main,
              height: 64, width: 64, borderRadius: 1.5
            }}>
              <img src={Logo} alt="Chat app logo"></img>
            </Box>

            <Stack sx={{ width: "max-content" }} direction="column"
              alignItems="center" spacing={3}>
              {Nav_Buttons.map((el) => (
                el.index === selected ?
                  <Box p={1}
                    sx={{
                      backgroundColor: theme.palette.primary.main,
                      borderRadius: 1.5,
                    }}>
                    <IconButton sx={{
                      width: "max-content",
                      color: "#fff"
                    }} key={el.index}>{el.icon}</IconButton>
                  </Box>
                  : <IconButton
                    onClick={() => {
                      setSelected(el.index);
                    }}
                    sx={{
                      width: "max-content",
                      color: theme.palette.mode === "light" ? "#000" : theme.palette.text.primary
                    }} key={el.index}>{el.icon}</IconButton>
              ))}
              <Divider sx={{ width: "48px" }} />
              {selected === 3 ? (
                <Box p={1}
                  sx={{
                    backgroundColor: theme.palette.primary.main, borderRadius: 1.5,
                  }}>
                  <IconButton sx={{ width: "max-content", color: theme.palette.mode === "light" ? "#fff" : theme.palette.text.primary }}>
                    <Gear />
                  </IconButton>
                </Box>
              ) : (
                <IconButton
                  onClick={() => {
                    setSelected(3);
                  }}
                  sx={{ width: "max-content", color: theme.palette.mode === "light" ? "#000" : theme.palette.text.primary }}>
                  <Gear />
                </IconButton>
              )
              }
            </Stack>
          </Stack>
          <Stack spacing={4} alignItems="center">
            {/* Switch */}
            <Switch onChange={() => {
              onToggleMode();
            }} defaultChecked />
            <Avatar src={faker.image.avatar()} />
          </Stack>
        </Stack>
      </Box>
      <Outlet />
    </>
  );
};

export default DashboardLayout;
