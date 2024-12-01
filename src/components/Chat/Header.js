import React, { useEffect, useState } from "react";
import {
    Avatar,
    Badge,
    Box,
    Divider,
    Fade,
    IconButton,
    Menu,
    MenuItem,
    Stack,
    styled,
    Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { CaretDown, MagnifyingGlass, Phone, VideoCamera } from "phosphor-react";
import useResponsive from "../../hooks/useResponsive";
import { ToggleSidebar } from "../../redux/slices/app";
import { useDispatch, useSelector } from "react-redux";
import { StartAudioCall } from "../../redux/slices/audioCall";
import { StartVideoCall } from "../../redux/slices/videoCall";
import axios from "../../utils/axios";
import { faker } from "@faker-js/faker";


const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
        backgroundColor: "#44b700",
        color: "#44b700",
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        "&::after": {
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            animation: "ripple 1.2s infinite ease-in-out",
            border: "1px solid currentColor",
            content: '""',
        },
    },
    "@keyframes ripple": {
        "0%": {
            transform: "scale(.8)",
            opacity: 1,
        },
        "100%": {
            transform: "scale(2.4)",
            opacity: 0,
        },
    },
}));

const Conversation_Menu = [
    {
        title: "Contact info",
    },
    {
        title: "Mute notifications",
    },
    {
        title: "Clear messages",
    },
    {
        title: "Delete chat",
    },
];

const ChatHeader = () => {
    const dispatch = useDispatch();
    const isMobile = useResponsive("between", "md", "xs", "sm");
    const theme = useTheme();
    const { current_conversation } = useSelector((state) => state.conversation.direct_chat);
    const [conversationMenuAnchorEl, setConversationMenuAnchorEl] = useState(null);

    const openConversationMenu = Boolean(conversationMenuAnchorEl);

    const handleClickConversationMenu = (event) => {
        setConversationMenuAnchorEl(event.currentTarget);
    };
    const handleCloseConversationMenu = () => {
        setConversationMenuAnchorEl(null);
    };

    // const [avatarLink, setAvatarLink] = useState("");
    // useEffect(() => {
    //     async function getUser() {
    //         try {
    //             let data = await axios.get(`/user/get-user-by-id/${current_conversation.user_id}`, {
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                     Authorization: `Bearer ${window.localStorage.getItem("token_access")}`,
    //                 },
    //             });
    //             if (!(data && data.data && data.data.data && data.data.data.avatar)) return;
    //             console.log(`get user by id ${current_conversation.user_id}: `, data.data.data);
    //             setAvatarLink(data.data.data.avatar);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     };
    //     getUser();
    // }, [current_conversation]);

    return (
        <>
            <Box
                p={2}
                width={"100%"}
                sx={{
                    backgroundColor:
                        theme.palette.mode === "light"
                            ? "#F8FAFF"
                            : theme.palette.background,
                    boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
                }}
            >
                <Stack
                    alignItems={"center"}
                    direction={"row"}
                    sx={{ width: "100%", height: "100%" }}
                    justifyContent="space-between"
                >
                    <Stack
                        onClick={() => {
                            dispatch(ToggleSidebar());
                        }}
                        spacing={2}
                        direction="row"
                    >
                        <Box>
                            <StyledBadge
                                overlap="circular"
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "right",
                                }}
                                variant="dot"
                            >
                                <Avatar
                                    alt={current_conversation?.name}
                                    // src={avatarLink!=="" ? avatarLink : faker.image.avatar()}
                                    src={current_conversation?.img}
                                />
                            </StyledBadge>
                        </Box>
                        <Stack spacing={0.2}>
                            <Typography variant="subtitle2" onClick={() => {console.log(current_conversation.img)}}>
                                {current_conversation?.name}
                            </Typography>
                            <Typography variant="caption">Online</Typography>
                        </Stack>
                    </Stack>
                    <Stack
                        direction={"row"}
                        alignItems="center"
                        spacing={isMobile ? 1 : 3}
                    >
                        <IconButton onClick={() => {
                            dispatch(StartVideoCall(current_conversation.user_id));
                        }}>
                            <VideoCamera />
                        </IconButton>
                        <IconButton
                            onClick={() => {
                                // open call Dialog Box
                                dispatch(StartAudioCall(current_conversation.user_id));
                            }}
                        >
                            <Phone />
                        </IconButton>
                        {!isMobile && (
                            <IconButton>
                                <MagnifyingGlass />
                            </IconButton>
                        )}
                        <Divider orientation="vertical" flexItem />
                        <IconButton
                            id="conversation-positioned-button"
                            aria-controls={
                                openConversationMenu
                                    ? "conversation-positioned-menu"
                                    : undefined
                            }
                            aria-haspopup="true"
                            aria-expanded={openConversationMenu ? "true" : undefined}
                            onClick={handleClickConversationMenu}
                        >
                            <CaretDown />
                        </IconButton>
                        <Menu
                            MenuListProps={{
                                "aria-labelledby": "fade-button",
                            }}
                            TransitionComponent={Fade}
                            id="conversation-positioned-menu"
                            aria-labelledby="conversation-positioned-button"
                            anchorEl={conversationMenuAnchorEl}
                            open={openConversationMenu}
                            onClose={handleCloseConversationMenu}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "right",
                            }}
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                        >
                            <Box p={1}>
                                <Stack spacing={1}>
                                    {Conversation_Menu.map((el) => (
                                        <MenuItem onClick={handleCloseConversationMenu}>
                                            <Stack
                                                sx={{ minWidth: 100 }}
                                                direction="row"
                                                alignItems={"center"}
                                                justifyContent="space-between"
                                            >
                                                <span>{el.title}</span>
                                            </Stack>{" "}
                                        </MenuItem>
                                    ))}
                                </Stack>
                            </Box>
                        </Menu>
                    </Stack>
                </Stack>
            </Box>
        </>
    );
};

export default ChatHeader;