import React from "react";
import {
    Stack,
    Box,
    Typography,
    Menu,
    MenuItem,
    IconButton,
    Divider,
} from "@mui/material";
import { useTheme, alpha } from "@mui/material/styles";
import { DotsThreeVertical, DownloadSimple, Image } from "phosphor-react";
import { Message_options } from "../../data";
import Embed from "react-embed";

const MessageOption = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <>
            <DotsThreeVertical
                size={20}
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
            />
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
            >
                <Stack spacing={1} px={1}>
                    {Message_options.map((el) => (
                        <MenuItem onClick={handleClose}>{el.title}</MenuItem>
                    ))}
                </Stack>
            </Menu>
        </>
    );
};
const TextMsg = ({ el, menu }) => {
    const theme = useTheme();
    const clickTypography = () => {
        if (el.subtype === "File") window.open(el.file, "_blank");
        if (el.subtype === "Link") window.open(el.message, "_blank");
    };
    return (
        <Stack direction="row" justifyContent={el.incoming ? "start" : "end"}>
            <Box
                px={1.5}
                py={1.5}
                sx={{
                    backgroundColor: el.incoming
                        ? alpha(theme.palette.background.default, 1)
                        : theme.palette.primary.main,
                    borderRadius: 1.5,
                    width: "max-content",
                }}
            >
                {(el.subtype === "Text" || el.subtype === "File" || el.subtype === "Link") &&
                    <Typography
                        variant="body2"
                        onClick={clickTypography}
                        color={el.incoming ? theme.palette.text : "#fff"}
                    >
                        {el.subtype === "File" ? "📄" : ""}
                        {el.message}
                    </Typography>

                }

                {el.subtype === "Image" &&
                    <Typography
                        variant="body2"
                        onClick={clickTypography}
                        color={el.incoming ? theme.palette.text : "#fff"}
                    >
                        <img
                            src={el.file}
                            alt="chat-image"
                            style={{ maxHeight: 400, maxWidth: 400 }}
                        />
                    </Typography>
                }

                {el.subtype === "Video" &&
                    <Typography
                        variant="body2"
                        onClick={clickTypography}
                        color={el.incoming ? theme.palette.text : "#fff"}
                    >
                        <video controls loop style={{ maxHeight: 500, maxWidth: 500 }}>
                            <source src={el.file} type="video/mp4" />
                        </video>
                    </Typography>
                }
                <Typography variant="caption"
                    style={{ fontSize: '11px', opacity: 0.5 }}
                    color={el.incoming ? theme.palette.text : "#fff"}>
                    {el.timestamp ? el.timestamp : new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                </Typography>
            </Box>
            {menu && <MessageOption />}
        </Stack>
    );
};
const MediaMsg = ({ el }) => {
    const theme = useTheme();
    return (
        <Stack direction="row" justifyContent={el.incoming ? "start" : "end"}>
            <Box
                px={1.5}
                py={1.5}
                sx={{
                    backgroundColor: el.incoming
                        ? alpha(theme.palette.background.default, 1)
                        : theme.palette.primary.main,
                    borderRadius: 1.5,
                    width: "max-content",
                }}
            >
                <Stack direction={"row"}>
                    <Stack spacing={1}>
                        <img
                            src={el.img}
                            alt={el.message}
                            style={{ maxHeight: 210, borderRadius: "10px" }}
                        />
                        <Typography
                            variant="body2"
                            color={el.incoming ? theme.palette.text : "#fff"}
                        >
                            {el.message}
                        </Typography>
                    </Stack>
                </Stack>
                <Typography variant="caption"
                    style={{ fontSize: '11px', opacity: 0.5 }}
                    color={el.incoming ? theme.palette.text : "#fff"}>
                    {el.timestamp ? el.timestamp : new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                </Typography>
            </Box>
            <MessageOption />
        </Stack>
    );
};
const DocMsg = ({ el }) => {
    const theme = useTheme();
    return (
        <Stack direction="row" justifyContent={el.incoming ? "start" : "end"}>
            <Box
                px={1.5}
                py={1.5}
                sx={{
                    backgroundColor: el.incoming
                        ? alpha(theme.palette.background.default, 1)
                        : theme.palette.primary.main,
                    borderRadius: 1.5,
                    width: "max-content",
                }}
            >
                <Stack spacing={2}>
                    <Stack
                        p={2}
                        direction="row"
                        spacing={3}
                        alignItems="center"
                        sx={{
                            backgroundColor: theme.palette.background.paper,
                            borderRadius: 1,
                        }}
                    >
                        <Image size={48} />
                        <Typography variant="caption">Abstract.png</Typography>
                        <IconButton>
                            <DownloadSimple />
                        </IconButton>
                    </Stack>
                    <Typography
                        variant="body2"
                        color={el.incoming ? theme.palette.text : "#fff"}
                    >
                        {el.message}
                    </Typography>
                </Stack>
                <Typography variant="caption"
                    style={{ fontSize: '11px', opacity: 0.5 }}
                    color={el.incoming ? theme.palette.text : "#fff"}>
                    {el.timestamp ? el.timestamp : new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                </Typography>
            </Box>
            <MessageOption />
        </Stack>
    );
};
const LinkMsg = ({ el }) => {
    const theme = useTheme();
    return (
        <Stack direction="row" justifyContent={el.incoming ? "start" : "end"}>
            <Box
                px={1.5}
                py={1.5}
                sx={{
                    backgroundColor: el.incoming
                        ? alpha(theme.palette.background.default, 1)
                        : theme.palette.primary.main,
                    borderRadius: 1.5,
                    width: "max-content",
                }}
            >
                <Stack spacing={2}>
                    <Stack
                        p={2}
                        direction="column"
                        spacing={3}
                        alignItems="center"
                        sx={{
                            backgroundColor: theme.palette.background.paper,
                            borderRadius: 1,
                        }}
                    >
                        <Stack direction={"column"} spacing={2}>
                            <Embed
                                width="300px"
                                isDark
                                url={`https://youtu.be/xoWxBR34qLE`}
                            />
                        </Stack>
                    </Stack>
                    <Typography
                        variant="body2"
                        color={el.incoming ? theme.palette.text : "#fff"}
                    >
                        <div dangerouslySetInnerHTML={{ __html: el.message }}></div>
                    </Typography>
                </Stack>
                <Typography variant="caption"
                    style={{ fontSize: '11px', opacity: 0.5 }}
                    color={el.incoming ? theme.palette.text : "#fff"}>
                    {el.timestamp ? el.timestamp : new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                </Typography>
            </Box>
            <MessageOption />
        </Stack>
    );
};
const ReplyMsg = ({ el }) => {
    const theme = useTheme();
    return (
        <Stack direction="row" justifyContent={el.incoming ? "start" : "end"}>
            <Box
                px={1.5}
                py={1.5}
                sx={{
                    backgroundColor: el.incoming
                        ? alpha(theme.palette.background.paper, 1)
                        : theme.palette.primary.main,
                    borderRadius: 1.5,
                    width: "max-content",
                }}
            >
                <Stack spacing={2}>
                    <Stack
                        p={2}
                        direction="column"
                        spacing={3}
                        alignItems="center"
                        sx={{
                            backgroundColor: alpha(theme.palette.background.paper, 1),
                            borderRadius: 1,
                        }}
                    >
                        <Typography variant="body2" color={theme.palette.text}>
                            {el.message}
                        </Typography>
                    </Stack>
                    <Typography
                        variant="body2"
                        color={el.incoming ? theme.palette.text : "#fff"}
                    >
                        {el.reply}
                    </Typography>
                </Stack>
                <Typography variant="caption"
                    style={{ fontSize: '11px', opacity: 0.5 }}
                    color={el.incoming ? theme.palette.text : "#fff"}>
                    {el.timestamp ? el.timestamp : new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                </Typography>
            </Box>
            <MessageOption />
        </Stack>
    );
};
const Timeline = ({ el }) => {
    const theme = useTheme();
    return (
        <Stack direction="row" alignItems={"center"} justifyContent="space-between">
            <Divider width="46%" />
            <Typography variant="caption" sx={{ color: theme.palette.text }}>
                {el.text}
            </Typography>
            <Divider width="46%" />
        </Stack>
    );
};
export { Timeline, MediaMsg, LinkMsg, DocMsg, TextMsg, ReplyMsg };