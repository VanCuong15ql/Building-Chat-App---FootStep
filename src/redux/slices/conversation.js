import { faker } from "@faker-js/faker";
import { createSlice } from "@reduxjs/toolkit";
import { AWS_S3_REGION, S3_BUCKET_NAME } from "../../config";

const user_id = window.localStorage.getItem("user_id")

const initialState = {
    direct_chat: {
        conversations: [],
        current_conversation: null,
        current_messages: [],
    },
    group_chat: {
    }
}

const slice = createSlice({
    name: "conversation",
    initialState,
    reducers: {
        fetchDirectConversations(state, action) {
            const list = action.payload.conversations.map((el) => {
                const this_user = el.participants.find(
                    (elm) => elm._id.toString() !== user_id
                );
                let last_msg = el.messages.length > 0 ? el.messages[el.messages.length - 1] : "";
                let time_display = "";
                if (last_msg !== "") {
                    // get time
                    let last_time = new Date(last_msg.created_at);
                    const hours = last_time.getHours().toString().padStart(2, '0');
                    const minutes = last_time.getMinutes().toString().padStart(2, '0');
                    time_display = `${hours}:${minutes}`;

                    if (last_msg.type === "Image") last_msg = "Sent an image";
                    if (last_msg.type === "Video") last_msg = "Sent a video";
                    if (last_msg.type === "File") last_msg = "Sent a file";
                    if (last_msg.type === "Text") last_msg = last_msg.text;
                }
                return {
                    id: el._id,
                    user_id: this_user?._id,
                    name: `${this_user?.firstName} ${this_user?.lastName}`,
                    online: this_user?.status === "Online",

                    img: this_user?.avatar ?? faker.image.avatar(),
                    msg: last_msg,

                    time: time_display,
                    unread: 0,
                    pinned: false,
                    about: this_user?.about,
                };
            });

            state.direct_chat.conversations = list;
        },

        updateDirectConversation(state, action) {
            const this_conversation = action.payload.conversation;
            state.direct_chat.conversations = state.direct_chat.conversations.map(
                (el) => {
                    if (el?.id !== this_conversation?._id) {
                        return el;
                    } else {
                        const user = this_conversation.participants.find(
                            (elm) => elm._id.toString() !== user_id
                        );
                        let last_msg = this_conversation.messages.length > 0 ? this_conversation.messages[this_conversation.messages.length - 1] : "";
                        // let time = new Date(last_msg ? last_msg.created_at : Date.now());
                        let time_display = "";
                        if (last_msg !== "") {
                            // get time
                            let last_time = new Date(last_msg.created_at);
                            const hours = last_time.getHours().toString().padStart(2, '0');
                            const minutes = last_time.getMinutes().toString().padStart(2, '0');
                            time_display = `${hours}:${minutes}`;

                            if (last_msg.type === "Image") last_msg = "Sent an image";
                            if (last_msg.type === "Video") last_msg = "Sent a video";
                            if (last_msg.type === "File") last_msg = "Sent a file";
                            if (last_msg.type === "Text") last_msg = last_msg.text;
                        }
                        return {
                            id: this_conversation._id,
                            user_id: user._id,
                            name: `${user.firstName} ${user.lastName}`,
                            online: user.status === "Online",
                            img: user?.avatar ?? faker.image.avatar(),
                            msg: last_msg,
                            time: time_display,
                            unread: 0,
                            pinned: false,
                        };
                    }
                }
            );
        },
        addDirectConversation(state, action) {
            const this_conversation = action.payload.conversation;
            const user = this_conversation.participants.find(
                (elm) => elm._id.toString() !== user_id
            );
            state.direct_chat.conversations = state.direct_chat.conversations.filter(
                (el) => el.id !== this_conversation._id
            );
            let last_msg = this_conversation.messages.length > 0 ? this_conversation.messages[this_conversation.messages.length - 1] : "";
            // let time = new Date(last_msg ? last_msg.created_at : Date.now());
            let time_display = "";
            if (last_msg !== "") {
                // get time
                let last_time = new Date(last_msg.created_at);
                const hours = last_time.getHours().toString().padStart(2, '0');
                const minutes = last_time.getMinutes().toString().padStart(2, '0');
                time_display = `${hours}:${minutes}`;

                if (last_msg.type === "Image") last_msg = "Sent an image";
                if (last_msg.type === "Video") last_msg = "Sent a video";
                if (last_msg.type === "File") last_msg = "Sent a file";
                if (last_msg.type === "Text") last_msg = last_msg.text;
            }
            state.direct_chat.conversations.push({
                id: this_conversation._id,
                user_id: user?._id,
                name: `${user?.firstName} ${user?.lastName}`,
                online: user?.status === "Online",
                img: user?.avatar ?? faker.image.avatar(),
                msg: last_msg,
                time: time_display,
                unread: 0,
                pinned: false,
            });
        },
        setCurrentConversation(state, action) {
            state.direct_chat.current_conversation = action.payload;
        },
        fetchCurrentMessages(state, action) {
            const messages = action.payload.messages;
            const formatted_messages = messages.map((el) => {
                let timestamp = new Date(el.created_at);
                let hours = timestamp.getHours().toString().padStart(2, '0');
                let minutes = timestamp.getMinutes().toString().padStart(2, '0');
                let time_display = `${hours}:${minutes}`;

                return {
                    id: el._id,
                    type: "msg",
                    subtype: el.type,
                    message: el.text,
                    file: el?.file ?? "",
                    incoming: el.to === user_id,
                    outgoing: el.from === user_id,
                    timestamp: time_display
                };
            });
            state.direct_chat.current_messages = formatted_messages;
        },
        addDirectMessage(state, action) {
            state.direct_chat.current_messages.push(action.payload.message);
        }
    }
})


export default slice.reducer;

export const FetchDirectConversations = ({ conversations }) => {
    return async (dispatch, getState) => {
        dispatch(slice.actions.fetchDirectConversations({ conversations }))
    }
}

export const AddDirectConversation = ({ conversation }) => {
    return async (dispatch, getState) => {
        dispatch(slice.actions.addDirectConversation({ conversation }))
    }
}
export const UpdateDirectConversation = ({ conversation }) => {
    return async (dispatch, getState) => {
        dispatch(slice.actions.updateDirectConversation({ conversation }))
    }
}

export const SetCurrentConversation = (current_conversation) => {
    return async (dispatch, getState) => {
        dispatch(slice.actions.setCurrentConversation(current_conversation));
    };
};
export const FetchCurrentMessages = ({ messages }) => {
    return async (dispatch, getState) => {
        dispatch(slice.actions.fetchCurrentMessages({ messages }));
    }
}
export const AddDirectMessage = (message) => {
    return async (dispatch, getState) => {
        dispatch(slice.actions.addDirectMessage({ message }));
    }
}