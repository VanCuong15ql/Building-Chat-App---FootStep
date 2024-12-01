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
import { Close } from "@mui/icons-material";
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
    setPastedImage,
    setReviewImage,
    reviewImage,
    inputRef,
    handleFileUpload,  
    handlePasteImage,
}) => {
    const [openActions, setOpenActions] = React.useState(false);

    return (
        <Box>
            <StyledInput
                inputRef={inputRef}
                value={value}
                onChange={(event) => {
                    setValue(event.target.value);
                }}
                onPaste={handlePasteImage}
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

            {reviewImage && (
                <Box
                    mt={2}
                    sx={{
                        position: "relative",
                        display: "inline-block",
                        maxWidth: "100%",
                    }}
                >
                    <img
                        src={reviewImage}
                        alt="Pasted content"
                        style={{
                            maxWidth: 400,
                            maxHeight: 400,
                        }}
                    />
                    <IconButton
                        onClick={() => {setReviewImage(null); setPastedImage(null);}}
                        sx={{
                            position: "absolute",
                            top: 4,
                            right: 4,
                            backgroundColor: "rgba(255, 255, 255, 0.8)",
                            ":hover": { backgroundColor: "rgba(255, 255, 255, 1)" },
                        }}
                        size="small"
                    >
                        <Close fontSize="small" />
                    </IconButton>
                </Box>
            )}
        </Box>
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
    const [pastedImage, setPastedImage] = useState(null);
    const [reviewImage, setReviewImage] = useState(null);
    const inputRef = useRef(null);
    const fileInputRef = useRef(null);

    const handleFileUpload = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click(); 
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

    const handlePasteImage = (event) => {
        const items = event.clipboardData.files;
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            if (item.type.startsWith("image/")) {
                const file = item;
                const imageUrl = URL.createObjectURL(file);
                setPastedImage(file);
                setReviewImage(imageUrl);
                break;
            }
        }
    };

    const onClickToSend = () => {
        let to = "";
        if (current_conversation.user_id) to = current_conversation.user_id;
        if (value) {
            socket.emit("text_message", {
                message: value,
                conversation_id: room_id,
                from: user_id,
                to: to,
                type: "Text",
            });
            setValue(""); 
        }
        if (pastedImage) {
            console.log("Image send: ", pastedImage);
            socket.emit("file_message", {
                from: user_id,
                to: to,
                name_file: `${Date.now()}.png`,
                file: pastedImage,
            });
            setPastedImage(null);
            setReviewImage(null);
        }
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
                            setPastedImage={setPastedImage}
                            reviewImage={reviewImage}
                            setReviewImage={setReviewImage}
                            openPicker={openPicker}
                            setOpenPicker={setOpenPicker}
                            handleFileUpload={handleFileUpload}
                            handlePasteImage={handlePasteImage}
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
                            <IconButton 
                                onClick={onClickToSend}
                            >
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
