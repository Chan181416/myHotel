// import { configureStore } from "@reduxjs/toolkit";
// import userSlice from "../api/userSlice";
// import guestSlice from "../api/registerdsSlice";


// export const store = configureStore({
//   reducer: {
//     user: userSlice,
//     guest: guestSlice
//   },
// });

// export default store;

import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../api/userSlice";
import guestSlice from "../api/registerdsSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    guest: guestSlice,
  },
});

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

export default store;
