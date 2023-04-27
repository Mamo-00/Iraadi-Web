import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    // Add other feature reducers here as needed
  },
});

export default store;