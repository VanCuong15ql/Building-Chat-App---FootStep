import { Box, IconButton, Stack, Typography, InputBase, Button, Divider, Avatar, Badge } from "@mui/material";
import { ArchiveBox, CircleDashed, MagnifyingGlass } from "phosphor-react";
import React from "react";
import { styled, alpha, useTheme } from "@mui/material/styles";
import { faker } from "@faker-js/faker";
import { ChatList } from "../../data";
import { SimpleBarStyle } from "../../components/Scrollbar";
import Search from "../../components/Search/Search";
import SearchIconWrapper from "../../components/Search/SearchIconWrapper";
import StyledInputBase from "../../components/Search/StyledInputBase";
import ChatElement from "../../components/ChatElement";


// container for all in search

const Chats = () => {
    const theme = useTheme();
    return (
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
                    <IconButton>
                        <CircleDashed />
                    </IconButton>
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
                        <Stack spacing={2.4}>
                            <Typography variant="subtitle2" sx={{ color: "#676767" }}>Pinned</Typography>
                            {ChatList.filter((el) => el.pinned).map((el) => {
                                return <ChatElement {...el} />
                            })}
                        </Stack>
                        <Stack spacing={2.4}>
                            <Typography variant="subtitle2" sx={{ color: "#676767" }}>All Chats</Typography>
                            {ChatList.filter((el) => !el.pinned).map((el) => {
                                return <ChatElement {...el} />
                            })}
                        </Stack>
                    </SimpleBarStyle>
                </Stack>
            </Stack>
        </Box>
    );
};

export default Chats;