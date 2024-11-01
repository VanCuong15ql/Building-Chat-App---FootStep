import { Box, Stack } from "@mui/material";
import React from "react";

import { Chat_History } from '../../data'
import { DocMsg, LinkMsg, MediaMsg, ReplyMsg, TextMsg, TimeLine } from "./MsgTypes";

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
                                    return <MediaMsg el={el} />
                                case "doc":
                                    // document message
                                    return <DocMsg el={el} />
                                case "link":
                                    // link message
                                    return <LinkMsg el={el} />
                                case "reply":
                                    // reply message
                                    return <ReplyMsg el={el} />
                                default:
                                    // text message
                                    return <TextMsg el={el} />
                            }

                        default:
                            return <></>
                    }
                })}
            </Stack>
        </Box>
    )
}

export default Message;