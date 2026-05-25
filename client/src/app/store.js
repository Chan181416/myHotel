import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../api/userSlice";
import registerdsSlice from "../api/registerdsSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    guest: registerdsSlice,
  },
});

export default store;
