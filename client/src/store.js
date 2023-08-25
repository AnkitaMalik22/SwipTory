import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./components/auth/authSlice.js";
import modalSlice from "./components/common/Modal/modalSlice.js";
import storyReducer from "./components/story/storySlice.js";
import layoutReducer from "./components/common/Layout/LayoutSlice.js";

const store = configureStore({
  reducer: {
    auth: authSlice,
    modal: modalSlice,
    story: storyReducer,
    layout: layoutReducer,
  },
});

export default store;
