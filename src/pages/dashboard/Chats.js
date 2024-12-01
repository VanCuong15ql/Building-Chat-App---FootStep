import { Box, IconButton, Stack, Typography, InputBase, Button, Divider, Avatar, Badge } from "@mui/material";
import { ArchiveBox, CircleDashed, MagnifyingGlass, Users } from "phosphor-react";
import React, { useEffect, useState } from "react";
import { styled, alpha, useTheme } from "@mui/material/styles";
import { faker } from "@faker-js/faker";
import { ChatList } from "../../data";
import { SimpleBarStyle } from "../../components/Scrollbar";
import Search from "../../components/Search/Search";
import SearchIconWrapper from "../../components/Search/SearchIconWrapper";
import StyledInputBase from "../../components/Search/StyledInputBase";
import ChatElement from "../../components/ChatElement";
import Friends from "../../sections/main/Friends";
import { socket } from "../../socket";
import { useDispatch, useSelector } from "react-redux";
import { FetchDirectConversations } from "../../redux/slices/conversation";



// container for all in search
const user_id = window.localStorage.getItem("user_id")

const Chats = () => {
    const [openDialog, setOpenDialog] = useState(false)
    const theme = useTheme();

    const dispatch = useDispatch();

    const { conversations } = useSelector((state) => state.conversation.direct_chat)

    useEffect(() => {
        socket.emit("get_direct_conversations", { user_id }, (data) => {
            console.log("friend_list");
            console.log(data); // this data is the list of conversations
            // dispatch action
            dispatch(FetchDirectConversations({ conversations: data }));
        })
    }, [])

    const handleOpenDialog = () => {
        setOpenDialog(true)
    }

    const handleCloseDialog = () => {
        setOpenDialog(false)
    }
    return (
        <>
            <Box sx={{
                position: "relative",
                width: 320,
                backgroundColor: theme.palette.mode === "light" ? "#F8FAFF" : theme.palette.background.paper,
                boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
            }}>
                <Stack p={3} direction="column" spacing={2} sx={{ height: "100vh" }}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography variant="h5">
                            Chats
                        </Typography>
                        <Stack direction={"row"} alignItems={"center"} spacing={1}>
                            <IconButton onClick={() => {
                                handleOpenDialog()
                            }}>
                                <Users />
                            </IconButton>
                            <IconButton>
                                <CircleDashed />
                            </IconButton>
                        </Stack>

                    </Stack>
                    <Stack sx={{ width: "100%" }}>
                        <Search>
                            <SearchIconWrapper>
                                <MagnifyingGlass color="#709CE6" />
                            </SearchIconWrapper>
                            <StyledInputBase placeholder="Search" />
                        </Search>
                    </Stack>
                    <Stack spacing={1}>
                        <Stack direction="row" alignItems="center" spacing={1.5}>
                            <ArchiveBox size={24} />
                            <Button>Archive</Button>
                        </Stack>
                        <Divider />
                    </Stack>
                    <Stack
                        spacing={2}
                        direction="column"
                        sx={{ flexGrow: 1, overflowY: "scroll", height: "100%" }}>
                        {/* nice scroll is out of date */}
                        <SimpleBarStyle timeout={500} clickOnTrack={false}>
                            {/* <Stack spacing={2.4}>
                                <Typography variant="subtitle2" sx={{ color: "#676767" }}>Pinned</Typography>
                                {ChatList.filter((el) => el.pinned).map((el) => {
                                    return <ChatElement {...el} />
                                })}
                            </Stack> */}
                            <Stack spacing={2.4}>
                                <Typography variant="subtitle2" sx={{ color: "#676767" }}>All Chats</Typography>
                                {conversations.filter((el) => !el.pinned).map((el) => {
                                    return <ChatElement {...el} />
                                })}
                            </Stack>
                        </SimpleBarStyle>
                    </Stack>
                </Stack>
            </Box>
            {openDialog && (
                <Friends open={openDialog} handleClose={handleCloseDialog} />
            )}
        </>
    );
};

export default Chats;