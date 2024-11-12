import React, { useState } from "react"
import { Box, Divider, IconButton, Stack, Avatar, Switch, Menu, MenuItem } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Gear } from "phosphor-react";
import { Nav_Buttons, Profile_Menu } from "../../data";
import useSettings from "../../hooks/useSettings";
import { faker } from "@faker-js/faker";
import Logo from "../../assets/Images/logo.ico";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LogoutUser } from "../../redux/slices/auth";

const getPath = (index) => {
    switch (index) {
        case 0:
            return "/app";
        case 1:
            return "/group";
        case 2:
            return "/call";
        case 3:
            return "/settings";
        default:
            break;
    }
}

const getMenuPath = (index) => {
    switch (index) {
        case 0:
            return "/profile";
        case 1:
            return "/settings";
        case 2:
            // TODO: Update token & set isAuthenticated = false
            return "/auth/login";
        default:
            break;
    }
}

const SideBar = () => {
    const dispatch = useDispatch()
    const theme = useTheme();
    const navigate = useNavigate();
    const [selected, setSelected] = useState(0);
    const { onToggleMode } = useSettings();

    // for user setting
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
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
                                        // navigate to the path
                                        navigate(getPath(el.index));
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
                                    navigate(getPath(3));
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
                    <Avatar
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                        src={faker.image.avatar()}
                    />
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                        // fixing menu overlap user avatar
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right"
                        }}
                        transformOrigin={{
                            vertical: "bottom",
                            horizontal: "left"
                        }}
                    >
                        {/* adding Profile_Menu */}
                        <Stack spacing={1} px={1}>
                            {Profile_Menu.map((el, idx) => (
                                <MenuItem onClick={handleClick}>
                                    <Stack
                                        onClick={(e) => {
                                            e.stopPropagation(); // stop menu popup
                                            if (idx === 2) {
                                                dispatch(LogoutUser())
                                            } else {
                                                navigate(getMenuPath(idx));
                                            }
                                        }}
                                        direction="row"
                                        alignItems={"center"}
                                        justifyContent="space-between"
                                        sx={{
                                            width: 100
                                        }}
                                    >
                                        <span>{el.title}</span>
                                        {el.icon}
                                    </Stack>
                                </MenuItem>
                            ))}
                        </Stack>
                    </Menu>
                </Stack>
            </Stack>
        </Box>
    )
}

export default SideBar;