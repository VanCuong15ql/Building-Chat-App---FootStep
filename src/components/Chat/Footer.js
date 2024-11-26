import React, { useRef, useState } from "react";
import {
    Box,
    Fab,
    IconButton,
    InputAdornment,
    Stack,
    TextField,
    Tooltip,
} from "@mui/material";
import {
    Camera,
    File,
    Image,
    LinkSimple,
    PaperPlaneTilt,
    Smiley,
    Sticker,
    User,
} from "phosphor-react";
import { useTheme, styled } from "@mui/material/styles";
import { socket } from "../../socket";
import { useSelector } from "react-redux";

const StyledInput = styled(TextField)(({ theme }) => ({
    "& .MuiInputBase-input": {
        paddingTop: "12px !important",
        paddingBottom: "12px !important",
    },
}));

const Actions = [
    {
        color: "#4da5fe",
        icon: <Image size={24} />,
        y: 102,
        title: "Photo/Video",
    },
    {
        color: "#1b8cfe",
        icon: <Sticker size={24} />,
        y: 172,
        title: "Stickers",
    },
    {
        color: "#0172e4",
        icon: <Camera size={24} />,
        y: 242,
        title: "Image",
    },
    {
        color: "#0159b2",
        icon: <File size={24} />,
        y: 312,
        title: "Document",
        action: "document",
    },
    {
        color: "#013f7f",
        icon: <User size={24} />,
        y: 382,
        title: "Contact",
    },
];

const ChatInput = ({
    openPicker,
    setOpenPicker,
    setValue,
    value,
    inputRef,
    handleFileUpload, // Thêm props xử lý tải file
}) => {
    const [openActions, setOpenActions] = React.useState(false);

    return (
        <StyledInput
            inputRef={inputRef}
            value={value}
            onChange={(event) => {
                setValue(event.target.value);
            }}
            fullWidth
            placeholder="Write a message..."
            variant="filled"
            InputProps={{
                disableUnderline: true,
                startAdornment: (
                    <Stack sx={{ width: "max-content" }}>
                        <Stack
                            sx={{
                                position: "relative",
                                display: openActions ? "inline-block" : "none",
                            }}
                        >
                            {Actions.map((el, index) => (
                                <Tooltip key={index} placement="right" title={el.title}>
                                    <Fab
                                        onClick={() => {
                                            if (el.action === "document") {
                                                handleFileUpload(); // Gọi hàm tải file
                                            }
                                            setOpenActions(!openActions);
                                        }}
                                        sx={{
                                            position: "absolute",
                                            top: -el.y,
                                            backgroundColor: el.color,
                                        }}
                                        aria-label="add"
                                    >
                                        {el.icon}
                                    </Fab>
                                </Tooltip>
                            ))}
                        </Stack>

                        <InputAdornment>
                            <IconButton
                                onClick={() => {
                                    setOpenActions(!openActions);
                                }}
                            >
                                <LinkSimple />
                            </IconButton>
                        </InputAdornment>
                    </Stack>
                ),
                endAdornment: (
                    <Stack sx={{ position: "relative" }}>
                        <InputAdornment>
                            <IconButton
                                onClick={() => {
                                    setOpenPicker(!openPicker);
                                }}
                            >
                                <Smiley />
                            </IconButton>
                        </InputAdornment>
                    </Stack>
                ),
            }}
        />
    );
};

const Footer = () => {
    const theme = useTheme();
    const { current_conversation } = useSelector(
        (state) => state.conversation.direct_chat
    );
    const user_id = window.localStorage.getItem("user_id");
    const { room_id } = useSelector((state) => state.app);

    const [openPicker, setOpenPicker] = React.useState(false);
    const [value, setValue] = useState("");
    const inputRef = useRef(null);
    const fileInputRef = useRef(null); // Ref cho input file

    const handleFileUpload = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click(); // Kích hoạt sự kiện click
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        let to = "";
        if (current_conversation.user_id) to = current_conversation.user_id;
        if (file) {
            console.log("Tệp được chọn:", file);
            socket.emit("file_message", {
                from: user_id,
                to: to,
                name_file: file.name,
                file: file
            });
        }
    };

    const onClick = () => {
        let to = "";
        if (current_conversation.user_id) to = current_conversation.user_id;
        socket.emit("text_message", {
            message: value,
            conversation_id: room_id,
            from: user_id,
            to: to,
            type: "Text",
        });
        setValue(""); // Xóa nội dung sau khi gửi
    };

    return (
        <Box
            sx={{
                position: "relative",
                backgroundColor: "transparent !important",
            }}
        >
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange} // Xử lý khi người dùng chọn file
            />
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
                <Stack direction="row" alignItems={"center"} spacing={2}>
                    <Stack sx={{ width: "100%" }}>
                        <ChatInput
                            inputRef={inputRef}
                            value={value}
                            setValue={setValue}
                            openPicker={openPicker}
                            setOpenPicker={setOpenPicker}
                            handleFileUpload={handleFileUpload} // Truyền hàm xử lý tải file
                        />
                    </Stack>
                    <Box
                        sx={{
                            height: 48,
                            width: 48,
                            backgroundColor: theme.palette.primary.main,
                            borderRadius: 1.5,
                        }}
                    >
                        <Stack
                            sx={{ height: "100%" }}
                            alignItems={"center"}
                            justifyContent="center"
                        >
                            <IconButton onClick={onClick}>
                                <PaperPlaneTilt color="#ffffff" />
                            </IconButton>
                        </Stack>
                    </Box>
                </Stack>
            </Box>
        </Box>
    );
};

export default Footer;
