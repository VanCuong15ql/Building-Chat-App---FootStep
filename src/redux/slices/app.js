import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

const initialState = {
    sidebar: {
        open: false,
        type: "CONTACT", // can be CONTACT, STARRED, SHARED
    },
    snackbar: {
        open: null,
        message: null,
        severity: null,
    },
    users: [],
    all_users: [],
    friends: [],
    friendRequests: [],
    chat_type: null,
    room_id: null,
};

const slice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        // Toggle Sidebar
        toggleSidebar(state, action) {
            state.sidebar.open = !state.sidebar.open;
        },
        updateSidebarType(state, action) {
            state.sidebar.type = action.payload.type;
        },
        openSnackbar(state, action) {
            state.snackbar.open = true;

            state.snackbar.severity = action.payload.severity;
            state.snackbar.message = action.payload.message;
        },
        closeSnackbar(state, action) {
            state.snackbar.open = false;

            state.snackbar.severity = null;
            state.snackbar.message = null;
        },

        updateUsers(state, action) {
            state.users = action.payload.users
        },
        updateAllUsers(state, action) {
            state.all_users = action.payload.users;
        },

        updateFriends(state, action) {
            state.friends = action.payload.friends
        },
        updateFriendRequests(state, action) {
            state.friendRequests = action.payload.request
        },
        selectConversation(state, action) {
            state.chat_type = "individual";
            state.room_id = action.payload.room_id;
        },
    },
});

export default slice.reducer;

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

export function showSnackbar({ severity = "info", message = "test" }) {
    return async (dispatch, getState) => {
        dispatch(slice.actions.openSnackbar({
            message,
            severity
        }))

        setTimeout(() => {
            dispatch(slice.actions.closeSnackbar());
        }, 4000)
    }
}

export const closeSnackbar = () => async (dispatch, getState) => {
    dispatch(slice.actions.closeSnackbar());
};

export const FetchUsers = () => {
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

export const FetchFriends = () => {
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
export const FetchFriendRequests = () => {
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
                    slice.actions.updateFriendRequests({ request: response.data.data })
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