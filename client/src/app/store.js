import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../api/userSlice";
import guestReducer from "../api/registerdsSlice";

export const Store = configureStore({
  reducer: {
    user: userReducer,
    guest: guestReducer,
  },
});

export default Store;