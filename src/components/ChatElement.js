import React, { useEffect } from "react";
import { Box, Badge, Stack, Avatar, Typography } from "@mui/material";
import { styled, useTheme, alpha } from "@mui/material/styles";
import { faker } from "@faker-js/faker";
import { useDispatch } from "react-redux";
import { SelectConversation } from "../redux/slices/app";
import axios from "../utils/axios";

const truncateText = (string, n) => {
    return string?.length > n ? `${string?.slice(0, n)}...` : string;
};

const StyledChatBox = styled(Box)(({ theme }) => ({
    "&:hover": {
        cursor: "pointer",
    },
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));

const ChatElement = ({ id, user_id, name, img, msg, time, unread, online }) => {
    const theme = useTheme();
    const dispatch = useDispatch();

    // const [avatarLink, setAvatarLink] = React.useState("");
    // useEffect(() => {
    //     async function getUser() {
    //         try {
    //             let data = await axios.get(`/user/get-user-by-id/${user_id}`, {
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                     Authorization: `Bearer ${window.localStorage.getItem("token_access")}`,
    //                 },
    //             });
    //             if (!(data && data.data && data.data.data && data.data.data.avatar)) return;
    //             console.log(`get user by id ${user_id}: `, data.data.data);
    //             setAvatarLink(data.data.data.avatar);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     };
    //     getUser();
    // }, []);

    return (
        <Box
            onClick={() => {
                dispatch(SelectConversation({ room_id: id }))
            }}
            sx={{
                width: "100%",
                borderRadius: 1,
                backgroundColor: theme.palette.mode === "light" ? "#fff" : theme.palette.background.default,
            }} p={2}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Stack direction="row" spacing={2}>
                    {online 
                    ? 
                    <StyledBadge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        variant="dot"
                    >
                        <Avatar 
                            // src={avatarLink!=="" ? avatarLink : faker.image.avatar()} 
                            src={img}
                        />
                    </StyledBadge> 
                    : 
                    <Avatar 
                        // src={avatarLink!=="" ? avatarLink : faker.image.avatar()} 
                        src={img}
                    />
                    }

                    <Stack spacing={0.3}>
                        <Typography variant="subtitle2">{name}</Typography>
                        <Typography variant="caption">{msg}</Typography>
                    </Stack>
                </Stack>
                <Stack spacing={2} alignItems="center">
                    <Typography sx={{ fontWeight: 600 }} variant="caption">{time}</Typography>
                    <Badge color="primary" badgeContent={unread}></Badge>
                </Stack>
            </Stack>
        </Box>
    )
}

export default ChatElement;
