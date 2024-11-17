import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import appReducer from "./slices/app";
import authReducer from "./slices/auth";
import conversationReducer from "./slices/conversation"
import audioCallReducer from './slices/audioCall';
import videoCallReducer from './slices/videoCall';

const rootPersistConfig = {
    key: 'root',
    storage,
    keyPrefix: 'redux-',
};

const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    conversation: conversationReducer,
    audioCall: audioCallReducer,
    videoCall: videoCallReducer,
});

export { rootPersistConfig, rootReducer };