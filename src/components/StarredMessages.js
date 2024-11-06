import { Box, IconButton, Stack, Typography } from '@mui/material';
import React from 'react';

import { useTheme } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { UpdateSidebarType } from '../redux/slices/app';
import { CaretLeft } from 'phosphor-react';
import Message from './Conversation/Message';

const StarredMessages = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: 320, height: "100vh" }}>
            <Stack sx={{ height: "100%" }}>
                {/* Header */}
                <Box sx={{
                    boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
                    width: "100%",
                    backgroundColor: theme.palette.mode === "light" ? "#F8FAFF" : theme.palette.background,
                }}>
                    <Stack sx={{ height: "100%", p: 2 }}
                        direction="row"
                        alignItems={"center"}
                        spacing={3}>
                        <IconButton onClick={() => {
                            dispatch(UpdateSidebarType("CONTACT")); // change back to contact info
                        }}>
                            <CaretLeft />
                        </IconButton>
                        <Typography variant='subtitle2'>Shared Messages</Typography>
                    </Stack>
                </Box>
                {/* Body */}

                <Stack sx={{ height: "100%", position: "relative", flexGrow: 1, overflowY: "scroll" }}
                    p={3} spacing={3}>
                    <Message />
                </Stack>
            </Stack>
        </Box>
    )
}

export default StarredMessages;
