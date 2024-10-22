import { Box, Stack } from "@mui/material";
import React from "react";

import { Chat_History } from '../../data'
import { TextMsg, TimeLine } from "./MsgTypes";

const Message = () => {
    return (
        <Box p={3}>
            <Stack spacing={3}>
                {Chat_History.map((el) => {
                    switch (el.type) {
                        case "divider":
                            // timeline
                            return <TimeLine el={el} />
                        case "msg":
                            switch (el.subtype) {
                                case "img":
                                    // image message
                                    break;
                                case "doc":
                                    // document message

                                    break;
                                case "link":
                                    // link message

                                    break;
                                case "reply":
                                    // reply message

                                    break;
                                default:
                                    // text message
                                    return <TextMsg el={el} />
                            }
                            break;

                        default:
                            return <></>
                    }
                })}
            </Stack>
        </Box>
    )
}

export default Message;