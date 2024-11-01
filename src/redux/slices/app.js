import { createSlice } from "@reduxjs/toolkit";
import { dispatch } from "../store";

const initialState = {
    sidebar: {
        open: false,
        type: "CONTACT", // can be CONTACT, STARRED, SHARED
    },
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