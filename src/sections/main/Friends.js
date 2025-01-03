import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, Slide, Stack, Tab, Tabs } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { FetchFriendRequests, FetchFriends, FetchUsers } from "../../redux/slices/app";
import { FriendComponent, FriendRequestComponent, UserComponent } from "../../components/UserComponent";

const UsersList = () => {
    const dispatch = useDispatch();

    const { users } = useSelector((state) => state.app);

    useEffect(() => {
        dispatch(FetchUsers());
    }, []);

    return (
        <>
            {users?.map((el, idx) => {
                return <UserComponent key={el._id} {...el} />;;
            })}
        </>
    );
};

const FriendsList = () => {
    const dispatch = useDispatch();

    const { friends } = useSelector((state) => state.app);

    useEffect(() => {
        dispatch(FetchFriends());
    }, []);

    return (
        <>
            {friends?.map((el, idx) => {
                return <FriendComponent key={el._id} {...el} />;
            })}
        </>
    );
};

const FriendRequestList = () => {
    const dispatch = useDispatch();

    const { friendRequests } = useSelector((state) => state.app);

    useEffect(() => {
        dispatch(FetchFriendRequests());
    }, []);

    return (
        <>
            {friendRequests?.map((el, idx) => {
                return <FriendRequestComponent key={el._id} {...el.sender} id={el._id} />;
            })}
        </>
    );
};

const Friends = ({ open, handleClose }) => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Dialog fullWidth maxWidth="xs" open={open} keepMounted onClose={handleClose} sx={{ p: 4 }}>
            <Stack p={2} sx={{ width: "100%" }}>
                <Tabs value={value} onChange={handleChange} centered>
                    <Tab label="Explore" />
                    <Tab label="Friends" />
                    <Tab label="Requests" />
                </Tabs>
            </Stack>
            <DialogContent>
                <Stack sx={{ height: "100%" }}>
                    <Stack spacing={2.5}>
                        {(() => {
                            switch (value) {
                                case 0: // display all users in this list
                                    return <UsersList />;

                                case 1: // display friends in this list
                                    return <FriendsList />;

                                case 2: // display request in this list
                                    return <FriendRequestList />;

                                default:
                                    break;
                            }
                        })()}
                    </Stack>
                </Stack>
            </DialogContent>
        </Dialog>

    );
};


export default Friends