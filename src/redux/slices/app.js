import { createSlice } from "@reduxjs/toolkit";
import { dispatch } from "../store";

const initialState = {
    sidebar: {
        open: false,
        type: "CONTACT", // can be CONTACT, STARRED, SHARED
    },
    users: [],
    friends: [],
    friendRequests: []
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
        updateUsers(state, action) {
            state.users = action.payload.users
        },
        updateFriends(state, action) {
            state.friends = action.payload.friends
        },
        updateFriendRequests(state, action) {
            state.friendRequests = action.payload.request
        }
    },
});

export default slice.reducer;

export function ToggleSidebar() {
    return async () => {
        dispatch(slice.actions.toggleSidebar())
    }
}

// update sidebar type [CONTACT, STARRED, SHARED]
export function UpdateSidebarType(type) {
    return async () => {
        dispatch(slice.actions.updateSidebarType({
            type,
        }))
    }
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
                    slice.actions.updateFriendRequests({ request: response.data.data })
                );
            })
            .catch((err) => {
                console.log(err);
            });
    };
}