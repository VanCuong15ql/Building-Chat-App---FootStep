import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  Slide,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  Bell,
  CaretRight,
  Phone,
  Prohibit,
  Star,
  Trash,
  VideoCamera,
  X,
} from "phosphor-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToggleSidebar, UpdateSidebarType } from "../redux/slices/app";
import { faker } from "@faker-js/faker";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const BlockDialog = ({ open, handleClose }) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{"Block this contact"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Are you sure you want to block this Contact?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose}>Yes</Button>
      </DialogActions>
    </Dialog>
  );
};

const DeleteDialog = ({ open, handleClose }) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{"Delete this chat"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Are you sure you want to delete this chat?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose}>Yes</Button>
      </DialogActions>
    </Dialog>
  );
};

const Contact = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { current_conversation } = useSelector(
    (state) => state.conversation.direct_chat
  );

  const [openBlock, setOpenBlock] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleCloseBlock = () => {
    setOpenBlock(false);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  return (
    <Box sx={{ width: 320, height: "100vh" }}>
      <Stack sx={{ height: "100%" }}>
        {/* Header */}
        <Box
          sx={{
            boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
            width: "100%",
            backgroundColor:
              theme.palette.mode === "light"
                ? "#F8FAFF"
                : theme.palette.background,
          }}
        >
          <Stack
            sx={{ height: "100%", p: 2 }}
            direction="row"
            alignItems={"center"}
            justifyContent="space-between"
          >
            <Typography variant="subtitle2">Contact Info</Typography>
            <IconButton
              onClick={() => {
                dispatch(ToggleSidebar()); // close sidebar
              }}
            >
              <X />
            </IconButton>
          </Stack>
        </Box>
        {/* Body */}
        <Stack
          sx={{
            height: "100%",
            position: "relative",
            flexGrow: 1,
            overflowY: "scroll",
          }}
          p={3}
          spacing={3}
        >
          {/* Avatar & Name */}
          <Stack alignItems={"center"} direction="row" spacing={2}>
            <Avatar
              src={current_conversation?.img}
              alt={current_conversation?.name}
              sx={{ height: 64, width: 64 }}
            />
            <Stack spacing={0.5}>
              <Typography variant="article" fontWeight={600}>
                {current_conversation?.name}
              </Typography>
              <Typography variant="article" fontWeight={600}>
                {"+91 729 2829 928"}
              </Typography>
            </Stack>
          </Stack>
          {/* Voice & Video */}
          <Stack
            direction="row"
            alignItems={"center"}
            justifyContent="space-evenly"
          >
            <Stack spacing={1} alignItems="center">
              <IconButton>
                <Phone />
              </IconButton>
              <Typography variant="overline">Voice</Typography>
            </Stack>
            <Stack spacing={1} alignItems="center">
              <IconButton>
                <VideoCamera />
              </IconButton>
              <Typography variant="overline">Video</Typography>
            </Stack>
          </Stack>
          <Divider />
          {/* Info */}
          <Stack spacing={0.5}>
            <Typography variant="article">About</Typography>
            <Typography variant="body2" fontWeight={500}>
              {" "}
              {current_conversation?.about}
            </Typography>
          </Stack>
          <Divider />
          {/* Media, links and docs */}
          <Stack
            direction="row"
            alignItems={"center"}
            justifyContent="space-between"
          >
            <Typography variant="subtitle2">Media, links and docs</Typography>
            <Button
              onClick={() => {
                // Open SharedMessages
                dispatch(UpdateSidebarType("SHARED"));
              }}
              endIcon={<CaretRight />}
            >
              401
              {/* Items count */}
            </Button>
          </Stack>
          <Stack direction="row" spacing={2} alignItems="center">
            {/* preview */}
            {[1, 2, 3].map((el) => (
              <Box>
                <img src={faker.image.food()} alt={faker.name.fullName()} />
              </Box>
            ))}
          </Stack>
          <Divider />
          {/* Star messages */}
          <Stack
            direction="row"
            alignItems={"center"}
            justifyContent="space-between"
          >
            <Stack direction={"row"} alignItems="center" spacing={2}>
              <Star size={21} />
              <Typography variant="subtitle2">Starred Messages</Typography>
            </Stack>
            <IconButton
              onClick={() => {
                // Open StarMessage
                dispatch(UpdateSidebarType("STARRED"));
              }}
            >
              <CaretRight />
            </IconButton>
          </Stack>
          <Divider />
          {/* Mute notification */}
          <Stack
            direction="row"
            alignItems={"center"}
            justifyContent="space-between"
          >
            <Stack direction={"row"} alignItems="center" spacing={2}>
              <Bell />
              <Typography variant="subtitle2">Mute Notifications</Typography>
            </Stack>
            <Switch />
          </Stack>
          <Divider />
          {/* Group in common */}
          <Typography>1 group in common</Typography>
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar src={faker.image.avatar()} alt={faker.name.fullName()} />
            <Stack spacing={0.5}>
              <Typography variant="subtitle2">Coding</Typography>
              <Typography variant="caption">tadod, dodat, you</Typography>
            </Stack>
          </Stack>
          {/* Option */}
          <Stack direction="row" alignItems="center" spacing={2}>
            <Button
              onClick={() => {
                setOpenBlock(true);
              }}
              startIcon={<Prohibit />}
              fullWidth
              variant="outlined"
            >
              Block
            </Button>
            <Button
              onClick={() => {
                setOpenDelete(true);
              }}
              startIcon={<Trash />}
              fullWidth
              variant="outlined"
            >
              Delete
            </Button>
          </Stack>
        </Stack>
        {openBlock && (
          <BlockDialog open={openBlock} handleClose={handleCloseBlock} />
        )}
        {openDelete && (
          <DeleteDialog open={openDelete} handleClose={handleCloseDelete} />
        )}
      </Stack>
    </Box>
  );
};

export default Contact;
