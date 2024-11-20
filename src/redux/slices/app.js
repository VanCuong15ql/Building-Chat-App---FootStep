import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

const initialState = {
    sidebar: {
        open: false,
        type: "CONTACT", // can be CONTACT, STARRED, SHARED
    },
    isLoggedIn: true,
    tab: 0, // [0, 1, 2, 3]
    snackbar: {
        open: null,
        message: null,
        severity: null,
    },
    users: [], // all users of app who are not friends and not requested yet
    all_users: [],
    friends: [], // all friends
    friendRequests: [], // all friend requests
    chat_type: null,
    room_id: null,
};

const slice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        // Toggle Sidebar
        toggleSidebar(state/*, action*/) {
            state.sidebar.open = !state.sidebar.open;
        },
        updateSidebarType(state, action) {
            state.sidebar.type = action.payload.type;
        },
        updateTab(state, action) {
            state.tab = action.payload.tab;
        },
        openSnackbar(state, action) {
            // console.log(action.payload);
            state.snackbar.open = true;
            state.snackbar.severity = action.payload.severity;
            state.snackbar.message = action.payload.message;
        },
        closeSnackbar(state/*, action*/) {
            // console.log("This is getting executed");
            state.snackbar.open = false;
            // state.snackbar.severity = null;
            state.snackbar.message = null;
        },
        updateUsers(state, action) {
            state.users = action.payload.users
        },
        updateAllUsers(state, action) {
            state.all_users = action.payload.users;
        },
        updateFriends(state, action) {
            state.friends = action.payload.friends;
        },
        updateFriendRequests(state, action) {
            state.friendRequests = action.payload.request;
        },
        selectConversation(state, action) {
            state.chat_type = "individual";
            state.room_id = action.payload.room_id;
        },
    },
});

// Reducer
export default slice.reducer;

export const closeSnackbar = () => async (dispatch, getState) => {
    dispatch(slice.actions.closeSnackbar());
};

export function showSnackbar({ severity /*= "info"*/, message/* = "test" */ }) {
    return async (dispatch, getState) => {
        dispatch(slice.actions.openSnackbar({
            message,
            severity
        }));

        setTimeout(() => {
            dispatch(slice.actions.closeSnackbar());
        }, 4000);
    }
}

export function ToggleSidebar() {
    return async (dispatch, getState) => {
        dispatch(slice.actions.toggleSidebar());
    };
}

export function UpdateSidebarType(type) {
    return async (dispatch, getState) => {
        dispatch(slice.actions.updateSidebarType({ type }));
    };
}

export function UpdateTab(tab) {
    return async (dispatch, getState) => {
        dispatch(slice.actions.updateTab({ tab }));
    };
}

export function FetchUsers() {
    return async (dispatch, getState) => {
        await axios.get("/user/get-users", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getState().auth.token}`,
            },
        }
        )
            .then((response) => {
                console.log(response);
                dispatch(slice.actions.updateUsers({ users: response.data.data }));
            })
            .catch((err) => {
                console.log(err);
            });
    };
}

export function FetchAllUsers() {
    return async (dispatch, getState) => {
        await axios
            .get(
                "/user/get-all-verified-users",
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${getState().auth.token}`,
                    },
                }
            )
            .then((response) => {
                console.log(response);
                dispatch(slice.actions.updateAllUsers({ users: response.data.data }));
            })
            .catch((err) => {
                console.log(err);
            });
    };
}

export function FetchFriends() {
    return async (dispatch, getState) => {
        await axios.get("/user/get-friends", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getState().auth.token}`,
            },
        }
        )
            .then((response) => {
                console.log(response);
                dispatch(slice.actions.updateFriends({ friends: response.data.data }));
            })
            .catch((err) => {
                console.log(err);
            });
    };
}

export function FetchFriendRequests() {
    return async (dispatch, getState) => {
        await axios.get("/user/get-requests", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getState().auth.token}`,
            },
        }
        )
            .then((response) => {
                console.log(response);
                dispatch(
                    slice.actions.updateFriendRequests({ requests: response.data.data })
                );
            })
            .catch((err) => {
                console.log(err);
            });
    };
}

export const SelectConversation = ({ room_id }) => {
    return async (dispatch, getState) => {
        dispatch(slice.actions.selectConversation({ room_id }));
    };
};